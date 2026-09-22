import { expect } from '@playwright/test';
import { LOCATORS } from '../utils/locators.js';
import { ENV } from '../Config/env.js';

/**
 * Access Review - Authorization Access Review System for User Role Changes (SLL-236).
 *
 * The screen is not built yet (SLL-236 is To Do), so every selector in
 * LOCATORS.AccessReviewPage is a best-guess role/label query carrying a
 * "TODO: confirm against the built UI" note. The flow logic here is real -
 * only the selectors should need touching once the screen lands.
 *
 * Workflow modelled: Draft -> Pending Approver Review -> Partially Approved
 * -> Pending Admin Approval -> Approved, with Rejected reachable from any
 * approver or admin decision.
 */
export class AccessReviewPage {
  constructor(page) {
    this.page = page;
    this.initiateButton = LOCATORS.AccessReviewPage.initiateRequestButton(page);
    this.targetUserInput = LOCATORS.AccessReviewPage.targetUserInput(page);
    this.roleSelect = LOCATORS.AccessReviewPage.roleSelect(page);
    this.firstApproverInput = LOCATORS.AccessReviewPage.firstApproverInput(page);
    this.secondApproverInput = LOCATORS.AccessReviewPage.secondApproverInput(page);
    this.justificationInput = LOCATORS.AccessReviewPage.justificationInput(page);
    this.submitButton = LOCATORS.AccessReviewPage.submitRequestButton(page);
    this.grid = LOCATORS.AccessReviewPage.requestsGrid(page);
    /** Set by exportAs() so verifyExportDownloaded() can assert on the real download. */
    this.lastDownload = null;
    /** Status of the request the current scenario is working with. */
    this.activeRequestStatus = null;
  }

  defaultTimeout = 10000;

  // --- Navigation ---

  async navigateToAccessReview() {
    const origin = new URL(ENV.baseURL).origin;
    const target = `${origin}/access-review`;
    if (!this.page.url().startsWith(target)) {
      await this.page.goto(target);
    }
    await this.page.waitForLoadState('domcontentloaded').catch(() => {});
    await this.page.locator('.ag-overlay-loading-wrapper')
      .waitFor({ state: 'hidden', timeout: 20000 })
      .catch(() => {});
    await this.grid.waitFor({ state: 'visible', timeout: 20000 }).catch(() => {});
  }

  async reloadAccessReviewPage() {
    await this.page.reload();
    await this.page.waitForLoadState('domcontentloaded').catch(() => {});
    await this.grid.waitFor({ state: 'visible', timeout: 20000 }).catch(() => {});
  }

  async verifyPageHeadingVisible() {
    const heading = LOCATORS.AccessReviewPage.pageHeading(this.page);
    await heading.waitFor({ state: 'visible', timeout: 30000 });
  }

  async verifyInitiateButtonVisible() {
    await this.initiateButton.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await expect(this.initiateButton).toBeVisible();
  }

  async verifyPageNotCrashed() {
    const main = this.page.locator('main, [role="main"], h1, h2').first();
    await main.waitFor({ state: 'visible', timeout: this.defaultTimeout });
  }

  // --- Request form ---

  async clickInitiateRequest() {
    await this.initiateButton.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await this.initiateButton.click();
    await this.targetUserInput.waitFor({ state: 'visible', timeout: this.defaultTimeout });
  }

  async openRequestForm() {
    await this.navigateToAccessReview();
    await this.clickInitiateRequest();
  }

  async selectTargetUser(user) {
    const value = user || LOCATORS.AccessReviewPage.defaults.targetUser;
    await this.targetUserInput.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await this.targetUserInput.fill(value);
    await this._pickFirstAutocompleteOption();
  }

  async selectRoleChange(role) {
    const value = role || LOCATORS.AccessReviewPage.defaults.role;
    await this.roleSelect.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await this.roleSelect.click();
    await this.page.getByRole('option', { name: value }).first()
      .click({ timeout: this.defaultTimeout });
  }

  async enterFirstApprover(approver) {
    await this.firstApproverInput.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await this.firstApproverInput.fill(approver);
    await this.firstApproverInput.blur().catch(() => {});
  }

  async enterSecondApprover(approver) {
    await this.secondApproverInput.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await this.secondApproverInput.fill(approver);
    await this.secondApproverInput.blur().catch(() => {});
  }

  /** Adds `count` approvers (1 or 2 - the request accepts exactly two). */
  async addApprovers(count) {
    const [a1, a2] = LOCATORS.AccessReviewPage.defaults.approvers;
    if (count >= 1) await this.enterFirstApprover(a1);
    if (count >= 2) await this.enterSecondApprover(a2);
  }

  async addTwoApprovers() {
    await this.addApprovers(2);
  }

  async addSelfAsApprover() {
    await this.enterFirstApprover(LOCATORS.AccessReviewPage.defaults.requester);
    await this.enterSecondApprover(LOCATORS.AccessReviewPage.defaults.approvers[1]);
  }

  async addSameUserAsBothApprovers() {
    const [a1] = LOCATORS.AccessReviewPage.defaults.approvers;
    await this.enterFirstApprover(a1);
    await this.enterSecondApprover(a1);
  }

  async enterJustification(text) {
    const value = text ?? LOCATORS.AccessReviewPage.defaults.justification;
    await this.justificationInput.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await this.justificationInput.fill(value);
  }

  /** Fills every mandatory field, with the justification overridden. */
  async completeRequestWithJustification(text) {
    await this.selectTargetUser();
    await this.selectRoleChange();
    await this.addTwoApprovers();
    await this.enterJustification(text);
  }

  async submitRequest() {
    await this.submitButton.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await this.submitButton.click();
  }

  async verifyBothApproversListed() {
    const [a1, a2] = LOCATORS.AccessReviewPage.defaults.approvers;
    const listed = LOCATORS.AccessReviewPage.selectedApproversList(this.page);
    await listed.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await expect(listed).toContainText(a1);
    await expect(listed).toContainText(a2);
  }

  async verifyRequestNotSubmitted() {
    // The form must still be open - a rejected submit never closes the dialog.
    await expect(this.submitButton).toBeVisible();
  }

  // --- Grid / queue ---

  _rowWithStatus(status) {
    return LOCATORS.AccessReviewPage.gridRows(this.page).filter({ hasText: status });
  }

  async openPendingApprovalsQueue() {
    const tab = LOCATORS.AccessReviewPage.pendingApprovalsTab(this.page);
    await tab.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await tab.click();
    await this.grid.waitFor({ state: 'visible', timeout: this.defaultTimeout });
  }

  async verifyRequestListedInQueue() {
    const rows = LOCATORS.AccessReviewPage.gridRows(this.page);
    await rows.first().waitFor({ state: 'visible', timeout: 20000 });
    expect(await rows.count()).toBeGreaterThan(0);
  }

  async openRequestDetails() {
    const rows = LOCATORS.AccessReviewPage.gridRows(this.page);
    await rows.first().waitFor({ state: 'visible', timeout: 20000 });
    await rows.first().click();
    await LOCATORS.AccessReviewPage.detailsPanel(this.page)
      .waitFor({ state: 'visible', timeout: this.defaultTimeout });
  }

  async verifyColumnVisible(columnName) {
    const header = this.page.locator('.ag-header-cell-text, th, [role="columnheader"]')
      .filter({ hasText: columnName });
    await header.first().waitFor({ state: 'visible', timeout: 20000 });
  }

  async filterByStatus(status) {
    const filter = LOCATORS.AccessReviewPage.statusFilter(this.page);
    await filter.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await filter.fill(status);
    await this.page.keyboard.press('Enter');
  }

  async verifyEmptyStateOverlay() {
    const overlay = LOCATORS.AccessReviewPage.emptyGridOverlay(this.page);
    await overlay.waitFor({ state: 'visible', timeout: 20000 });
  }

  async verifyRequestInGridWithStatus(status) {
    await this._rowWithStatus(status).first()
      .waitFor({ state: 'visible', timeout: 30000 });
  }

  // --- Scenario state seeding ---

  /**
   * Selects an existing request in the given status, creating a fresh one first
   * when the workflow starts from submission. Fails loudly rather than silently
   * continuing on the wrong request.
   */
  async seedRequestWithStatus(status) {
    await this.navigateToAccessReview();
    await this.filterByStatus(status);
    const row = this._rowWithStatus(status).first();
    const found = await row.waitFor({ state: 'visible', timeout: 20000 })
      .then(() => true).catch(() => false);
    if (!found) {
      throw new Error(
        `No access review request in status "${status}" is available on this environment. ` +
        'Seed one, or point the scenario at a request that is in that state.'
      );
    }
    this.activeRequestStatus = status;
    await row.click();
    await LOCATORS.AccessReviewPage.detailsPanel(this.page)
      .waitFor({ state: 'visible', timeout: this.defaultTimeout });
  }

  async submitFreshRequest() {
    await this.openRequestForm();
    await this.selectTargetUser();
    await this.selectRoleChange();
    await this.addTwoApprovers();
    await this.enterJustification();
    await this.submitRequest();
    await this.verifySuccessSnackBar();
    this.activeRequestStatus = 'Pending Approver Review';
  }

  async seedRequestPendingApproverDecision() {
    await this.seedRequestWithStatus('Pending Approver Review');
  }

  async seedRequestAcceptedByFirstApprover() {
    await this.seedRequestWithStatus('Partially Approved');
  }

  async seedRequestAcceptedByBothApprovers() {
    await this.seedRequestWithStatus('Pending Admin Approval');
  }

  async seedRequestRejectedByApprover() {
    await this.seedRequestWithStatus('Rejected');
  }

  async seedRequestAlreadyDecidedByCurrentApprover() {
    await this.seedRequestWithStatus('Partially Approved');
  }

  async seedRequestRaisedByCurrentUser() {
    await this.navigateToAccessReview();
    const tab = LOCATORS.AccessReviewPage.myRequestsTab(this.page);
    await tab.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await tab.click();
    await this.verifyRequestListedInQueue();
  }

  async seedRequestNotApproverOn() {
    await this.navigateToAccessReview();
    const tab = LOCATORS.AccessReviewPage.allRequestsTab(this.page);
    await tab.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await tab.click();
    await this.verifyRequestListedInQueue();
  }

  // --- Approver / Admin decisions ---

  async approverAccept() {
    const accept = LOCATORS.AccessReviewPage.acceptButton(this.page);
    await accept.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await accept.click();
    await this._confirmDialogIfPresent();
  }

  async approverReject(reason) {
    const reject = LOCATORS.AccessReviewPage.rejectButton(this.page);
    await reject.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await reject.click();
    const reasonInput = LOCATORS.AccessReviewPage.rejectionReasonInput(this.page);
    const needsReason = await reasonInput.isVisible().catch(() => false);
    if (needsReason) {
      await reasonInput.fill(reason || LOCATORS.AccessReviewPage.defaults.rejectionReason);
    }
    await this._confirmDialogIfPresent();
  }

  /** Drives the named approver's decision on the currently selected request. */
  async recordApproverDecision(which, decision) {
    const approverTab = LOCATORS.AccessReviewPage.approverTab(this.page, which);
    const hasTab = await approverTab.isVisible().catch(() => false);
    if (hasTab) await approverTab.click();
    if (/accept/i.test(decision)) {
      await this.approverAccept();
    } else {
      await this.approverReject();
    }
  }

  async adminFinalApprove() {
    const finalApprove = LOCATORS.AccessReviewPage.finalApprovalButton(this.page);
    await finalApprove.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await finalApprove.click();
    await this._confirmDialogIfPresent();
  }

  async adminFinalReject() {
    const finalReject = LOCATORS.AccessReviewPage.finalRejectButton(this.page);
    await finalReject.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await finalReject.click();
    const reasonInput = LOCATORS.AccessReviewPage.rejectionReasonInput(this.page);
    const needsReason = await reasonInput.isVisible().catch(() => false);
    if (needsReason) {
      await reasonInput.fill(LOCATORS.AccessReviewPage.defaults.rejectionReason);
    }
    await this._confirmDialogIfPresent();
  }

  async verifyAcceptRejectAvailable() {
    await expect(LOCATORS.AccessReviewPage.acceptButton(this.page)).toBeEnabled();
    await expect(LOCATORS.AccessReviewPage.rejectButton(this.page)).toBeEnabled();
  }

  async verifyAcceptRejectNotAvailable() {
    await this._expectActionUnavailable(
      LOCATORS.AccessReviewPage.acceptButton(this.page), 'Accept'
    );
    await this._expectActionUnavailable(
      LOCATORS.AccessReviewPage.rejectButton(this.page), 'Reject'
    );
  }

  async verifyFinalApprovalAvailable() {
    await expect(LOCATORS.AccessReviewPage.finalApprovalButton(this.page)).toBeEnabled();
  }

  async verifyFinalApprovalNotAvailable() {
    await this._expectActionUnavailable(
      LOCATORS.AccessReviewPage.finalApprovalButton(this.page), 'Final Approval'
    );
  }

  // --- Assertions ---

  async verifySuccessSnackBar() {
    const snackBar = LOCATORS.AccessReviewPage.snackBar(this.page);
    await snackBar.waitFor({ state: 'visible', timeout: 15000 });
    await expect(snackBar).not.toContainText(/error|failed/i);
  }

  async verifyValidationError() {
    const inlineError = LOCATORS.AccessReviewPage.validationError(this.page);
    const snackBar = LOCATORS.AccessReviewPage.snackBar(this.page);
    await Promise.any([
      inlineError.first().waitFor({ state: 'visible', timeout: 15000 }),
      snackBar.first().waitFor({ state: 'visible', timeout: 15000 }),
    ]).catch(() => {});
    const shown =
      (await inlineError.first().isVisible().catch(() => false)) ||
      (await snackBar.first().isVisible().catch(() => false));
    expect(shown, 'no validation error surfaced on the access review request').toBe(true);
  }

  async verifyRequestStatus(status) {
    const statusBadge = LOCATORS.AccessReviewPage.requestStatus(this.page);
    const onDetails = await statusBadge.first()
      .waitFor({ state: 'visible', timeout: 15000 })
      .then(() => true).catch(() => false);
    if (onDetails) {
      await expect(statusBadge.first()).toHaveText(new RegExp(status, 'i'));
      this.activeRequestStatus = status;
      return;
    }
    await this.verifyRequestInGridWithStatus(status);
    this.activeRequestStatus = status;
  }

  async verifyAuditTrailRecordsDecision() {
    const trail = LOCATORS.AccessReviewPage.auditTrail(this.page);
    await trail.waitFor({ state: 'visible', timeout: 15000 });
    await expect(trail).toContainText(/accept|approve|reject/i);
  }

  // --- Export ---

  async exportAs(format) {
    const exportButton = LOCATORS.AccessReviewPage.exportButton(this.page);
    await exportButton.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    const downloadPromise = this.page.waitForEvent('download', { timeout: 30000 })
      .catch(() => null);
    await exportButton.click();
    const option = LOCATORS.AccessReviewPage.exportFormatOption(this.page, format);
    const hasMenu = await option.isVisible().catch(() => false);
    if (hasMenu) await option.click();
    this.lastDownload = await downloadPromise;
  }

  async verifyExportDownloaded() {
    expect(this.lastDownload, 'no export download was triggered').not.toBeNull();
    const name = this.lastDownload.suggestedFilename();
    expect(name.length, 'export download has no filename').toBeGreaterThan(0);
  }

  // --- Internals ---

  async _pickFirstAutocompleteOption() {
    const option = this.page.getByRole('option').first();
    const hasOptions = await option.isVisible().catch(() => false);
    if (hasOptions) await option.click();
  }

  async _confirmDialogIfPresent() {
    const confirm = LOCATORS.AccessReviewPage.confirmDialogButton(this.page);
    const present = await confirm.isVisible().catch(() => false);
    if (present) await confirm.click();
  }

  /** Unavailable means either absent from the DOM or rendered disabled. */
  async _expectActionUnavailable(locator, label) {
    const count = await locator.count();
    if (count === 0) return;
    const disabled = await locator.first().isDisabled().catch(() => false);
    const hidden = !(await locator.first().isVisible().catch(() => false));
    expect(
      disabled || hidden,
      `"${label}" is available on this request but should not be`
    ).toBe(true);
  }
}
