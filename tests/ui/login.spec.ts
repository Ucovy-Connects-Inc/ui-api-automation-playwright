import { test, expect } from '../../core/base.page';
import { LoginPage } from '../../pages/login.page';
import { DashboardPage } from '../../pages/dashboard.page';

test('Login UI works (self-healing enabled)', async ({ page }) => {
  const login = new LoginPage(page);

  // 1️⃣ Go to login page
  await login.goto();

  // 2️⃣ Perform login (THIS triggers self-healing)
  await login.login('Admin', 'admin123');

  // 3️⃣ Verify dashboard loaded (post-login proof)
  const dashboard = new DashboardPage(page);
  await dashboard.waitForDashboard();

  // 4️⃣ Final assertion (URL check)
await page.waitForLoadState('networkidle');
await expect(page).toHaveURL(/wrong/);//wrong assertion for testing JIRA integration
//await expect(page).toHaveURL(/dashboard/);//correct code

});
