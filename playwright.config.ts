import { defineConfig } from '@playwright/test';

export default defineConfig({
  globalSetup: require.resolve('./tests/setup/global-login.setup'),

  projects: [
    {
      name: 'chromium',
      use: { storageState: 'storage/auth.json' },
    },
    {
      name: 'firefox',
      use: { storageState: 'storage/auth.json' },
    },
    {
      name: 'webkit',
      use: { storageState: 'storage/auth.json' },
    },
  ],
});
