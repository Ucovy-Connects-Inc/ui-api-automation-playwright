import { Page, Locator } from '@playwright/test';
import { loadHealedLocators, saveHealedLocator } from './locatorStore';
import { extractCandidateSelectors } from './domExtractor';

type HealOptions = {
  description: string;
  selectors: string[];
};

export async function heal(
  page: Page,
  { description, selectors }: HealOptions
): Promise<Locator> {
  console.log(`🧠 SELF-HEALING STARTED for: "${description}"`);

  const healedLocators = loadHealedLocators();

  // 1️⃣ Use previously healed selector (if exists)
  if (healedLocators[description]) {
    const locator = page.locator(healedLocators[description]);
    if (await locator.count() > 0) {
      console.log(`♻️ Using stored healed selector: ${healedLocators[description]}`);
      return locator;
    }
  }

  // 2️⃣ Try fallback selectors (fast & preferred)
  console.log('🔁 Trying fallback selectors...');
  for (const selector of selectors) {
    const locator = page.locator(selector);
    if (await locator.count() > 0) {
      console.log(`✅ Fallback worked: ${selector}`);
      saveHealedLocator(description, selector);
      return locator;
    }
    console.log(`❌ Fallback failed: ${selector}`);
  }

  // 3️⃣ DOM-based healing (LAST RESORT)
  console.log('🚨 All fallbacks failed → Starting DOM-based healing');

  // 🔥 CRITICAL: wait for interactive elements to EXIST
  await page.waitForSelector(
    'input:not([type="hidden"]), textarea, button, select, [role="button"]',
    { timeout: 5000 }
  );

  const candidates = await page
    .locator('input:not([type="hidden"]), textarea, button, select, [role="button"]')
    .elementHandles();

  console.log(`🔍 Found ${candidates.length} DOM candidates`);

  for (const element of candidates) {
    const selectorsFromDom = await extractCandidateSelectors(element);
    console.log(`🧩 Candidate selectors:`, selectorsFromDom);

    for (const selector of selectorsFromDom) {
      const locator = page.locator(selector);

      if (await locator.count() > 0) {
        const tagName = await locator.evaluate(el => el.tagName.toLowerCase());

        // ❌ SAFETY GUARD: never heal to containers
        if (['div', 'span', 'section', 'main'].includes(tagName)) {
          continue;
        }

        console.log(`💡 DOM HEALING SUCCESS using selector: ${selector}`);
        saveHealedLocator(description, selector);
        return locator;
      }
    }
  }

  throw new Error(`❌ Self-healing failed for "${description}"`);
}
