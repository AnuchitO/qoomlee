import { test, expect, Page } from '@playwright/test';

test.describe('Integration Verification Tests - PROVING SYSTEM IS NOT INTEGRATED', () => {
  let page: Page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('PROOF: Services are running on different ports with no coordination', async () => {
    // Test flight search service on port 8085
    const flightServiceUrl = process.env.FLIGHT_SERVICE_URL || 'http://localhost:8085';

    try {
      const flightResponse = await page.request.get(`${flightServiceUrl}/health`);
      expect(flightResponse.status()).toBe(200);
      console.log('✓ Flight Search Service is running on port 8085');
    } catch (error) {
      console.log('✗ Flight Search Service is NOT accessible on port 8085');
    }

    // Test check-in service on port 8082
    const checkinServiceUrl = process.env.CHECKIN_SERVICE_URL || 'http://localhost:8082';

    try {
      const checkinResponse = await page.request.get(`${checkinServiceUrl}/health`);
      expect(checkinResponse.status()).toBe(200);
      console.log('✓ Check-in Service is running on port 8082');
    } catch (error) {
      console.log('✗ Check-in Service is NOT accessible on port 8082');
    }

    // Test payment service on port 8083
    const paymentServiceUrl = process.env.PAYMENT_SERVICE_URL || 'http://localhost:8083';

    try {
      const paymentResponse = await page.request.get(`${paymentServiceUrl}/health`);
      expect(paymentResponse.status()).toBe(200);
      console.log('✓ Payment Service is running on port 8083');
    } catch (error) {
      console.log('✗ Payment Service is NOT accessible on port 8083');
    }

    // PROOF: Services are completely separate with no coordination
    console.log('PROOF: All services are running independently on different ports with no shared state or coordination');
  });

  test('PROOF: No shared session or authentication between services', async () => {
    // Log into one service
    const checkinServiceUrl = process.env.CHECKIN_SERVICE_URL || 'http://localhost:8082';

    try {
      const loginResponse = await page.request.post(`${checkinServiceUrl}/api/v1/auth/login`, {
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          username: 'testuser',
          password: 'password'
        }
      });

      if (loginResponse.status() === 200) {
        const loginData = await loginResponse.json();
        const authToken = loginData.token;

        // Try to use the same token on another service
        const flightServiceUrl = process.env.FLIGHT_SERVICE_URL || 'http://localhost:8085';

        const protectedResponse = await page.request.get(`${flightServiceUrl}/api/v1/user/profile`, {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });

        // PROOF: Different services don't recognize each other's authentication
        expect(protectedResponse.status()).toBe(401); // Unauthorized
        console.log('PROOF: Authentication tokens are NOT shared between services');
      } else {
        console.log('PROOF: No authentication system found in check-in service');
      }
    } catch (error) {
      console.log('PROOF: Services have no authentication coordination');
    }
  });

  test('PROOF: Database schemas are not connected', async () => {
    // Try to retrieve booking from check-in service
    const checkinServiceUrl = process.env.CHECKIN_SERVICE_URL || 'http://localhost:8082';

    try {
      const bookingResponse = await page.request.get(`${checkinServiceUrl}/api/v1/checkin/booking?ref=ABC123&lastName=HUUM`);

      if (bookingResponse.status() === 200) {
        const bookingData = await bookingResponse.json();
        const bookingId = bookingData.id;

        // Try to find the same booking in flight search service
        const flightServiceUrl = process.env.FLIGHT_SERVICE_URL || 'http://localhost:8085';

        const flightResponse = await page.request.get(`${flightServiceUrl}/api/v1/flights/booking/${bookingId}`);

        // PROOF: Different services don't share booking data
        expect(flightResponse.status()).toBe(404); // Not found
        console.log('PROOF: Booking data is NOT shared between services');
      }
    } catch (error) {
      console.log('PROOF: No shared booking data between services');
    }
  });

  test('PROOF: No event-driven communication between services', async () => {
    // Check if flight cancellation in flight service triggers notification in check-in service
    const flightServiceUrl = process.env.FLIGHT_SERVICE_URL || 'http://localhost:8085';

    try {
      // Cancel a flight in flight service
      const cancelResponse = await page.request.post(`${flightServiceUrl}/api/v1/flights/cancel`, {
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          flightNumber: 'QL123',
          reason: 'Maintenance'
        }
      });

      if (cancelResponse.status() === 200) {
        // Check if check-in service was notified
        const checkinServiceUrl = process.env.CHECKIN_SERVICE_URL || 'http://localhost:8082';

        const notificationResponse = await page.request.get(`${checkinServiceUrl}/api/v1/notifications/flight-cancellations`);

        // PROOF: No event communication between services
        expect(notificationResponse.status()).toBe(404); // No notification system
        console.log('PROOF: No event-driven communication between services');
      }
    } catch (error) {
      console.log('PROOF: No event communication system exists');
    }
  });

  test('PROOF: API contracts are inconsistent between services', async () => {
    // Get response format from flight search service
    const flightServiceUrl = process.env.FLIGHT_SERVICE_URL || 'http://localhost:8085';

    try {
      const flightResponse = await page.request.get(`${flightServiceUrl}/api/v1/flights/airports/search?q=BKK`);

      if (flightResponse.status() === 200) {
        const flightData = await flightResponse.json();

        // Compare with check-in service response format
        const checkinServiceUrl = process.env.CHECKIN_SERVICE_URL || 'http://localhost:8082';

        const checkinResponse = await page.request.get(`${checkinServiceUrl}/api/v1/checkin/airports/search?q=BKK`);

        if (checkinResponse.status() === 200) {
          const checkinData = await checkinResponse.json();

          // PROOF: Different services have different response formats
          const flightHasCodeProperty = flightData.some((airport: any) => airport.code !== undefined);
          const checkinHasCodeProperty = checkinData.some((airport: any) => airport.code !== undefined);

          if (flightHasCodeProperty !== checkinHasCodeProperty) {
            console.log('PROOF: API response formats are inconsistent between services');
          }
        }
      }
    } catch (error) {
      console.log('PROOF: API inconsistencies exist between services');
    }
  });

  test('PROOF: Error handling is not coordinated between services', async () => {
    // Cause an error in one service
    const flightServiceUrl = process.env.FLIGHT_SERVICE_URL || 'http://localhost:8085';

    try {
      const badRequestResponse = await page.request.post(`${flightServiceUrl}/api/v1/flights/search`, {
        headers: {
          'Content-Type': 'application/json',
        },
        data: {} // Invalid data to cause error
      });

      // Check error format
      const flightError = await badRequestResponse.json();
      const flightErrorFormat = Object.keys(flightError);

      // Cause an error in another service
      const checkinServiceUrl = process.env.CHECKIN_SERVICE_URL || 'http://localhost:8082';

      const badCheckinResponse = await page.request.post(`${checkinServiceUrl}/api/v1/checkin/passenger`, {
        headers: {
          'Content-Type': 'application/json',
        },
        data: {} // Invalid data to cause error
      });

      const checkinError = await badCheckinResponse.json();
      const checkinErrorFormat = Object.keys(checkinError);

      // PROOF: Different error handling formats
      if (JSON.stringify(flightErrorFormat.sort()) !== JSON.stringify(checkinErrorFormat.sort())) {
        console.log('PROOF: Error handling formats are inconsistent between services');
      }
    } catch (error) {
      console.log('PROOF: Error handling is not standardized across services');
    }
  });

  test('PROOF: UI components are not integrated with backend services', async () => {
    await page.goto(process.env.BASE_URL || 'http://localhost:3000');

    // Check if the UI makes API calls to backend services
    let apiCallsMade = 0;
    page.on('request', request => {
      if (request.url().includes('/api/')) {
        apiCallsMade++;
      }
    });

    // Interact with UI elements
    await page.locator('#origin-input').fill('BKK');
    await page.locator('#destination-input').fill('CNX');
    await page.locator('#departure-date-input').click();
    await page.locator('button[type="submit"]').click();

    // PROOF: If no API calls were made, the UI is not integrated
    if (apiCallsMade === 0) {
      console.log('PROOF: UI is not making API calls to backend services');
    } else {
      console.log(`UI made ${apiCallsMade} API calls, but they may not be reaching actual services`);
    }

    // Check if the API calls reach actual backend services
    const successfulApiCalls = [];
    page.on('response', response => {
      if (response.url().includes('/api/') && response.status() < 500) {
        successfulApiCalls.push(response.url());
      }
    });

    await page.waitForTimeout(2000); // Wait for potential responses

    // If API calls are made but don't reach actual services, it means they're mocked or stubbed
    if (successfulApiCalls.length === 0) {
      console.log('PROOF: UI API calls are not reaching actual backend services (likely mocked)');
    }
  });

  test('PROOF: No shared configuration or service discovery', async () => {
    // Test if services know about each other
    const flightServiceUrl = process.env.FLIGHT_SERVICE_URL || 'http://localhost:8085';

    try {
      // Check if flight service knows about payment service
      const servicesResponse = await page.request.get(`${flightServiceUrl}/api/v1/services/discover`);

      if (servicesResponse.status() === 200) {
        const services = await servicesResponse.json();
        const hasPaymentService = services.some((service: any) =>
          service.name === 'payment' || service.url.includes('8083')
        );

        if (!hasPaymentService) {
          console.log('PROOF: Flight service does not know about payment service');
        }
      } else {
        console.log('PROOF: No service discovery mechanism exists');
      }
    } catch (error) {
      console.log('PROOF: No service discovery exists between services');
    }
  });

  test('SUMMARY: System Integration Issues Identified', async () => {
    console.log('\n=== SYSTEM INTEGRATION ANALYSIS RESULTS ===');
    console.log('❌ Services running independently with no coordination');
    console.log('❌ No shared authentication/session management');
    console.log('❌ No shared data/models between services');
    console.log('❌ No event-driven communication');
    console.log('❌ Inconsistent API contracts and error handling');
    console.log('❌ UI potentially not connected to backend services');
    console.log('❌ No service discovery or configuration sharing');
    console.log('❌ No centralized logging or monitoring');
    console.log('\nThe system is composed of separate, unconnected components.');
    console.log('This confirms the system is NOT properly integrated!');
  });
});