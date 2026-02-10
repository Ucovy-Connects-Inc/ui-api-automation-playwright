import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

type Fixtures = {
  authenticatedPage: any;
};

export const test = base.extend<Fixtures>({
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate('https://opensource-demo.orangehrmlive.com/');
    await loginPage.login('Admin', 'admin123');

    await use(page);
  },
});

export { expect } from '@playwright/test';
