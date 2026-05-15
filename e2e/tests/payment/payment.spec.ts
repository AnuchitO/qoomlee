import { test, expect, Page } from '@playwright/test';

test.describe('Payment Service Integration Tests', () => {
  let page: Page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('should process a payment successfully', async () => {
    // Test payment API directly
    const response = await page.request.post('/api/v1/payments/process', {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        amount: 25000, // Amount in cents
        currency: 'THB',
        paymentMethod: 'card',
        card: {
          number: '4242424242424242',
          expMonth: 12,
          expYear: 2027,
          cvc: '123'
        },
        bookingId: 'TEST_BOOKING_123'
      }
    });

    expect(response.status()).toBe(200);
    const paymentResult = await response.json();
    expect(paymentResult.id).toBeDefined();
    expect(paymentResult.status).toBe('succeeded');
    expect(paymentResult.amount).toBe(25000);
    expect(paymentResult.currency).toBe('THB');
  });

  test('should handle invalid payment data', async () => {
    const response = await page.request.post('/api/v1/payments/process', {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        amount: -100, // Invalid amount
        currency: 'THB',
        paymentMethod: 'card',
        card: {
          number: '4242424242424242',
          expMonth: 12,
          expYear: 2027,
          cvc: '123'
        }
      }
    });

    expect(response.status()).toBe(400);
    const errorData = await response.json();
    expect(errorData.error).toBeDefined();
  });

  test('should handle payment validation errors', async () => {
    const response = await page.request.post('/api/v1/payments/process', {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        // Missing required fields
        amount: 25000
      }
    });

    expect(response.status()).toBe(400);
    const errorData = await response.json();
    expect(errorData.error).toContain('Validation error');
  });

  test('should verify payment service health check', async () => {
    const response = await page.request.get('/health');
    expect(response.status()).toBe(200);

    const healthData = await response.json();
    expect(healthData.status).toBe('OK');
    expect(healthData.timestamp).toBeDefined();
  });

  test('should retrieve payment details', async () => {
    // First create a payment
    const createResponse = await page.request.post('/api/v1/payments/process', {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        amount: 15000,
        currency: 'THB',
        paymentMethod: 'card',
        card: {
          number: '4242424242424242',
          expMonth: 12,
          expYear: 2027,
          cvc: '123'
        },
        bookingId: 'TEST_BOOKING_456'
      }
    });

    expect(createResponse.status()).toBe(200);
    const paymentData = await createResponse.json();
    const paymentId = paymentData.id;

    // Retrieve the payment details
    const getResponse = await page.request.get(`/api/v1/payments/${paymentId}`);

    expect(getResponse.status()).toBe(200);
    const retrievedPayment = await getResponse.json();
    expect(retrievedPayment.id).toBe(paymentId);
    expect(retrievedPayment.status).toBe('succeeded');
    expect(retrievedPayment.amount).toBe(15000);
  });
});