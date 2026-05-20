import { ENV } from '../Config/env.js';
import { LOCATORS } from '../utils/locators.js';
import { expect } from '@playwright/test';

export class LoginPage {
  page;
  usernameInput;
  passwordInput;
  loginButton;
  logoElement;
  passwordToggleButton;
  errorMessage;
  emailValidationError;
  passwordValidationError;

  constructor(page) {
    this.page = page;
    this.usernameInput = LOCATORS.LoginPage.usernameInput(page);
    this.passwordInput = LOCATORS.LoginPage.passwordInput(page);
    this.loginButton = LOCATORS.LoginPage.loginButton(page);
    this.logoElement = LOCATORS.LoginPage.logoElement(page);
    this.passwordToggleButton = LOCATORS.LoginPage.passwordToggleButton(page);
    this.errorMessage = LOCATORS.LoginPage.errorMessage(page);
    this.emailValidationError = LOCATORS.LoginPage.emailValidationError(page);
    this.passwordValidationError = LOCATORS.LoginPage.passwordValidationError(page);
  }

  defaultTimeout = 10000;

  async navigate() {
    await this.page.goto(ENV.baseURL);
  }

  async navigateToProtectedPage() {
    const origin = new URL(ENV.baseURL).origin;
    await this.page.goto(`${origin}/combined-contracts`);
  }

  async login(username, password) {
    const user = process.env.E2E_USER || username;
    const pwd = process.env.E2E_PWD || password;

    await this.usernameInput.click();
    await this.usernameInput.fill(user);
    await this.usernameInput.click();
    await this.passwordInput.fill(pwd);
    await this.loginButton.click();
    await this.page.waitForURL(url => !url.pathname.startsWith('/login'), { timeout: 60000 });
  }

  async enterEmail(email) {
    await this.usernameInput.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await this.usernameInput.clear();
    await this.usernameInput.fill(email);
  }

  async enterPassword(password) {
    await this.passwordInput.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await this.passwordInput.clear();
    await this.passwordInput.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await this.loginButton.click({ force: true });
    await this.page.waitForLoadState('networkidle', { timeout: this.defaultTimeout }).catch(() => {});
  }

  async clearEmailField() {
    await this.usernameInput.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await this.usernameInput.clear();
  }

  async clearPasswordField() {
    await this.passwordInput.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await this.passwordInput.clear();
  }

  async togglePasswordVisibility() {
    await this.passwordToggleButton.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await this.passwordToggleButton.click();
  }

  async isLogoVisible() {
    await this.logoElement.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await expect(this.logoElement).toBeVisible();
  }

  async isEmailFieldVisible() {
    await this.usernameInput.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await expect(this.usernameInput).toBeVisible();
  }

  async isPasswordFieldVisible() {
    await this.passwordInput.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await expect(this.passwordInput).toBeVisible();
  }

  async isLoginButtonVisible() {
    await this.loginButton.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await expect(this.loginButton).toBeVisible();
  }

  async isPasswordMasked() {
    await this.passwordInput.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    const inputType = await this.passwordInput.getAttribute('type');
    expect(inputType).toBe('password');
  }

  async isPasswordVisible() {
    await this.passwordInput.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    const inputType = await this.passwordInput.getAttribute('type');
    expect(inputType).toBe('text');
  }

  async isErrorMessageVisible() {
    await this.errorMessage.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await expect(this.errorMessage).toBeVisible();
  }

  async isEmailValidationErrorVisible() {
    await this.emailValidationError.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await expect(this.emailValidationError).toBeVisible();
  }

  async isPasswordValidationErrorVisible() {
    await this.passwordValidationError.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await expect(this.passwordValidationError).toBeVisible();
  }
}