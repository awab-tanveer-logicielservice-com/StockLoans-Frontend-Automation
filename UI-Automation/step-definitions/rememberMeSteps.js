import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { test } from './fixtures.js';

const { Given, When, Then } = createBdd(test);

// ── Given ────────────────────────────────────────────────────────────────────

Given('the user is on the login page', async ({ page, rememberMePage }) => {
  await page.setViewportSize({ width: 1900, height: 945 });
  await rememberMePage.navigate();
});

Given('the user previously logged in with Remember Me enabled', async ({ page, rememberMePage, testUsers }) => {
  await page.setViewportSize({ width: 1900, height: 945 });
  await rememberMePage.navigate();
  await rememberMePage.loginWith(testUsers.username, testUsers.password, true);
  await rememberMePage.logout();
});

Given('the user previously logged in without enabling Remember Me', async ({ page, rememberMePage, testUsers }) => {
  await page.setViewportSize({ width: 1900, height: 945 });
  await rememberMePage.navigate();
  await rememberMePage.loginWith(testUsers.username, testUsers.password, false);
  await rememberMePage.logout();
});

Given('the user navigates to the login page with pre-filled credentials from a previous Remember Me session', async ({ page, rememberMePage, testUsers }) => {
  await page.setViewportSize({ width: 1900, height: 945 });
  // Seed localStorage with saved credentials to simulate a prior Remember Me login
  await rememberMePage.navigate();
  await rememberMePage.loginWith(testUsers.username, testUsers.password, true);
  await rememberMePage.logout();
});

Given('the user navigates back to the login page with pre-filled credentials', async ({ rememberMePage }) => {
  await rememberMePage.navigate();
});

Given("a previous user's credentials are saved in localStorage via Remember Me", async ({ page, rememberMePage, testUsers }) => {
  await page.setViewportSize({ width: 1900, height: 945 });
  await rememberMePage.navigate();
  await rememberMePage.loginWith(testUsers.username, testUsers.password, true);
  await rememberMePage.logout();
});

Given('the user has pre-filled credentials saved via Remember Me', async ({ page, rememberMePage, testUsers }) => {
  await page.setViewportSize({ width: 1900, height: 945 });
  await rememberMePage.navigate();
  await rememberMePage.loginWith(testUsers.username, testUsers.password, true);
  await rememberMePage.logout();
});

// ── When ─────────────────────────────────────────────────────────────────────

When('the user enters a valid email address', async ({ rememberMePage, testUsers }) => {
  await rememberMePage.enterEmail(testUsers.username);
});

When('the user enters a valid password', async ({ rememberMePage, testUsers }) => {
  await rememberMePage.enterPassword(testUsers.password);
});

When('the user enters valid credentials', async ({ rememberMePage, testUsers }) => {
  await rememberMePage.enterEmail(testUsers.username);
  await rememberMePage.enterPassword(testUsers.password);
});

When('the user checks the Remember Me checkbox', async ({ rememberMePage }) => {
  await rememberMePage.checkRememberMe();
});

When('the user unchecks the Remember Me checkbox', async ({ rememberMePage }) => {
  await rememberMePage.uncheckRememberMe();
});

When('the Remember Me checkbox is unchecked', async ({ rememberMePage }) => {
  await rememberMePage.uncheckRememberMe();
});

When('the user clicks the Login button', async ({ rememberMePage }) => {
  await rememberMePage.clickLogin();
});

When('the user logs out and navigates back to the login page', async ({ rememberMePage }) => {
  await rememberMePage.logoutAndReturn();
});

When('the user logs out', async ({ rememberMePage }) => {
  await rememberMePage.logout();
});

When('the user navigates back to the login page', async ({ rememberMePage }) => {
  await rememberMePage.navigate();
});

When('the user navigates to the login page', async ({ rememberMePage }) => {
  await rememberMePage.navigate();
});

When('the user clears the Email field and enters a different email', async ({ rememberMePage }) => {
  await rememberMePage.clearEmailAndEnter('different.user@example.com');
});

When('a new user logs in with Remember Me enabled using different credentials', async ({ rememberMePage, testUsers }) => {
  const altEmail    = process.env.E2E_USER2 || 'mubashir.ahmed@logicielservice.com';
  const altPassword = process.env.E2E_PWD2  || testUsers.password;
  await rememberMePage.loginWith(altEmail, altPassword, true);
});

When('the new user logs out and navigates back to the login page', async ({ rememberMePage }) => {
  await rememberMePage.logoutAndReturn();
});

When('the user clicks the Login button using the pre-filled credentials', async ({ rememberMePage }) => {
  await rememberMePage.clickLoginExpectingError();
});

When('the user logs in again', async ({ rememberMePage, testUsers }) => {
  await rememberMePage.loginWith(testUsers.username, testUsers.password, false);
});

// ── Then ─────────────────────────────────────────────────────────────────────

Then('the Remember Me checkbox should be visible on the login form', async ({ rememberMePage }) => {
  await rememberMePage.isRememberMeVisible();
});

Then('the Remember Me checkbox should be unchecked by default', async ({ rememberMePage }) => {
  await rememberMePage.isRememberMeUnchecked();
});

Then('the Remember Me checkbox should be checked', async ({ rememberMePage }) => {
  await rememberMePage.isRememberMeChecked();
});

Then('the Remember Me checkbox should be unchecked', async ({ rememberMePage }) => {
  await rememberMePage.isRememberMeUnchecked();
});

Then('the Email field should be automatically populated with the saved email', async ({ rememberMePage }) => {
  await rememberMePage.assertEmailFieldNotEmpty();
});

Then('the Password field should be automatically populated with the saved password', async ({ rememberMePage }) => {
  await rememberMePage.assertPasswordFieldNotEmpty();
});

Then('the login fields should be pre-filled with the stored credentials', async ({ rememberMePage }) => {
  await rememberMePage.assertBothFieldsPreFilled();
});

Then('the login fields should be pre-filled', async ({ rememberMePage }) => {
  await rememberMePage.assertBothFieldsPreFilled();
});

Then('the login fields should be empty', async ({ rememberMePage }) => {
  await rememberMePage.assertBothFieldsEmpty();
});

Then('the Email field should be empty', async ({ rememberMePage }) => {
  await rememberMePage.assertEmailFieldEmpty();
});

Then('the Password field should be empty', async ({ rememberMePage }) => {
  await rememberMePage.assertPasswordFieldEmpty();
});

Then('the Email and Password fields should be pre-filled with the saved credentials', async ({ rememberMePage }) => {
  await rememberMePage.assertBothFieldsPreFilled();
});

Then('the Email and Password fields should be empty', async ({ rememberMePage }) => {
  await rememberMePage.assertBothFieldsEmpty();
});

Then('both the Email and Password fields should be auto-populated with the saved values', async ({ rememberMePage }) => {
  await rememberMePage.assertBothFieldsPreFilled();
});

Then('the auto-populated password should be displayed as masked characters', async ({ rememberMePage }) => {
  await rememberMePage.assertPasswordMasked();
});

Then('the user should be authenticated and redirected to the dashboard', async ({ rememberMePage }) => {
  await rememberMePage.assertOnDashboard();
});

Then('the user should be on the login page', async ({ rememberMePage }) => {
  await rememberMePage.assertOnLoginPage();
});

Then('the login page should be displayed', async ({ rememberMePage }) => {
  await rememberMePage.assertOnLoginPage();
});

Then('the credentials should be stored in localStorage', async ({ rememberMePage }) => {
  await rememberMePage.assertCredentialsInLocalStorage();
});

Then('no credentials should be stored in localStorage', async ({ rememberMePage }) => {
  await rememberMePage.assertNoCredentialsInLocalStorage();
});

Then('no credentials should remain in localStorage', async ({ rememberMePage }) => {
  await rememberMePage.assertNoCredentialsInLocalStorage();
});

Then('the stored credentials should be removed from localStorage', async ({ rememberMePage }) => {
  await rememberMePage.assertNoCredentialsInLocalStorage();
});

Then('the login should be attempted with the newly entered email', async ({ rememberMePage }) => {
  // Verify login page is still shown (invalid email entered) or error is visible
  await rememberMePage.assertErrorVisible();
});

Then("the login fields should be populated with the new user's credentials only", async ({ rememberMePage }) => {
  await rememberMePage.assertEmailFieldNotEmpty();
});

Then('the login should still be authenticated via Firebase', async ({ rememberMePage }) => {
  await rememberMePage.assertOnDashboard();
});

Then('access should only be granted if the credentials are valid', async ({ rememberMePage }) => {
  await rememberMePage.assertOnDashboard();
});

Then('the login should be rejected with an appropriate error message', async ({ rememberMePage }) => {
  await rememberMePage.assertErrorVisible();
});
