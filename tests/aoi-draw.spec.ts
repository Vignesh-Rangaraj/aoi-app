import { test, expect } from '@playwright/test';

test('User can draw an AOI on the map', async ({ page }) => {
  await page.goto('/');

  // Activate drawing mode (use exact button role)
  await page.getByRole('button', { name: 'Or click to draw area on map' }).click();

  const map = page.locator('.leaflet-container');

  // Add 3 vertices
  await map.click({ position: { x: 350, y: 250 } });
  await map.click({ position: { x: 500, y: 300 } });
  await map.click({ position: { x: 450, y: 450 } });

  // Finish with double click
  await map.dblclick({ position: { x: 450, y: 450 } });

  // Toast should appear
  await expect(page.getByText(/areas created/i)).toBeVisible();

  // AOI list updated
  await expect(page.getByText(/Area 1/i)).toBeVisible();
});
