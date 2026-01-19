import { test, expect } from '@playwright/test';
import { UsersService } from '../../api/services/users.service';
import { DashboardPage } from '../../pages/dashboard.page';

test('Hybrid API + UI Flow', async ({ page, request }) => {
  const usersService = new UsersService(request);

  const apiResponse = await usersService.getUsers(2);

  console.log('API STATUS:', apiResponse.status());

  const dashboard = new DashboardPage(page);

  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');

  await dashboard.waitForDashboard();

  expect(await dashboard.isDashboardVisible()).toBeTruthy();
});
