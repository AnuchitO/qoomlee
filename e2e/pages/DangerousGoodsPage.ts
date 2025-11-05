import { Page, expect } from '@playwright/test';

export class DangerousGoodsPage {
  constructor(private readonly page: Page) {}

  async acceptAndContinue() {
    await this.page.getByRole('button', { name: 'Accept & Continue' }).click();
  }

  async back() {
    await this.page.getByRole('button', { name: 'Back' }).click();
  }
}