import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test('Whole working EndToEnd', async ({ page }) => {

  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await expect(page.locator('#header_container > div.header_secondary_container > span')).toHaveText('Products');
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

  // 4. Add at least TWO products to the shopping cart
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
  await expect(page.locator('#shopping_cart_container > a > span')).toHaveText('2');

  // 5. Open the cart
  await page.click('.shopping_cart_link');
  await expect(page.locator('.title')).toHaveText('Your Cart');

  // 6. Verify the selected products
  await expect(page.locator('.cart_item')).toHaveCount(2);
  await expect(page.locator('[data-test="item-4-title-link"]')).toHaveText('Sauce Labs Backpack');
  await expect(page.locator('[data-test="item-0-title-link"]')).toHaveText('Sauce Labs Bike Light');

  // 7. Proceed to Checkout
  await page.click('[data-test="checkout"]');
  await expect(page.locator('.title')).toHaveText('Checkout: Your Information');

  // 8. Enter customer information
  await page.fill('[data-test="firstName"]', 'Sameer');
  await page.fill('[data-test="lastName"]', 'Jawaid');
  await page.fill('[data-test="postalCode"]', '12345');

  // 9. Continue to the Checkout Overview page
  await page.click('[data-test="continue"]');
  await expect(page.locator('.title')).toHaveText('Checkout: Overview');

  // 10. Verify product details and total amount
  await expect(page.locator('.cart_item')).toHaveCount(2);
  await expect(page.locator('.summary_total_label')).toBeVisible();

  // 11. Complete the purchase
  await page.click('[data-test="finish"]');

  // 12. Verify the successful order confirmation message
  await expect(page.locator('.title')).toHaveText('Checkout: Complete!');
  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');

  // PDF Generation Setup & Verification
  const pdfFileName = 'Order_Confirmation_Sameer.pdf';
  const pdfPath = path.join(process.cwd(), pdfFileName);

  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true
  });

  expect(fs.existsSync(pdfPath)).toBeTruthy();

  console.log('--- PLAYWRIGHT PDF DOWNLOAD VERIFICATION ---');
  console.log('PDF Saved Path:', pdfPath);
  console.log('Is File Downloaded/Created?:', fs.existsSync(pdfPath));
  console.log('-------------------------------------------');

  // 13. Return to the Products page
  await page.click('[data-test="back-to-products"]');
  await expect(page.locator('.title')).toHaveText('Products');

  // 14. Logout from the application
  await page.click('#react-burger-menu-btn');
  await page.click('#logout_sidebar_link');
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});