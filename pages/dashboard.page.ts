
import { Page, expect } from '@playwright/test';
import { heal } from '../core/selfhealing';

export class DashboardPage {
  constructor(private page: Page) {}

  async waitForDashboard() {
    const header = await heal(this.page, {
      description: 'dashboard header',
      selectors: [
        // Primary selector for modern OrangeHRM
        'span.oxd-topbar-header-breadcrumb-level',

        // Additional fallbacks
        'h6.oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module',
        'h6:has-text("Dashboard")',
        'text=Dashboard',

        // XPath fallbacks
        '//span[contains(text(), "Dashboard")]',
        '//h6[contains(text(), "Dashboard")]'
      ]
    });

    await expect(header).toBeVisible({ timeout: 15000 });
  }

  async isDashboardVisible() {
    return this.page
      .locator('span.oxd-topbar-header-breadcrumb-level')
      .isVisible();
  }
}
