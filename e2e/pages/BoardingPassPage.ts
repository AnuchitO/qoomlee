import { Page, expect } from '@playwright/test';

export class BoardingPassPage {
  constructor(private readonly page: Page) {}

  async verifyBoardingPassIsDisplayed(passengerName: string) {
    await expect(this.page.getByText(passengerName)).toBeVisible();
    await expect(this.page.getByText('Boarding Pass')).toBeVisible();
  }

  async verifyFlightDetails(flightNumber: string) {
    await expect(this.page.getByText(flightNumber)).toBeVisible();
  }

  async verifyPassengerSeat(seatNumber: string) {
    await expect(this.page.getByText(seatNumber)).toBeVisible();
  }

  async verifyBoardingZone(zone: string) {
    await expect(this.page.getByText(`Zone ${zone}`)).toBeVisible();
  }

  async verifyBoardingTime() {
    // This is a simple check for the boarding time format (HH:MM)
    await expect(this.page.getByText(/\d{2}:\d{2}/)).toBeVisible();
  }
}
