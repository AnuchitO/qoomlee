import { Page, expect, BrowserContext } from '@playwright/test';
import { PassengerSelectPage } from './PassengerSelectPage';

export class CheckinPage {
  private requestPromise: Promise<any> | null = null;

  // Define the submit button getter
  private get submitButton() {
    return this.page.getByRole('button', { name: 'Retrieve Booking' });
  }

  constructor(private readonly page: Page, private context?: BrowserContext) {}

  async navigate() {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
    await expect(this.page).toHaveTitle(/Qoomlee/);
  }

  async fillCheckinForm(bookingRef: string, lastName: string) {
    // Fill in the booking reference (PNR)
    await this.page.getByLabel('Booking reference (PNR)').fill(bookingRef);

    // Fill in the last name
    await this.page.getByLabel('Last Name').fill(lastName);
  }

  async submitForm(): Promise<CheckinPage | PassengerSelectPage> {
    try {
      await this.submitButton.click();

      const isGoToPassengerSelectPage = this.page.waitForURL('**/checkin/select', { timeout: 10000 });
      const isShowErrorModal = this.page.waitForSelector('div[role="dialog"]', { state: 'visible', timeout: 5000 });

      const result = await Promise.race([
        isGoToPassengerSelectPage.then(() => 'passenger-select'),
        isShowErrorModal.then(() => 'error-modal'),
      ]);

      if (result === 'passenger-select') {
        return new PassengerSelectPage(this.page);
      }

      return this;

    } catch (error) {
      console.error('Error during form submission:', error);
      throw error;
    }
  }

  async isAtPassengerDetails() {
    await this.page.waitForURL('**/checkin/select', { timeout: 10000 });
    const currentUrl = this.page.url();
    expect(currentUrl).not.toBe('http://localhost:3000/');

    return true;
  }

  async verifyValidationError(message: string) {
    await expect(this.page.getByRole('alert')).toContainText(message, { timeout: 5000 });
  }

  async takeScreenshot(name: string) {
    const safeName = name.replace(/[^a-z0-9-]/gi, '-').toLowerCase();
    await this.page.screenshot({ path: `screenshot-${safeName}.png` });
  }
}
