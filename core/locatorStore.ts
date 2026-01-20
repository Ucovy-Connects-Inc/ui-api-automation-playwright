
import fs from 'fs';
import path from 'path';

const storePath = path.join(__dirname, 'healed-locators.json');

export function loadHealedLocators() {
  if (!fs.existsSync(storePath)) return {};
  return JSON.parse(fs.readFileSync(storePath, 'utf-8'));
}

export function saveHealedLocator(key: string, selector: string) {
  const content = loadHealedLocators();
  content[key] = selector;
  fs.writeFileSync(storePath, JSON.stringify(content, null, 2));
}
