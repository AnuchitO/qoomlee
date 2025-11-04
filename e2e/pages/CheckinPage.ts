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

  async submitForm() {
    try {
      // Click the submit button and wait for navigation
      await Promise.all([
        this.submitButton.click(),
        this.page.waitForURL('**/checkin/select', { timeout: 10000 }),
      ]);
      
      // Return the selected passenger select page object
      return new PassengerSelectPage(this.page);
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
