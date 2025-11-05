import { Page, expect } from '@playwright/test';

export class BoardingPassPage {
  constructor(private readonly page: Page) {}

  private get pageTitle() {
    return this.page.getByText('Boarding Pass').first();
  }

  private terminal(order: number) {
    return this.page.getByTestId(`terminal-${order}`);
  }

  private gate(order: number) {
    return this.page.getByTestId(`gate-${order}`);
  }

  private departureAirportName(order: number) {
    return this.page.getByTestId(`departureAirportName-${order}`);
  }

  private departureAirportCode(order: number) {
    return this.page.getByTestId(`departureAirportCode-${order}`);
  }

  private departureDate(order: number) {
    return this.page.getByTestId(`departureDate-${order}`);
  }

  private flightNumber(order: number) {
    return this.page.getByTestId(`flightNumber-${order}`);
  }

  private arrivalAirportName(order: number) {
    return this.page.getByTestId(`arrivalAirportName-${order}`);
  }

  private arrivalAirportCode(order: number) {
    return this.page.getByTestId(`arrivalAirportCode-${order}`);
  }

  private arrivalDate(order: number) {
    return this.page.getByTestId(`arrivalDate-${order}`);
  }

  private seat(order: number) {
    return this.page.getByTestId(`seat-${order}`);
  }

  private boardingZone(order: number) {
    return this.page.getByTestId(`boardingZone-${order}`);
  }

  private boardingSequence(order: number) {
    return this.page.getByTestId(`boardingSequence-${order}`);
  }

  private boardingTime(order: number) {
    return this.page.getByTestId(`boardingTime-${order}`);
  }

  private departureTime(order: number) {
    return this.page.getByTestId(`departureTime-${order}-time`);
  }

  private departureTimeTz(order: number) {
    return this.page.getByTestId(`departureTime-${order}-tz`);
  }

  private arrivalTime(order: number) {
    return this.page.getByTestId(`arrivalTime-${order}-time`);
  }

  private arrivalTimeTz(order: number) {
    return this.page.getByTestId(`arrivalTime-${order}-tz`);
  }

  private departureDay(order: number) {
    return this.page.getByTestId(`departureDay-${order}`);
  }

  private arrivalDay(order: number) {
    return this.page.getByTestId(`arrivalDay-${order}`);
  }


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
    await expect(this.pageTitle).toBeVisible();


    // Verify Terminal
    const terminalElement = this.terminal(order);
    await expect(terminalElement).toBeVisible();
    await expect(terminalElement).toHaveText(terminal);

    // Verify Gate
    const gateElement = this.gate(order);
    await expect(gateElement).toBeVisible();
    await expect(gateElement).toHaveText(gate);

    // Verify Departure Airport Name
    const departureAirportNameElement = this.departureAirportName(order);
    await expect(departureAirportNameElement).toBeVisible();
    await expect(departureAirportNameElement).toHaveText(departureAirportName);

    // Verify Departure Airport Code
    const departureAirportCodeElement = this.departureAirportCode(order);
    await expect(departureAirportCodeElement).toBeVisible();
    await expect(departureAirportCodeElement).toHaveText(departureAirportCode);

    // Verify Departure Date
    const departureDateElement = this.departureDate(order);
    await expect(departureDateElement).toBeVisible();
    await expect(departureDateElement).toHaveText(departureDate);

    // Verify Flight Number
    const flightNumberElement = this.flightNumber(order);
    await expect(flightNumberElement).toBeVisible();
    await expect(flightNumberElement).toHaveText(flightNumber);

    // Verify Arrival Airport Name
    const arrivalAirportNameElement = this.arrivalAirportName(order);
    await expect(arrivalAirportNameElement).toBeVisible();
    await expect(arrivalAirportNameElement).toHaveText(arrivalAirportName);

    // Verify Arrival Airport Code
    const arrivalAirportCodeElement = this.arrivalAirportCode(order);
    await expect(arrivalAirportCodeElement).toBeVisible();
    await expect(arrivalAirportCodeElement).toHaveText(arrivalAirportCode);

    // Verify Arrival Date
    const arrivalDateElement = this.arrivalDate(order);
    await expect(arrivalDateElement).toBeVisible();
    await expect(arrivalDateElement).toHaveText(arrivalDate);

    // Verify Seat Number
    const seatElement = this.seat(order);
    await expect(seatElement).toBeVisible();
    await expect(seatElement).toHaveText(seatNumber);

    // Verify Boarding Zone
    const boardingZoneElement = this.boardingZone(order);
    await expect(boardingZoneElement).toBeVisible();
    await expect(boardingZoneElement).toHaveText(zone);

    // Verify Boarding Sequence
    const boardingSequenceElement = this.boardingSequence(order);
    await expect(boardingSequenceElement).toBeVisible();
    await expect(boardingSequenceElement).toHaveText(boardingSequence);

    // Verify Boarding Time
    const boardingTimeElement = this.boardingTime(order);
    await expect(boardingTimeElement).toBeVisible();
    await expect(boardingTimeElement).toHaveText(boardingTime);


    // Verify Departure Time
    const departureTimeElement = this.departureTime(order);
    await expect(departureTimeElement).toBeVisible();
    await expect(departureTimeElement).toHaveText(departureTime);

    // Verify Departure Time TZ
    const departureTimeTzElement = this.departureTimeTz(order);
    await expect(departureTimeTzElement).toBeVisible();
    await expect(departureTimeTzElement).toHaveText(departureTimeTz);

    // Verify Departure Day
    const departureDayElement = this.departureDay(order);
    await expect(departureDayElement).toBeVisible();
    await expect(departureDayElement).toHaveText(departureDay);

    // Verify Arrival Time
    const arrivalTimeElement = this.arrivalTime(order);
    await expect(arrivalTimeElement).toBeVisible();
    await expect(arrivalTimeElement).toHaveText(arrivalTime);

    // Verify Arrival Time TZ
    const arrivalTimeTzElement = this.arrivalTimeTz(order);
    await expect(arrivalTimeTzElement).toBeVisible();
    await expect(arrivalTimeTzElement).toHaveText(arrivalTimeTz);

    // Verify Arrival Day
    const arrivalDayElement = this.arrivalDay(order);
    await expect(arrivalDayElement).toBeVisible();
    await expect(arrivalDayElement).toHaveText(arrivalDay);
  }

  async done() {
    await this.page.getByRole('button', { name: 'Done' }).click();
  }
}
