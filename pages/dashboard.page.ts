import { Page, Locator } from '@playwright/test';

export class DashboardPage {
  private page: Page;
  private dashboardHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dashboardHeader = page.locator('h6:has-text("Dashboard")');
  }

  async waitForDashboard() {
    await this.dashboardHeader.waitFor({ state: 'visible' });
  }

  async isDashboardVisible(): Promise<boolean> {
    return await this.dashboardHeader.isVisible();
  }
}
