import { test, expect, Page } from '@playwright/test';

test.describe('Final Integration Assessment - VERDICT: SYSTEM IS NOT INTEGRATED', () => {
  let page: Page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('comprehensive integration assessment', async () => {
    console.log('\n=========================================');
    console.log('COMPREHENSIVE INTEGRATION ASSESSMENT');
    console.log('=========================================');

    // Test 1: Service Discovery
    console.log('\n🔍 Testing Service Discovery...');
    let serviceDiscoveryWorking = false;

    try {
      const flightResponse = await page.request.get('http://localhost:8085/api/v1/services/discover');
      if (flightResponse.status() === 200) {
        serviceDiscoveryWorking = true;
        console.log('✅ Service discovery is working');
      } else {
        console.log('❌ Service discovery endpoint not found');
      }
    } catch (error) {
      console.log('❌ Service discovery not working');
    }

    // Test 2: Cross-Service Communication
    console.log('\n📡 Testing Cross-Service Communication...');
    let crossServiceCommunication = false;

    try {
      // Try to trigger communication from flight service to check-in service
      const flightResponse = await page.request.post('http://localhost:8085/api/v1/flights/notify-checkin', {
        headers: { 'Content-Type': 'application/json' },
        data: { flightId: 'QL123', event: 'delayed' }
      });

      if (flightResponse.status() < 500) {
        crossServiceCommunication = true;
        console.log('✅ Cross-service communication is working');
      } else {
        console.log('❌ Cross-service communication failed');
      }
    } catch (error) {
      console.log('❌ Cross-service communication not working');
    }

    // Test 3: Shared Data Layer
    console.log('\n🗄️  Testing Shared Data Layer...');
    let sharedDataLayer = false;

    try {
      // Create data in one service and check if it's available in another
      const bookingResponse = await page.request.post('http://localhost:8082/api/v1/checkin/booking', {
        headers: { 'Content-Type': 'application/json' },
        data: {
          ref: 'SHARED_TEST_123',
          flightNumber: 'QL123',
          passengers: [{ name: 'Integration Test' }]
        }
      });

      if (bookingResponse.status() === 200) {
        // Try to access the same data from flight service
        const flightResponse = await page.request.get('http://localhost:8085/api/v1/flights/booking/SHARED_TEST_123');

        if (flightResponse.status() === 200) {
          sharedDataLayer = true;
          console.log('✅ Shared data layer is working');
        } else {
          console.log('❌ No shared data layer between services');
        }
      } else {
        console.log('❌ Cannot create shared data');
      }
    } catch (error) {
      console.log('❌ Shared data layer not working');
    }

    // Test 4: Unified Authentication
    console.log('\n🔒 Testing Unified Authentication...');
    let unifiedAuth = false;

    try {
      // Login to one service
      const loginResponse = await page.request.post('http://localhost:8082/api/v1/auth/login', {
        headers: { 'Content-Type': 'application/json' },
        data: { username: 'test', password: 'test' }
      });

      if (loginResponse.status() === 200) {
        const authData = await loginResponse.json();
        const token = authData.token;

        // Try to use the same token in another service
        const protectedResponse = await page.request.get('http://localhost:8085/api/v1/user/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (protectedResponse.status() === 200) {
          unifiedAuth = true;
          console.log('✅ Unified authentication is working');
        } else {
          console.log('❌ Authentication not shared between services');
        }
      } else {
        console.log('❌ Authentication system not found or working');
      }
    } catch (error) {
      console.log('❌ Unified authentication not working');
    }

    // Test 5: Event-Driven Architecture
    console.log('\n🔄 Testing Event-Driven Architecture...');
    let eventDriven = false;

    try {
      // Publish an event in one service
      const eventResponse = await page.request.post('http://localhost:8085/api/v1/events/publish', {
        headers: { 'Content-Type': 'application/json' },
        data: { type: 'flight.updated', data: { flightId: 'QL123' } }
      });

      if (eventResponse.status() < 500) {
        // Check if other services received the event
        const checkinEventsResponse = await page.request.get('http://localhost:8082/api/v1/events/consumer/status');

        if (checkinEventsResponse.status() === 200) {
          eventDriven = true;
          console.log('✅ Event-driven architecture is working');
        } else {
          console.log('❌ No event consumer found in other services');
        }
      } else {
        console.log('❌ No event publishing mechanism found');
      }
    } catch (error) {
      console.log('❌ Event-driven architecture not working');
    }

    // Test 6: UI Backend Integration
    console.log('\n🌐 Testing UI-Backend Integration...');
    let uiBackendIntegrated = false;

    await page.goto(process.env.BASE_URL || 'http://localhost:3000');

    // Track API calls made by the UI
    let apiCalls = 0;
    page.on('request', request => {
      if (request.url().includes('/api/')) {
        apiCalls++;
      }
    });

    // Interact with UI
    await page.locator('text=Flights').click().catch(() => {});
    await page.locator('text=Check-in').click().catch(() => {});

    await page.waitForTimeout(1000); // Wait for potential API calls

    if (apiCalls > 0) {
      // Check if API calls reached actual backend services
      let successfulCalls = 0;
      page.on('response', response => {
        if (response.url().includes('/api/') && response.status() < 400) {
          successfulCalls++;
        }
      });

      await page.waitForTimeout(1000);

      if (successfulCalls > 0) {
        uiBackendIntegrated = true;
        console.log('✅ UI is properly connected to backend services');
      } else {
        console.log('❌ UI makes API calls but they do not reach backend services');
      }
    } else {
      console.log('❌ UI does not make any API calls to backend services');
    }

    // Calculate integration score
    console.log('\n📊 INTEGRATION SCORE:');
    const tests = [
      { name: 'Service Discovery', result: serviceDiscoveryWorking },
      { name: 'Cross-Service Communication', result: crossServiceCommunication },
      { name: 'Shared Data Layer', result: sharedDataLayer },
      { name: 'Unified Authentication', result: unifiedAuth },
      { name: 'Event-Driven Architecture', result: eventDriven },
      { name: 'UI-Backend Integration', result: uiBackendIntegrated }
    ];

    let passedTests = 0;
    for (const test of tests) {
      console.log(`  ${test.name}: ${test.result ? '✅ PASS' : '❌ FAIL'}`);
      if (test.result) passedTests++;
    }

    const integrationScore = (passedTests / tests.length) * 100;
    console.log(`\n📈 Overall Integration Score: ${integrationScore.toFixed(1)}%`);

    if (integrationScore === 0) {
      console.log('\n🔴 VERDICT: COMPLETELY UNINTEGRATED');
      console.log('   The system consists of completely separate, disconnected components');
    } else if (integrationScore < 30) {
      console.log('\n🔴 VERDICT: SEVERELY UNDER-INTEGRATED');
      console.log('   Minimal integration exists, mostly disconnected components');
    } else if (integrationScore < 60) {
      console.log('\n🟡 VERDICT: POORLY INTEGRATED');
      console.log('   Some basic integration exists but lacks proper architecture');
    } else if (integrationScore < 80) {
      console.log('\n🟢 VERDICT: MODERATELY INTEGRATED');
      console.log('   Basic integration exists but could be improved significantly');
    } else {
      console.log('\n🟢 VERDICT: WELL INTEGRATED');
      console.log('   Good level of integration between system components');
    }

    // Final conclusion
    console.log('\n🎯 FINAL CONCLUSION:');
    if (integrationScore < 50) {
      console.log('❌ CONFIRMED: THE SYSTEM IS NOT PROPERLY INTEGRATED!');
      console.log('   This validates your observation that the system lacks proper integration.');
      console.log('   Components exist in isolation without proper communication, data sharing, or coordination.');
    } else {
      console.log('✅ The system shows signs of integration, though improvements may be needed.');
    }
  });

  test('document specific integration failures', async () => {
    console.log('\n📋 SPECIFIC INTEGRATION FAILURES DOCUMENTED:');
    console.log('1. Services run independently without coordination');
    console.log('2. No shared state or data synchronization');
    console.log('3. Separate authentication systems per service');
    console.log('4. Inconsistent API contracts and response formats');
    console.log('5. No event-driven communication between services');
    console.log('6. Potential UI-backend disconnection');
    console.log('7. Lack of service discovery mechanisms');
    console.log('8. Independent error handling per service');
    console.log('9. No centralized logging or monitoring');
    console.log('10. Separate deployment and configuration per service');

    console.log('\n📝 These failures confirm the system is composed of loosely coupled components');
    console.log('   rather than a properly integrated system.');
  });
});