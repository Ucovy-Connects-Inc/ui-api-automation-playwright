import { test, expect } from '@playwright/test';
import { DashboardPage } from '../../pages/dashboard.page';

test('Verify user can access dashboard', async ({ page }) => {
  const dashboard = new DashboardPage(page);

  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');

  await dashboard.waitForDashboard();

  expect(await dashboard.isDashboardVisible()).toBeTruthy();
});
