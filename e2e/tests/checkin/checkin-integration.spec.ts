import { test, expect, Page } from '@playwright/test';

test.describe('Check-in Service Integration Tests', () => {
  let page: Page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('should retrieve booking details successfully', async () => {
    // Test retrieving a booking by reference and last name
    const response = await page.request.get('/api/v1/checkin/booking?ref=ABC123&lastName=HUUM');

    expect(response.status()).toBe(200);
    const bookingData = await response.json();

    expect(bookingData.bookingRef).toBe('ABC123');
    expect(bookingData.lastName).toBe('HUUM');
    expect(bookingData.passengers).toBeDefined();
    expect(Array.isArray(bookingData.passengers)).toBe(true);
    expect(bookingData.passengers.length).toBeGreaterThan(0);

    // Verify passenger details
    const passenger = bookingData.passengers[0];
    expect(passenger.firstName).toBeDefined();
    expect(passenger.lastName).toBeDefined();
    expect(passenger.seatNumber).toBeDefined();
  });

  test('should handle invalid booking reference', async () => {
    const response = await page.request.get('/api/v1/checkin/booking?ref=INVALID&lastName=USER');

    expect(response.status()).toBe(404);
    const errorData = await response.json();
    expect(errorData.error).toContain('Booking not found');
  });

  test('should handle missing parameters for booking retrieval', async () => {
    const response = await page.request.get('/api/v1/checkin/booking'); // Missing params

    expect(response.status()).toBe(400);
    const errorData = await response.json();
    expect(errorData.error).toContain('Missing required parameters');
  });

  test('should complete check-in process for a passenger', async () => {
    const response = await page.request.post('/api/v1/checkin/passenger', {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        bookingRef: 'ABC123',
        lastName: 'HUUM',
        passengerIndex: 0,
        contactInfo: {
          phone: '+66123456789',
          countryCode: '+66',
          nationality: 'TH'
        }
      }
    });

    expect(response.status()).toBe(200);
    const checkinResult = await response.json();
    expect(checkinResult.checkedIn).toBe(true);
    expect(checkinResult.boardingPass).toBeDefined();
    expect(checkinResult.boardingPass.passengerName).toBeDefined();
    expect(checkinResult.boardingPass.flightNumber).toBeDefined();
    expect(checkinResult.boardingPass.seatNumber).toBeDefined();
  });

  test('should handle check-in validation errors', async () => {
    const response = await page.request.post('/api/v1/checkin/passenger', {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        // Missing required fields
        bookingRef: 'ABC123'
        // Missing other required fields
      }
    });

    expect(response.status()).toBe(400);
    const errorData = await response.json();
    expect(errorData.error).toContain('Validation error');
  });

  test('should verify check-in service health check', async () => {
    const response = await page.request.get('/health');
    expect(response.status()).toBe(200);

    const healthData = await response.json();
    expect(healthData.status).toBe('OK');
    expect(healthData.timestamp).toBeDefined();
  });

  test('should retrieve boarding pass details', async () => {
    // First complete a check-in to get a boarding pass
    const checkinResponse = await page.request.post('/api/v1/checkin/passenger', {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        bookingRef: 'ABC123',
        lastName: 'HUUM',
        passengerIndex: 0,
        contactInfo: {
          phone: '+66123456789',
          countryCode: '+66',
          nationality: 'TH'
        }
      }
    });

    expect(checkinResponse.status()).toBe(200);
    const checkinData = await checkinResponse.json();
    const boardingPassId = checkinData.boardingPass.id;

    // Retrieve the boarding pass details
    const getResponse = await page.request.get(`/api/v1/checkin/boarding-pass/${boardingPassId}`);

    expect(getResponse.status()).toBe(200);
    const boardingPass = await getResponse.json();
    expect(boardingPass.id).toBe(boardingPassId);
    expect(boardingPass.passengerName).toBeDefined();
    expect(boardingPass.flightNumber).toBeDefined();
  });
});