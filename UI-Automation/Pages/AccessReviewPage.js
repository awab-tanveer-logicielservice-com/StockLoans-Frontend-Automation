import { expect } from '@playwright/test';
import { LOCATORS } from '../utils/locators.js';
import { ENV } from '../Config/env.js';

const AR = () => LOCATORS.AccessReviewPage;

/**
 * Access Reviews - SLL-236.
 *
 * Verified against the built screen on QA. The feature is an access
 * *certification*, not a single-user role-change request:
 *
 *   initiator picks Reviewer 1 + Reviewer 2
 *     -> PENDING REVIEW          R1 flags role changes on the user snapshot, Submit Flags
 *     -> AWAITING SECOND REVIEW  R2 agrees/disagrees each flag, Sign Off
 *     -> AWAITING ADMIN ACTION   admin applies flags, Generate Final Snapshot
 *     -> AWAITING CONFIRMATION   Confirm (or Reject, which sends it back to admin)
 *     -> COMPLETE
 *
 * The workflow is stateful and spans multiple accounts, so this page object owns
 * user switching too: the app keeps its Firebase session in IndexedDB, which
 * storageState does not carry, so switching identity means a real sign-out plus
 * a real login (see utils/auth.js and the note in commonSteps.js).
 */
export class AccessReviewPage {
  constructor(page) {
    this.page = page;
    /** Review ID this scenario is working with, captured on initiate. */
    this.activeReviewId = null;
    this.lastDownload = null;
  }

  defaultTimeout = 15000;
  gridTimeout = 30000;

  get origin() {
    return new URL(ENV.baseURL).origin;
  }

  // --- Identity ---

  /**
   * Full sign-out. Clearing cookies alone is not enough - the Firebase session
   * lives in IndexedDB, so it survives a cookie clear and the next login would
   * silently stay on the previous account.
   */
  async signOut() {
    await this.page.context().clearCookies();
    await this.page.goto(`${this.origin}/login`, { waitUntil: 'domcontentloaded' }).catch(() => {});
    await this.page.evaluate(async () => {
      try {
        window.localStorage.clear();
        window.sessionStorage.clear();
      } catch {}
      if (window.indexedDB?.databases) {
        const dbs = await window.indexedDB.databases().catch(() => []);
        await Promise.all(
          dbs.filter((d) => d.name).map(
            (d) =>
              new Promise((res) => {
                const req = window.indexedDB.deleteDatabase(d.name);
                req.onsuccess = req.onerror = req.onblocked = () => res();
              })
          )
        );
      }
    }).catch(() => {});
    await this.page.goto(`${this.origin}/login`, { waitUntil: 'domcontentloaded' });
  }

  // --- Navigation ---

  async navigateToAccessReviews() {
    const target = `${this.origin}/access-reviews`;
    if (this.page.url() !== target) {
      await this.page.goto(target, { waitUntil: 'domcontentloaded' });
    }
    await this.waitForGridSettled();
  }

  async reloadAccessReviews() {
    await this.page.reload({ waitUntil: 'domcontentloaded' });
    await this.waitForGridSettled();
  }

  /**
   * Gets fresh grid data from wherever we are: navigates if we are on a detail
   * page, reloads if we are already on the grid. navigateToAccessReviews() alone
   * is not enough inside a poll - it short-circuits when the URL already matches,
   * so it would keep re-reading the same stale rows.
   */
  async refreshAccessReviews() {
    // Compare the exact pathname, not a prefix: "/access-reviews/34" starts with
    // "/access-reviews", so a startsWith check treats a DETAIL page as the grid
    // and reloads it forever - the grid rows never appear and row lookups return
    // null until the poll expires.
    const onGrid = new URL(this.page.url()).pathname.replace(/\/+$/, '') === '/access-reviews';
    if (onGrid) {
      await this.reloadAccessReviews();
    } else {
      await this.navigateToAccessReviews();
    }
  }

  /** The grid fetches after first render, so gate on a row or the empty overlay. */
  async waitForGridSettled() {
    await this.page.locator('.ag-overlay-loading-wrapper')
      .waitFor({ state: 'hidden', timeout: this.gridTimeout }).catch(() => {});
    await Promise.any([
      AR().gridRows(this.page).first().waitFor({ state: 'visible', timeout: this.gridTimeout }),
      AR().emptyGridOverlay(this.page).waitFor({ state: 'visible', timeout: this.gridTimeout }),
    ]).catch(() => {});
  }

  /**
   * Opens Access Reviews from the sidebar.
   *
   * The sidebar is collapsed off-screen by default - the link sits at x=-244
   * with pointer-events:none, so it reports as "visible" but no click can ever
   * land on it. The menu toggle has to slide it in first.
   */
  async openNavLink() {
    const toggle = AR().menuButton(this.page);
    await toggle.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await toggle.click();
    const link = AR().navLink(this.page).first();
    await expect
      .poll(async () => {
        const box = await link.boundingBox().catch(() => null);
        return box ? box.x : -1;
      }, { message: 'sidebar should slide into view', timeout: this.defaultTimeout })
      .toBeGreaterThanOrEqual(0);
    await link.click();
    await this.waitForGridSettled();
  }

  // --- Initiate ---

  async openInitiateDialog() {
    const btn = AR().newAccessReviewButton(this.page);
    await btn.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await btn.click();
    await AR().initiateDialogHeading(this.page)
      .waitFor({ state: 'visible', timeout: this.defaultTimeout });
    // The dialog opens showing "Loading users…" and renders the two Reviewer
    // selects only once that resolves. Without this gate the selects do not
    // exist yet, and a scoped lookup silently falls through to the global Trade
    // panel's hidden mat-select (formcontrolname="roundRuleValue") instead.
    await AR().loadingUsers(this.page)
      .waitFor({ state: 'hidden', timeout: this.gridTimeout }).catch(() => {});
    await expect
      .poll(async () => AR().reviewerSelect(this.page, 1).count(), {
        message: 'both Reviewer selects should render once the user list loads',
        timeout: this.gridTimeout,
      })
      .toBeGreaterThan(0);
  }

  /** Picks a reviewer by display name from the Reviewer 1 (0) / Reviewer 2 (1) select. */
  async selectReviewer(index, name) {
    const select = AR().reviewerSelect(this.page, index);
    await select.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await select.click();
    const option = AR().reviewerOption(this.page, name);
    await option.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await option.click();
    // Material closes the overlay asynchronously; the next select is unclickable until it does.
    await this.page.locator('.cdk-overlay-backdrop')
      .waitFor({ state: 'detached', timeout: 5000 }).catch(() => {});
  }

  async enterNotes(notes) {
    const input = AR().notesInput(this.page);
    if (await input.isVisible().catch(() => false)) {
      await input.fill(notes ?? AR().defaults.notes);
    }
  }

  async submitInitiateDialog() {
    const btn = AR().initiateReviewButton(this.page);
    await btn.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await expect(btn, 'Initiate Review should be enabled once both reviewers are set').toBeEnabled();
    await btn.click();
    await AR().initiateDialogHeading(this.page)
      .waitFor({ state: 'hidden', timeout: this.defaultTimeout }).catch(() => {});
    await this.waitForGridSettled();
  }

  /** Raises a review with the configured reviewers and records its Review ID. */
  async initiateReview(reviewer1, reviewer2) {
    const r1 = reviewer1 || AR().defaults.reviewer1;
    const r2 = reviewer2 || AR().defaults.reviewer2;
    await this.navigateToAccessReviews();
    const before = await this.readTopReviewId();
    await this.openInitiateDialog();
    await this.selectReviewer(0, r1);
    await this.selectReviewer(1, r2);
    await this.enterNotes();
    await this.submitInitiateDialog();

    // The new review lands at the top (grid is sorted by Created desc).
    await expect
      .poll(async () => this.readTopReviewId(), {
        message: 'a new review should appear at the top of the grid',
        timeout: this.gridTimeout,
      })
      .not.toBe(before);
    this.activeReviewId = await this.readTopReviewId();
    return this.activeReviewId;
  }

  async verifyInitiateReviewDisabled() {
    const btn = AR().initiateReviewButton(this.page);
    await btn.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await expect(btn, 'Initiate Review should stay disabled until both reviewers are chosen')
      .toBeDisabled();
  }

  async cancelInitiateDialog() {
    await AR().cancelButton(this.page).click();
    await AR().initiateDialogHeading(this.page)
      .waitFor({ state: 'hidden', timeout: this.defaultTimeout });
  }

  // --- Landing grid reads ---

  async readTopReviewId() {
    const cell = AR().gridCell(this.page, 0, 'reviewId');
    const visible = await cell.waitFor({ state: 'visible', timeout: this.gridTimeout })
      .then(() => true).catch(() => false);
    if (!visible) return null;
    return ((await cell.textContent()) || '').trim();
  }

  async readTopStatus() {
    const cell = AR().gridCell(this.page, 0, 'status');
    await cell.waitFor({ state: 'visible', timeout: this.gridTimeout });
    return ((await cell.textContent()) || '').trim();
  }

  async readStatusOf(reviewId) {
    const row = AR().rowByReviewId(this.page, reviewId);
    await row.first().waitFor({ state: 'visible', timeout: this.gridTimeout });
    return ((await row.first().locator('.ag-cell[col-id="status"]').textContent()) || '').trim();
  }

  async verifyColumnVisible(columnName) {
    const header = this.page.locator('.ag-header-cell-text').filter({ hasText: columnName });
    await header.first().waitFor({ state: 'visible', timeout: this.gridTimeout });
  }

  async verifyLegendChipVisible(label) {
    await AR().legendChip(this.page, label)
      .first().waitFor({ state: 'visible', timeout: this.defaultTimeout });
  }

  async verifyTopRowStatus(expected) {
    await expect
      .poll(async () => {
        await this.refreshAccessReviews();
        return this.readTopStatus().catch(() => null);
      }, { message: `top row should reach "${expected}"`, timeout: 90000, intervals: [3000] })
      .toBe(expected);
  }

  async verifyActiveReviewStatus(expected) {
    const id = this.activeReviewId;
    if (!id) throw new Error('no active review id — initiate a review first');
    await expect
      .poll(async () => {
        await this.refreshAccessReviews();
        return this.readStatusOf(id).catch(() => null);
      }, { message: `review #${id} should read "${expected}" in the grid`, timeout: 90000, intervals: [3000] })
      .toBe(expected);
  }

  async verifyGridHasRows() {
    const rows = AR().gridRows(this.page);
    await rows.first().waitFor({ state: 'visible', timeout: this.gridTimeout });
    expect(await rows.count()).toBeGreaterThan(0);
  }

  async filterColumn(colId, value) {
    const input = AR().columnFilterInput(this.page, colId);
    await input.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await input.fill(value);
    await this.waitForGridStable();
  }

  /**
   * Filters the Status column by a status as the grid DISPLAYS it.
   *
   * The cell renders "PENDING REVIEW" but the filter matches the underlying
   * value, which is underscored - filtering on the displayed text returns zero
   * rows. Measured on QA: "PENDING REVIEW" -> 0, "PENDING_REVIEW" -> 5,
   * "AWAITING SECOND REVIEW" -> 0, "AWAITING_SECOND_REVIEW" -> 3.
   */
  async filterByStatus(displayStatus) {
    await this.filterColumn('status', displayStatus.trim().replace(/\s+/g, '_'));
  }

  /**
   * Waits for the row count to stop moving.
   *
   * AG-Grid debounces the floating filter and then re-renders, so reading the
   * row count straight after typing returns the PREVIOUS filter's result. A
   * fixed pause papered over it only sometimes - this gates on two consecutive
   * identical counts instead.
   */
  async waitForGridStable() {
    const rows = AR().gridRows(this.page);
    let last = -1;
    let stable = 0;
    const deadline = Date.now() + 20000;
    while (Date.now() < deadline) {
      await this.page.waitForTimeout(600);
      const count = await rows.count().catch(() => -1);
      stable = count === last ? stable + 1 : 0;
      last = count;
      // Two identical reads after the debounce window has had time to fire.
      if (stable >= 2) return count;
    }
    return last;
  }

  async verifyEmptyStateOverlay() {
    await AR().emptyGridOverlay(this.page)
      .waitFor({ state: 'visible', timeout: this.gridTimeout });
  }

  // --- Detail page ---

  /** Opens a review's detail page. Double-click matches how the grid is used. */
  async openReview(reviewId) {
    const id = reviewId || this.activeReviewId;
    await this.navigateToAccessReviews();
    const row = id
      ? AR().rowByReviewId(this.page, id).first()
      : AR().gridRows(this.page).first();
    await row.waitFor({ state: 'visible', timeout: this.gridTimeout });
    await row.dblclick();
    await AR().detailHeading(this.page)
      .waitFor({ state: 'visible', timeout: this.gridTimeout });
    if (!this.activeReviewId) {
      const heading = (await AR().detailHeading(this.page).textContent()) || '';
      this.activeReviewId = (heading.match(/#(\d+)/) || [])[1] ?? null;
    }
  }

  async openTopReview() {
    await this.navigateToAccessReviews();
    this.activeReviewId = await this.readTopReviewId();
    await this.openReview(this.activeReviewId);
  }

  async verifyDetailHeadingVisible() {
    await AR().detailHeading(this.page)
      .waitFor({ state: 'visible', timeout: this.gridTimeout });
  }

  async readDetailStatus() {
    const badge = AR().detailStatusBadge(this.page).first();
    await badge.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    return ((await badge.textContent()) || '').trim();
  }

  async verifyDetailStatus(expected) {
    expect(await this.readDetailStatus()).toBe(expected);
  }

  /**
   * Asserts the active review's status from wherever we happen to be.
   *
   * The workflow alternates between the two views - initiating drops you back on
   * the landing grid, while every reviewer/admin action happens on the detail
   * page - so a status check has to read whichever one is on screen. Reading the
   * detail badge on the grid returns null, which is what made the lifecycle
   * scenario fail on its first assertion.
   */
  async verifyStatus(expected) {
    await expect
      .poll(
        async () => {
          const onDetail = await AR().detailHeading(this.page)
            .isVisible().catch(() => false);
          if (onDetail) return this.readDetailStatus().catch(() => null);
          if (!this.activeReviewId) return null;
          await this.refreshAccessReviews().catch(() => {});
          return this.readStatusOf(this.activeReviewId).catch(() => null);
        },
        {
          message: `review #${this.activeReviewId ?? '?'} should reach "${expected}"`,
          timeout: 90000,
          intervals: [1500, 2000, 3000],
        }
      )
      .toBe(expected);
  }

  /** The "Your turn (...)" banner - the app's own statement of whose action is due. */
  async readTurnBanner() {
    const banner = AR().turnBanner(this.page);
    const visible = await banner.waitFor({ state: 'visible', timeout: this.defaultTimeout })
      .then(() => true).catch(() => false);
    return visible ? ((await banner.textContent()) || '').trim().replace(/\s+/g, ' ') : '';
  }

  async verifyTurnBannerMentions(text) {
    const banner = await this.readTurnBanner();
    expect(banner, `turn banner should mention "${text}"`).toContain(text);
  }

  async openTab(name) {
    const tab = AR().tab(this.page, name);
    await tab.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await tab.click();
    await this.page.waitForTimeout(1500);
  }

  async verifyTabVisible(name) {
    await AR().tab(this.page, name)
      .waitFor({ state: 'visible', timeout: this.defaultTimeout });
  }

  async verifyTabNotPresent(name) {
    expect(await AR().tab(this.page, name).count(),
      `"${name}" tab should not be present at this stage`).toBe(0);
  }

  // --- Reviewer 1: flag role changes ---

  async openModifyPanelFor(userName) {
    const name = userName || AR().defaults.flagTargetUser;
    await this.openTab(/user snapshot/i);
    const row = AR().snapshotRowByName(this.page, name);
    await row.waitFor({ state: 'visible', timeout: this.gridTimeout });
    await row.scrollIntoViewIfNeeded().catch(() => {});
    const modify = AR().modifyButtonInRow(this.page, name);
    await modify.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await modify.click();
    await AR().modifyPanelTitle(this.page)
      .waitFor({ state: 'visible', timeout: this.defaultTimeout });
  }

  /** Flips one role toggle and returns the direction, so assertions can name it. */
  async toggleRole(roleLabel) {
    const label = roleLabel || AR().defaults.flagRole;
    const toggle = AR().roleToggle(this.page, label);
    await toggle.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await toggle.scrollIntoViewIfNeeded().catch(() => {});
    const before = await toggle.getAttribute('aria-checked').catch(() => null);
    await toggle.click();
    await expect
      .poll(async () => toggle.getAttribute('aria-checked').catch(() => null), {
        message: `"${label}" toggle should flip`,
        timeout: 8000,
      })
      .not.toBe(before);
    return before === 'true' ? 'REMOVE ROLE' : 'ADD ROLE';
  }

  async enterModifyComment(comment) {
    const input = AR().modifyCommentInput(this.page);
    if (await input.isVisible().catch(() => false)) {
      await input.fill(comment ?? AR().defaults.flagComment);
    }
  }

  async applyChanges() {
    const btn = AR().applyChangesButton(this.page);
    await btn.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await btn.scrollIntoViewIfNeeded().catch(() => {});
    await expect(btn, 'Apply Changes should be enabled once a role is toggled').toBeEnabled();
    await btn.click();
    // Panel closes on success.
    await AR().modifyPanelTitle(this.page)
      .waitFor({ state: 'hidden', timeout: this.defaultTimeout }).catch(() => {});
  }

  /** Flags one role change on one user: MODIFY -> toggle -> comment -> Apply Changes. */
  async flagRoleChange(userName, roleLabel) {
    await this.openModifyPanelFor(userName);
    const direction = await this.toggleRole(roleLabel);
    await this.enterModifyComment();
    await this.applyChanges();
    return direction;
  }

  async submitFlags() {
    const btn = AR().submitFlagsButton(this.page);
    await btn.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await expect(btn, 'Submit Flags should be enabled once a flag exists').toBeEnabled();
    await btn.click();
    await this.waitForStatusChangeFrom(AR().STATUS.pendingReview);
  }

  // --- Reviewer 2: agree and sign off ---

  async verifyFlagRowPresent(userName, action) {
    await this.openTab(/flags & actions/i);
    const rows = AR().flagsGridRows(this.page);
    await rows.first().waitFor({ state: 'visible', timeout: this.gridTimeout });
    const row = rows.filter({ hasText: userName || AR().defaults.flagTargetUser }).first();
    await row.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    if (action) await expect(row).toContainText(new RegExp(action.replace(/[_ ]/g, '[_ ]'), 'i'));
  }

  async setAgreeOnAllFlags(comment) {
    await this.openTab(/flags & actions/i);
    const panel = AR().reviewFlagsPanel(this.page);
    await panel.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    const toggles = panel.getByRole('switch');
    const count = await toggles.count();
    expect(count, 'there should be at least one flag to review').toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const t = toggles.nth(i);
      await t.scrollIntoViewIfNeeded().catch(() => {});
      // Label reads "Disagree" until switched on, then "Agree".
      if ((await t.getAttribute('aria-checked').catch(() => null)) !== 'true') {
        await t.click();
        await expect
          .poll(async () => t.getAttribute('aria-checked').catch(() => null), { timeout: 8000 })
          .toBe('true');
      }
      // Filled, not skipped: an earlier version guarded this on isVisible() with
      // a placeholder-based locator that never matched, so the comment silently
      // never got entered and the step still reported success.
      const c = AR().flagCommentInput(this.page, i);
      await c.waitFor({ state: 'visible', timeout: this.defaultTimeout });
      await c.fill(comment ?? AR().defaults.agreeComment);
    }
  }

  async enterOverallSignOffComment(comment) {
    const input = AR().overallSignOffCommentInput(this.page);
    await input.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await input.fill(comment ?? AR().defaults.signOffComment);
  }

  async signOff() {
    const btn = AR().signOffButton(this.page);
    await btn.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await btn.scrollIntoViewIfNeeded().catch(() => {});
    await expect(btn, 'Sign Off should be enabled once every flag has a decision').toBeEnabled();
    await btn.click();
    await this.waitForStatusChangeFrom(AR().STATUS.awaitingSecondReview);
  }

  // --- Admin: generate the final snapshot ---

  async generateFinalSnapshot() {
    const btn = AR().generateFinalSnapshotButton(this.page);
    await btn.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await expect(btn, 'Generate Final Snapshot should be enabled for the admin').toBeEnabled();
    await btn.click();
    await this.waitForStatusChangeFrom(AR().STATUS.awaitingAdminAction);
  }

  async verifyGenerateFinalSnapshotNotAvailable() {
    const btn = AR().generateFinalSnapshotButton(this.page);
    const count = await btn.count();
    if (count === 0) return;
    const enabled = await btn.first().isEnabled().catch(() => false);
    expect(enabled, 'Generate Final Snapshot should not be actionable at this stage').toBe(false);
  }

  // --- Confirmation ---

  /**
   * Confirms the final state as the signed-in account.
   *
   * Both parties have to confirm before a review completes, so this records ONE
   * confirmation. It then verifies its own effect: an earlier version clicked and
   * slept 3s, and when the click did not register the run reported the step as
   * passed and only failed later on the status assertion, pointing at the wrong
   * place. Now the click has to visibly consume this account's Confirm, or move
   * the review on, before the step returns.
   */
  async confirmFinalState(comment) {
    await this.openTab(/final snapshot/i);
    const panel = AR().confirmFinalStatePanel(this.page);
    await panel.waitFor({ state: 'visible', timeout: this.defaultTimeout });

    const input = AR().confirmCommentInput(this.page);
    await input.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await input.fill(comment ?? AR().defaults.confirmComment);

    const btn = AR().confirmButton(this.page);
    await btn.scrollIntoViewIfNeeded().catch(() => {});
    await expect(btn, 'Confirm should be enabled on the Final Snapshot tab').toBeEnabled();

    // Gate on the actual request, not on the DOM. A previous version watched for
    // the Confirm button to disappear, and a transient re-render satisfied that
    // while the click had in fact done nothing - so the step passed and the run
    // failed three steps later pointing at the wrong place.
    const pending = this.page
      .waitForResponse(
        (r) => /\/access-review\/\d+\/confirm\b/.test(r.url()) && r.request().method() === 'PUT',
        { timeout: 30000 }
      )
      .catch(() => null);
    await btn.click();
    const response = await pending;

    expect(response, 'clicking Confirm should PUT .../access-review/{id}/confirm').not.toBeNull();
    expect(
      response.status(),
      `the confirm request failed with HTTP ${response.status()}`
    ).toBeLessThan(400);
  }

  async rejectFinalState(comment) {
    await this.openTab(/final snapshot/i);
    const input = AR().confirmCommentInput(this.page);
    if (await input.isVisible().catch(() => false)) {
      await input.fill(comment ?? 'Rejected by automation.');
    }
    await AR().rejectButton(this.page).click();
    await this.page.waitForTimeout(3000);
  }

  /** True when this account still has a confirmation pending on the open review. */
  async isConfirmationPending() {
    const status = await this.readDetailStatus().catch(() => '');
    if (status !== AR().STATUS.awaitingConfirmation) return false;
    const tabPresent = await AR().finalSnapshotTab(this.page).count();
    if (!tabPresent) return false;
    await this.openTab(/final snapshot/i);
    return AR().confirmButton(this.page).isVisible().catch(() => false);
  }

  // --- Sign-off history / audit ---

  async verifySignOffHistoryRecords(text) {
    await this.openTab(/sign-off history/i);
    const body = this.page.locator('body');
    await expect(body).toContainText(new RegExp(text, 'i'));
  }

  // --- Export ---

  async exportReview() {
    const btn = AR().exportButton(this.page);
    await btn.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    const download = this.page.waitForEvent('download', { timeout: 30000 }).catch(() => null);
    await btn.click();
    this.lastDownload = await download;
  }

  async verifyExportDownloaded() {
    expect(this.lastDownload, 'Export did not produce a download').not.toBeNull();
    const name = this.lastDownload.suggestedFilename();
    expect(name.length, 'export download has no filename').toBeGreaterThan(0);
  }

  // --- Misc ---

  async verifyPageNotCrashed() {
    await this.page.locator('main, [role="main"], h1, h2').first()
      .waitFor({ state: 'visible', timeout: this.defaultTimeout });
  }

  /**
   * Waits for the detail page to leave `from`. Each workflow action is a server
   * round-trip, so asserting the next status immediately is racy.
   */
  async waitForStatusChangeFrom(from) {
    await expect
      .poll(async () => this.readDetailStatus().catch(() => from), {
        message: `status should advance past "${from}"`,
        timeout: 60000,
        intervals: [1500, 2000, 3000],
      })
      .not.toBe(from);
  }
}
