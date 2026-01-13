import { test as base, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

type Fixtures = {
  authenticatedPage: Page;
};

export const test = base.extend<Fixtures>({
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate('https://opensource-demo.orangehrmlive.com/');
    await loginPage.login('Admin', 'admin123');

    await use(page);
  },
});

export { expect };
