import { test, expect } from '@playwright/test';
import LoginPage from '../Pages/LoginPage';
import AddtoCart from '../Pages/Addtocartpage';
import Checkout from '../Pages/Checkoutpage';
import LogoutPage from '../Pages/logoutpage';

// 📁 JSON Data Imports
import loginData from '../testdata/LoginData3.json';
import cartData from '../testdata/AddtoCart.json';
import checkoutData from '../testdata/Checkout.json';
import logoutData from '../testdata/logout.json';

test('TC03: Checkout, Finish and Save Invoice as PDF', async ({ page }) => {


  const login = new LoginPage(page);
  const cart = new AddtoCart(page);
  const checkout = new Checkout(page);
  const logoutPage = new LogoutPage(page);

  const user = loginData.validUsers[0];

  // 1. 🔐 Login
  await login.gotoURL();
  await login.login(user.username, user.password);

  // 2. 🛒 Add Multiple Products (Loop through JSON)
  for (const item of cartData.products) {
    await cart.addSingleItemToCart(item.buttonSelector);
  }

  // 3. 📄 Cart Page Verification (Driven via JSON)
  await cart.clickCartIcon();
  await expect(page).toHaveURL(checkoutData.pages.cartUrl);
  await expect(page.locator('.title')).toHaveText(checkoutData.pages.cartTitle);

  // 4. 💳 Checkout Form Filling (Driven via JSON)
  await checkout.proceedToCheckout();
  await checkout.fillInformation(
    checkoutData.formData.firstName,
    checkoutData.formData.lastName,
    checkoutData.formData.postalCode
  );

  // 5. 🎉 Finish Order
  await checkout.finishCheckout();

  // 6. 📄 Save Invoice PDF (Driven via JSON)
  await page.pdf({
    path: checkoutData.pdfReport.path,
    format: checkoutData.pdfReport.format,
    printBackground: checkoutData.pdfReport.printBackground
  });

  // 7. ✅ Success Message Assertion
  await expect(checkout.completeHeader).toHaveText(checkoutData.expectedSuccessMsg);

  // 8. 🚪 Logout
  await logoutPage.logout();
  await expect(page).toHaveURL(logoutData.expectedUrl);
});