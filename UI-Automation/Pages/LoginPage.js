import { ENV } from '../Config/env.js';
import { LOCATORS } from '../utils/locators.js';

export class LoginPage {
  page;
  usernameInput;
  passwordInput;
  loginButton;

  constructor(page) {
    this.page = page;
    this.usernameInput = LOCATORS.LoginPage.usernameInput(page);
    this.passwordInput = LOCATORS.LoginPage.passwordInput(page);
    this.loginButton = LOCATORS.LoginPage.loginButton(page);
  }

  async navigate() {
    await this.page.goto(ENV.baseURL);
  }

  async login(username, password) {
    
    await this.usernameInput.click();
    await this.usernameInput.fill(username);
    await this.usernameInput.click();
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}