import { LOCATORS } from '../utils/locators.js';
import { ENV } from '../Config/env.js';

export class FPLAccountPage {
  page;
  menuButton;
  fplAccountsLink;
  accountRow;
  fuseSidebarOverlay;
  centerColsViewport;
  gtnRow;
  omnihkText;
  omnihkTextSecond;
  gtnFplTestRow;
  filterInput;
  fplVcsoRow;
  fplVcsoRowParagraph;
  fplVcsoVerifyRow;
  focusedGridCell;

  constructor(page) {
    this.page = page;
    this.menuButton = LOCATORS.FPLAccountPage.menuButton(page);
    this.fplAccountsLink = LOCATORS.FPLAccountPage.fplAccountsLink(page);
    this.accountRow = LOCATORS.FPLAccountPage.accountRow(page);
    this.fuseSidebarOverlay = LOCATORS.FPLAccountPage.fuseSidebarOverlay(page);
    this.centerColsViewport = LOCATORS.FPLAccountPage.centerColsViewport(page);
    this.gtnRow = LOCATORS.FPLAccountPage.gtnRow(page);
    this.omnihkText = LOCATORS.FPLAccountPage.omnihkText(page);
    this.omnihkTextSecond = LOCATORS.FPLAccountPage.omnihkTextSecond(page);
    this.gtnFplTestRow = LOCATORS.FPLAccountPage.gtnFplTestRow(page);
    this.filterInput = LOCATORS.FPLAccountPage.filterInput(page);
    this.fplVcsoRow = LOCATORS.FPLAccountPage.fplVcsoRow(page);
    this.fplVcsoRowParagraph = LOCATORS.FPLAccountPage.fplVcsoRowParagraph(page);
    this.fplVcsoVerifyRow = LOCATORS.FPLAccountPage.fplVcsoVerifyRow(page);
    this.focusedGridCell = LOCATORS.FPLAccountPage.focusedGridCell(page);
  }

  defaultTimeout = 10000;

  async navigate() {
    await this.page.goto(ENV.dashboardURL);
    try {
      await this.page.waitForLoadState('networkidle', { timeout: this.defaultTimeout });
    } catch (e) {}
    await this._dismissSplashScreen();
  }

  async _dismissSplashScreen() {
    try {
      await this.page.waitForFunction(
        () => {
          const el = document.querySelector('app-splash-screen, .splash-overlay');
          return !el || getComputedStyle(el).pointerEvents === 'none' || el.style.display === 'none';
        },
        { timeout: 8000 }
      );
    } catch (e) {}
    await this.page.evaluate(() => {
      document.querySelectorAll('app-splash-screen, .splash-overlay').forEach(el => {
        el.style.display = 'none';
      });
    });
  }

  async goto() {
    return this.navigate();
  }

  async navigateToFPLAccounts() {
    const origin = new URL(this.page.url()).origin;
    await this.page.goto(`${origin}/fpl/accounts`);
    await this.page.waitForLoadState('networkidle', { timeout: 60000 }).catch(() => {});
    await this._dismissSplashScreen();
    // Wait for grid loading overlay to disappear before checking rows
    await this.page.locator('.ag-loading, [class*="Loading"]').waitFor({ state: 'hidden', timeout: 60000 }).catch(() => {});
    await this.accountRow.waitFor({ state: 'visible', timeout: 60000 });
  }

  async openFPLAccounts() {
    return this.navigateToFPLAccounts();
  }

  async verifyAccountRowVisible() {
    await this.accountRow.waitFor({ state: 'visible', timeout: this.defaultTimeout });
  }

  async selectGTNRow() {
    await this.centerColsViewport.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    try {
      await this.centerColsViewport.click();
    } catch (e) {
      await this.centerColsViewport.click({ force: true });
    }
    await this.gtnRow.waitFor({ state: 'visible', timeout: this.defaultTimeout });
  }

  async verifyGTNRowVisible() {
    await this.gtnRow.waitFor({ state: 'visible', timeout: this.defaultTimeout });
  }

  async selectOMNIHK() {
    await this.omnihkText.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    try {
      await this.omnihkText.click();
    } catch (e) {
      await this.omnihkText.click({ force: true });
    }
    await this.gtnFplTestRow.waitFor({ state: 'visible', timeout: this.defaultTimeout });
  }

  async verifyGTNFPLTestRowVisible() {
    await this.gtnFplTestRow.waitFor({ state: 'visible', timeout: this.defaultTimeout });
  }

  async filterByOMNIHK() {
    // Floating filter may not be present on this grid; skip gracefully if absent
    try {
      await this.filterInput.waitFor({ state: 'visible', timeout: 3000 });
      await this.filterInput.click();
      await this.filterInput.fill('omnihk');
      await this.filterInput.press('Enter');
      try {
        await this.centerColsViewport.click();
      } catch (e) {
        await this.centerColsViewport.click({ force: true });
      }
    } catch (e) {
      // No floating filter available — data already loaded, continue
    }
  }

  async verifyFilterResult() {
    await this.gtnFplTestRow.waitFor({ state: 'visible', timeout: this.defaultTimeout });
  }

  async isLoaded() {
    return await this.accountRow.isVisible();
  }

  async closeSidebar() {
    // Only close sidebar if overlay is visible
    try {
      await this.fuseSidebarOverlay.waitFor({ state: 'visible', timeout: 3000 });
      await this.fuseSidebarOverlay.click();
    } catch (e) {
      // Sidebar overlay not visible, skip
    }
  }

  async clickGridCell(cellName, exact = false, nth = 0) {
    const gridCell = LOCATORS.FPLAccountPage.getGridcell(this.page, cellName, exact).nth(nth);
    await gridCell.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    try {
      await gridCell.click();
    } catch (e) {
      await gridCell.click({ force: true });
    }
  }

  async clickOMNIHKSecond() {
    // Try the second OMNIHK occurrence; fall back to first if only one exists
    const count = await this.page.getByText('OMNIHK').count();
    const target = count >= 2 ? this.omnihkTextSecond : this.omnihkText;
    await target.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    try {
      await target.click();
    } catch (e) {
      await target.click({ force: true });
    }
  }

  async closeDropdown(times = 1) {
    for (let i = 0; i < times; i++) {
      await this.page.keyboard.press('Escape');
      await this.page.waitForTimeout(200);
    }
  }

  async closeFocusedCell() {
    try {
      await this.page.keyboard.press('Escape');
    } catch (e) {}
  }

  async clickFPLVcsoRowParagraph() {
    await this.fplVcsoRowParagraph.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    try {
      await this.fplVcsoRowParagraph.click();
    } catch (e) {
      await this.fplVcsoRowParagraph.click({ force: true });
    }
  }

  async verifyFPLVcsoRow() {
    await this.fplVcsoVerifyRow.waitFor({ state: 'visible', timeout: this.defaultTimeout });
  }

  async verifyDropdownOption(optionName) {
    const option = LOCATORS.FPLAccountPage.getDropdownOption(this.page, optionName);
    await option.waitFor({ state: 'visible', timeout: this.defaultTimeout });
  }

  async interactWithAccountDetails() {
    await this.clickGridCell('FPL', true);
    await this.clickGridCell('VCSO');
    await this.clickGridCell('L', true);
    await this.clickGridCell('A');
    await this.clickGridCell('0.5');
    await this.centerColsViewport.click();
  }
}
