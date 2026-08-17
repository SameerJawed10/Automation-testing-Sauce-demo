class LoginPage { 

  constructor(page) { 
    this.page = page; 

    
    this.usernameInput = page.locator('#user-name'); 
    this.passwordInput = page.locator('#password'); 
    this.loginButton = page.locator('#login-button'); 
    this.headerTitle = page.locator('#header_container > div.header_secondary_container > span'); 

    this.errorMessage = page.locator('[data-test="error"]'); 
  } 


  async gotoURL() { 
    await this.page.goto('https://www.saucedemo.com/'); 
  } 

  async login(username, password) { 
    await this.usernameInput.fill(username); 
    await this.passwordInput.fill(password); 
    await this.loginButton.click(); 
  } 

} 

export default LoginPage;