/**
 * Step definitions for AccessReview.feature - SLL-236 Access Reviews.
 *
 * The workflow spans two real accounts, so the identity steps drive a genuine
 * sign-out + login rather than reusing the replayed session: the app keeps its
 * Firebase session in IndexedDB, so a half-measure would silently leave the
 * previous account signed in and the workflow would stall on the wrong turn.
 */
import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { test } from './fixtures.js';
import { LOCATORS } from '../utils/locators.js';

const { Given, When, Then } = createBdd(test);

// Scenario-scoped scratch values (noted id / status, for "unchanged" assertions).
const noted = {};

// --- Identity ---

Given('the user is logged in as {string}', async ({ page, loginPage, accessReviewPage, accessReviewUsers }, who) => {
  await page.setViewportSize({ width: 1900, height: 945 });
  const creds = accessReviewUsers.forRole(who);
  await accessReviewPage.signOut();
  await loginPage.login(creds.username, creds.password);
});

When('the user signs in as {string}', async ({ loginPage, accessReviewPage, accessReviewUsers }, who) => {
  const creds = accessReviewUsers.forRole(who);
  await accessReviewPage.signOut();
  await loginPage.login(creds.username, creds.password);
});

// --- Navigation ---

When('the user navigates to the Access Reviews page', async ({ accessReviewPage }) => {
  await accessReviewPage.navigateToAccessReviews();
});

When('the user reloads the Access Reviews page', async ({ accessReviewPage }) => {
  await accessReviewPage.navigateToAccessReviews();
  await accessReviewPage.reloadAccessReviews();
});

When('the user opens the Access Reviews link from the navigation', async ({ accessReviewPage }) => {
  await accessReviewPage.openNavLink();
});

// --- Initiate ---

When('the user opens the Initiate Access Review dialog', async ({ accessReviewPage }) => {
  await accessReviewPage.openInitiateDialog();
});

When('the user selects {string} as Reviewer 1', async ({ accessReviewPage }, name) => {
  await accessReviewPage.selectReviewer(0, name);
});

When('the user selects {string} as Reviewer 2', async ({ accessReviewPage }, name) => {
  await accessReviewPage.selectReviewer(1, name);
});

When('the user cancels the Initiate Access Review dialog', async ({ accessReviewPage }) => {
  await accessReviewPage.cancelInitiateDialog();
});

When(
  'the user initiates an access review with {string} as Reviewer 1 and {string} as Reviewer 2',
  async ({ accessReviewPage }, reviewer1, reviewer2) => {
    await accessReviewPage.initiateReview(reviewer1, reviewer2);
  }
);

When('the user notes the current latest review id', async ({ accessReviewPage }) => {
  noted.reviewId = await accessReviewPage.readTopReviewId();
});

// --- Opening a review ---

When('the user opens the latest access review', async ({ accessReviewPage }) => {
  await accessReviewPage.openTopReview();
});

Given('an access review exists in status {string}', async ({ accessReviewPage }, status) => {
  await accessReviewPage.navigateToAccessReviews();
  await accessReviewPage.filterByStatus(status);
  await accessReviewPage.verifyGridHasRows();
});

When('the user opens that access review', async ({ accessReviewPage }) => {
  await accessReviewPage.openTopReview();
});

// Reopens the review this scenario has been working on, by id. Distinct from
// "opens the latest": after a re-login the workflow must return to the SAME
// review, and the top grid row is not a safe proxy for it.
When('the user reopens the same access review', async ({ accessReviewPage }) => {
  await accessReviewPage.openReview(accessReviewPage.activeReviewId);
});

When('the user notes the detail status', async ({ accessReviewPage }) => {
  noted.detailStatus = await accessReviewPage.readDetailStatus();
});

// --- Reviewer 1 - flag role changes ---

When(
  'the user flags a role change for {string} on the User Snapshot tab',
  async ({ accessReviewPage }, userName) => {
    noted.flagDirection = await accessReviewPage.flagRoleChange(userName);
  }
);

When('the user submits the flags', async ({ accessReviewPage }) => {
  await accessReviewPage.submitFlags();
});

// --- Reviewer 2 - agree and sign off ---

When('the user agrees with every flag on the Flags & Actions tab', async ({ accessReviewPage }) => {
  await accessReviewPage.setAgreeOnAllFlags();
});

When('the user enters an overall sign-off comment', async ({ accessReviewPage }) => {
  await accessReviewPage.enterOverallSignOffComment();
});

When('the user signs off the access review', async ({ accessReviewPage }) => {
  await accessReviewPage.signOff();
});

// --- Admin - final snapshot ---

When('the user generates the final snapshot', async ({ accessReviewPage }) => {
  await accessReviewPage.generateFinalSnapshot();
});

// --- Confirmation ---

When('the user confirms the final state', async ({ accessReviewPage }) => {
  await accessReviewPage.confirmFinalState();
});

// --- Export ---

When('the user exports the access review', async ({ accessReviewPage }) => {
  await accessReviewPage.exportReview();
});

// --- Grid filtering ---

When('the user filters the {string} column by {string}', async ({ accessReviewPage }, colId, value) => {
  await accessReviewPage.filterColumn(colId, value);
});

// --- Then - landing page ---

Then('the Access Reviews page heading should be visible', async ({ accessReviewPage }) => {
  await LOCATORS.AccessReviewPage.pageHeading(accessReviewPage.page)
    .waitFor({ state: 'visible', timeout: 30000 });
});

Then('the New Access Review button should be visible', async ({ accessReviewPage }) => {
  await expect(LOCATORS.AccessReviewPage.newAccessReviewButton(accessReviewPage.page)).toBeVisible();
});

Then('the status legend should show {string}', async ({ accessReviewPage }, label) => {
  await accessReviewPage.verifyLegendChipVisible(label);
});

Then('the Access Reviews grid should display the {string} column', async ({ accessReviewPage }, column) => {
  await accessReviewPage.verifyColumnVisible(column);
});

Then('the Access Reviews grid should contain at least one review', async ({ accessReviewPage }) => {
  await accessReviewPage.verifyGridHasRows();
});

Then('the Access Reviews grid should display the empty state overlay', async ({ accessReviewPage }) => {
  await accessReviewPage.verifyEmptyStateOverlay();
});

Then('the latest review id should be unchanged', async ({ accessReviewPage }) => {
  expect(await accessReviewPage.readTopReviewId()).toBe(noted.reviewId);
});

// --- Then - initiate dialog ---

Then('the Initiate Review button should be disabled', async ({ accessReviewPage }) => {
  await accessReviewPage.verifyInitiateReviewDisabled();
});

Then('the Initiate Review button should be enabled', async ({ accessReviewPage }) => {
  await expect(LOCATORS.AccessReviewPage.initiateReviewButton(accessReviewPage.page)).toBeEnabled();
});

// --- Then - detail page ---

Then('the access review status should be {string}', async ({ accessReviewPage }, status) => {
  await accessReviewPage.verifyStatus(status);
});

Then(
  'the access review should appear as {string} in the Access Reviews grid',
  async ({ accessReviewPage }, status) => {
    await accessReviewPage.verifyActiveReviewStatus(status);
  }
);

Then('the turn banner should mention {string}', async ({ accessReviewPage }, text) => {
  await accessReviewPage.verifyTurnBannerMentions(text);
});

Then('the detail status should be unchanged', async ({ accessReviewPage }) => {
  expect(await accessReviewPage.readDetailStatus()).toBe(noted.detailStatus);
});

Then('the {string} tab should be visible', async ({ accessReviewPage }, name) => {
  await accessReviewPage.verifyTabVisible(name);
});

Then('the {string} tab should not be present', async ({ accessReviewPage }, name) => {
  await accessReviewPage.verifyTabNotPresent(name);
});

Then('the Flags & Actions grid should list at least one flag', async ({ accessReviewPage }) => {
  await accessReviewPage.openTab(/flags & actions/i);
  const rows = LOCATORS.AccessReviewPage.flagsGridRows(accessReviewPage.page);
  await rows.first().waitFor({ state: 'visible', timeout: 30000 });
  expect(await rows.count()).toBeGreaterThan(0);
});

Then('the Sign-Off History should record a sign-off', async ({ accessReviewPage }) => {
  await accessReviewPage.verifySignOffHistoryRecords('sign');
});

// --- Then - export ---

Then('the access review export file should be downloaded', async ({ accessReviewPage }) => {
  await accessReviewPage.verifyExportDownloaded();
});
