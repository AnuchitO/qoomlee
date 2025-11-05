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

  async continue() {
    await this.page.getByRole('button', { name: /Continue/i }).click();
  }
}