
import { test, expect } from '../../core/base.page';
import { DashboardPage } from '../../pages/dashboard.page';

test('Verify user can access dashboard', async ({ loggedInPage }) => {
  // Load the page using the saved login session
  await loggedInPage.goto('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');

  const dashboard = new DashboardPage(loggedInPage);
  
  //await expect(loggedInPage).toHaveTitle('Wrong Title');//intentional failure to test JIRA integration
  await expect(loggedInPage).toHaveTitle('OrangeHRM'); //correct code
});
