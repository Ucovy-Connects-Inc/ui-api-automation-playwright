import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

type Fixtures = {
  loggedInPage: LoginPage;
};

export const test = base.extend<Fixtures>({
  loggedInPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate('https://opensource-demo.orangehrmlive.com');
    await loginPage.login('Admin', 'admin123');

    await use(loginPage);
  },
});

export { expect } from '@playwright/test';
