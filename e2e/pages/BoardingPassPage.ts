import { Page, expect } from '@playwright/test';

export class BoardingPassPage {
  constructor(private readonly page: Page) {}

  /**
   * Verify all key elements of the boarding pass
   */
  async verifyBoardingPass({
    order,
    passengerName,
    flightNumber,
    seatNumber,
    zone,
    boardingTime,
    terminal,
    gate,
    departureAirportName,
    departureAirportCode,
    departureDate,
    arrivalAirportName,
    arrivalAirportCode,
    arrivalDate,
    departureTime,
    departureTimeTz,
    arrivalTime,
    arrivalTimeTz,
    departureDay,
    arrivalDay,
    boardingSequence,
  }: {
    order: number;
    passengerName: string;
    flightNumber: string;
    seatNumber: string;
    zone: string;
    boardingTime: string;
    terminal: string;
    gate: string;
    departureAirportName: string;
    departureAirportCode: string;
    departureDate: string;
    arrivalAirportName: string;
    arrivalAirportCode: string;
    arrivalDate: string;
    departureTime: string;
    departureTimeTz: string;
    arrivalTime: string;
    arrivalTimeTz: string;
    departureDay: string;
    arrivalDay: string;
    boardingSequence: string;
  }) {
    // Verify passenger name and boarding pass title
    await expect(this.page.getByText(passengerName)).toBeVisible();
    await expect(this.page.getByText('Boarding Pass').first()).toBeVisible();
    

    // Verify Terminal
    const terminalElement = this.page.getByTestId(`terminal-${order}`);
    await expect(terminalElement).toBeVisible();
    await expect(terminalElement).toHaveText(terminal);

    // Verify Gate
    const gateElement = this.page.getByTestId(`gate-${order}`);
    await expect(gateElement).toBeVisible();
    await expect(gateElement).toHaveText(gate);

    // Verify Departure Airport Name
    const departureAirportNameElement = this.page.getByTestId(`departureAirportName-${order}`);
    await expect(departureAirportNameElement).toBeVisible();
    await expect(departureAirportNameElement).toHaveText(departureAirportName);

    // Verify Departure Airport Code
    const departureAirportCodeElement = this.page.getByTestId(`departureAirportCode-${order}`);
    await expect(departureAirportCodeElement).toBeVisible();
    await expect(departureAirportCodeElement).toHaveText(departureAirportCode);

    // Verify Departure Date
    const departureDateElement = this.page.getByTestId(`departureDate-${order}`);
    await expect(departureDateElement).toBeVisible();
    await expect(departureDateElement).toHaveText(departureDate);

    // Verify Flight Number
    const flightNumberElement = this.page.getByTestId(`flightNumber-${order}`);
    await expect(flightNumberElement).toBeVisible();
    await expect(flightNumberElement).toHaveText(flightNumber);

    // Verify Arrival Airport Name
    const arrivalAirportNameElement = this.page.getByTestId(`arrivalAirportName-${order}`);
    await expect(arrivalAirportNameElement).toBeVisible();
    await expect(arrivalAirportNameElement).toHaveText(arrivalAirportName);

    // Verify Arrival Airport Code
    const arrivalAirportCodeElement = this.page.getByTestId(`arrivalAirportCode-${order}`);
    await expect(arrivalAirportCodeElement).toBeVisible();
    await expect(arrivalAirportCodeElement).toHaveText(arrivalAirportCode);

    // Verify Arrival Date
    const arrivalDateElement = this.page.getByTestId(`arrivalDate-${order}`);
    await expect(arrivalDateElement).toBeVisible();
    await expect(arrivalDateElement).toHaveText(arrivalDate);

    // Verify Seat Number
    const seatElement = this.page.getByTestId(`seat-${order}`);
    await expect(seatElement).toBeVisible();
    await expect(seatElement).toHaveText(seatNumber);

    // Verify Boarding Zone
    const boardingZoneElement = this.page.getByTestId(`boardingZone-${order}`);
    await expect(boardingZoneElement).toBeVisible();
    await expect(boardingZoneElement).toHaveText(zone);

    // Verify Boarding Sequence
    const boardingSequenceElement = this.page.getByTestId(`boardingSequence-${order}`);
    await expect(boardingSequenceElement).toBeVisible();
    await expect(boardingSequenceElement).toHaveText(boardingSequence);

    // Verify Boarding Time
    const boardingTimeElement = this.page.getByTestId(`boardingTime-${order}`);
    await expect(boardingTimeElement).toBeVisible();
    await expect(boardingTimeElement).toHaveText(boardingTime);


    // Verify Departure Time
    const departureTimeElement = this.page.getByTestId(`departureTime-${order}-time`);
    await expect(departureTimeElement).toBeVisible();
    await expect(departureTimeElement).toHaveText(departureTime);

    // Verify Departure Time TZ
    const departureTimeTzElement = this.page.getByTestId(`departureTime-${order}-tz`);
    await expect(departureTimeTzElement).toBeVisible();
    await expect(departureTimeTzElement).toHaveText(departureTimeTz);

    // Verify Departure Day
    const departureDayElement = this.page.getByTestId(`departureDay-${order}`);
    await expect(departureDayElement).toBeVisible();
    await expect(departureDayElement).toHaveText(departureDay);

    // Verify Arrival Time
    const arrivalTimeElement = this.page.getByTestId(`arrivalTime-${order}-time`);
    await expect(arrivalTimeElement).toBeVisible();
    await expect(arrivalTimeElement).toHaveText(arrivalTime);

    // Verify Arrival Time TZ
    const arrivalTimeTzElement = this.page.getByTestId(`arrivalTime-${order}-tz`);
    await expect(arrivalTimeTzElement).toBeVisible();
    await expect(arrivalTimeTzElement).toHaveText(arrivalTimeTz);

    // Verify Arrival Day
    const arrivalDayElement = this.page.getByTestId(`arrivalDay-${order}`);
    await expect(arrivalDayElement).toBeVisible();
    await expect(arrivalDayElement).toHaveText(arrivalDay);
  }

  async done() {
    await this.page.getByRole('button', { name: 'Done' }).click();
  }
}
