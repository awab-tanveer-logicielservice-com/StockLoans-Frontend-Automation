import { expect } from '@playwright/test';
import { LOCATORS } from '../utils/locators.js';
import { ENV } from '../Config/env.js';

export class RememberMePage {
  constructor(page) {
    this.page = page;
    this.usernameInput      = LOCATORS.LoginPage.usernameInput(page);
    this.passwordInput      = LOCATORS.LoginPage.passwordInput(page);
    this.loginButton        = LOCATORS.LoginPage.loginButton(page);
    this.errorMessage       = LOCATORS.LoginPage.errorMessage(page);
    this.rememberMeCheckbox = LOCATORS.RememberMePage.rememberMeCheckbox(page);
    this.rememberMeLabel    = LOCATORS.RememberMePage.rememberMeLabel(page);
    this.userMenuButton     = LOCATORS.RememberMePage.userMenuButton(page);
    this.logoutButton       = LOCATORS.RememberMePage.logoutButton(page);
  }

  defaultTimeout = 10000;

  async navigate() {
    await this.page.goto(ENV.baseURL);
    await this.usernameInput.waitFor({ state: 'visible', timeout: this.defaultTimeout });
  }

  // ── Remember Me checkbox ──────────────────────────────

  async isRememberMeVisible() {
    await this.rememberMeCheckbox.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await expect(this.rememberMeCheckbox).toBeVisible();
  }

  async isRememberMeUnchecked() {
    await this.rememberMeCheckbox.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await expect(this.rememberMeCheckbox).not.toBeChecked();
  }

  async isRememberMeChecked() {
    await this.rememberMeCheckbox.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await expect(this.rememberMeCheckbox).toBeChecked();
  }

  async checkRememberMe() {
    await this.rememberMeCheckbox.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    const checked = await this.rememberMeCheckbox.isChecked();
    if (!checked) await this.rememberMeCheckbox.check();
  }

  async uncheckRememberMe() {
    await this.rememberMeCheckbox.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    const checked = await this.rememberMeCheckbox.isChecked();
    if (checked) await this.rememberMeCheckbox.uncheck();
  }

  // ── Credentials entry ────────────────────────────────

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

  async clearEmailAndEnter(email) {
    await this.usernameInput.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await this.usernameInput.clear();
    await this.usernameInput.fill(email);
  }

  async clickLogin() {
    await this.loginButton.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await this.loginButton.click({ force: true });
    await this.page.waitForURL(url => !url.pathname.startsWith('/login'), { timeout: 30000 });
  }

  async clickLoginExpectingError() {
    await this.loginButton.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await this.loginButton.click({ force: true });
    // The caller asserts on the error, so wait for it rather than for a load
    // state that a failed login never produces.
    await this.errorMessage
      .waitFor({ state: 'visible', timeout: this.defaultTimeout })
      .catch(() => {});
  }

  async loginWith(email, password, rememberMe = false) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    if (rememberMe) {
      await this.checkRememberMe();
    } else {
      await this.uncheckRememberMe();
    }
    await this.clickLogin();
  }

  // ── Logout ────────────────────────────────────────────

  async logout() {
    await this.userMenuButton.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await this.userMenuButton.click();
    await this.logoutButton.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await this.logoutButton.click();
    await this.page.waitForURL(/\/login/, { timeout: 15000 });
  }

  async logoutAndReturn() {
    await this.logout();
    await this.usernameInput.waitFor({ state: 'visible', timeout: this.defaultTimeout });
  }

  // ── Field state assertions ────────────────────────────

  async assertEmailFieldValue(expected) {
    const value = await this.usernameInput.inputValue();
    expect(value).toBe(expected);
  }

  async assertEmailFieldNotEmpty() {
    const value = await this.usernameInput.inputValue();
    expect(value.length).toBeGreaterThan(0);
  }

  async assertEmailFieldEmpty() {
    const value = await this.usernameInput.inputValue();
    expect(value).toBe('');
  }

  async assertPasswordFieldNotEmpty() {
    const value = await this.passwordInput.inputValue();
    expect(value.length).toBeGreaterThan(0);
  }

  async assertPasswordFieldEmpty() {
    const value = await this.passwordInput.inputValue();
    expect(value).toBe('');
  }

  async assertPasswordMasked() {
    const type = await this.passwordInput.getAttribute('type');
    expect(type).toBe('password');
  }

  async assertBothFieldsPreFilled() {
    await this.assertEmailFieldNotEmpty();
    await this.assertPasswordFieldNotEmpty();
  }

  async assertBothFieldsEmpty() {
    await this.assertEmailFieldEmpty();
    await this.assertPasswordFieldEmpty();
  }

  async assertOnDashboard() {
    await this.page.waitForURL(/\/contract-summary/, { timeout: 30000 });
    await expect(this.page).toHaveURL(/\/contract-summary/);
  }

  async assertOnLoginPage() {
    await this.page.waitForURL(/\/login/, { timeout: 10000 });
    await expect(this.page).toHaveURL(/\/login/);
  }

  async assertErrorVisible() {
    await this.errorMessage.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await expect(this.errorMessage).toBeVisible();
  }

  // ── localStorage helpers ─────────────────────────────

  async assertCredentialsInLocalStorage() {
    const stored = await this.page.evaluate(() => {
      return localStorage.getItem('rememberMe') || localStorage.getItem('rememberedEmail') || localStorage.getItem('savedCredentials');
    });
    expect(stored).not.toBeNull();
  }

  async assertNoCredentialsInLocalStorage() {
    const stored = await this.page.evaluate(() => {
      const keys = ['rememberMe', 'rememberedEmail', 'savedCredentials', 'rememberedPassword'];
      return keys.map(k => localStorage.getItem(k)).filter(v => v !== null);
    });
    expect(stored.length).toBe(0);
  }

  async clearLocalStorage() {
    await this.page.evaluate(() => localStorage.clear());
  }

  async getStoredEmail() {
    return await this.page.evaluate(() => {
      return localStorage.getItem('rememberedEmail') || localStorage.getItem('email') || '';
    });
  }

  /**
   * Writes a saved-credentials record straight into localStorage, using the same
   * keys Remember Me itself writes, and reloads so the app picks it up.
   *
   * This exists so the "overwrites previously saved credentials" scenario does
   * not need a second real account: the previous user only ever has to be
   * *stored*, never authenticated, so seeding is both sufficient and honest.
   * Only the account under test ever reaches the login form.
   */
  async seedSavedCredentials(email, password) {
    await this.page.evaluate(({ email, password }) => {
      localStorage.setItem('rememberMe', 'true');
      localStorage.setItem('rememberedEmail', email);
      localStorage.setItem('rememberedPassword', password);
      localStorage.setItem('savedCredentials', JSON.stringify({ email, password }));
    }, { email, password });
    await this.page.reload();
    await this.usernameInput.waitFor({ state: 'visible', timeout: this.defaultTimeout });
  }

  /** Asserts the prefilled email is exactly the expected account. */
  async assertEmailFieldIs(expectedEmail) {
    const value = (await this.usernameInput.inputValue()).trim();
    expect(value.toLowerCase()).toBe(expectedEmail.trim().toLowerCase());
  }

  /** Asserts the prefilled email is no longer the given (superseded) account. */
  async assertEmailFieldIsNot(unexpectedEmail) {
    const value = (await this.usernameInput.inputValue()).trim();
    expect(value.toLowerCase()).not.toBe(unexpectedEmail.trim().toLowerCase());
  }
}
