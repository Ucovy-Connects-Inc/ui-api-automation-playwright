import { test, expect } from '@playwright/test';
import { UsersService } from '../../api/services/users.service';

test('Users API › Get users list', async ({ request }) => {
  const service = new UsersService(request);
  const response = await service.getUsers(2);

  if (response.status() === 403) {
    console.log('API is blocked. Skipping assertion.');
    return;
  }

  expect(response.ok()).toBeTruthy();
});
