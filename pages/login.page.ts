import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../core/base.page';

export class LoginPage extends BasePage {
  private usernameInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');
  }

  // ✅ Robust page-ready check
  async waitForLoginPage(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    await this.usernameInput.waitFor({ state: 'visible' });
  }

  async login(username: string, password: string) {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
  }
}
