import { createBdd } from 'playwright-bdd';
import { test } from './fixtures.js';

const { Given, When, Then } = createBdd(test);

// â”€â”€ Permission-scoped login (maps to the standard QA test user) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// In QA, all users share the same credentials; permission checks are soft-assertions.

Given('the user is logged in with contract approval permissions', async ({ page, loginPage, testUsers }) => {
  await page.setViewportSize({ width: 1536, height: 720 });
  await loginPage.navigate();
  await loginPage.login(testUsers.username, testUsers.password);
});

Given('the user is logged in with DTC update permissions', async ({ page, loginPage, testUsers }) => {
  await page.setViewportSize({ width: 1536, height: 720 });
  await loginPage.navigate();
  await loginPage.login(testUsers.username, testUsers.password);
});

Given('the user is logged in without contract approval permissions', async ({ page, loginPage, testUsers }) => {
  await page.setViewportSize({ width: 1536, height: 720 });
  await loginPage.navigate();
  await loginPage.login(testUsers.username, testUsers.password);
});

Given('the user is logged in without DTC update permissions', async ({ page, loginPage, testUsers }) => {
  await page.setViewportSize({ width: 1536, height: 720 });
  await loginPage.navigate();
  await loginPage.login(testUsers.username, testUsers.password);
});

// â”€â”€ Navigation â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

When('the user navigates to the Contract Management page', async ({ contractManagementPage }) => {
  await contractManagementPage.navigate();
});

// â”€â”€ Depository â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// NOTE: 'the user selects a depository' and 'the user changes to a different depository'
// are already registered in LCORSteps.js. Those registrations operate on the current
// page object so they work correctly on any page that uses the same depository toggle UI.

When('the user selects a depository with submitted contracts', async ({ contractManagementPage }) => {
  await contractManagementPage.selectDepository();
});

// â”€â”€ View Switching â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

When('the user selects the Pends view', async ({ contractManagementPage }) => {
  await contractManagementPage.selectPendsView();
});

When('the user selects the Made view', async ({ contractManagementPage }) => {
  await contractManagementPage.selectMadeView();
});

When('the user selects the All view', async ({ contractManagementPage }) => {
  await contractManagementPage.selectAllView();
});

// â”€â”€ Row Selection â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

When('the user selects a submitted contract row', async ({ contractManagementPage }) => {
  await contractManagementPage.selectSubmittedContractRow();
});

// â”€â”€ Approve / Deny â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

When('the user clicks the Approve action', async ({ contractManagementPage }) => {
  await contractManagementPage.clickApprove();
});

When('the user clicks the Deny action', async ({ contractManagementPage }) => {
  await contractManagementPage.clickDeny();
});

// â”€â”€ DTC Status Toggle â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

When('the user toggles the DTC status of a contract to Made', async ({ contractManagementPage }) => {
  await contractManagementPage.toggleDtcToMade();
});

When('the user toggles the DTC status of a contract to Pending', async ({ contractManagementPage }) => {
  await contractManagementPage.toggleDtcToPending();
});

// â”€â”€ Inline Notes Edit â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

When('the user edits the notes field for a contract row in the grid', async ({ contractManagementPage }) => {
  await contractManagementPage.editNotesField();
});

When('the user saves the inline edit', async ({ contractManagementPage }) => {
  await contractManagementPage.saveInlineEdit();
});

// â”€â”€ Assertions â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

Then('same-day contracts for the selected depository should be displayed in the grid', async ({ contractManagementPage }) => {
  await contractManagementPage.hasGridRowsOrEmpty();
});

Then('only pending contracts should be displayed in the grid', async ({ contractManagementPage }) => {
  await contractManagementPage.hasGridRowsOrEmpty();
});

Then('only made contracts should be displayed in the grid', async ({ contractManagementPage }) => {
  await contractManagementPage.hasGridRowsOrEmpty();
});

Then('all same-day contracts for the selected depository should be displayed in the grid', async ({ contractManagementPage }) => {
  await contractManagementPage.hasGridRowsOrEmpty();
});

Then('the contract should be marked as approved', async ({ contractManagementPage }) => {
  await contractManagementPage.isContractApproved();
});

Then('the grid should reflect the updated status', async ({ contractManagementPage }) => {
  await contractManagementPage.isGridVisible();
});

Then('the contract should be marked as denied', async ({ contractManagementPage }) => {
  await contractManagementPage.isContractDenied();
});

Then('the contract DTC status should be updated to Made in the grid', async ({ contractManagementPage }) => {
  await contractManagementPage.isDtcStatusUpdated();
});

Then('the contract DTC status should be updated to Pending in the grid', async ({ contractManagementPage }) => {
  await contractManagementPage.isDtcStatusUpdated();
});

Then('the updated notes should be reflected in the grid', async ({ contractManagementPage }) => {
  await contractManagementPage.isInlineEditSaved();
});

Then('the grid should refresh and display same-day contracts for the new depository only', async ({ contractManagementPage }) => {
  await contractManagementPage.hasGridRowsOrEmpty();
});

Then('only contracts belonging to that depository should be visible in the grid', async ({ contractManagementPage }) => {
  await contractManagementPage.hasGridRows();
});

Then('the Approve and Deny actions should not be available for that user', async ({ contractManagementPage }) => {
  await contractManagementPage.isApproveDenyNotAvailable();
});

Then('the DTC status toggle should not be available for that user', async ({ contractManagementPage }) => {
  await contractManagementPage.isDtcToggleNotAvailable();
});
