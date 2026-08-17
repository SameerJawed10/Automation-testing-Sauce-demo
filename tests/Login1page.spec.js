import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import loginData from '../testdata/LoginData3.json';

test('TC 01: Valid User Login', async ({ page }) => {
  const login = new LoginPage(page);
  const data = loginData.validUsers[0];

  await login.gotoURL();
  await login.login(data.username, data.password);
  await expect(login.headerTitle).toHaveText(data.expectedText);
});