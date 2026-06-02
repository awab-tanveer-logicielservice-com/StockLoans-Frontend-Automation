import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { test } from './fixtures.js';
import { LOCATORS } from '../utils/locators.js';

const { When, Then } = createBdd(test);

// ── Navigation ────────────────────────────────────────────────────────────────

When('the user navigates to the Users Management page', async ({ addNewUserPage }) => {
  await addNewUserPage.navigateToUsers();
});

// ── Page assertions ───────────────────────────────────────────────────────────

Then('the Users AG-Grid should be visible', async ({ page }) => {
  await expect(page.locator('ag-grid-angular').first()).toBeVisible();
});

Then('the ADD NEW USER button should be visible', async ({ addNewUserPage }) => {
  await expect(addNewUserPage.addNewUserButton).toBeVisible();
});

// ── Modal open ────────────────────────────────────────────────────────────────

When('the user clicks the ADD NEW USER button', async ({ addNewUserPage }) => {
  await addNewUserPage.clickAddNewUser();
  await addNewUserPage.verifyBasicInfoVisible();  // waits for mat-dialog-container
});

// ── Field visibility ──────────────────────────────────────────────────────────

Then('the Email field should be visible in the modal', async ({ addNewUserPage }) => {
  await expect(addNewUserPage.emailInput).toBeVisible();
});

Then('the First Name field should be visible in the modal', async ({ addNewUserPage }) => {
  await expect(addNewUserPage.firstNameInput).toBeVisible();
});

Then('the Last Name field should be visible in the modal', async ({ addNewUserPage }) => {
  await expect(addNewUserPage.lastNameInput).toBeVisible();
});

Then('the Title field should be visible in the modal', async ({ addNewUserPage }) => {
  await expect(addNewUserPage.titleInput).toBeVisible();
});

Then('the Nickname field should be visible in the modal', async ({ addNewUserPage }) => {
  await expect(addNewUserPage.nicknameInput).toBeVisible();
});

// ── Button state ──────────────────────────────────────────────────────────────

Then('the ADD USER button should be disabled', async ({ addNewUserPage }) => {
  await expect(addNewUserPage.addUserButton).toBeDisabled();
});

Then('the ADD USER button should be enabled', async ({ addNewUserPage }) => {
  await expect(addNewUserPage.addUserButton).toBeEnabled();
});

// ── Fill fields ───────────────────────────────────────────────────────────────

When('the user fills in all new user details', async ({ addNewUserPage }) => {
  const ts = Date.now();
  await addNewUserPage.fillEmail(`testuser${ts}@yopmail.com`);
  await addNewUserPage.fillFirstName(`Test${ts}`);
  await addNewUserPage.fillLastName(`User${ts}`);
  await addNewUserPage.fillTitle('QA');
  await addNewUserPage.fillNickname(`TU${ts}`);
});

// ── Email validation ──────────────────────────────────────────────────────────

When('the user enters an invalid email {string}', async ({ addNewUserPage }, email) => {
  await addNewUserPage.fillEmail(email);
});

When('the user enters a valid email {string}', async ({ addNewUserPage }, email) => {
  await addNewUserPage.fillEmail(email);
});

When('the user moves focus away from the Email field', async ({ addNewUserPage }) => {
  await addNewUserPage.page.keyboard.press('Tab');
  await addNewUserPage.firstNameInput.click();
  await addNewUserPage.page.waitForTimeout(500);
});

Then('an email validation error should be displayed', async ({ page }) => {
  // The app applies a custom "error" CSS class to the input when email is invalid
  const emailInput = page.getByRole('textbox', { name: 'Email' });
  await expect(emailInput).toHaveClass(/\berror\b/, { timeout: 5000 });
});

Then('no email validation error should be displayed', async ({ page }) => {
  const emailInput = page.getByRole('textbox', { name: 'Email' });
  await expect(emailInput).not.toHaveClass(/\berror\b/, { timeout: 5000 });
});

// ── Submit ────────────────────────────────────────────────────────────────────

When('the user submits the new user form', async ({ addNewUserPage }) => {
  await addNewUserPage.clickAddUserButton();
});

Then('a user creation success notification should be displayed', async ({ page }) => {
  const snackBar = page.locator('mat-snack-bar-container');
  await expect(snackBar).toBeVisible({ timeout: 15000 });
});

// ── Grid refresh (alias — the shared step in addNewModalLayoutsSteps.js handles the canonical version) ──
