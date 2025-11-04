import { Page, expect, BrowserContext } from '@playwright/test';

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
        this.page.waitForURL('**/checkin/select', { timeout: 10000 }),
        this.submitButton.click()
      ]);
      
      // Return the current URL after navigation
      return this.page.url();
    } catch (error) {
      console.error('Error during form submission:', error);
      // Take a screenshot on error
      await this.takeScreenshot('form-submission-error');
      throw error;
    }
  }

  async isAtPassengerDetails() {
    // Wait for the page to navigate to the next step
    // Check if we're on the expected URL pattern
    await this.page.waitForURL('**/checkin/select', { timeout: 10000 });
    
    // Verify we're not on the home page anymore
    const currentUrl = this.page.url();
    expect(currentUrl).not.toBe('http://localhost:3000/');
    
    // Take a screenshot for debugging
    await this.takeScreenshot('after-navigation');
    
    // Return true if we've reached this point without errors
    return true;
  }

  async verifyValidationError(message: string) {
    // Look for the error message in the alert div
    await expect(this.page.getByRole('alert')).toContainText(message, { timeout: 5000 });
  }

  async takeScreenshot(name: string) {
    const safeName = name.replace(/[^a-z0-9-]/gi, '-').toLowerCase();
    await this.page.screenshot({ path: `screenshot-${safeName}.png` });
  }
}
