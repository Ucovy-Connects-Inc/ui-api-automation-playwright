
import { test, expect } from '@playwright/test';

test('Debug login manually', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com');

  await page.fill('input[name="username"]', 'Admin');
  await page.fill('input[name="password"]', 'admin123');
  await page.click('button[type="submit"]');

  await page.waitForTimeout(2000);

  await page.screenshot({ path: 'debug-login.png' });

  console.log('URL:', page.url());
});
