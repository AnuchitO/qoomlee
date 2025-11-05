import { Page, expect } from '@playwright/test';

export class PassengerSelectPage {
  constructor(private readonly page: Page) {}

  private passenger(order: number) {
    return this.page.getByTestId(`passenger-${order}`);
  }

  async selectPassenger(order: number) {
    await this.passenger(order).click();
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