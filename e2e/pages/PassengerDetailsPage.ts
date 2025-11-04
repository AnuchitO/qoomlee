import { Page, expect } from '@playwright/test';

export class PassengerDetailsPage {
  constructor(private readonly page: Page) {}

  async fillPassengerDetails(phone: string, countryCode: string, nationality: string) {
    // Fill phone number
    await this.page.getByLabel('Phone Number*').fill(phone);
    
    // Select country code if the dropdown exists
    const countryCodeSelect = this.page.locator('select[name="countryCode"]');
    if (await countryCodeSelect.count() > 0) {
      await countryCodeSelect.selectOption(countryCode);
    }

    // Select nationality if the dropdown exists
    const nationalitySelect = this.page.locator('select[name="nationality"]');
    if (await nationalitySelect.count() > 0) {
      await nationalitySelect.selectOption(nationality);
    }

    // Submit the form
    await this.page.getByRole('button', { name: /Continue to Boarding Pass/i }).click();
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
}
