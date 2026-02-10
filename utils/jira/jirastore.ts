import fs from 'fs';
import path from 'path';

const STORE_PATH = path.resolve(__dirname, 'jirastore.json');

export type JiraStoreEntry = {
  issueKey: string;
  env: string;
  createdAt: string;
};
export function loadJiraStore(): Record<string, JiraStoreEntry> {
  if (!fs.existsSync(STORE_PATH)) {
    return {};
  }

  try {
    const raw = fs.readFileSync(STORE_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function saveJiraStore(store: Record<string, JiraStoreEntry>) {
  fs.writeFileSync(STORE_PATH, JSON.stringify(store, null, 2));
}
