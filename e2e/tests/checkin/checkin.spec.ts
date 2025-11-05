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
      await passengerDetailsPage.fillPassengerDetails(0, TestData.passengers[0].phone, TestData.passengers[0].countryCode, TestData.passengers[0].nationality);
      await passengerDetailsPage.fillPassengerDetails(1, TestData.passengers[1].phone, TestData.passengers[1].countryCode, TestData.passengers[1].nationality);
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
        order: 0,
        passengerName: TestData.passengers[0].firstName + ' ' + TestData.passengers[0].lastName,
        flightNumber: booking.flightNumber,
        seatNumber: TestData.passengers[0].seat,
        zone: TestData.passengers[0].boardingZone,
        boardingTime: TestData.booking.boardingTime,
        terminal: TestData.booking.terminal,
        gate: TestData.booking.gate,
        departureAirportName: TestData.booking.departureAirportName,
        departureAirportCode: TestData.booking.departureAirportCode,
        departureDate: TestData.booking.departureDate,
        arrivalAirportName: TestData.booking.arrivalAirportName,
        arrivalAirportCode: TestData.booking.arrivalAirportCode,
        arrivalDate: TestData.booking.arrivalDate,
        departureTime: TestData.booking.departureTime,
        departureTimeTz: TestData.booking.departureTimeTz,
        arrivalTime: TestData.booking.arrivalTime,
        arrivalTimeTz: TestData.booking.arrivalTimeTz,
        departureDay: TestData.booking.departureDay,
        arrivalDay: TestData.booking.arrivalDay,
        boardingSequence: TestData.passengers[0].boardingSequence,
      });
      await boardingPassPage.done();
    });

  });
});
