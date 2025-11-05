import { test, expect, Page } from '@playwright/test';
import { CheckinPage } from '../../pages/CheckinPage';
import { TestData } from '../../fixtures/test-data';
import { PassengerSelectPage } from '../../pages/PassengerSelectPage';
import { PassengerDetailsPage } from '../../pages/PassengerDetailsPage';
import { DangerousGoodsPage } from '../../pages/DangerousGoodsPage';
import { BoardingPassPage } from '../../pages/BoardingPassPage';

test.describe('Check-in Journey', () => {
  let page: Page;
  let checkinPage: CheckinPage;
  let selectPassengerPage: PassengerSelectPage;
  const { booking, passengers } = TestData;
  const [primaryPassenger, secondaryPassenger] = passengers;

  test.beforeEach(async ({ page: testPage }) => {
    page = testPage;
    checkinPage = new CheckinPage(page);
    selectPassengerPage = new PassengerSelectPage(page);
    await checkinPage.navigate();
  });

  const completeCheckinProcess = async () => {
    // Step 1: Fill and submit check-in form
    await test.step('Submit check-in form', async () => {
      await checkinPage.fillCheckinForm(booking.ref, booking.lastName);
      await expect(page.getByRole('button', { name: /Retrieve Booking/i })).toBeEnabled();
      await checkinPage.submitForm();
      await expect(page).toHaveURL(/\/checkin\/select/);
    });

    // Step 2: Select passengers
    await test.step('Select all passengers', async () => {
      await selectPassengerPage.selectAllPassengers();
      await selectPassengerPage.continue();
    });

    // Step 3: Fill passenger details
    await test.step('Fill passenger details', async () => {
      const passengerDetailsPage = new PassengerDetailsPage(page);
      await passengerDetailsPage.fillPassengerDetails(0,
        primaryPassenger.phone,
        primaryPassenger.countryCode,
        primaryPassenger.nationality
      );
      await passengerDetailsPage.fillPassengerDetails(1,
        secondaryPassenger.phone,
        secondaryPassenger.countryCode,
        secondaryPassenger.nationality
      );
      await passengerDetailsPage.continue();
    });

    // Step 4: Accept dangerous goods
    await test.step('Accept dangerous goods', async () => {
      const dangerousGoodsPage = new DangerousGoodsPage(page);
      await dangerousGoodsPage.acceptAndContinue();
    });

    return new BoardingPassPage(page);
  };

  test('should complete check-in and display boarding pass', async () => {
    const boardingPassPage = await completeCheckinProcess();

    // Verify boarding pass details
    await test.step('Verify boarding pass', async () => {
      await boardingPassPage.verifyBoardingPass({
        order: 0,
        passengerName: `${primaryPassenger.firstName} ${primaryPassenger.lastName}`,
        flightNumber: booking.flightNumber,
        seatNumber: primaryPassenger.seat,
        zone: primaryPassenger.boardingZone,
        boardingSequence: primaryPassenger.boardingSequence,
        boardingTime: booking.boardingTime,
        terminal: booking.terminal,
        gate: booking.gate,
        departureAirportName: booking.departureAirportName,
        departureAirportCode: booking.departureAirportCode,
        departureDate: booking.departureDate,
        arrivalAirportName: booking.arrivalAirportName,
        arrivalAirportCode: booking.arrivalAirportCode,
        arrivalDate: booking.arrivalDate,
        departureTime: booking.departureTime,
        departureTimeTz: booking.departureTimeTz,
        arrivalTime: booking.arrivalTime,
        arrivalTimeTz: booking.arrivalTimeTz,
        departureDay: booking.departureDay,
        arrivalDay: booking.arrivalDay,
      });
      await boardingPassPage.done();
    });
  });

  test('should display error for invalid booking reference', async () => {
    await test.step('Submit invalid booking reference', async () => {
      await checkinPage.fillCheckinForm('INVALID123', booking.lastName);
      await checkinPage.submitForm();
      await expect(page.getByText(/Unable to retrieve booking/i)).toBeVisible();
    });
  });
});