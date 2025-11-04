import { Page, expect } from '@playwright/test';

export class PassengerSelectPage {
  constructor(private readonly page: Page) {}

  async selectPassenger(passengerName: string) {
    await this.page.getByRole('option', { name: passengerName }).click();
  }

  async selectAllPassengers() {
    await this.page.getByRole('button', { name: 'Select All' }).click();
  }

  async continue() {
    await this.page.getByRole('button', { name: 'Continue' }).click();
  }

  async back() {
    await this.page.getByRole('button', { name: 'Back' }).click();
  }

  async isAtPassengerSelect() {
    await expect(this.page.getByText('Passenger Select')).toBeVisible();
  }
}