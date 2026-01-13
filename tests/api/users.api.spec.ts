import { test, expect } from '@playwright/test';
import { UsersService } from '../../api/services/users.service';

test.describe('Users API', () => {

  test('Get users list', async ({ request }) => {
    const usersService = new UsersService(request);

    const response = await usersService.getUsers(2);
    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    expect(body.data.length).toBeGreaterThan(0);
  });

  test('Create new user', async ({ request }) => {
    const usersService = new UsersService(request);

    const response = await usersService.createUser('Rajesh', 'QA Engineer');
    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body.name).toBe('Rajesh');
  });

});
