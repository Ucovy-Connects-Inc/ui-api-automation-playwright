
import { test, expect } from '@playwright/test';
import { heal } from '../core/selfhealing';

test('DOM-based healing test', async ({ page }) => {
  await page.goto('file://' + __dirname + '/dom-healing-test.html');

  // INTENTIONALLY WRONG SELECTORS
  const locator = await heal(page, {
    description: 'header-title',
    selectors: [
      'h1#wrong-id',
      'h1.non-existent-class',
      'div.wrong'
    ]
  });

  await expect(locator).toHaveText('Welcome');
});
