import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';

type MyFixtures = {
  loggedInPage: any;
};

export const test = base.extend<MyFixtures>({
  loggedInPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate('https://opensource-demo.orangehrmlive.com/');
    await loginPage.login('Admin', 'admin123');

    const dashboard = new DashboardPage(page);
    await dashboard.waitForDashboard();

    await use(page);
  },
});

export { expect } from '@playwright/test';
