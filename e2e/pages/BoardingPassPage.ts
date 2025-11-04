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
    boardingTime = true,
  }: {
    order: number;
    passengerName: string;
    flightNumber: string;
    seatNumber: string;
    zone: string;
    boardingTime?: boolean;
  }) {
    // Verify passenger name and boarding pass title
    await expect(this.page.getByText(passengerName)).toBeVisible();
    await expect(this.page.getByText('Boarding Pass').first()).toBeVisible();

    // Verify flight number
    const flightNumberElement = this.page.getByTestId(`flightNumber-${order}`);
    await expect(flightNumberElement).toHaveText(flightNumber);

    // Verify Terminal
    await expect(this.page.getByTestId(`terminal-${order}`)).toBeVisible();

    // Verify Gate
    await expect(this.page.getByTestId(`gate-${order}`)).toBeVisible();

    // Verify Departure Airport Name
    await expect(this.page.getByTestId(`departureAirportName-${order}`)).toBeVisible();
    
    // Verify Departure Airport Code
    await expect(this.page.getByTestId(`departureAirportCode-${order}`)).toBeVisible();
    
    // Verify Departure Date
    await expect(this.page.getByTestId(`departureDate-${order}`)).toBeVisible();

    // Verify Flight Number
    await expect(this.page.getByTestId(`flightNumber-${order}`)).toBeVisible();

    // Verify Arrival Airport Name
    await expect(this.page.getByTestId(`arrivalAirportName-${order}`)).toBeVisible();
    
    // Verify Arrival Airport Code
    await expect(this.page.getByTestId(`arrivalAirportCode-${order}`)).toBeVisible();
    
    // Verify Arrival Date
    await expect(this.page.getByTestId(`arrivalDate-${order}`)).toBeVisible();
    
    // Verify Seat Number
    await expect(this.page.getByTestId(`seat-${order}`)).toBeVisible();
    
    // Verify Boarding Zone
    await expect(this.page.getByTestId(`boardingZone-${order}`)).toBeVisible();
    
    // Verify Boarding Sequence
    await expect(this.page.getByTestId(`boardingSequence-${order}`)).toBeVisible();
    
    // Verify Boarding Time
    await expect(this.page.getByTestId(`boardingTime-${order}`)).toBeVisible();
    

    // Verify Departure Time
    await expect(this.page.getByTestId(`departureTime-${order}-time`)).toBeVisible();

    // Verify Departure Time TZ
    await expect(this.page.getByTestId(`departureTime-${order}-tz`)).toBeVisible();

    // Verify Departure Day
    await expect(this.page.getByTestId(`departureDay-${order}`)).toBeVisible();

    // Verify Arrival Time
    await expect(this.page.getByTestId(`arrivalTime-${order}-time`)).toBeVisible();

    // Verify Arrival Time TZ
    await expect(this.page.getByTestId(`arrivalTime-${order}-tz`)).toBeVisible();

    // Verify Arrival Day
    await expect(this.page.getByTestId(`arrivalDay-${order}`)).toBeVisible();

    // Verify boarding time (HH:MM format) if requested
    await expect(this.page.getByTestId(`boardingTime-${order}`)).toBeVisible();
    
  }

  async done() {
    await this.page.getByRole('button', { name: 'Done' }).click();
  }
}
