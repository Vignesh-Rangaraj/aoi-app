import { test, expect } from '@playwright/test';

test('User can create an AOI from preset city search', async ({ page }) => {
  await page.goto('/');

  // Open search dropdown
  await page.getByText(/search for a city/i).click();

  // Type city
  await page.locator('input[placeholder*="city"]').fill('Cologne');

  // Select a preset
  await page.getByText(/Cologne – City Proper/i).click();

  // Toast visible
  await expect(page.getByText(/areas created/i)).toBeVisible();

  // AOI list updated
  await expect(page.getByText(/Area 1/i)).toBeVisible();
});
