import { Page, Locator } from '@playwright/test';

type FallbackLocator = {
  description: string;
  build: () => Locator;
};

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url: string) {
    await this.page.goto(url);
  }

  async click(locator: Locator, fallbacks?: FallbackLocator[]) {
    const healed = await this.getHealedLocator(locator, fallbacks);
    await healed.click();
  }

  async fill(locator: Locator, value: string, fallbacks?: FallbackLocator[]) {
    const healed = await this.getHealedLocator(locator, fallbacks);
    await healed.fill(value);
  }

  async isVisible(locator: Locator, fallbacks?: FallbackLocator[]) {
    const healed = await this.getHealedLocator(locator, fallbacks);
    return await healed.isVisible();
  }

  // 🧠 Self-healing logic
  protected async getHealedLocator(
    primary: Locator,
    fallbacks: FallbackLocator[] = []
  ): Promise<Locator> {
    try {
      if (await primary.count()) {
        return primary;
      }
    } catch (e) {
      console.warn('Primary locator failed. Trying fallbacks...');
    }

    for (const fb of fallbacks) {
      try {
        const candidate = fb.build();
        if (await candidate.count()) {
          console.warn(`Recovered using fallback: ${fb.description}`);
          return candidate;
        }
      } catch {
        continue;
      }
    }

    throw new Error('All locators failed. Self-healing could not recover.');
  }
}
