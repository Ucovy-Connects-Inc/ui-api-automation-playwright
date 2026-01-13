import { Page, Locator } from '@playwright/test';

export class DashboardPage {
  private page: Page;
  private dashboardHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dashboardHeader = page.locator('h6:has-text("Dashboard")');
  }

  async verifyDashboardVisible() {
    await this.dashboardHeader.waitFor({ state: 'visible' });
  }
}
