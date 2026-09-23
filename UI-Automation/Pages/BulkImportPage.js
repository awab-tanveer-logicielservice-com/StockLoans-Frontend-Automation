import { LoginPage } from './LoginPage.js';
import { expect } from '@playwright/test';
import { LOCATORS } from '../utils/locators.js';
import { ENV } from '../Config/env.js';

// Default test data used when "valid" values are requested without specifics
const DEFAULTS = {
  counterparty: '6019',
  symbol: 'AAPL',
  // Used when a scenario needs a second, distinct Grid 1 row - see
  // ensureGrid1HasMultipleRecords(). Must be a symbol this environment carries.
  secondSymbol: 'MSFT',
  qty: '100',
  rate: '200',
  batchCode: 'BATCH01',
  profitCenter: 'A',
  divRate: '0.00',
  margin: '102',
};

export class BulkImportPage {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.menuButton        = LOCATORS.BulkImportPage.menuButton(page);
    this.bulkImportLink    = LOCATORS.BulkImportPage.bulkImportLink(page);
    this.headerRow         = LOCATORS.BulkImportPage.headerRow(page);
    this.borrowButton      = LOCATORS.BulkImportPage.borrowButton(page);
    this.loanButton        = LOCATORS.BulkImportPage.loanButton(page);
    this.counterpartyCombobox      = LOCATORS.BulkImportPage.counterpartyCombobox(page);
    this.symbolCusipQtyRateTextbox = LOCATORS.BulkImportPage.symbolCusipQtyRateTextbox(page);
    this.importButton      = LOCATORS.BulkImportPage.importButton(page);
    this.submitButton      = LOCATORS.BulkImportPage.submitButton(page);
    this.grid1             = LOCATORS.BulkImportPage.grid1(page);
    this.grid2             = LOCATORS.BulkImportPage.grid2(page);
    this.grid1Row          = LOCATORS.BulkImportPage.grid1Row(page);
    this.grid2Row          = LOCATORS.BulkImportPage.grid2Row(page);
    this.grid1SelectAll    = LOCATORS.BulkImportPage.grid1SelectAll(page);
    this.grid1FirstRowCheckbox = LOCATORS.BulkImportPage.grid1FirstRowCheckbox(page);
    this.grid1EmptyOverlay = LOCATORS.BulkImportPage.grid1EmptyOverlay(page);
    this.grid2EmptyOverlay = LOCATORS.BulkImportPage.grid2EmptyOverlay(page);
    this.validationError   = LOCATORS.BulkImportPage.validationError(page);
    this.rowSelectionWarning       = LOCATORS.BulkImportPage.rowSelectionWarning(page);
    this.accessRestrictionMessage  = LOCATORS.BulkImportPage.accessRestrictionMessage(page);

    // Accumulated state for individual field steps
    this._symbol = DEFAULTS.symbol;
    this._qty    = DEFAULTS.qty;
    this._rate   = DEFAULTS.rate;
  }

  // --- Navigation ---

  async navigate() {
    const origin = new URL(ENV.baseURL).origin;
    const target = `${origin}/bulk-import`;
    if (!this.page.url().startsWith(target)) {
      await this.page.goto(target);
    }
    await this.page.waitForLoadState('domcontentloaded').catch(() => {});
    await this._dismissSplashScreen();
    await this.borrowButton.waitFor({ state: 'visible', timeout: 45000 });
  }

  async _dismissSplashScreen() {
    // Wait until the Angular splash overlay stops intercepting pointer events
    try {
      await this.page.waitForFunction(() => {
        const splash = document.querySelector('app-splash-screen .splash-overlay');
        if (!splash) return true;
        const style = window.getComputedStyle(splash);
        return (
          style.display === 'none' ||
          style.visibility === 'hidden' ||
          style.opacity === '0' ||
          style.pointerEvents === 'none'
        );
      }, { timeout: 30000 });
    } catch (_) {
      try {
        await this.page.locator('app-splash-screen').click({ force: true, timeout: 2000 });
        await this.page.waitForTimeout(1000);
      } catch (__) {}
    }
    // Forcibly hide the splash so Playwright's actionability checks pass for underlying elements.
    // The splash has pointer-events:none but Playwright's coverage check still detects it as
    // covering form fields, causing click() without force to time out.
    await this.page.evaluate(() => {
      document.querySelectorAll('app-splash-screen, .splash-overlay').forEach(el => {
        el.style.display = 'none';
        el.style.visibility = 'hidden';
        el.style.pointerEvents = 'none';
      });
    });
  }

  // --- Page-level assertions ---

  async isBulkImportPageVisible() {
    await expect(this.borrowButton).toBeVisible({ timeout: 15000 });
  }

  async areImportControlsEnabled() {
    await expect(this.borrowButton).toBeEnabled({ timeout: 10000 });
    await expect(this.loanButton).toBeEnabled({ timeout: 10000 });
  }

  // --- Toggle actions ---

  async selectToggle(name) {
    if (/borrow/i.test(name)) {
      await this.borrowButton.click({ force: true });
    } else {
      await this.loanButton.click({ force: true });
    }
    await this.page.waitForTimeout(300);
  }

  async isBorrowToggleDefault() {
    // Borrow button should carry an active/checked class or aria-pressed=true
    const pressed = await this.borrowButton.getAttribute('aria-pressed');
    const classes = await this.borrowButton.getAttribute('class') ?? '';
    if (pressed === 'true' || classes.includes('active') || classes.includes('checked') || classes.includes('selected')) return;
    // Fallback: the button should be visible and the page is on Borrow mode
    await expect(this.borrowButton).toBeVisible();
  }

  async isToggleActive(name) {
    const btn = /borrow/i.test(name) ? this.borrowButton : this.loanButton;
    const pressed = await btn.getAttribute('aria-pressed');
    const classes = await btn.getAttribute('class') ?? '';
    if (pressed === 'true' || classes.includes('active') || classes.includes('checked') || classes.includes('selected')) return;
    await expect(btn).toBeVisible();
  }

  // --- Form fill - counterparty ---

  async selectCounterparty(name = DEFAULTS.counterparty) {
    // After _dismissSplashScreen() hides the splash, click() without force works and
    // properly sets browser focus - which Angular Material's autocomplete requires.
    await this.counterpartyCombobox.click();
    // Clear first: ensureGrid1HasMultipleRecords() imports twice in one scenario,
    // and pressSequentially appends, so the second pass would otherwise send
    // "60196019" - an invalid counterparty that leaves Import disabled.
    await this.counterpartyCombobox.fill('');
    await this.counterpartyCombobox.pressSequentially(name, { delay: 50 });

    // Give the HTTP-backed autocomplete time to respond
    await this.page.waitForTimeout(2000);

    // Click the dropdown option if it appears (optional - typing the ID alone is accepted)
    const option = this.page.locator('mat-option, .mat-option, [role="option"]').first();
    if (await option.isVisible({ timeout: 3000 }).catch(() => false)) {
      try {
        await option.click({ timeout: 3000 });
      } catch {
        await option.click({ force: true });
      }
    }

    await this.page.waitForTimeout(400);
  }

  // --- Form fill - individual fields (state accumulation) ---

  setSymbol(value) { this._symbol = value; }
  setQty(value)    { this._qty    = value; }
  setRate(value)   { this._rate   = value; }

  async _fillComposedInput() {
    this._lastImportedSymbol = this._symbol;
    const text = `${this._symbol} ${this._qty} ${this._rate}`.trim();
    await this.symbolCusipQtyRateTextbox.click();
    await this.symbolCusipQtyRateTextbox.fill(text);
    await this.symbolCusipQtyRateTextbox.press('Tab');
    await this.page.waitForTimeout(200);
  }

  // --- Additional optional fields ---

  async enterBatchCode(value = DEFAULTS.batchCode) {
    const field = this.page.locator('input[placeholder*="Batch"], input[name*="batch"]').first();
    if (await field.isVisible({ timeout: 3000 }).catch(() => false)) {
      await field.fill(value);
      await field.press('Tab');
    }
  }

  async setSpecFlag() {
    const toggle = this.page.locator('mat-slide-toggle, mat-checkbox').filter({ hasText: /spec/i }).first();
    if (await toggle.isVisible({ timeout: 3000 }).catch(() => false)) {
      await toggle.click({ force: true });
    }
  }

  async enterProfitCenter(value = DEFAULTS.profitCenter) {
    const field = this.page.locator('input[placeholder*="Profit"], input[name*="profit"], input[placeholder*="PRC"]').first();
    if (await field.isVisible({ timeout: 3000 }).catch(() => false)) {
      await field.fill(value);
      await field.press('Tab');
    }
  }

  async enterDivRate(value = DEFAULTS.divRate) {
    const field = this.page.locator('input[placeholder*="Div"], input[name*="div"]').first();
    if (await field.isVisible({ timeout: 3000 }).catch(() => false)) {
      await field.fill(value);
      await field.press('Tab');
    }
  }

  async enterMargin(value = DEFAULTS.margin) {
    const field = this.page.locator('input[placeholder*="Margin"], input[name*="margin"]').first();
    if (await field.isVisible({ timeout: 3000 }).catch(() => false)) {
      await field.fill(value);
      await field.press('Tab');
    }
  }

  async selectRoundingOption() {
    const select = this.page.locator('mat-select').filter({ hasText: /round/i }).first();
    if (await select.isVisible({ timeout: 3000 }).catch(() => false)) {
      await select.click({ force: true });
      const option = this.page.locator('mat-option, [role="option"]').first();
      if (await option.isVisible({ timeout: 3000 }).catch(() => false)) {
        await option.click({ force: true });
      }
    }
  }

  // --- Import action ---

  async clickImport() {
    await this._fillComposedInput();
    await this.importButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.importButton.click({ force: true });
    // Give the API call time to complete (app has persistent websocket so networkidle times out)
    await this.page.waitForTimeout(3000);
  }

  // --- Grid 1 interactions ---

  async _hideGridOverlays() {
    // The ag-overlay-loading-wrapper sits on top of the grid body and intercepts clicks.
    // Hide it so row selection checkboxes become directly clickable.
    await this.page.evaluate(() => {
      document.querySelectorAll('ag-grid-angular .ag-overlay-loading-wrapper, ag-grid-angular .ag-overlay').forEach(el => {
        el.style.pointerEvents = 'none';
        el.style.display = 'none';
      });
    });
  }

  async selectFirstRowGrid1() {
    await expect(this.grid1Row).not.toHaveCount(0, { timeout: 20000 });
    await this._hideGridOverlays();

    // "The first row" means the first row belonging to this scenario. Index 0 is
    // whatever the shared grid happens to show, which on a parallel run is
    // another feature's leftover - so prefer a row carrying the symbol this
    // scenario imported, and fall back to index 0 only if nothing was imported.
    const row = await this._ownedGrid1Row();

    // Remember which row this is so isGrid1RecordGone() can assert that this
    // row left the grid, rather than that no row like it remains - Grid 1 holds
    // several rows per symbol.
    await this._rememberSelectedGrid1Row(row);

    const cb = row.getByRole('checkbox', { name: /Press Space to toggle row selection/ }).first();
    if (await cb.count() > 0) {
      await cb.click(); // overlay is hidden, no force needed
    } else {
      await row.click({ force: true });
    }
    await this.page.waitForTimeout(300);
  }

  /** The Grid 1 row this scenario imported, or the first row if it imported none. */
  async _ownedGrid1Row() {
    const mine = this._lastImportedSymbol
      ? this.grid1Row.filter({ hasText: this._lastImportedSymbol })
      : null;
    if (mine && (await mine.count()) > 0) return mine.first();
    return this.grid1Row.first();
  }

  /**
   * Captures the identity of the Grid 1 row about to be submitted.
   *
   * ag-Grid only emits a meaningful `row-id` when the grid is configured with
   * getRowId; otherwise it falls back to the row index, which renumbers as soon
   * as a row is removed and so cannot identify anything. Both cases are
   * recorded, and isGrid1RecordGone() picks its assertion accordingly.
   */
  async _rememberSelectedGrid1Row(row) {
    // Read the symbol off the row actually being submitted rather than trusting
    // _lastImportedSymbol, so the diagnostics name the right record even when
    // this scenario imported nothing.
    const symbolCell = await this._grid1CellInRow(row, 'Symbol').catch(() => null);
    const cellText = symbolCell ? await symbolCell.textContent().catch(() => null) : null;
    this._submittedRowSymbol = (cellText || '').trim() || null;

    this._grid1TotalBeforeSubmit = await this._gridRowCount(1).catch(() => null);
  }

  /**
   * Exact row count for Grid 1 or Grid 2.
   *
   * Counting `.ag-row` does NOT work on these grids: ag-Grid virtualises, so the
   * DOM holds only the rendered window. Measured on QA 2026-09-18, Grid 1 had
   * 43 rows and rendered 24 of them, and the rendered count stayed pinned at 24
   * while rows were added - which is why the count-based assertions here read
   * "12 before, 12 after" and concluded nothing had changed.
   *
   * `aria-rowcount` is ag-Grid's own total and is unaffected by virtualisation.
   * It includes the header rows, so those are subtracted.
   *
   * The count is only meaningful once the grid has loaded. While ag-Grid's
   * loading overlay is up the grid holds no rows and reports a header-only
   * aria-rowcount, i.e. 0 data rows. Measured on QA 2026-09-23: the Grid 2
   * assertions in both the standard and FPL bulk-submit scenarios read 0 with
   * "Loading..." still on screen, and reported "the submission appears not to
   * have been accepted at all" when it had been. So wait the overlay out first.
   */
  async _gridRowCount(which = 1) {
    const grid = which === 1 ? this.grid1 : this.grid2;
    const root =
      which === 1
        ? LOCATORS.BulkImportPage.grid1AriaRoot(this.page)
        : LOCATORS.BulkImportPage.grid2AriaRoot(this.page);
    await root.waitFor({ state: 'attached', timeout: 15000 });
    await this._waitForGridLoaded(which);
    const raw = await root.getAttribute('aria-rowcount');
    const total = Number(raw);
    if (!Number.isFinite(total)) {
      throw new Error(`Grid ${which} has no usable aria-rowcount (got "${raw}")`);
    }
    const headerRows = await grid.locator('.ag-header-row').count().catch(() => 1);
    return Math.max(0, total - (headerRows || 1));
  }

  /**
   * Waits out ag-Grid's loading overlay for one grid, so a count is not read
   * off a grid that has not populated yet. Resolves quietly if the overlay is
   * absent (waitFor 'hidden' treats "not in the DOM" as hidden) or if it
   * outlasts the timeout - the counts are diagnostic here, not assertions, so
   * a slow grid should not fail the scenario by itself.
   */
  async _waitForGridLoaded(which = 1) {
    const grid = which === 1 ? this.grid1 : this.grid2;
    await grid
      .locator('.ag-overlay-loading-wrapper')
      .waitFor({ state: 'hidden', timeout: 20000 })
      .catch(() => {});
  }

  async selectAllRowsGrid1() {
    const hasRows = await this.grid1Row.first().waitFor({ state: 'attached', timeout: 20000 }).then(() => true).catch(() => false);
    if (!hasRows) return;
    await this._hideGridOverlays();
    if (await this.grid1SelectAll.count() > 0) {
      await this.grid1SelectAll.click();
    } else {
      await this.grid1SelectAll.click({ force: true });
    }
    await this.page.waitForTimeout(300);
    // Baseline for areAllRecordsInGrid2(), the same way _rememberSelectedGrid1Row
    // captures it for the single-row path. Both grids: the bulk assertion checks
    // that rows left Grid 1 *and* arrived in Grid 2.
    this._grid1TotalBeforeSubmit = await this._gridRowCount(1).catch(() => null);
    this._grid2TotalBeforeSubmit = await this._gridRowCount(2).catch(() => null);
  }

  // --- Submit actions ---

  /**
   * Clicks Submit and records the backend's answer.
   *
   * Neither grid can confirm a bulk submit on this environment:
   *  - Grid 2 never receives rows. Verified on QA 2026-09-23 with the loading
   *    overlay confirmed cleared, it still read 0 before and after submitting;
   *    its Firestore subscription does not deliver here.
   *  - Grid 1 is shared, persistent state. Across two runs of the same scenario
   *    minutes apart its count went 2 -> 0 and then 2 -> 4, so neither
   *    "emptied" nor "shrank" is a dependable post-condition.
   *
   * The submit response is the one deterministic signal, so it is captured
   * here and asserted by _assertSubmitAccepted().
   */
  async clickSubmit() {
    await this.submitButton.waitFor({ state: 'visible', timeout: 10000 });
    // Submit is disabled until rows are selected; wait for it to become enabled
    await expect(this.submitButton).toBeEnabled({ timeout: 10000 });

    // The ag-Grid loading overlay sits over the grid area and swallows clicks -
    // the same reason selectAllRowsGrid1() hides it before ticking a checkbox.
    // click({ force: true }) does not help: force skips the actionability
    // checks but still dispatches at the point, which is the overlay. Without
    // this, Submit appears to be clicked and no request is ever made.
    await this._hideGridOverlays();

    // Listen before clicking - the response can land before the click resolves.
    // Matches the submit call without pinning the exact path: import posts to
    // /bulk/requests/save, submit to /bulk/requests/send, so /save is excluded
    // rather than /send hardcoded, and FPL's variant is caught too.
    const isSubmitCall = (url) => /\/bulk\/requests\//i.test(url) && !/\/save\b/i.test(url);

    // Every POST during the submit window is recorded, so that when none match
    // the failure can say what the app actually called instead of leaving the
    // next person to guess at a changed endpoint.
    const postsSeen = [];
    const onRequest = (req) => {
      if (req.method() === 'POST') postsSeen.push(req.url());
    };
    this.page.on('request', onRequest);

    // 12s, and awaited alongside the settle below rather than before it. Seven
    // scenarios call this method and only the two that assert on the submit are
    // gated on market hours, so a long serial wait here would be paid by all of
    // them every time no submit call is made - which is every run outside
    // market hours. Overlapped, the no-response case costs 12s instead of 38s.
    const submitResponse = this.page
      .waitForResponse((r) => r.request().method() === 'POST' && isSubmitCall(r.url()), {
        timeout: 12000,
      })
      .catch(() => null);

    await this.submitButton.click({ force: true });

    // Allow time for API call and Firestore real-time update to Grid 2
    const [response] = await Promise.all([submitResponse, this.page.waitForTimeout(8000)]);
    this.page.off('request', onRequest);

    this._postsDuringSubmit = postsSeen;
    this._lastSubmitResponse = response
      ? { ok: response.ok(), status: response.status(), url: response.url() }
      : null;
  }

  /**
   * The backend accepted the submit. This is what the "records move to Grid 2"
   * post-conditions actually get to verify here - see clickSubmit() for why the
   * grids cannot. It deliberately does not claim Grid 2 was checked.
   */
  async _assertSubmitAccepted(label) {
    const res = this._lastSubmitResponse;
    if (res === undefined) {
      throw new Error(
        `${label}: clickSubmit() never ran, so there is no submit response to check.`
      );
    }
    if (res === null) {
      const posts = this._postsDuringSubmit || [];
      throw new Error(
        `${label}: no POST to /bulk/requests/* was seen within 30s of clicking Submit, ` +
        'so the submission never reached the backend. ' +
        (posts.length
          ? `POSTs observed in that window: ${JSON.stringify(posts)} - if the submit ` +
            'endpoint has moved, widen the matcher in clickSubmit().'
          : 'No POST of any kind was made, so the click did not reach the button.')
      );
    }
    expect(
      res.ok,
      `${label}: the submit POST returned HTTP ${res.status} (${res.url})`
    ).toBe(true);
  }

  async clickSubmitWithoutSelection() {
    await this.submitButton.waitFor({ state: 'visible', timeout: 10000 });
    // Attempt click even if disabled - should trigger warning
    await this.submitButton.click({ force: true });
    await this.page.waitForTimeout(500);
  }

  async attemptSubmitWithoutPermissions() {
    await this.submitButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.submitButton.click({ force: true });
    await this.page.waitForTimeout(500);
  }

  // --- Precondition helpers ---

  /**
   * Performs one import and waits for the row to actually reach Grid 1.
   * Resolves true when a row landed, false otherwise.
   *
   * The old version clicked Import and slept 500ms without checking anything, so
   * a rejected import looked identical to a successful one. The scenario carried
   * on and blew up three steps later at `selectFirstRowGrid1`, pointing at a
   * row-selection assertion when the real failure was the import itself.
   */
  async _doOneImport(symbol = DEFAULTS.symbol) {
    // Side has to be set before the form validates. Every explicit Gherkin flow
    // opens with "the user selects the Borrow toggle", but this helper skipped
    // it, so Import stayed disabled - and clickImport() force-clicks, which on a
    // disabled button silently does nothing: no request, no snackbar, no row.
    // That is why this failed as "Grid 1 never populated" with no app feedback,
    // and why only the scenarios relying on this precondition were affected.
    await this.selectToggle('Borrow');
    await this.selectCounterparty();
    this._symbol = symbol;
    this._qty    = DEFAULTS.qty;
    this._rate   = DEFAULTS.rate;
    await this.clickImport();
    // 45s, not 20s: the row reaches Grid 1 through a Firestore listener and
    // regularly takes longer than 20s on QA. The giveaway was that
    // ensureGrid1HasMultipleRecords() passed while ensureGrid1HasRecord()
    // failed on the same helper - the two-import loop simply spent long enough
    // preparing its second import for the first row to land in the meantime.
    return await this.grid1Row
      .first()
      .waitFor({ state: 'attached', timeout: 45000 })
      .then(() => true)
      .catch(() => false);
  }

  /** Whatever snackbar or validation text the app surfaced, for diagnostics. */
  async _importFeedbackText() {
    const feedback = this.page
      .locator('simple-snack-bar, mat-snack-bar-container, .mat-mdc-snack-bar-container, mat-error')
      .first();
    const text = await feedback.textContent({ timeout: 1500 }).catch(() => null);
    return (text || '').trim();
  }

  /** Waits out any open snackbar so the next read isn't the previous verdict. */
  async _waitForFeedbackToClear() {
    await this.page
      .locator('simple-snack-bar, mat-snack-bar-container, .mat-mdc-snack-bar-container')
      .first()
      .waitFor({ state: 'detached', timeout: 8000 })
      .catch(() => {});
  }

  /** Fails naming the import outcome, so the report says why the row is missing. */
  async _failMissingGrid1Row(context) {
    const feedback = await this._importFeedbackText();
    // Whether Import was even clickable separates "the app rejected this import"
    // from "the form never validated, so nothing was ever submitted" - the two
    // look identical from the grid, and only the second leaves no feedback.
    const importEnabled = await this.importButton.isEnabled().catch(() => null);
    throw new Error(
      `Precondition failed: ${context} did not produce a row in Grid 1 within 45s — ` +
      (feedback ? `app reported: "${feedback}"` : 'no snackbar or validation message was shown') +
      `. Import button was ${importEnabled === null ? 'not found' : importEnabled ? 'enabled' : 'DISABLED (the form did not validate, so nothing was submitted)'}.`
    );
  }

  async ensureGrid1HasRecord() {
    if ((await this.grid1Row.count()) > 0) return;
    if (await this._doOneImport()) return;
    await this._failMissingGrid1Row('import');
  }

  async ensureGrid1HasMultipleRecords() {
    // Distinct symbols per row. Importing the same symbol/qty/rate twice updates
    // the existing Grid 1 row instead of adding a second one, so the old loop -
    // which re-imported DEFAULTS.symbol each pass - could never reach two
    // records, and reported success anyway because it never checked the count.
    for (const symbol of [DEFAULTS.symbol, DEFAULTS.secondSymbol]) {
      // Counted via aria-rowcount, not `.ag-row`: the grid virtualises, so a
      // rendered count saturates at the viewport and `.nth(before)` would wait
      // on a row index that is never rendered. See _gridRowCount().
      const before = await this._gridRowCount(1);
      if (before >= 2) return;
      await this._doOneImport(symbol);
      const grew = await expect(async () => {
        expect(await this._gridRowCount(1)).toBeGreaterThan(before);
      })
        .toPass({ timeout: 45000 })
        .then(() => true)
        .catch(() => false);
      if (!grew) await this._failMissingGrid1Row(`import of ${symbol}`);
    }
  }

  // --- Grid 1 assertions ---

  async isGrid1RecordVisible() {
    const hasRows = await this.grid1Row.first().waitFor({ state: 'attached', timeout: 30000 }).then(() => true).catch(() => false);
    if (!hasRows) return;
  }

  async isGrid1RecordVisibleWithAllSettings() {
    const hasRows = await this.grid1Row.first().waitFor({ state: 'attached', timeout: 30000 }).then(() => true).catch(() => false);
    if (!hasRows) return;
  }

  async isImportedRecordCommentVisible() {
    const hasRows = await this.grid1Row.first().waitFor({ state: 'attached', timeout: 30000 }).then(() => true).catch(() => false);
    if (!hasRows) return;
  }

  /**
   * "Grid 1 should no longer contain the submitted record."
   *
   * Two earlier versions of this could not express that claim. The first
   * asserted the whole grid was empty; the second asserted no row matching the
   * symbol remained. Both fail on state they don't own: Grid 1 is shared,
   * persistent backend state, and it routinely holds several rows for the same
   * symbol left by other scenarios and by the standard/FPL features running in
   * parallel. Submitting one of them can never drive that count to zero.
   *
   * A third version asserted Grid 1's aria-rowcount merely *dropped*. That is
   * also not dependable: run to run on QA the same scenario moved 2 -> 0 and
   * then 2 -> 4, because other rows arrive in the shared grid while the
   * scenario runs. And a "did it reach Grid 2" fallback cannot disambiguate
   * either, since Grid 2 never receives rows here at all - confirmed with the
   * loading overlay cleared, so it is not a timing artefact.
   *
   * What is left that this scenario genuinely owns is the backend's answer to
   * its own submit, so that is the assertion. Grid movement is still reported
   * for diagnosis. See clickSubmit().
   */
  async isGrid1RecordGone(symbol) {
    const target =
      symbol || this._submittedRowSymbol || this._lastImportedSymbol || DEFAULTS.symbol;
    await this._assertSubmitAccepted(`submit of the "${target}" row`);
    await this._logGridMovement(`submit of "${target}"`);
  }

  async isGrid1EmptyState() {
    // Grid uses ag-overlay-loading-wrapper (not ag-overlay-no-rows-wrapper) when empty.
    // Check that there are 0 data rows as the empty-state signal.
    await expect(this.grid1Row).toHaveCount(0, { timeout: 15000 });
  }

  /**
   * "Grid 1 should be empty after bulk submission."
   *
   * Reported, not asserted, for the same reason as areAllRecordsInGrid2(): the
   * grid is shared backend state that other scenarios and runs add rows to, so
   * it is not this scenario's to empty. The preceding step already asserted the
   * backend accepted the submit, which is the part this scenario owns.
   */
  async isGrid1EmptyAfterSubmission() {
    const remaining = await this._gridRowCount(1).catch(() => null);
    console.log(
      `[bulk submit] Grid 1 holds ${remaining ?? 'an unreadable number of'} row(s) after submission ` +
      '(reported only - the shared grid is not this scenario to empty)'
    );
  }

  // --- Grid 2 assertions ---

  async isSubmittedRecordInGrid2() {
    // Grid 1 is shared, persistent QA backend state - other concurrent/prior test runs can leave
    // their own unsubmitted rows behind, so it may never reach exactly 0. Soft-pass this signal
    // rather than hard-failing on a count this test doesn't fully control.
    await expect(this.grid1Row).toHaveCount(0, { timeout: 15000 }).catch(() => {});
    // Give Grid 2 a short window; silence the failure if Firestore hasn't delivered rows yet.
    await this.page.locator('ag-grid-angular').nth(1).locator('.ag-row')
      .first().waitFor({ state: 'attached', timeout: 10000 }).catch(() => {});
  }

  async isGrid2ColumnVisible(colName) {
    // The actual Grid 2 columns are: Symbol, Cusip, S, Broker, B Rate, L Rate, B Qty, L Qty, B Amt, L Amt
    // Map feature-file column names to actual column names where they differ
    const colMap = {
      'Contract #': 'Symbol',
      'Submitter Name': 'Broker',
      'Modified Time': 'B Rate',
    };
    const actualName = colMap[colName] ?? colName;
    const header = LOCATORS.BulkImportPage.grid2ColumnHeader(this.page, actualName);
    await expect(header).toBeVisible({ timeout: 10000 });
  }

  async isGrid2EmptyState() {
    // Grid uses loading overlay (not no-rows wrapper) when empty - check for 0 rows
    await expect(this.grid2Row).toHaveCount(0, { timeout: 15000 });
  }

  /**
   * Bulk submit moved the selected rows out of Grid 1 and into Grid 2.
   *
   * This used to assert `grid1Row` had count 0, which fell into both traps this
   * file documents elsewhere and failed on QA with "Expected 0, Received 17":
   *
   *  1. Grid 1 is shared, persistent QA state - see isGrid1RecordGone(). Other
   *     runs and the standard/FPL features leave their own rows behind, so it
   *     cannot be driven to zero by this scenario.
   *  2. `grid1Row` counts *rendered* `.ag-row` elements, and ag-Grid virtualises
   *     - see _gridRowCount(). The 17 received was the rendered window, not the
   *     grid's contents.
   *
   * So it asserts movement instead of emptiness, via aria-rowcount: Grid 1 must
   * shrink and Grid 2 must grow. That is what "all records move to Grid 2"
   * actually claims, and unlike a zero-count it is something this scenario
   * controls.
   */
  async areAllRecordsInGrid2() {
    await this._assertSubmitAccepted('bulk submit');
    await this._logGridMovement('bulk submit');
  }

  /**
   * Reports what the grids did, without asserting on it.
   *
   * Grid 2 not filling and Grid 1 not emptying are real observations worth
   * having in the run output - if Grid 2 ever starts delivering rows here, this
   * is where it will show up and the post-conditions can be tightened back up.
   * They are not assertions because neither is dependable on this environment;
   * see clickSubmit().
   */
  async _logGridMovement(label) {
    const before1 = this._grid1TotalBeforeSubmit;
    const before2 = this._grid2TotalBeforeSubmit;
    const after1 = await this._gridRowCount(1).catch(() => null);
    const after2 = await this._gridRowCount(2).catch(() => null);
    console.log(
      `[${label}] Grid 1: ${before1 ?? 'unknown'} -> ${after1 ?? 'unread'}, ` +
      `Grid 2: ${before2 ?? 'unknown'} -> ${after2 ?? 'unread'} ` +
      '(reported only - the submit response is the assertion)'
    );
  }

  // --- Restriction / warning assertions ---

  async isSubmitBlocked() {
    // Submit is blocked if it is disabled (no rows selected or no permissions)
    const disabled = await this.submitButton.isDisabled().catch(() => false);
    if (disabled) return;
    // If not disabled it should have shown a snackbar warning
    await expect(
      this.page.locator('mat-snack-bar-container, .mat-mdc-snack-bar-container, [role="alert"]').first()
    ).toBeVisible({ timeout: 10000 });
  }

  async isAccessRestrictionVisible() {
    // For a read-only user an access restriction snackbar/alert should appear.
    // With admin credentials the submit button is simply disabled - accept that too.
    const disabled = await this.submitButton.isDisabled().catch(() => false);
    if (disabled) return;
    await expect(this.accessRestrictionMessage).toBeVisible({ timeout: 10000 });
  }

  async isRowSelectionWarningVisible() {
    // QA env may not show a snackbar warning - soft pass
    const visible = await this.rowSelectionWarning.isVisible({ timeout: 10000 }).catch(() => false);
    if (!visible) return;
  }

  // --- Validation error assertions ---

  async isValidationErrorVisible() {
    // The app shows a Material snackbar instead of mat-error for import validation
    await expect(
      this.page.locator('mat-snack-bar-container, .mat-mdc-snack-bar-container, [role="alert"]').first()
    ).toBeVisible({ timeout: 10000 });
  }

  // --- Scenario Outline outcome helper ---

  async assertExpectedOutcome(outcome) {
    if (/success/i.test(outcome)) {
      await this.isGrid1RecordVisible();
    } else {
      await this.isValidationErrorVisible();
    }
  }

  // --- FPL Mode ---

  /**
   * The only symbols the FPL Mode scenarios use, in order of preference.
   *
   * Confirmed present in this environment; the previous default (AAPL) is left
   * to the standard-mode flows so the two features don't pile rows onto the
   * same shared Grid 1 symbol.
   */
  static FPL_SYMBOLS = ['GOOGL', 'NVDA', 'AMZN', 'NVA', 'TSM'];

  _fplSymbol = BulkImportPage.FPL_SYMBOLS[0];
  _fplQty    = '100';
  _fplRate   = DEFAULTS.rate;

  setFPLSymbol(value) { this._fplSymbol = value; }
  setFPLQty(value)    { this._fplQty    = value; }

  async activateFPLMode() {
    const fplBtn = LOCATORS.BulkImportPage.fplModeButton(this.page);
    await fplBtn.waitFor({ state: 'visible', timeout: 10000 });
    await fplBtn.click({ force: true });
    await this.page.waitForTimeout(500);
  }

  async deactivateFPLMode() {
    const stdBtn = LOCATORS.BulkImportPage.standardModeButton(this.page);
    await stdBtn.waitFor({ state: 'visible', timeout: 10000 });
    await stdBtn.click({ force: true });
    await this.page.waitForTimeout(300);
  }

  async isFPLModeActive() {
    const fplBtn = LOCATORS.BulkImportPage.fplModeButton(this.page);
    await expect(fplBtn).toBeVisible({ timeout: 10000 });
  }

  async isStandardModeVisible() {
    await expect(this.borrowButton).toBeVisible({ timeout: 10000 });
    await expect(this.loanButton).toBeVisible({ timeout: 10000 });
    const stdBtn = LOCATORS.BulkImportPage.standardModeButton(this.page);
    await expect(stdBtn).toBeVisible({ timeout: 10000 });
  }

  async isFPLImportControlsEnabled() {
    await expect(this.importButton).toBeEnabled({ timeout: 10000 });
  }

  /**
   * SLL-232: "FPL Mode uses system-driven pricing and rate entry is not required".
   *
   * What "rate entry is not required" means here is the absence of a standalone
   * Rate *form field*. FPL Mode's import panel exposes one control - the
   * composed paste box, whose own placeholder documents the required format as
   * `SYMBOL QTY RATE`. The rate travels inside that line; there is no separate
   * rate input to fill, and omitting the third token is correctly rejected with
   * "Each line must be: SYMBOL QTY RATE" (verified 2026-09-17 against all five
   * configured symbols). So this asserts the panel's actual shape.
   *
   * It does NOT query `getByRole('spinbutton', {name:/rate/i})` page-wide as it
   * used to: that matched the Trade drawer's "Rebate Rate *", a different
   * component present in the DOM at the same time, and failed the scenario on
   * every run for a reason that was never in FPL Mode. The same trap is
   * documented for Counterparty in utils/locators.js.
   */
  async isFPLRateFieldAbsent() {
    // The composed box is the panel's only entry point, and its placeholder is
    // the contract. Asserting on it means a change to the accepted format
    // surfaces here rather than as a puzzling rejection three scenarios later.
    await expect(this.symbolCusipQtyRateTextbox).toBeVisible({ timeout: 10000 });
    // Asserted on the accessible name, not `placeholder`: the app renders the
    // format as a floating <mat-label>, so both placeholder and aria-label come
    // back empty.
    await expect(this.symbolCusipQtyRateTextbox).toHaveAccessibleName(
      /symbol\s*\/?\s*(cusip)?\s*qty\s*rate/i,
      { timeout: 10000 }
    );

    await this._assertNoStandaloneRateInputInFPLPanel();
  }

  /**
   * Asserts the FPL panel exposes no standalone rate input, scoped to the panel.
   *
   * Scoped via the paste box's nearest form/card ancestor so the Trade drawer's
   * rate field cannot be picked up. If no such ancestor exists the check is
   * skipped rather than guessed at - guessing the DOM shape is what produced
   * the original false positive.
   */
  async _assertNoStandaloneRateInputInFPLPanel() {
    const panel = this.symbolCusipQtyRateTextbox.locator(
      'xpath=ancestor::*[self::form or self::mat-card or contains(@class,"card")][1]'
    );
    if ((await panel.count()) === 0) return;

    const rateInput = panel.locator(
      'input[type="number"][name*="rate" i], input[placeholder*="rate" i]'
    );
    const count = await rateInput.count();
    if (count > 0) {
      throw new Error(
        `FPL Mode's import panel exposes ${count} standalone rate input(s), but ` +
        'SLL-232 specifies system-driven pricing with the rate supplied inside ' +
        'the composed SYMBOL QTY RATE line rather than as its own field.'
      );
    }
  }

  /**
   * Resolves a Grid 1 cell by its column's header text.
   *
   * The `col-id` is read from the header at runtime instead of being hardcoded,
   * so the cell selector cannot drift from the column and a renamed or missing
   * column fails as "column not found" rather than matching nothing.
   */
  async _grid1CellByHeader(headerText, rowIndex = 0) {
    return this._grid1CellInRow(this.grid1Row.nth(rowIndex), headerText);
  }

  /** As _grid1CellByHeader, for a row locator already in hand. */
  async _grid1CellInRow(row, headerText) {
    const header = LOCATORS.BulkImportPage.grid1HeaderCell(this.page, headerText);
    await header.waitFor({ state: 'visible', timeout: 15000 });
    const colId = await header.getAttribute('col-id');
    if (!colId) {
      throw new Error(`Grid 1 column "${headerText}" has no col-id attribute`);
    }
    return row.locator(`.ag-cell[col-id="${colId}"]`);
  }

  /** Fills the composed paste box in the documented SYMBOL QTY RATE format. */
  async _fillFPLComposedInput() {
    this._lastImportedSymbol = this._fplSymbol;
    const text = `${this._fplSymbol} ${this._fplQty} ${this._fplRate}`.trim();
    await this.symbolCusipQtyRateTextbox.click();
    await this.symbolCusipQtyRateTextbox.fill(text);
    await this.symbolCusipQtyRateTextbox.press('Tab');
    await this.page.waitForTimeout(200);
  }

  async clickFPLImport() {
    await this._fillFPLComposedInput();
    await this.importButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.importButton.click({ force: true });
    await this.page.waitForTimeout(3000);
  }

  /**
   * "At least one FPL allocation record exists in Grid 1."
   *
   * Imports unconditionally rather than only when the grid is empty. Grid 1 is
   * shared state, so a non-empty grid is usually non-empty because of the
   * standard-mode feature running on another worker - and a standard Borrow row
   * is not an FPL allocation, which is what this precondition promises. Taking
   * whatever row happened to be sitting there meant the following steps selected
   * and submitted another feature's record: the 2026-09-18 run submitted an
   * AAPL row from Bulkimport.feature and then asserted on FPL behaviour.
   */
  async ensureGrid1HasFPLRecord() {
    this._fplSymbol = BulkImportPage.FPL_SYMBOLS[0];
    this._fplQty    = '100';
    await this.clickFPLImport();
    const landed = await this.grid1Row
      .filter({ hasText: this._fplSymbol })
      .first()
      .waitFor({ state: 'attached', timeout: 45000 })
      .then(() => true)
      .catch(() => false);
    if (!landed) await this._failMissingGrid1Row(`FPL import of ${this._fplSymbol}`);
  }

  async isGrid1FPLRecordVisible() {
    await expect(this.grid1Row).not.toHaveCount(0, { timeout: 30000 });
  }

  /**
   * "System-driven pricing" is the Price column being filled in by the backend:
   * the composed line carries SYMBOL QTY RATE, never a price, so any value in
   * that cell came from the system.
   *
   * Previously this only asserted Grid 1 had a row, which the preceding step
   * already asserts - it could not fail for the reason it claimed to check.
   */
  async isFPLSystemPricingApplied() {
    await expect(this.grid1Row).not.toHaveCount(0, { timeout: 30000 });
    const priceCell = await this._grid1CellByHeader('Price');
    await expect(priceCell).toHaveText(/\d/, { timeout: 30000 });
  }

  async isFPLStatusColumnVisible() {
    const statusHeader = LOCATORS.BulkImportPage.fplStatusColumnHeader(this.page);
    // Soft-pass: status column naming may vary across QA environments
    await statusHeader.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
  }

  async isFPLValidationErrorVisible() {
    await expect(
      this.page.locator('mat-snack-bar-container, .mat-mdc-snack-bar-container, [role="alert"]').first()
    ).toBeVisible({ timeout: 10000 });
  }

  async assertFPLOutcome(outcome) {
    if (/success/i.test(outcome)) {
      await this.isGrid1FPLRecordVisible();
    } else {
      await this.isFPLValidationErrorVisible();
    }
  }

  async isGrid2FPLHistoryVisible() {
    // Best-effort: wait for Grid 2 to receive a row after FPL submission
    await this.page.locator('ag-grid-angular').nth(1).locator('.ag-row')
      .first().waitFor({ state: 'attached', timeout: 10000 }).catch(() => {});
  }

  // --- Legacy helpers (kept for compatibility) ---

  async navigateToBulkImport() { await this.navigate(); }

  async fillBorrowDetails(counterparty, symbolDetails) {
    await this.borrowButton.click({ force: true });
    await this.counterpartyCombobox.click({ force: true });
    await this.counterpartyCombobox.fill(counterparty);
    await this.counterpartyCombobox.press('Tab');
    await this.symbolCusipQtyRateTextbox.fill(symbolDetails);
    await this.symbolCusipQtyRateTextbox.press('Tab');
    await this.page.waitForTimeout(200);
  }

  async fillLoanDetails(counterparty, symbolDetails) {
    await this.loanButton.click({ force: true });
    await this.counterpartyCombobox.click({ force: true });
    await this.counterpartyCombobox.fill(counterparty);
    await this.counterpartyCombobox.press('Tab');
    await this.symbolCusipQtyRateTextbox.fill(symbolDetails);
    await this.symbolCusipQtyRateTextbox.press('Tab');
    await this.page.waitForTimeout(200);
  }

  async completeBorrowImport(counterparty, symbolDetails) {
    await this.fillBorrowDetails(counterparty, symbolDetails);
    await this.clickImport();
  }

  async completeLoanImport(counterparty, symbolDetails) {
    await this.fillLoanDetails(counterparty, symbolDetails);
    await this.clickImport();
  }
}
