/**
 * Step definitions for AccessReview.feature - SLL-236
 * Authorization Access Review System for User Role Changes.
 */
import { createBdd } from 'playwright-bdd';
import { test } from './fixtures.js';

const { Given, When, Then } = createBdd(test);

// --- Given - identity ---

// Going to /login clears the injected Firebase session (see commonSteps.js), so
// this genuinely re-authenticates as the requested role rather than reusing the
// primary account's session.
Given('the user is logged in as {string}', async ({ loginPage, accessReviewUsers }, role) => {
  const creds = accessReviewUsers.forRole(role);
  await loginPage.navigate();
  await loginPage.login(creds.username, creds.password);
});

// --- Given - request state ---

Given('an access review request form is open', async ({ accessReviewPage }) => {
  await accessReviewPage.openRequestForm();
});

Given('an access review request has just been submitted', async ({ accessReviewPage }) => {
  await accessReviewPage.submitFreshRequest();
});

Given("an access review request is pending the approver's decision", async ({ accessReviewPage }) => {
  await accessReviewPage.seedRequestPendingApproverDecision();
});

Given('an access review request has been accepted by the first approver', async ({ accessReviewPage }) => {
  await accessReviewPage.seedRequestAcceptedByFirstApprover();
});

Given('an access review request has been accepted by both approvers', async ({ accessReviewPage }) => {
  await accessReviewPage.seedRequestAcceptedByBothApprovers();
});

Given('an access review request has been rejected by an approver', async ({ accessReviewPage }) => {
  await accessReviewPage.seedRequestRejectedByApprover();
});

Given('an access review request has already been decided by the current approver', async ({ accessReviewPage }) => {
  await accessReviewPage.seedRequestAlreadyDecidedByCurrentApprover();
});

Given('an access review request raised by the current user exists', async ({ accessReviewPage }) => {
  await accessReviewPage.seedRequestRaisedByCurrentUser();
});

Given('an access review request the current user is not an approver on exists', async ({ accessReviewPage }) => {
  await accessReviewPage.seedRequestNotApproverOn();
});

// --- When - navigation ---

When('the user navigates to the Access Review page', async ({ accessReviewPage }) => {
  await accessReviewPage.navigateToAccessReview();
});

When('the user reloads the Access Review page', async ({ accessReviewPage }) => {
  await accessReviewPage.reloadAccessReviewPage();
});

When('the user opens the access review pending approvals queue', async ({ accessReviewPage }) => {
  await accessReviewPage.openPendingApprovalsQueue();
});

When('the user opens the access review request details', async ({ accessReviewPage }) => {
  await accessReviewPage.openRequestDetails();
});

When('the user filters the Access Review grid by status {string}', async ({ accessReviewPage }, status) => {
  await accessReviewPage.filterByStatus(status);
});

// --- When - raising a request ---

When('the user clicks the Initiate Access Review Request button', async ({ accessReviewPage }) => {
  await accessReviewPage.clickInitiateRequest();
});

When('the user selects a target user for the role change', async ({ accessReviewPage }) => {
  await accessReviewPage.selectTargetUser();
});

When('the user selects a role change to be reviewed', async ({ accessReviewPage }) => {
  await accessReviewPage.selectRoleChange();
});

When('the user enters a justification for the access review request', async ({ accessReviewPage }) => {
  await accessReviewPage.enterJustification();
});

When('the user submits the access review request', async ({ accessReviewPage }) => {
  await accessReviewPage.submitRequest();
});

When('the user completes the access review request with justification {string}', async ({ accessReviewPage }, justification) => {
  await accessReviewPage.completeRequestWithJustification(justification);
});

// --- When - approvers on the request ---

When('the user adds two approvers to the access review request', async ({ accessReviewPage }) => {
  await accessReviewPage.addTwoApprovers();
});

When('the user adds {int} approver to the access review request', async ({ accessReviewPage }, count) => {
  await accessReviewPage.addApprovers(count);
});

When('the user adds {int} approvers to the access review request', async ({ accessReviewPage }, count) => {
  await accessReviewPage.addApprovers(count);
});

When('the user adds the requester themselves as an approver', async ({ accessReviewPage }) => {
  await accessReviewPage.addSelfAsApprover();
});

When('the user adds the same user as both approvers', async ({ accessReviewPage }) => {
  await accessReviewPage.addSameUserAsBothApprovers();
});

// --- When - decisions ---

When('the approver accepts the access review request', async ({ accessReviewPage }) => {
  await accessReviewPage.approverAccept();
});

When('the approver rejects the access review request', async ({ accessReviewPage }) => {
  await accessReviewPage.approverReject();
});

When('the first approver records the decision {string}', async ({ accessReviewPage }, decision) => {
  await accessReviewPage.recordApproverDecision('first', decision);
});

When('the second approver records the decision {string}', async ({ accessReviewPage }, decision) => {
  await accessReviewPage.recordApproverDecision('second', decision);
});

When('the admin gives the final approval on the access review request', async ({ accessReviewPage }) => {
  await accessReviewPage.adminFinalApprove();
});

When('the admin rejects the access review request at final approval', async ({ accessReviewPage }) => {
  await accessReviewPage.adminFinalReject();
});

// --- When - export ---

When('the user exports the access review details as {string}', async ({ accessReviewPage }, format) => {
  await accessReviewPage.exportAs(format);
});

// --- Then - page identity ---

Then('the Access Review page heading should be visible', async ({ accessReviewPage }) => {
  await accessReviewPage.verifyPageHeadingVisible();
});

Then('the Initiate Access Review Request button should be visible', async ({ accessReviewPage }) => {
  await accessReviewPage.verifyInitiateButtonVisible();
});

Then('the Access Review page should not crash', async ({ accessReviewPage }) => {
  await accessReviewPage.verifyPageNotCrashed();
});

// --- Then - request outcome ---

Then('a success confirmation should be displayed for the access review request', async ({ accessReviewPage }) => {
  await accessReviewPage.verifySuccessSnackBar();
});

Then('the access review request status should be {string}', async ({ accessReviewPage }, status) => {
  await accessReviewPage.verifyRequestStatus(status);
});

Then('the access review request should appear in the Access Review grid with status {string}', async ({ accessReviewPage }, status) => {
  await accessReviewPage.verifyRequestInGridWithStatus(status);
});

Then('both selected approvers should be listed on the access review request', async ({ accessReviewPage }) => {
  await accessReviewPage.verifyBothApproversListed();
});

Then('the access review audit trail should record the approver decision', async ({ accessReviewPage }) => {
  await accessReviewPage.verifyAuditTrailRecordsDecision();
});

// --- Then - grid ---

Then('the Access Review grid should display the {string} column', async ({ accessReviewPage }, columnName) => {
  await accessReviewPage.verifyColumnVisible(columnName);
});

Then('the Access Review grid should display the empty state overlay', async ({ accessReviewPage }) => {
  await accessReviewPage.verifyEmptyStateOverlay();
});

Then('the access review request should be listed in the pending approvals queue', async ({ accessReviewPage }) => {
  await accessReviewPage.verifyRequestListedInQueue();
});

// --- Then - role and workflow guards ---

Then('the Accept and Reject actions should be available on the access review request', async ({ accessReviewPage }) => {
  await accessReviewPage.verifyAcceptRejectAvailable();
});

Then('the Accept and Reject actions should not be available on the access review request', async ({ accessReviewPage }) => {
  await accessReviewPage.verifyAcceptRejectNotAvailable();
});

Then('the Final Approval action should be available on the access review request', async ({ accessReviewPage }) => {
  await accessReviewPage.verifyFinalApprovalAvailable();
});

Then('the Final Approval action should not be available on the access review request', async ({ accessReviewPage }) => {
  await accessReviewPage.verifyFinalApprovalNotAvailable();
});

// --- Then - validation ---

Then('a validation error should be displayed for the access review request', async ({ accessReviewPage }) => {
  await accessReviewPage.verifyValidationError();
});

Then('the access review request should not be submitted', async ({ accessReviewPage }) => {
  await accessReviewPage.verifyRequestNotSubmitted();
});

// --- Then - export ---

Then('the access review export file should be downloaded', async ({ accessReviewPage }) => {
  await accessReviewPage.verifyExportDownloaded();
});
