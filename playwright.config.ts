import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  globalSetup: require.resolve('./tests/setup/global-login.setup'),
  use: {
    baseURL: 'https://opensource-demo.orangehrmlive.com',
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
});
