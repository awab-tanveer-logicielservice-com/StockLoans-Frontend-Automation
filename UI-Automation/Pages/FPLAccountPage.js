import { LOCATORS } from '../utils/locators.js';
import { ENV } from '../Config/env.js';

export class FPLAccountPage {
  page;
  menuButton;
  fplAccountsLink;
  accountRow;
  centerColsViewport;
  gtnRow;
  omnihkText;
  gtnFplTestRow;
  filterInput;

  constructor(page) {
    this.page = page;
    this.menuButton = LOCATORS.FPLAccountPage.menuButton(page);
    this.fplAccountsLink = LOCATORS.FPLAccountPage.fplAccountsLink(page);
    this.accountRow = LOCATORS.FPLAccountPage.accountRow(page);
    this.centerColsViewport = LOCATORS.FPLAccountPage.centerColsViewport(page);
    this.gtnRow = LOCATORS.FPLAccountPage.gtnRow(page);
    this.omnihkText = LOCATORS.FPLAccountPage.omnihkText(page);
    this.gtnFplTestRow = LOCATORS.FPLAccountPage.gtnFplTestRow(page);
    this.filterInput = LOCATORS.FPLAccountPage.filterInput(page);
  }

  defaultTimeout = 10000;

  async navigate() {
    await this.page.goto(ENV.dashboardURL);
    try {
      await this.page.waitForLoadState('networkidle', { timeout: this.defaultTimeout });
    } catch (e) {}
  }

  async goto() {
    return this.navigate();
  }

  async navigateToFPLAccounts() {
    const timeout = this.defaultTimeout;

    await this.menuButton.waitFor({ state: 'visible', timeout });
    try {
      await this.menuButton.click();
    } catch (e) {
      await this.menuButton.click({ force: true });
    }

    await this.fplAccountsLink.waitFor({ state: 'visible', timeout });
    try {
      await this.fplAccountsLink.click();
    } catch (e) {
      await this.fplAccountsLink.click({ force: true });
    }

    const start = Date.now();
    while (Date.now() - start < timeout) {
      try {
        if (await this.accountRow.isVisible()) return;
      } catch (e) {}
      await this.page.waitForTimeout(200);
    }
    throw new Error('FPL Accounts page did not finish loading within timeout');
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
    await this.filterInput.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await this.filterInput.click();
    await this.filterInput.fill('omnihk');
    await this.filterInput.press('Enter');
    try {
      await this.centerColsViewport.click();
    } catch (e) {
      await this.centerColsViewport.click({ force: true });
    }
  }

  async verifyFilterResult() {
    await this.gtnFplTestRow.waitFor({ state: 'visible', timeout: this.defaultTimeout });
  }

  async isLoaded() {
    return await this.accountRow.isVisible();
  }
}
