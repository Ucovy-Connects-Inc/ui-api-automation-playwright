import { chromium } from '@playwright/test';

async function globalLogin() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://opensource-demo.orangehrmlive.com/');

  await page.fill('input[name="username"]', 'Admin');
  await page.fill('input[name="password"]', 'admin123');
  await page.click('button[type="submit"]');

  await page.waitForURL('**/dashboard/**');

  await context.storageState({ path: 'storage/auth.json' });

  await browser.close();
}

export default globalLogin;
