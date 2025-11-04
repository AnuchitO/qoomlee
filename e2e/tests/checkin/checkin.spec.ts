import { test, expect } from '@playwright/test';
import { CheckinPage } from '../../pages/CheckinPage';
import { TestData } from '../../fixtures/test-data';

test.describe('Check-in Journey', () => {
  test('check-in form submission', async ({ page }) => {
    const checkinPage = new CheckinPage(page);
    const { booking } = TestData;

    // Step 1: Navigate to check-in page
    await test.step('Navigate to check-in page', async () => {
      await checkinPage.navigate();
      await checkinPage.takeScreenshot('initial page load');
    });

    // Step 2: Verify form elements are present
    await test.step('Verify form elements', async () => {
      // Verify input fields are present
      await expect(page.getByLabel('Booking reference (PNR)')).toBeVisible();
      await expect(page.getByLabel('Last Name')).toBeVisible();
      
      // Verify submit button is present and initially disabled
      const submitButton = page.getByRole('button', { name: /Retrieve Booking/i });
      await expect(submitButton).toBeVisible();
      await expect(submitButton).toBeDisabled();
      
      await checkinPage.takeScreenshot('form elements verified');
    });

    // Step 3: Test form validation
    await test.step('Test form validation', async () => {
      // Fill only one field
      await checkinPage.fillCheckinForm('', booking.lastName);
      await expect(page.getByRole('button', { name: /Retrieve Booking/i })).toBeDisabled();
      
      // Fill the other field
      await checkinPage.fillCheckinForm(booking.ref, '');
      await expect(page.getByRole('button', { name: /Retrieve Booking/i })).toBeDisabled();
      
      // Fill both fields with invalid data
      await checkinPage.fillCheckinForm('ABC', 'T');
      await expect(page.getByRole('button', { name: /Retrieve Booking/i })).toBeDisabled();
      
      // Fill with valid data
      await checkinPage.fillCheckinForm(booking.ref, booking.lastName);
      await expect(page.getByRole('button', { name: /Retrieve Booking/i })).toBeEnabled();
      
      await checkinPage.takeScreenshot('form validation passed');
    });

    // Step 4: Submit the form
    await test.step('Submit the form', async () => {
      console.log('Submitting form with booking reference:', booking.ref);
      
      try {
        const result = await checkinPage.submitForm();
        console.log('Form submission result:', result);
        
        // Take a screenshot after submission
        await checkinPage.takeScreenshot('after form submission');
        
        // Log the current URL for debugging
        const currentUrl = page.url();
        console.log('Current URL after submission:', currentUrl);
        
        // Verify we're not on the home page anymore
        expect(currentUrl).not.toBe('http://localhost:3000/');
      } catch (error) {
        console.error('Form submission error:', error);
        await checkinPage.takeScreenshot('form submission error');
        throw error;
      }
    });
  });

  // This test will be implemented once we have the basic flow working
  test.skip('invalid booking reference shows error', async ({ page }) => {
    // Will be implemented later
  });
});
