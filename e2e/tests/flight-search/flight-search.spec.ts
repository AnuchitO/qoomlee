import { test, expect, Page } from '@playwright/test';

test.describe('Flight Search Integration Tests', () => {
  let page: Page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('should search for flights and display results', async () => {
    // Navigate to the web UI
    await page.goto(process.env.BASE_URL || 'http://localhost:3000');

    // Wait for the page to load
    await expect(page.locator('h1')).toContainText(/Flight|Search/i);

    // Fill in flight search form
    await page.locator('#origin-input').fill('BKK');
    await page.locator('#destination-input').fill('CNX');
    await page.locator('#departure-date-input').click();
    // Select a date from the calendar
    await page.locator('[data-date="2026-06-15"]').click(); // Assuming this date selector exists

    // Click search button
    await page.locator('button[type="submit"]').click();

    // Wait for results to load
    await page.waitForResponse(response =>
      response.url().includes('/api/v1/flights/search') && response.status() === 200
    );

    // Verify results are displayed
    await expect(page.locator('.flight-results')).toBeVisible();
    const resultCount = await page.locator('.flight-result-item').count();
    expect(resultCount).toBeGreaterThan(0);
  });

  test('should search for airports using the API', async () => {
    // Test the airport search API directly
    const response = await page.request.get('/api/v1/flights/airports/search?q=Bangkok');

    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);

    // Check that the results contain Bangkok-related airports
    const hasBangkokAirport = data.some((airport: any) =>
      airport.name.toLowerCase().includes('bangkok') ||
      airport.code.includes('BKK')
    );
    expect(hasBangkokAirport).toBe(true);
  });

  test('should handle invalid flight search parameters', async () => {
    // Navigate to the web UI
    await page.goto(process.env.BASE_URL || 'http://localhost:3000');

    // Fill in invalid search (same origin and destination)
    await page.locator('#origin-input').fill('BKK');
    await page.locator('#destination-input').fill('BKK'); // Same as origin
    await page.locator('#departure-date-input').click();
    await page.locator('[data-date="2026-06-15"]').click();

    // Click search button
    await page.locator('button[type="submit"]').click();

    // Wait for the error response
    await page.waitForResponse(response =>
      response.url().includes('/api/v1/flights/search') && response.status() === 400
    );

    // Verify error message is displayed
    await expect(page.locator('.error-message')).toContainText(/cannot be the same|origin and destination/i);
  });

  test('should handle missing required parameters', async () => {
    // Test API directly with missing parameters
    const response = await page.request.post('/api/v1/flights/search', {
      data: {
        origin: 'BKK',
        // Missing destination
        departureDate: '2026-06-15',
        passengers: {
          adults: 1,
          children: 0,
          infants: 0
        }
      }
    });

    expect(response.status()).toBe(400);
    const data = await response.json();
    expect(data.error).toBeDefined();
  });

  test('should verify health check endpoint', async () => {
    const response = await page.request.get('/health');
    expect(response.status()).toBe(200);

    const healthData = await response.json();
    expect(healthData.status).toBe('OK');
    expect(healthData.timestamp).toBeDefined();
  });
});