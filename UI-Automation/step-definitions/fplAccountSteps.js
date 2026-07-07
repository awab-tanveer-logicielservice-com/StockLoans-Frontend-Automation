import { createBdd } from 'playwright-bdd';
import { test } from './fixtures.js';

const { When, Then } = createBdd(test);

When('the user navigates to FPL Accounts', async ({ fplAccountPage }) => {
  await fplAccountPage.navigateToFPLAccounts();
});

When('the user closes the sidebar', async ({ fplAccountPage }) => {
  await fplAccountPage.closeSidebar();
});

Then('the account row should be visible', async ({ fplAccountPage }) => {
  await fplAccountPage.verifyAccountRowVisible();
});

When('the user selects the OMNIHK account', async ({ fplAccountPage }) => {
  await fplAccountPage.selectOMNIHK();
});

When('the user filters accounts by OMNIHK', async ({ fplAccountPage }) => {
  await fplAccountPage.filterByOMNIHK();
});

When('the user clicks the second OMNIHK occurrence', async ({ fplAccountPage }) => {
  await fplAccountPage.clickOMNIHKSecond();
});

When('the user interacts with the account grid cells', async ({ fplAccountPage }) => {
  await fplAccountPage.clickGridCell('FPL', true, 0);
  await fplAccountPage.clickGridCell('VCSO', false, 0);
  await fplAccountPage.clickGridCell('L', true, 0);
  await fplAccountPage.clickGridCell('A', false, 0);
  await fplAccountPage.clickGridCell('0.5', false, 0);
  await fplAccountPage.clickGridCell('0.5', false, 0);
  await fplAccountPage.clickGridCell('0.5', false, 0);
});

Then('the center cols viewport should be clickable', async ({ fplAccountPage }) => {
  await fplAccountPage.centerColsViewport.click();
});

// ── SLL-234: SLS Account editable dropdown ────────────────────────────────

When('the user clicks the SLS Account cell for a row', async ({ fplAccountPage }) => {
  await fplAccountPage.clickSLSAccountCell();
});

Then('the SLS Account dropdown should be visible with available options', async ({ fplAccountPage }) => {
  await fplAccountPage.verifySlsDropdownVisible();
});

Then('the SLS Account dropdown should contain at least one account option', async ({ fplAccountPage }) => {
  await fplAccountPage.verifySlsDropdownHasOptions();
});

When('the user selects the SLS account option {string}', async ({ fplAccountPage }, optionName) => {
  await fplAccountPage.selectSlsAccountOption(optionName);
});

Then('the record should reflect the selected SLS account', async ({ fplAccountPage }) => {
  await fplAccountPage.verifySlsAccountCellUpdated();
});

Then('the SLS Account column should be visible in the table', async ({ fplAccountPage }) => {
  await fplAccountPage.verifySlsAccountColumnVisible();
});

When('the user dismisses the SLS Account dropdown', async ({ fplAccountPage }) => {
  await fplAccountPage.dismissSLSAccountDropdown();
});
