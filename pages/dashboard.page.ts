import { BasePage } from '../core/base.page';

export class DashboardPage extends BasePage {

  dashboardMenu = this.page.locator('a.oxd-main-menu-item:has-text("Dashboard")');

  async waitForDashboard() {
    await this.dashboardMenu.waitFor({ state: 'visible' });
  }

  async isDashboardVisible() {
    return await this.dashboardMenu.isVisible();
  }
}
