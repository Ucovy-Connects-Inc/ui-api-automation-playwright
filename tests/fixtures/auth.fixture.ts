import { test as base } from '@playwright/test';
import { Page } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';

type AuthFixture = {
  authenticatedPage: Page;
};

export const test = base.extend<AuthFixture>({
  authenticatedPage: async ({ page }: { page: Page }, use: (page: Page) => Promise<void>) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate('https://opensource-demo.orangehrmlive.com/');
    await loginPage.login('Admin', 'admin123');

    await use(page);
  }
});

export { expect } from '@playwright/test';
