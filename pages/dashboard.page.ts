import { Page, Locator } from '@playwright/test';
import { BasePage } from '../core/base.page';

export class DashboardPage extends BasePage {
  private dashboardHeader: Locator;

  constructor(page: Page) {
    super(page);
    this.dashboardHeader = page.locator('h6:has-text("Dashboard")');
  }

  async isDashboardVisible(): Promise<boolean> {
    return await this.isVisible(this.dashboardHeader);
  }
}
