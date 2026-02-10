import { test as base, expect, Page } from '@playwright/test';

import {
  createJiraBug,
  addJiraComment,
  jiraIssueExists,
  getJiraIssueStatus
} from '../utils/jira/jiraservice';

import { createFingerprint } from '../utils/jira/fingerprint';
import { loadJiraStore, saveJiraStore } from '../utils/jira/jirastore';

// -----------------------------
// FIXTURE DEFINITION
// -----------------------------
export const test = base.extend<{
  loggedInPage: Page;
}>({
  loggedInPage: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: 'storageState.json',
    });

    const page = await context.newPage();
    await use(page);
    await context.close();
  },
});

// -----------------------------
// AFTER EACH TEST → JIRA LOGIC
// -----------------------------
test.afterEach(async ({}, testInfo) => {
  const jiraEnabled = process.env.ENABLE_JIRA === 'true';
  console.log('JIRA ENABLED:', process.env.ENABLE_JIRA);

  if (testInfo.status !== 'failed' || !jiraEnabled) return;

  const env = testInfo.project.name ?? 'UNKNOWN';

  try {
    // -----------------------------
    // 1️⃣ Extract & clean error info
    // -----------------------------
    let errorMessage = 'No error message';
    let errorStack = 'No stack trace';

    if (testInfo.error?.message) {
      errorMessage = stripAnsi(testInfo.error.message);
    }

    if (testInfo.error?.stack) {
      errorStack = stripAnsi(testInfo.error.stack);
    }

    // -----------------------------
    // 2️⃣ Generate fingerprint
    // -----------------------------
    const fingerprint = createFingerprint(
      testInfo.title,
      env,
      testInfo.file ?? 'unknown',
      errorMessage,
      testInfo.error?.stack
    );

    // -----------------------------
    // 3️⃣ Load Jira store
    // -----------------------------
    const jiraStore = loadJiraStore();

    // -----------------------------
    // 4️⃣ SAFE COMMENT OR RECREATE
    // -----------------------------
    if (jiraStore[fingerprint]) {
      const entry = jiraStore[fingerprint];
      const { issueKey: existingIssueKey } = entry;

      console.log('🔑 Fingerprint:', fingerprint);
      console.log('📦 JiraStore entry:', existingIssueKey);

      const exists = await jiraIssueExists(existingIssueKey);

      if (!exists) {
        console.warn(`⚠️ Jira ${existingIssueKey} does not exist. Recreating.`);
        delete jiraStore[fingerprint];
      } else {
        const status = await getJiraIssueStatus(existingIssueKey);

        if (status === 'Done' || status === 'Closed') {
          console.warn(
            `🟠 Jira ${existingIssueKey} is ${status}. Creating new ticket.`
          );
          delete jiraStore[fingerprint];
        } else {
          console.log('🟡 Adding Jira comment to:', existingIssueKey);

          await addJiraComment(
            existingIssueKey,
            `❗ Failure occurred again

Environment: ${env}
Test: ${testInfo.title}
Time: ${new Date().toISOString()}
`
          );
          return; // stop here, do not create new Jira
        }
      }
    }

    // -----------------------------
    // 5️⃣ Create new Jira bug
    // -----------------------------
    const screenshotPath = testInfo.attachments.find(
      a => a.name === 'screenshot'
    )?.path;

    const newIssueKey = await createJiraBug(
      `Automation Failure: ${testInfo.title}`,
      `
Environment: ${env}

Test Name: ${testInfo.title}
Test File: ${testInfo.file}
Status: Failed

Error:
${errorMessage}

Stack Trace:
${errorStack}
      `.trim(),
      screenshotPath
    );

    // -----------------------------
    // 6️⃣ Save fingerprint → Jira key
    // -----------------------------
    jiraStore[fingerprint] = {
      issueKey: newIssueKey,
      env,
      createdAt: new Date().toISOString(),
    };

    saveJiraStore(jiraStore);

    console.log('🟢 Jira CREATED:', newIssueKey);

  } catch (err: any) {
    console.error('❌ JIRA HARD ERROR:', err);
    throw err;
  }
});

export { expect };

// -----------------------------
// UTIL
// -----------------------------
function stripAnsi(text: string): string {
  return text.replace(/\u001b\[[0-9;]*m/g, '');
}
