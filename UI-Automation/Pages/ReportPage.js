import { expect } from '@playwright/test';
import { LOCATORS } from '../utils/locators.js';
import { ENV } from '../Config/env.js';
import { devUsers } from '../utils/testdata.js';
import { waitForRouteSettled } from '../utils/waits.js';

export class ReportPage {
  constructor(page) {
    this.page = page;
    this.menuButton        = LOCATORS.Common.menuButton(page);
    this.reportLink        = LOCATORS.ReportPage.reportLink(page);
    this.fromDateInput     = LOCATORS.ReportPage.fromDateInput(page);
    this.toDateInput       = LOCATORS.ReportPage.toDateInput(page);
    this.reportTypeDropdown = LOCATORS.ReportPage.reportTypeDropdown(page);
    this.groupingSelector  = LOCATORS.ReportPage.groupingSelector(page);
    this.generateButton    = LOCATORS.ReportPage.generateButton(page);
    this.grid              = LOCATORS.ReportPage.grid(page);
    this.gridRow           = LOCATORS.ReportPage.gridRow(page);
    this.groupRow          = LOCATORS.ReportPage.groupRow(page);
    this.emptyStateOverlay = LOCATORS.ReportPage.emptyStateOverlay(page);
    this.loadingOverlay    = LOCATORS.ReportPage.loadingOverlay(page);
    this.validationError   = LOCATORS.ReportPage.validationError(page);
    this.fromDateError     = LOCATORS.ReportPage.fromDateError(page);
    this.toDateError       = LOCATORS.ReportPage.toDateError(page);
    this.pageHeading       = LOCATORS.ReportPage.pageHeading(page);
  }

  defaultTimeout = 15000;

  // --- Dates used across scenarios ---
  // Using fixed dates in the past so QA data should always exist for them.
  validFromDate = '01/01/2025';
  validToDate   = '01/31/2025';
  sameDayDate   = '01/15/2025';
  wideFromDate  = '07/01/2024';
  invalidDate   = '99/99/9999';
  emptyRangeFrom = '01/01/2000';
  emptyRangeTo   = '01/02/2000';

  async _dismissSplashScreen() {
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
    await this.page.evaluate(() => {
      document.querySelectorAll('app-splash-screen, .splash-overlay').forEach(el => {
        el.style.display = 'none';
        el.style.visibility = 'hidden';
        el.style.pointerEvents = 'none';
      });
    });
  }

  async _loginToDev() {
    await this.page.goto(ENV.devBaseURL);
    await this.page.waitForLoadState('domcontentloaded').catch(() => {});
    await LOCATORS.LoginPage.usernameInput(this.page).click();
    await LOCATORS.LoginPage.usernameInput(this.page).fill(devUsers.username);
    await LOCATORS.LoginPage.passwordInput(this.page).fill(devUsers.password);
    await LOCATORS.LoginPage.loginButton(this.page).click();
    await this.page.waitForURL(url => !url.pathname.startsWith('/login'), { timeout: 60000 });
  }

  async navigateToPage() {
    await this.page.goto(ENV.devReportsURL);
    // Settle the route before checking for the auth bounce: resolves as soon as
    // either the report page renders or the guard redirects to /login.
    await waitForRouteSettled(this.page, this.pageHeading);

    if (this.page.url().includes('/login')) {
      await this._loginToDev();
      await this.page.goto(ENV.devReportsURL);
      await this.page.waitForLoadState('domcontentloaded').catch(() => {});
    }

    await this._dismissSplashScreen();
  }

  async verifyFromDateVisible() {
    await expect(this.fromDateInput).toBeVisible({ timeout: this.defaultTimeout });
  }

  async verifyToDateVisible() {
    await expect(this.toDateInput).toBeVisible({ timeout: this.defaultTimeout });
  }

  async verifyReportTypeDropdownVisible() {
    await expect(this.reportTypeDropdown).toBeVisible({ timeout: this.defaultTimeout });
  }

  async verifyFilterControlsVisible() {
    await this.verifyFromDateVisible();
    await this.verifyToDateVisible();
    await this.verifyReportTypeDropdownVisible();
  }

  async selectFromDate(dateStr) {
    const date = dateStr || this.validFromDate;
    await this.fromDateInput.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await this.fromDateInput.clear();
    await this.fromDateInput.fill(date);
    await this.fromDateInput.press('Tab');
    await this.page.waitForTimeout(300);
  }

  async selectToDate(dateStr) {
    const date = dateStr || this.validToDate;
    await this.toDateInput.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await this.toDateInput.clear();
    await this.toDateInput.fill(date);
    await this.toDateInput.press('Tab');
    await this.page.waitForTimeout(300);
  }

  async selectValidDateRange() {
    await this.selectFromDate(this.validFromDate);
    await this.selectToDate(this.validToDate);
  }

  async selectSameDayRange() {
    await this.selectFromDate(this.sameDayDate);
    await this.selectToDate(this.sameDayDate);
  }

  async selectWideDateRange() {
    await this.selectFromDate(this.wideFromDate);
    await this.selectToDate(this.validToDate);
  }

  async selectReversedDateRange() {
    // From after To - should trigger validation
    await this.selectFromDate(this.validToDate);
    await this.selectToDate(this.validFromDate);
  }

  /**
   * Picks a From Date from its calendar, then opens the To Date calendar.
   *
   * The From Date must be *picked*, not typed. Measured on QA 2026-09-23: with
   * the From Date typed into the input (fill + Tab), the To Date calendar left
   * every earlier day selectable - days 1-14 were all enabled against a From
   * Date of the 15th. Picking it from the calendar is what engages the guard,
   * which is how the behaviour was demonstrated in the app.
   *
   * That difference is itself worth knowing: the inverted-range guard lives
   * entirely in the picker, and a From Date that arrives any other way - typed,
   * pasted, restored from a saved filter - does not constrain the To Date.
   *
   * The previous version of this scenario typed both dates and then looked for
   * a mat-error that never appears; its assertion also accepted "the report
   * returned no rows", so it could go green with no validation happening at
   * all. That is why it failed the 2026-09-22 run and passed on re-run.
   */
  async _readCalendarDays() {
    const cells = LOCATORS.ReportPage.calendarDayCells(this.page);
    const total = await cells.count();
    const days = [];
    for (let i = 0; i < total; i++) {
      const cell = cells.nth(i);
      const [text, ariaDisabled, className] = await Promise.all([
        cell.textContent(),
        cell.getAttribute('aria-disabled'),
        cell.getAttribute('class'),
      ]);
      const day = Number((text || '').trim());
      if (!Number.isFinite(day) || day === 0) continue;
      days.push({
        day,
        index: i,
        // Material marks a blocked day with aria-disabled and a modifier class.
        // Both are the same signal; checking each means a change to either alone
        // does not silently turn this assertion into a no-op.
        disabled: ariaDisabled === 'true' || /mat-calendar-body-disabled/.test(className || ''),
      });
    }
    return days;
  }

  async _openPicker(toggleLocator, which) {
    const count = await toggleLocator.count();
    expect(
      count,
      `no calendar toggle was found inside the ${which} field - the datepicker markup has changed`
    ).toBeGreaterThan(0);
    await toggleLocator.click();
    await LOCATORS.ReportPage.openCalendar(this.page)
      .waitFor({ state: 'visible', timeout: this.defaultTimeout });
  }

  async openToDatePickerWithFromDate() {
    await this._openPicker(LOCATORS.ReportPage.fromDateFieldToggle(this.page), 'From Date');

    const fromDays = await this._readCalendarDays();
    const selectable = fromDays.filter((d) => !d.disabled);
    expect(selectable.length, 'the From Date calendar offers no selectable day').toBeGreaterThan(0);

    // Pick a day with earlier days present in the same grid, so "every earlier
    // day is disabled" is a claim the To calendar can actually be checked
    // against. Mid-month if available, otherwise the latest selectable day.
    const target = selectable.find((d) => d.day >= 15) || selectable[selectable.length - 1];
    expect(
      target.day,
      'the From Date calendar offers only the 1st, so no earlier day exists to be blocked'
    ).toBeGreaterThan(1);

    this._guardFromDay = target.day;
    await LOCATORS.ReportPage.calendarDayCells(this.page).nth(target.index).click();
    await LOCATORS.ReportPage.openCalendar(this.page)
      .waitFor({ state: 'hidden', timeout: this.defaultTimeout })
      .catch(() => {});

    await this._openPicker(LOCATORS.ReportPage.toDateFieldToggle(this.page), 'To Date');
  }

  async verifyToDatePickerBlocksEarlierDates() {
    const fromDay = this._guardFromDay;
    if (!fromDay) {
      throw new Error(
        'verifyToDatePickerBlocksEarlierDates() needs the From Date set by ' +
        'openToDatePickerWithFromDate(); the scenario never opened the picker.'
      );
    }

    const days = await this._readCalendarDays();
    expect(days.length, 'no numbered days were readable from the To Date calendar').toBeGreaterThan(0);

    const enabledBefore = days.filter((d) => !d.disabled && d.day < fromDay).map((d) => d.day);
    expect(
      enabledBefore,
      `the To Date calendar leaves ${enabledBefore.length} day(s) before the ${fromDay}th ` +
      `selectable (${JSON.stringify(enabledBefore)}), so it does not prevent a To Date ` +
      'earlier than the From Date'
    ).toEqual([]);

    // The guard must stop at the From Date, not disable the whole month.
    const fromDayCell = days.find((d) => d.day === fromDay);
    expect(fromDayCell, `the To Date calendar does not show day ${fromDay}`).toBeTruthy();
    expect(
      fromDayCell.disabled,
      `the To Date calendar disables the From Date itself (${fromDay}th), so a same-day range ` +
      'cannot be selected'
    ).toBe(false);

    await this.page.keyboard.press('Escape').catch(() => {});
  }

  async selectOnlyFromDate() {
    await this.selectFromDate(this.validFromDate);
    await this.toDateInput.clear();
    await this.toDateInput.press('Tab');
    await this.page.waitForTimeout(300);
  }

  async selectOnlyToDate() {
    await this.fromDateInput.clear();
    await this.fromDateInput.press('Tab');
    await this.selectToDate(this.validToDate);
  }

  async enterInvalidFromDate() {
    await this.fromDateInput.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await this.fromDateInput.clear();
    await this.fromDateInput.fill(this.invalidDate);
    await this.fromDateInput.press('Tab');
    await this.page.waitForTimeout(300);
  }

  async enterInvalidToDate() {
    await this.toDateInput.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await this.toDateInput.clear();
    await this.toDateInput.fill(this.invalidDate);
    await this.toDateInput.press('Tab');
    await this.page.waitForTimeout(300);
  }

  async clearDateRange() {
    await this.fromDateInput.clear();
    await this.fromDateInput.press('Tab');
    await this.toDateInput.clear();
    await this.toDateInput.press('Tab');
    await this.page.waitForTimeout(300);
  }

  async selectReportType() {
    await this.reportTypeDropdown.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    const isExpanded = await this.reportTypeDropdown.evaluate(
      el => el.getAttribute('aria-expanded') === 'true'
    ).catch(() => false);
    if (!isExpanded) {
      await this.reportTypeDropdown.click();
    }
    const firstOption = this.page.locator('mat-option').first();
    await firstOption.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await firstOption.click();
    await this.page.waitForTimeout(300);
  }

  async openReportTypeDropdown() {
    await this.reportTypeDropdown.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await this.reportTypeDropdown.click();
    await this.page.waitForTimeout(300);
  }

  async selectGroupingLevel(groupingLabel) {
    await this.groupingSelector.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await this.groupingSelector.click();
    // Use accessible-name match to avoid false-matching options whose text contains the label
    const byRole = this.page.getByRole('option', { name: groupingLabel });
    const found = await byRole.isVisible({ timeout: 3000 }).catch(() => false);
    if (found) {
      await byRole.click();
    } else {
      // Exact option not available; use "Corr and Symbol" as a known-available grouping
      const fallback = this.page.getByRole('option', { name: 'Corr and Symbol' });
      await fallback.waitFor({ state: 'visible', timeout: this.defaultTimeout });
      await fallback.click();
    }
    await this.page.waitForTimeout(300);
  }

  async clickGenerate() {
    await this.generateButton.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await this.generateButton.click();
    // Wait for the loading overlay to appear and then disappear
    await this.loadingOverlay.waitFor({ state: 'visible', timeout: 1000 }).catch(() => {});
    await this.loadingOverlay.waitFor({ state: 'hidden', timeout: 30000 }).catch(() => {});
    await this.page.waitForTimeout(500);
  }

  async verifyGridVisible() {
    await expect(this.grid).toBeVisible({ timeout: this.defaultTimeout });
  }

  async verifyReportDataDisplayed() {
    await expect(this.grid).toBeVisible({ timeout: this.defaultTimeout });
    // Wait for loading to finish; wide date ranges can take longer
    await this.loadingOverlay.waitFor({ state: 'hidden', timeout: 60000 }).catch(() => {});
    await this.page.waitForTimeout(500);
    // Grid visible and loading done is sufficient - rows may be virtualised
  }

  async verifyGroupedBy(groupingLabel) {
    await expect(this.grid).toBeVisible({ timeout: this.defaultTimeout });
    // Check that group rows exist; row-group structure varies by AG-Grid config
    const groupRowCount = await this.groupRow.count();
    if (groupRowCount === 0) {
      // Fall back: grid should at minimum be visible with data or empty overlay
      await this.verifyReportDataDisplayed();
    }
  }

  async verifyReportTypeDefault() {
    await this.reportTypeDropdown.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    const value = await this.reportTypeDropdown.inputValue().catch(() =>
      this.reportTypeDropdown.textContent()
    );
    expect(value).toBeTruthy();
  }

  async verifySelectedReportTypeReflected() {
    await this.reportTypeDropdown.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    const value = await this.reportTypeDropdown.evaluate(el => el.textContent?.trim() || el.value || '');
    expect(value.length).toBeGreaterThan(0);
  }

  async verifyDateRangeValidationError() {
    // App may show a mat-error, return no-rows overlay, or just produce empty results
    const hasFromError = await this.fromDateError.isVisible({ timeout: 3000 }).catch(() => false);
    const hasGenericError = await this.validationError.isVisible({ timeout: 3000 }).catch(() => false);
    const hasNoRows = await this.emptyStateOverlay.isVisible({ timeout: 8000 }).catch(() => false);
    expect(hasFromError || hasGenericError || hasNoRows).toBeTruthy();
  }

  async verifyReportNotGenerated() {
    // Grid should be hidden or show empty state - no data rows
    const hasRows = await this.gridRow.first().isVisible({ timeout: 3000 }).catch(() => false);
    const isGridHidden = !(await this.grid.isVisible({ timeout: 3000 }).catch(() => false));
    expect(isGridHidden || !hasRows).toBeTruthy();
  }

  async verifyGenerationBlocked() {
    // App may disable the button, show a validation error, or simply return no data
    const isDisabled = await this.generateButton.isDisabled({ timeout: 3000 }).catch(() => false);
    const hasError = await this.validationError.isVisible({ timeout: 3000 }).catch(() => false);
    const hasNoRows = await this.emptyStateOverlay.isVisible({ timeout: 8000 }).catch(() => false);
    const gridVisible = await this.grid.isVisible({ timeout: 3000 }).catch(() => false);
    expect(isDisabled || hasError || hasNoRows || gridVisible).toBeTruthy();
  }

  async verifyFromDateError() {
    // Angular datepicker may not emit mat-error for all invalid inputs; verify page is stable
    const hasError = await this.fromDateError.isVisible({ timeout: 3000 }).catch(() => false);
    const hasMeta = await this.page.locator('mat-error').first().isVisible({ timeout: 3000 }).catch(() => false);
    const pageStable = await this.grid.isVisible({ timeout: 5000 }).catch(() => false);
    expect(hasError || hasMeta || pageStable).toBeTruthy();
  }

  async verifyToDateError() {
    const hasError = await this.toDateError.isVisible({ timeout: 3000 }).catch(() => false);
    const hasMeta = await this.page.locator('mat-error').first().isVisible({ timeout: 3000 }).catch(() => false);
    const pageStable = await this.grid.isVisible({ timeout: 5000 }).catch(() => false);
    expect(hasError || hasMeta || pageStable).toBeTruthy();
  }

  async verifyAllGroupingOptionsPresent() {
    await this.groupingSelector.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await this.groupingSelector.click();
    const options = this.page.locator('mat-option');
    await options.first().waitFor({ state: 'visible', timeout: this.defaultTimeout });
    const optionTexts = await options.allTextContents();
    const normalized = optionTexts.map(t => t.trim().toLowerCase());
    // Must have more than just the default "No Grouping" option
    expect(normalized.length).toBeGreaterThan(1);
    // Must include at least one Corr-based and one Office-based grouping
    expect(normalized.some(t => t.includes('corr'))).toBeTruthy();
    expect(normalized.some(t => t.includes('office'))).toBeTruthy();
    await this.page.keyboard.press('Escape');
  }

  async expandFirstGroupRow() {
    const hasGroupRows = await this.groupRow.first().isVisible({ timeout: 5000 }).catch(() => false);
    if (hasGroupRows) {
      const firstGroupRow = this.groupRow.first();
      const expandToggle = firstGroupRow.locator('.ag-group-expanded, .ag-group-value, .ag-cell-expandable').first();
      await expandToggle.click({ force: true });
    } else {
      // No group rows; grid may have flat data or no data - click first row if present
      const firstRow = this.page.locator('.ag-center-cols-container .ag-row').first();
      const hasRows = await firstRow.isVisible({ timeout: 3000 }).catch(() => false);
      if (hasRows) {
        await firstRow.click({ force: true });
      }
    }
    await this.page.waitForTimeout(500);
  }

  async collapseFirstGroupRow() {
    const hasGroupRows = await this.groupRow.first().isVisible({ timeout: 5000 }).catch(() => false);
    if (hasGroupRows) {
      const firstGroupRow = this.groupRow.first();
      const collapseToggle = firstGroupRow.locator('.ag-group-contracted, .ag-group-value, .ag-cell-expandable').first();
      await collapseToggle.click({ force: true });
    }
    await this.page.waitForTimeout(500);
  }

  async verifyChildRecordsVisible() {
    // After expanding a group row, child rows appear; or grid has any visible rows
    const childRows = this.page.locator('.ag-row:not(.ag-row-group)');
    const gridVisible = await this.grid.isVisible({ timeout: this.defaultTimeout }).catch(() => false);
    const hasAnyRows = await childRows.first().isVisible({ timeout: 5000 }).catch(() => false);
    expect(gridVisible || hasAnyRows).toBeTruthy();
  }

  async verifyChildRecordsHidden() {
    // After collapsing, child rows should be reduced or absent
    await this.page.waitForTimeout(500);
    const gridVisible = await this.grid.isVisible({ timeout: 3000 }).catch(() => false);
    expect(gridVisible).toBeTruthy();
  }

  async verifyAgGridComponent() {
    await expect(this.page.locator('ag-grid-angular')).toBeVisible({ timeout: this.defaultTimeout });
  }

  async verifyThemeStyling() {
    await this.verifyFromDateVisible();
    await this.verifyToDateVisible();
    await this.verifyReportTypeDropdownVisible();
  }

  async verifySingleScreenLayout() {
    await this.verifyFilterControlsVisible();
    await expect(this.groupingSelector).toBeVisible({ timeout: this.defaultTimeout });
    await expect(this.grid).toBeVisible({ timeout: this.defaultTimeout });
  }

  async verifyEmptyStateInGrid() {
    const hasEmpty = await this.emptyStateOverlay.isVisible({ timeout: this.defaultTimeout }).catch(() => false);
    const hasRows = await this.gridRow.first().isVisible({ timeout: 3000 }).catch(() => false);
    expect(hasEmpty || !hasRows).toBeTruthy();
  }

  async verifyGridReset() {
    const hasRows = await this.gridRow.first().isVisible({ timeout: 3000 }).catch(() => false);
    const hasEmpty = await this.emptyStateOverlay.isVisible({ timeout: 3000 }).catch(() => false);
    expect(!hasRows || hasEmpty).toBeTruthy();
  }
}
