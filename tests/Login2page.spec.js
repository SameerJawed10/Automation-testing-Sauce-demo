
import { test, expect } from '@playwright/test'; 
import loginData from '../testdata/LoginData.json'; 
import LoginPage from '../pages/LoginPage'; 



  test('TC01: Valid User Successful Login', async ({ page }) => { 
    const login = new LoginPage(page); 
    const data = loginData.validUsers[0]; 

    await login.gotoURL(); 
    await login.login(data.username, data.password); 
    await expect(login.headerTitle).toHaveText(data.expectedText); 
  });


  test('TC02: Login with Wrong Password', async ({ page }) => { 
    const login = new LoginPage(page); 
    const data = loginData.invalidUsers[0]; 

    await login.gotoURL(); 
    await login.login(data.username, data.password); 
    await expect(login.errorMessage).toContainText(data.expectedError); 
  });



  test('TC03: Login with Locked Out User', async ({ page }) => { 
    const login = new LoginPage(page); 
    const data = loginData.invalidUsers[1]; 

    await login.gotoURL(); 
    await login.login(data.username, data.password); 
    await expect(login.errorMessage).toContainText(data.expectedError); 
  });



  test('TC04: Login with Blank Fields', async ({ page }) => { 
    const login = new LoginPage(page); 
    const data = loginData.invalidUsers[2]; 

    await login.gotoURL(); 
    await login.login(data.username, data.password); 
    await expect(login.errorMessage).toContainText(data.expectedError); 
  });

