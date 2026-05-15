import { test, expect, Page } from '@playwright/test';

test.describe('UI Integration Tests', () => {
  let page: Page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('should load all UI components and connect to services', async () => {
    // Navigate to the main page
    await page.goto(process.env.BASE_URL || 'http://localhost:3000');

    // Verify page loads correctly
    await expect(page).toHaveURL(process.env.BASE_URL || 'http://localhost:3000');

    // Check that essential UI components are present
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();

    // Verify flight search form is present
    await expect(page.locator('#origin-input')).toBeVisible();
    await expect(page.locator('#destination-input')).toBeVisible();
    await expect(page.locator('#departure-date-input')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();

    // Verify navigation links exist
    const navLinks = [
      { text: 'Flights', href: /flights|search/i },
      { text: 'Check-in', href: /checkin|check-in/i },
      { text: 'My Bookings', href: /bookings|my/i }
    ];

    for (const link of navLinks) {
      const locator = page.locator(`a:has-text("${link.text}")`);
      await expect(locator).toBeVisible();

      // Click the link and verify navigation
      await locator.click();
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveURL(link.href);

      // Navigate back to main page
      await page.goto(process.env.BASE_URL || 'http://localhost:3000');
    }
  });

  test('should display API errors in UI appropriately', async () => {
    await page.goto(process.env.BASE_URL || 'http://localhost:3000');

    // Intercept API calls to simulate an error
    await page.route('**/api/v1/flights/search', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Flight search service is temporarily unavailable' })
      });
    });

    // Fill in search form
    await page.locator('#origin-input').fill('BKK');
    await page.locator('#destination-input').fill('CNX');
    await page.locator('#departure-date-input').click();
    await page.locator('[data-date="2026-06-15"]').click();

    // Submit the form
    await page.locator('button[type="submit"]').click();

    // Wait for error message to appear
    await expect(page.locator('.error-message, .alert-error, [role="alert"]')).toContainText(/unavailable|error|service/i);
  });

  test('should handle loading states during API calls', async () => {
    // Intercept API call to slow it down and test loading state
    await page.route('**/api/v1/flights/airports/search*', async route => {
      // Delay the response to allow checking for loading state
      await new Promise(resolve => setTimeout(resolve, 1000));
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          { code: 'BKK', name: 'Suvarnabhumi Airport, Bangkok', city: 'Bangkok' },
          { code: 'DMK', name: 'Don Mueang International Airport', city: 'Bangkok' }
        ])
      });
    });

    await page.goto(process.env.BASE_URL || 'http://localhost:3000');

    // Start typing in the origin field to trigger airport search
    await page.locator('#origin-input').fill('Bangkok');

    // Check for loading indicator
    await expect(page.locator('.loading, .spinner, [aria-busy="true"]')).toBeVisible();

    // Wait for results to appear
    await expect(page.locator('.airport-suggestion')).toBeVisible({ timeout: 5000 });
  });

  test('should validate form inputs before making API calls', async () => {
    await page.goto(process.env.BASE_URL || 'http://localhost:3000');

    // Submit form without filling required fields
    await page.locator('button[type="submit"]').click();

    // Verify validation errors appear
    await expect(page.locator('.validation-error, .invalid, .error')).toHaveCount(2); // Origin and destination
  });

  test('should connect to all backend services through UI', async () => {
    await page.goto(process.env.BASE_URL || 'http://localhost:3000');

    // Test flight search API connection
    await page.route('**/api/v1/flights/search', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          flights: [
            {
              id: 'flight-1',
              flightNumber: 'QL123',
              origin: { code: 'BKK', name: 'Suvarnabhumi Airport' },
              destination: { code: 'CNX', name: 'Chiang Mai Airport' },
              departureTime: '2026-06-15T08:30:00Z',
              arrivalTime: '2026-06-15T10:15:00Z',
              price: 5000,
              duration: '1h 45m'
            }
          ]
        })
      });
    });

    // Test that API call is made when searching
    let searchAPICalled = false;
    page.on('request', request => {
      if (request.url().includes('/api/v1/flights/search')) {
        searchAPICalled = true;
      }
    });

    await page.locator('#origin-input').fill('BKK');
    await page.locator('#destination-input').fill('CNX');
    await page.locator('#departure-date-input').click();
    await page.locator('[data-date="2026-06-15"]').click();
    await page.locator('button[type="submit"]').click();

    // Wait briefly to ensure API call is registered
    await page.waitForTimeout(500);
    expect(searchAPICalled).toBe(true);

    // Test check-in API connection
    await page.goto(process.env.BASE_URL || 'http://localhost:3000/checkin');

    let checkinAPICalled = false;
    page.on('request', request => {
      if (request.url().includes('/api/v1/checkin/booking')) {
        checkinAPICalled = true;
      }
    });

    // Fill check-in form
    await page.locator('#booking-ref-input').fill('ABC123');
    await page.locator('#last-name-input').fill('HUUM');
    await page.locator('button[type="submit"]').click();

    // Wait briefly to ensure API call is registered
    await page.waitForTimeout(500);
    expect(checkinAPICalled).toBe(true);
  });

  test('should handle network connectivity issues gracefully', async () => {
    // Block all API requests to simulate network issues
    await page.route('**/api/**', route => {
      route.abort('network_failed');
    });

    await page.goto(process.env.BASE_URL || 'http://localhost:3000');

    // Attempt to search for flights
    await page.locator('#origin-input').fill('BKK');
    await page.locator('#destination-input').fill('CNX');
    await page.locator('#departure-date-input').click();
    await page.locator('[data-date="2026-06-15"]').click();
    await page.locator('button[type="submit"]').click();

    // Verify network error handling
    await expect(page.locator('.error-message, .network-error')).toContainText(/network|connection|offline|failed/i);
  });

  test('should persist user session across page navigations', async () => {
    // Set a mock session cookie or localStorage
    await page.addInitScript(() => {
      window.localStorage.setItem('userSession', JSON.stringify({
        userId: 'user-123',
        token: 'mock-token',
        permissions: ['read_flights', 'manage_bookings']
      }));
    });

    await page.goto(process.env.BASE_URL || 'http://localhost:3000');

    // Navigate to different sections
    await page.locator('a:has-text("Check-in")').click();
    await page.waitForLoadState('networkidle');

    await page.locator('a:has-text("Flights")').click();
    await page.waitForLoadState('networkidle');

    // Verify session is maintained by checking for user-specific elements
    await expect(page.locator('.user-profile, .welcome-message, [data-testid="user-info"]')).toBeVisible();
  });
});