import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import Homepage from '../pages/Homepage';
import LogoutPage from '../Pages/logoutpage';
import loginData from '../testdata/LoginData3.json';
import homeData from '../testdata/Home.json';
import logoutData from '../testdata/logout.json';

test('TC04: Home Page Verification Flow', async ({ page }) => {
  const login = new LoginPage(page);
  const home = new Homepage(page);
  const logoutPage = new LogoutPage(page);
  const user = loginData.validUsers[0];

  
  await login.gotoURL();
  await login.login(user.username, user.password);

  
  await expect(home.headerTitle).toHaveText(homeData.expectedTitle);


  await logoutPage.logout();
  await expect(page).toHaveURL(logoutData.expectedUrl);
});