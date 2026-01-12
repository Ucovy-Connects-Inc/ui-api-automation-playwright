import { test, expect } from '@playwright/test';
import { UsersService } from '../../api/services/users.service';

test.describe('Users API', () => {

  test('Get users list', async () => {
    const usersService = new UsersService();
    await usersService.init();

    const response = await usersService.getUsers();
    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    expect(body.length).toBeGreaterThan(0);
  });

  test('Create new user', async () => {
    const usersService = new UsersService();
    await usersService.init();

    const response = await usersService.createUser('Rajesh', 'QA Engineer');
    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body.name).toBe('Rajesh');
    expect(body.job).toBe('QA Engineer');
    expect(body.id).toBeDefined();
  });

});
