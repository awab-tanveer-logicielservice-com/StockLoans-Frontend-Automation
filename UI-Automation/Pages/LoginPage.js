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
    const user = process.env.E2E_USER || username;
    const pwd = process.env.E2E_PWD || password;

    await this.usernameInput.click();
    await this.usernameInput.fill(user);
    await this.usernameInput.click();
    await this.passwordInput.fill(pwd);
    await this.loginButton.click();

    // Give the app a chance to navigate / initialize session; try waiting for dashboard URL but don't fail if not applicable
    try {
      await this.page.waitForURL('**/combined-contracts*', { timeout: 10000 });
    } catch (e) {
      // fallback: wait for network to be idle or a short timeout
      try {
        await this.page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch (err) {}
    }
  }
}