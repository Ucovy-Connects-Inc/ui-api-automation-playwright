import fs from 'fs';
import FormData from 'form-data';
import { jiraClient } from './jiraclient';

/**
 * Creates a Jira Bug and optionally attaches a screenshot
 */
export async function createJiraBug(
  title: string,
  description: string,
  screenshotPath?: string
): Promise<string> {
  // 1️⃣ Create Jira issue
  const response = await jiraClient.post('/rest/api/3/issue', {
    fields: {
      project: {
        key: process.env.JIRA_PROJECT_KEY,
      },
      summary: title,
      issuetype: {
        name: 'Bug',
      },
      description: {
        type: 'doc',
        version: 1,
        content: [
          {
            type: 'paragraph',
            content: [{ type: 'text', text: description }],
          },
        ],
      },
    },
  });

  const issueKey = response.data.key;

  // 2️⃣ Attach screenshot if available
  if (screenshotPath && fs.existsSync(screenshotPath)) {
    const form = new FormData();
    form.append('file', fs.createReadStream(screenshotPath));

    await jiraClient.post(
      `/rest/api/3/issue/${issueKey}/attachments`,
      form,
      {
        headers: {
          ...form.getHeaders(),
          'X-Atlassian-Token': 'no-check',
        },
      }
    );
  }

  // 3️⃣ Return Jira issue key (used for fingerprint store)
  return issueKey;
}

/**
 * Adds a comment to an existing Jira issue
 */
export async function addJiraComment(
  issueKey: string,
  comment: string
) {
  await jiraClient.post(
    `/rest/api/3/issue/${issueKey}/comment`,
    {
      body: {
        type: 'doc',
        version: 1,
        content: [
          {
            type: 'paragraph',
            content: [{ type: 'text', text: comment }],
          },
        ],
      },
    }
  );
}
export async function jiraIssueExists(issueKey: string): Promise<boolean> {
  try {
    await jiraClient.get(`/rest/api/3/issue/${issueKey}`);
    return true;
  } catch {
    return false;
  }
}

export async function getJiraIssueStatus(issueKey: string): Promise<string> {
  const res = await jiraClient.get(`/rest/api/3/issue/${issueKey}`);
  return res.data.fields.status.name; // e.g. "To Do", "In Progress", "Done"
}

