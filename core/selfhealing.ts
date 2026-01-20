
import { loadHealedLocators, saveHealedLocator } from './locatorStore';
import { extractCandidateSelectors } from './domExtractor';

export async function heal(page, { description, selectors }: any) {
  const healed = loadHealedLocators();

  // 1. If we have a healed selector already → use it
  if (healed[description]) {
    const locator = page.locator(healed[description]);
    if (await locator.count() > 0) return locator;
  }

  // 2. Try the provided selectors
  for (const selector of selectors) {
    const locator = page.locator(selector);
    if (await locator.count() > 0) {
      saveHealedLocator(description, selector);
      return locator;
    }
  }

  // 3. DOM-based dynamic healing
  console.log(`🔍 Attempting DOM-based healing for: ${description}`);

  const allCandidates = await page.locator('*').elementHandles();

  for (const element of allCandidates) {
    const candidates = await extractCandidateSelectors(element);

    for (const css of candidates) {
      const locator = page.locator(css);

      if (await locator.count() > 0) {
        console.log(`💡 Healed using DOM selector: ${css}`);
        saveHealedLocator(description, css);
        return locator;
      }
    }
  }

  // 4. Take screenshot + error
  const screenshotPath = `test-results/self-healing/${Date.now()}.png`;
  await page.screenshot({ path: screenshotPath });

  throw new Error(`Self-healing failed for ${description}. Screenshot: ${screenshotPath}`);
}
