import { Page } from '@playwright/test';
import { heal } from '../core/selfhealing';
import { time } from 'node:console';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/');
  }

  async login(username: string, password: string) {
    // username field (self-healing)
    const usernameInput = await heal(this.page, {
      description: 'username input',
      selectors:  [
    'input#wrong-id',
    'input.non-existent-classs',
    'div.fake-usernames'
  ]
    });
    await usernameInput.fill(username);
    //await this.page.waitForSelector('input[name="userna"]', { timeout: 1000 }); intentional selector error to trigger self-healing
    // password field (self-healing)
    const passwordInput = await heal(this.page, {
      description: 'password input',
      selectors: [
        'input[name="password"]',
        'input[placeholder="Password"]',
        'input[type="password"]'
      ]
    });
    await passwordInput.fill(password);
    // await this.page.waitForSelector('input[name="passw"]', { timeout: 1000 });(intentional selector error to trigger self-healing)

    // login button (self-healing)
    const loginButton = await heal(this.page, {
      description: 'login button',
      selectors: [
        'button[type="submit"]',
        'button.oxd-button--main',
        'button:has-text("Login")'
      ]
    });
    await loginButton.click();
  }
}
