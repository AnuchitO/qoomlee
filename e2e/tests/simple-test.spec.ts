import { test, expect } from '@playwright/test';

test('simple test to verify test runner', async ({ page }) => {
  console.log('Simple test running...');
  expect(1).toBe(1);
  console.log('Test completed successfully');
});