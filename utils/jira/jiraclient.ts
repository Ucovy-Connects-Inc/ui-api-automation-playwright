import axios from 'axios';

export const jiraClient = axios.create({
  baseURL: process.env.JIRA_BASE_URL,
   timeout: 10000, 
  auth: {
    username: process.env.JIRA_EMAIL!,
    password: process.env.JIRA_API_TOKEN!,
  },
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});
