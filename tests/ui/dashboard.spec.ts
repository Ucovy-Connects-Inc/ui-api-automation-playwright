import { test, expect } from '../../fixtures/auth.fixture';
import { DashboardPage } from '../../pages/dashboard.page';

test('Verify user lands on dashboard after login', async ({ authenticatedPage }) => {
  const dashboard = new DashboardPage(authenticatedPage);
  await dashboard.verifyDashboardVisible();
});
