import { test, expect } from '@playwright/test';
import LoginPage from '../Pages/LoginPage';
import AddtoCart from '../Pages/Addtocartpage';
import Checkout from '../Pages/Checkoutpage';
import LogoutPage from '../Pages/logoutpage';
import loginData from '../testdata/LoginData3.json';
import cartData from '../testdata/AddtoCart.json';
import checkoutData from '../testdata/smoke.json';
import logoutData from '../testdata/logout.json';

test('ST01: Critical Path Verification (Login to Order & PDF Invoice)', async ({ page }) => {
  

  const login = new LoginPage(page);
  const cart = new AddtoCart(page);
  const checkout = new Checkout(page);
  const logoutPage = new LogoutPage(page);

  const user = loginData.validUsers[0];

  await login.gotoURL();
  await login.login(user.username, user.password);

  await expect(page).toHaveURL(checkoutData.pages.inventoryUrl);
  await expect(page.locator('.title')).toHaveText(checkoutData.pages.homeTitle);

  for (const item of cartData.products) {
    await cart.addSingleItemToCart(item.buttonSelector);
  }

 
  await cart.clickCartIcon();
  await expect(page).toHaveURL(checkoutData.pages.cartUrl);

  await checkout.proceedToCheckout();
  await checkout.fillInformation(
    checkoutData.formData.firstName,
    checkoutData.formData.lastName,
    checkoutData.formData.postalCode
  );

  await checkout.finishCheckout();
  await expect(checkout.completeHeader).toHaveText(checkoutData.expectedSuccessMsg);

  
  await page.pdf({
    path: checkoutData.pdfReport.path,
    format: checkoutData.pdfReport.format,
    printBackground: checkoutData.pdfReport.printBackground
  });


  await logoutPage.logout();
  await expect(page).toHaveURL(logoutData.expectedUrl);
});