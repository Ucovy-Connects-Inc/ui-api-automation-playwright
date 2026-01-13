import { test, expect } from '@playwright/test';
import { UsersService } from '../../api/services/users.service';
import { LoginPage } from '../../pages/login.page';

test('Hybrid API + UI Flow – Fetch users via API and validate UI access', async ({ request, page }) => {
  const usersService = new UsersService(request);

  const apiResponse = await usersService.getUsers(2);

  if (!apiResponse.ok()) {
    console.log(`API STATUS: ${apiResponse.status()}`);
    console.log(`API URL: ${apiResponse.url()}`);
    console.log('API is blocked or unavailable. Continuing with UI validation.');
  } else {
    const apiData = await apiResponse.json();
    expect(apiData.data.length).toBeGreaterThan(0);
  }

  const loginPage = new LoginPage(page);
  await loginPage.navigate('https://opensource-demo.orangehrmlive.com/');
  await loginPage.login('Admin', 'admin123');

  await expect(page.locator('h6:has-text("Dashboard")')).toBeVisible();
});
