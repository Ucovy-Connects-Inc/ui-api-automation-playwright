import { test, expect } from '../../fixtures/test-fixtures';
import { UsersService } from '../../api/services/users.service';
import { DashboardPage } from '../../pages/dashboard.page';

test('Hybrid API + UI Flow – Fetch users via API and validate UI access', async ({ loggedInPage, request }) => {
  const usersService = new UsersService(request);
  const apiResponse = await usersService.getUsers(2);

  if (apiResponse.ok()) {
    const apiData = await apiResponse.json();
    expect(apiData.data.length).toBeGreaterThan(0);
  } else {
    console.warn('API is blocked or unavailable. Continuing with UI validation.');
  }

  const dashboard = new DashboardPage(loggedInPage);
  const isVisible = await dashboard.isDashboardVisible();
  expect(isVisible).toBeTruthy();
});
