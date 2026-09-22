import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { test } from './fixtures.js';

const { Given, When, Then } = createBdd(test);

// --- Given ---

Given('the user is on the login page', async ({ page, rememberMePage }) => {
  await page.setViewportSize({ width: 1536, height: 720 });
  await rememberMePage.navigate();
});

Given('the user previously logged in with Remember Me enabled', async ({ page, rememberMePage, testUsers }) => {
  await page.setViewportSize({ width: 1536, height: 720 });
  await rememberMePage.navigate();
  await rememberMePage.loginWith(testUsers.username, testUsers.password, true);
  await rememberMePage.logout();
});

Given('the user previously logged in without enabling Remember Me', async ({ page, rememberMePage, testUsers }) => {
  await page.setViewportSize({ width: 1536, height: 720 });
  await rememberMePage.navigate();
  await rememberMePage.loginWith(testUsers.username, testUsers.password, false);
  await rememberMePage.logout();
});

Given('the user navigates to the login page with pre-filled credentials from a previous Remember Me session', async ({ page, rememberMePage, testUsers }) => {
  await page.setViewportSize({ width: 1536, height: 720 });
  // Seed localStorage with saved credentials to simulate a prior Remember Me login
  await rememberMePage.navigate();
  await rememberMePage.loginWith(testUsers.username, testUsers.password, true);
  await rememberMePage.logout();
});

Given('the user navigates back to the login page with pre-filled credentials', async ({ rememberMePage }) => {
  await rememberMePage.navigate();
});

/**
 * Stand-in for the account whose saved credentials get superseded.
 *
 * It is seeded directly into localStorage and never submitted to the login
 * form, so it needs no password and must never be a real address - `.invalid`
 * is reserved by RFC 2606 precisely for this. The only account this feature
 * authenticates with is the configured test user.
 */
const SUPERSEDED_USER = {
  email: 'previous.user@example.invalid',
  password: 'not-used-never-submitted',
};

Given("a previous user's credentials are saved in localStorage via Remember Me", async ({ page, rememberMePage }) => {
  await page.setViewportSize({ width: 1536, height: 720 });
  await rememberMePage.navigate();
  // Seeded rather than logged in: Remember Me only has to have *stored* this
  // user for the overwrite to be meaningful, and seeding keeps the scenario to
  // a single real account. Previously this logged in as the primary user, which
  // made the following "different credentials" step a no-op comparison.
  await rememberMePage.seedSavedCredentials(SUPERSEDED_USER.email, SUPERSEDED_USER.password);
});

Given('the user has pre-filled credentials saved via Remember Me', async ({ page, rememberMePage, testUsers }) => {
  await page.setViewportSize({ width: 1536, height: 720 });
  await rememberMePage.navigate();
  await rememberMePage.loginWith(testUsers.username, testUsers.password, true);
  await rememberMePage.logout();
});

// --- When ---

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
  // Logs in as the configured test user, which is a different identity from the
  // seeded SUPERSEDED_USER above - that is the "different credentials" the
  // scenario means. This previously used a hardcoded colleague's address paired
  // with this user's password, a combination that could never authenticate.
  await rememberMePage.loginWith(testUsers.username, testUsers.password, true);
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

// --- Then ---

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

Then("the login fields should be populated with the new user's credentials only", async ({ rememberMePage, testUsers }) => {
  // "only" is the point of the scenario, so assert both halves: the new account
  // is prefilled AND the superseded one is gone. The previous assertion just
  // checked the field was non-empty, which stayed green even if the overwrite
  // never happened and the old address was still sitting there.
  await rememberMePage.assertEmailFieldIs(testUsers.username);
  await rememberMePage.assertEmailFieldIsNot(SUPERSEDED_USER.email);
  await rememberMePage.assertPasswordFieldNotEmpty();
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
