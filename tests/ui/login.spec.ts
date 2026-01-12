import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';

test('Verify user can login successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate('https://opensource-demo.orangehrmlive.com/');

  // ✅ Wait instead of boolean check
  await loginPage.waitForLoginPage();

  await loginPage.login('Admin', 'admin123');

  await expect(page.locator('h6:has-text("Dashboard")')).toBeVisible();
});
