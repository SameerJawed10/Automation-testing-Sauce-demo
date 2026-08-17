import { test, expect } from '@playwright/test';
import LoginPage from '../Pages/LoginPage';
import AddtoCart from '../Pages/Addtocartpage';
import LogoutPage from '../Pages/logoutpage';
import loginData from '../testdata/LoginData3.json';
import cartData from '../testdata/AddtoCart.json';
import logoutData from '../testdata/logout.json';

test('TC 02: Add Multiple Products with Detailed JSON Objects using Loop', async ({ page }) => {
  const login = new LoginPage(page);
  const cart = new AddtoCart(page);
  const logoutPage = new LogoutPage(page);
  const user = loginData.validUsers[0];

  await login.gotoURL();
  await login.login(user.username, user.password);

  await cart.addMultipleItemsToCart(cartData.products);

  
  const expectedCount = cartData.products.length.toString();
  await expect(cart.cartBadge).toHaveText(expectedCount);


  await logoutPage.logout();
  await expect(page).toHaveURL(logoutData.expectedUrl);
});