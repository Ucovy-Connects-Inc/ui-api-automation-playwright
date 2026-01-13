import { Page, Locator } from '@playwright/test';
import { BasePage } from '../core/base.page';

export class AdminPage extends BasePage {
  private adminMenu: Locator;
  private searchInput: Locator;
  private searchButton: Locator;
  private resultRow: Locator;

  constructor(page: Page) {
    super(page);
    this.adminMenu = page.locator('a:has-text("Admin")');
    this.searchInput = page.locator('input[placeholder="Search"]');
    this.searchButton = page.locator('button:has-text("Search")');
    this.resultRow = page.locator('.oxd-table-body');
  }

  async navigateToAdmin() {
    await this.click(this.adminMenu);
  }

  async searchUser(username: string) {
    await this.fill(this.searchInput, username);
    await this.click(this.searchButton);
  }

  async isUserPresent(username: string): Promise<boolean> {
    return await this.resultRow.locator(`text=${username}`).isVisible();
  }
}
