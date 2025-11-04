import { test, expect } from '@playwright/test';
import { CheckinPage } from '../../pages/CheckinPage';
import { TestData } from '../../fixtures/test-data';
import { PassengerSelectPage } from '../../pages/PassengerSelectPage';
import { PassengerDetailsPage } from '../../pages/PassengerDetailsPage';
import { DangerousGoodsPage } from '../../pages/DangerousGoodsPage';
import { BoardingPassPage } from '../../pages/BoardingPassPage';

test.describe('Check-in Journey', () => {
  test('check-in form submission', async ({ page }) => {
    const checkinPage = new CheckinPage(page);
    const { booking } = TestData;
    let selectPassengerPage: PassengerSelectPage;

    // Step 1: Navigate to check-in page
    await test.step('Navigate to check-in page', async () => {
      await checkinPage.navigate();
    });

    // Step 2: retrieve booking
    await test.step('retrieve booking', async () => {
      await checkinPage.fillCheckinForm(booking.ref, booking.lastName);
      await expect(page.getByRole('button', { name: /Retrieve Booking/i })).toBeEnabled();

      try {
        selectPassengerPage = await checkinPage.submitForm();
        await expect(page).toHaveURL(/\/checkin\/select/);
      } catch (error) {
        console.error('Form submission error:', error);
        throw error;
      }
    });
    
    // Step 3: select all passengers
    await test.step('select all passengers', async () => {
      await selectPassengerPage.selectAllPassengers();
      await selectPassengerPage.continue();
    });

    // Step 4: passenger details
    await test.step('passenger details', async () => {
      const passengerDetailsPage = new PassengerDetailsPage(page);
      await passengerDetailsPage.fillPassengerDetails(1, TestData.passenger.phone, TestData.passenger.countryCode, TestData.passenger.nationality);
      await passengerDetailsPage.fillPassengerDetails(2, TestData.passenger.phone, TestData.passenger.countryCode, TestData.passenger.nationality);
      await passengerDetailsPage.continue();
    });
    
    // Step 5: Dangerous Goods
    await test.step('dangerous goods', async () => {
      const dangerousGoodsPage = new DangerousGoodsPage(page);
      await dangerousGoodsPage.acceptAndContinue();
    });
    
    // Step 6: Boarding Pass
    await test.step('boarding pass', async () => {
      const boardingPassPage = new BoardingPassPage(page);
      await boardingPassPage.verifyBoardingPass({
        order: 1,
        passengerName: TestData.passenger.firstName + ' ' + TestData.passenger.lastName,
        flightNumber: booking.flightNumber,
        seatNumber: '12A',
        zone: '1',
      });
      await boardingPassPage.done();
    });
    
  });
});
