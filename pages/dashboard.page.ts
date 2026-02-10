import { Page, expect } from '@playwright/test';

export class DashboardPage {
  constructor(private page: Page) {}

  async waitForDashboard() {
    // 1️⃣ Strongest assertion → URL
    await expect(this.page).toHaveURL(/dashboard/);

    // 2️⃣ Ensure SPA layout is mounted
    await this.page.locator('#app').waitFor({ state: 'visible' });
  }

  // Optional utility (NOT used in test assertion)
  async isDashboardVisible(): Promise<boolean> {
    return this.page.url().includes('/dashboard');
  }
}
