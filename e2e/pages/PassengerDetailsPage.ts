import { Page, expect } from '@playwright/test';

export class PassengerDetailsPage {
  constructor(private readonly page: Page) {}

  private nationality(order: number) {
    return this.page.getByTestId(`nationality-${order}`);
  }

  private countryCode(order: number) {
    return this.page.getByTestId(`countryCode-${order}`);
  }

  private phone(order: number) {
    return this.page.getByTestId(`phone-${order}`);
  }

  async fillPassengerDetails(order: number, phone: string, countryCode: string, nationality: string) {
    const nationalityInput = this.nationality(order);
    await nationalityInput.scrollIntoViewIfNeeded();
    await nationalityInput.fill(nationality);

    const countryCodeSelect = this.countryCode(order);
    await countryCodeSelect.scrollIntoViewIfNeeded();
    await countryCodeSelect.selectOption(countryCode);

    const phoneInput = this.phone(order);
    await phoneInput.scrollIntoViewIfNeeded();
    await phoneInput.fill(phone);
  }

  async continue() {
    await this.page.getByRole('button', { name: /Continue/i }).click();
  }
}