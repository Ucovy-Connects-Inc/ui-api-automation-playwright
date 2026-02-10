import 'dotenv/config';
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  // 🔹 Runs once before tests (login, storageState, etc.)
  globalSetup: require.resolve('./setup/global-login.setup'),

  // 🔹 Common settings (shared across all environments)
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },

  // 🔹 Environment-specific configuration
  projects: [
    {
      name: 'DEV',
      use: {
        baseURL: 'https://dev.opensource-demo.orangehrmlive.com',
      },
    },
    {
      name: 'TEST',
      use: {
        baseURL: 'https://test.opensource-demo.orangehrmlive.com',
      },
    },
    {
      name: 'PROD',
      use: {
        baseURL: 'https://opensource-demo.orangehrmlive.com',
      },
    },
  ],
});
