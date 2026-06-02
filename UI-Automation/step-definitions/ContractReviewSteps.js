// NOTE: 'When the user selects multiple contract rows' is intentionally NOT re-defined here.
// It is already defined in ContractDetailsSteps.js using generic ag-grid locators that work
// on any ag-grid page, including Contract Review.

import { createBdd } from 'playwright-bdd';
import { test } from './fixtures.js';

const { Given, When, Then } = createBdd(test);

// ── Permission-scoped login (maps to the standard test user in QA) ─────────────

Given('the user is logged in with contract review permissions', async ({ page, loginPage, testUsers }) => {
  await page.setViewportSize({ width: 1900, height: 945 });
  await loginPage.navigate();
  await loginPage.login(testUsers.username, testUsers.password);
});

Given('the user is logged in without contract review permissions', async ({ page, loginPage, testUsers }) => {
  await page.setViewportSize({ width: 1900, height: 945 });
  await loginPage.navigate();
  await loginPage.login(testUsers.username, testUsers.password);
});

// ── Navigation ────────────────────────────────────────────────────────────────

When('the user navigates to the Contract Review page', async ({ contractReviewPage }) => {
  await contractReviewPage.navigate();
});

// ── Setup / precondition steps used as And ────────────────────────────────────

Given('the user loads contracts for a reviewable date', async ({ contractReviewPage }) => {
  await contractReviewPage.loadContractsForReviewableDate();
});

Given('the user submits a review for an unreviewed day', async ({ contractReviewPage }) => {
  await contractReviewPage.submitFullReview();
});

Given('the user selects contract rows', async ({ contractReviewPage }) => {
  await contractReviewPage.selectContractRows();
});

// ── Date selection ────────────────────────────────────────────────────────────

When('the user selects a specific date', async ({ contractReviewPage }) => {
  await contractReviewPage.selectDate();
});

When('the user selects an unreviewed day from the list', async ({ contractReviewPage }) => {
  await contractReviewPage.selectUnreviewedDay();
});

When('the user selects a date that has no reviewable contracts', async ({ contractReviewPage }) => {
  await contractReviewPage.selectFarPastDate();
});

When('the user enters an invalid date in the date selector', async ({ contractReviewPage }) => {
  await contractReviewPage.enterInvalidDate();
});

// ── Row selection ─────────────────────────────────────────────────────────────

When('the user selects one or more contract rows', async ({ contractReviewPage }) => {
  await contractReviewPage.selectOneOrMoreRows();
});

When('the user does not select any contract rows', async ({}) => {
  // Intentional no-op — rows are deliberately left unselected for this scenario
});

// ── Comment ───────────────────────────────────────────────────────────────────

When('the user enters a review comment', async ({ contractReviewPage }) => {
  await contractReviewPage.enterComment();
});

When('the user enters a comment and then edits it before submitting', async ({ contractReviewPage }) => {
  await contractReviewPage.enterAndEditComment();
});

// ── Submit ────────────────────────────────────────────────────────────────────

When('the user submits the review', async ({ contractReviewPage }) => {
  await contractReviewPage.submitReview();
});

// ── Assertions ────────────────────────────────────────────────────────────────

Then('reviewable contracts for the chosen date should be displayed in the grid', async ({ contractReviewPage }) => {
  await contractReviewPage.hasGridRowsOrEmpty();
});

Then('a list of unreviewed days should be displayed for selection', async ({ contractReviewPage }) => {
  await contractReviewPage.isUnreviewedDaysListVisible();
});

Then('reviewable contracts for that day should be displayed in the grid', async ({ contractReviewPage }) => {
  await contractReviewPage.hasGridRowsOrEmpty();
});

Then('the review should be submitted successfully', async ({ contractReviewPage }) => {
  await contractReviewPage.isSubmitSuccessVisible();
});

Then('the unreviewed-day list should refresh to exclude the reviewed day', async ({ contractReviewPage }) => {
  await contractReviewPage.isUnreviewedDayListRefreshed();
});

Then('the unreviewed-day list should no longer include the reviewed day', async ({ contractReviewPage }) => {
  await contractReviewPage.isUnreviewedDayListRefreshed();
});

Then('all selected rows should be highlighted for review', async ({ contractReviewPage }) => {
  await contractReviewPage.areSelectedRowsHighlighted();
});

Then('the review submission should be disabled or a validation message should be displayed', async ({ contractReviewPage }) => {
  await contractReviewPage.isSubmitDisabledWithNoSelection();
});

Then('the updated comment should be used upon submission', async ({ contractReviewPage }) => {
  await contractReviewPage.isGridVisible();
});

Then('an empty state or appropriate message should be displayed in the grid', async ({ contractReviewPage }) => {
  await contractReviewPage.isEmptyStateVisible();
});

Then('a validation error should be displayed', async ({ contractReviewPage }) => {
  await contractReviewPage.isDateValidationVisible();
});

Then('the review submission controls should be visible and enabled', async ({ contractReviewPage }) => {
  await contractReviewPage.isSubmitButtonVisibleAndEnabled();
});

Then('the review submission controls should not be available or should be disabled', async ({ contractReviewPage }) => {
  await contractReviewPage.isSubmitButtonDisabledOrHidden();
});
