import { test, expect } from '@playwright/test';

test('User can hide, show, and delete AOIs', async ({ page }) => {
  await page.goto('/');

  // Create AOI via preset
  await page.getByText(/search for a city/i).click();
  await page.locator('input').fill('Cologne');
  await page.getByText(/City Proper/i).first().click();

  // Find AOI row container
  const areaRow = page.getByText('Area 1').locator('xpath=ancestor::div[contains(@class, "flex")]').first();
  await expect(areaRow).toBeVisible();

  // Eye and delete buttons (by position, not title)
  const eyeButton = areaRow.locator('button').nth(0);
  const deleteButton = areaRow.locator('button').nth(1);

  const polygon = page.locator('.leaflet-interactive');

  // Polygon exists initially
  await expect(polygon).toHaveCount(1);

  // --- Hide ---
  await eyeButton.click();
  await expect(polygon).toHaveCount(0);

  // --- Show ---
  await eyeButton.click();
  await expect(polygon).toHaveCount(1);

  // --- Delete AOI ---
  await deleteButton.click();
  await expect(page.getByText('Area 1')).toHaveCount(0);
});
