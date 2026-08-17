import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import LogoutPage from '../Pages/logoutpage';
import logoutData from '../testdata/logout.json';
import loginData from '../testdata/LoginData3.json';

test('TC05: Successful Logout', async ({ page }) => {
  const login = new LoginPage(page);
  const logoutPage = new LogoutPage(page);

  await login.gotoURL();
  await login.login(loginData.validUsers[0].username, loginData.validUsers[0].password);

  await logoutPage.logout();
  await expect(page).toHaveURL(logoutData.expectedUrl);
});