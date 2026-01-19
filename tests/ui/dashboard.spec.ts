import { test, expect } from '@playwright/test';
import { DashboardPage } from '../../pages/dashboard.page';

test('Verify dashboard loads successfully', async ({ page }) => {
  const dashboard = new DashboardPage(page);

  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');

  await dashboard.waitForDashboard();

  expect(await dashboard.isDashboardVisible()).toBeTruthy();
});
