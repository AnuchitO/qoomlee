import { Page, expect } from '@playwright/test';

export class PassengerDetailsPage {
  constructor(private readonly page: Page) {}

  async fillPassengerDetails(order: number, phone: string, countryCode: string, nationality: string) {
    const nationalityInput = this.page.getByTestId(`nationality-${order}`);
    await nationalityInput.scrollIntoViewIfNeeded();
    await nationalityInput.fill(nationality);

    const countryCodeSelect = this.page.getByTestId(`countryCode-${order}`);
    await countryCodeSelect.scrollIntoViewIfNeeded();
    await countryCodeSelect.selectOption(countryCode);

    const phoneInput = this.page.getByTestId(`phone-${order}`);
    await phoneInput.scrollIntoViewIfNeeded();
    await phoneInput.fill(phone);
  }

  async isAtBoardingPass() {
    await expect(this.page.getByText('Boarding Pass')).toBeVisible();
  }

  async verifyPassengerName(firstName: string, lastName: string) {
    await expect(this.page.getByText(`${firstName} ${lastName}`, { exact: true })).toBeVisible();
  }

  async verifyFlightNumber(flightNumber: string) {
    await expect(this.page.getByText(flightNumber)).toBeVisible();
  }

  async continue() {
    await this.page.getByRole('button', { name: 'Continue' }).click();
  }

  async back() {
    await this.page.getByRole('button', { name: 'Back' }).click();
  }
}
