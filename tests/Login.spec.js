import { test, expect } from '@playwright/test';
test('Postive 01 =Test Case 1: Valid Username and Password', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  await expect(page.locator('#header_container > div.header_secondary_container > span')).toHaveText('Products');
});

test('Postive 02 =Test Case 2: Valid Alternate User Login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'problem_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  await expect(page.locator('#header_container > div.header_secondary_container > span')).toHaveText('Products');
});

test('Negative 01 = Test Case 3: Invalid Username and Valid Password', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'sam_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match');
});

test('Negative 02 = Test Case 4: Valid Username and Invalid Password', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'Sameer_sauce');
  await page.click('#login-button');

  await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match');
});

test('Negative 03 = Test Case 5: Invalid Username and Invalid Password', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'Sameer_user');
  await page.fill('#password', 'Sameer_sauce');
  await page.click('#login-button');

  await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match');
});

test('Negative 04 = Test Case 6: Empty Username and Password', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', '');
  await page.fill('#password', '');
  await page.click('#login-button');

  await expect(page.locator('[data-test="error"]')).toContainText('Username is required');
});