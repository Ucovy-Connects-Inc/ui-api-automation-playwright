// core/selfhealing.ts
import { Page, Locator } from '@playwright/test';

export async function healLocator(page: Page, selector: string): Promise<Locator> {
  let locator = page.locator(selector);

  if (await locator.count() > 0) {
    return locator;
  }

  console.log(`⚠️ Locator failed. Trying self-heal for: ${selector}`);

  // Fallback using visible text
  const textMatch = selector.match(/text\(\"(.+?)\"\)/);

  if (textMatch) {
    const text = textMatch[1];
    locator = page.getByText(text);
    if (await locator.count() > 0) return locator;
  }

  // Fallback using role
  const roleMatch = selector.match(/role=\"(.+?)\"/);
  if (roleMatch) {
    const role = roleMatch[1];
    locator = page.getByRole(role as any);
    if (await locator.count() > 0) return locator;
  }

  console.log(`❌ Self-heal failed. Using original selector.`);
  return page.locator(selector);
}
