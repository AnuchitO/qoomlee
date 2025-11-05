import { Page, expect, BrowserContext } from '@playwright/test';
import { PassengerSelectPage } from './PassengerSelectPage';

export class CheckinPage {
  constructor(private readonly page: Page, private context?: BrowserContext) {}

  private get submitButton() {
    return this.page.getByRole('button', { name: 'Retrieve Booking' });
  }

  private get lastNameInput() {
    return this.page.getByLabel('Last Name');
  }

  private get bookingRefInput() {
    return this.page.getByLabel('Booking reference (PNR)');
  }

  private get errorModal() {
    return this.page.getByRole('dialog');
  }


  async navigate() {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
    await expect(this.page).toHaveTitle(/Qoomlee/);
  }

  async fillCheckinForm(bookingRef: string, lastName: string) {
    await this.lastNameInput.fill(lastName);
    await this.bookingRefInput.fill(bookingRef);
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
}
