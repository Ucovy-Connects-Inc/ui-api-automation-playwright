import { Page, Locator } from '@playwright/test';

type HealingStrategy = {
  description: string;
  build: () => Locator;
};

export class SelfHealing {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async locate(
    primary: Locator,
    fallbacks: HealingStrategy[],
    timeout: number = 3000
  ): Promise<Locator> {
    try {
      await primary.first().waitFor({ state: 'visible', timeout });
      return primary;
    } catch {
      console.warn('⚠ primary locator failed, trying self-healing...');
    }

    for (const strategy of fallbacks) {
      try {
        const candidate = strategy.build();
        await candidate.first().waitFor({ state: 'visible', timeout });
        console.warn(`✅ healed using: ${strategy.description}`);
        return candidate;
      } catch {
        console.warn(`failed: ${strategy.description}`);
      }
    }

    throw new Error('self-healing failed: no valid locator found');
  }
}
