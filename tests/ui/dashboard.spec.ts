import { test, expect } from '../../fixtures/test-fixtures';
import { DashboardPage } from '../../pages/dashboard.page';

test('Verify user lands on dashboard after login', async ({ loggedInPage }) => {
  const dashboard = new DashboardPage(loggedInPage);
  const isVisible = await dashboard.isDashboardVisible();
  expect(isVisible).toBeTruthy();
});
