import { LOCATORS } from '../utils/locators.js';

export class FPLPositionPage {
  constructor(page) {
    this.page = page;
    this.headerRow = LOCATORS.FPLPositionsPage.headerRow(page);
    this.centerColsViewport = LOCATORS.FPLPositionsPage.centerColsViewport(page);
  }

  defaultTimeout = 10000;

  async navigate() {
    const origin = new URL(this.page.url()).origin;
    await this.page.goto(`${origin}/fpl/accountPositions`);
    await this.page.waitForLoadState('networkidle', { timeout: 60000 }).catch(() => {});
    await this._dismissSplashScreen();
    // Wait for loading overlay to disappear, then for the header row
    await LOCATORS.FPLPositionsPage.loadingOverlay(this.page)
      .waitFor({ state: 'hidden', timeout: 60000 })
      .catch(() => {});
    await this.headerRow.waitFor({ state: 'visible', timeout: 60000 });
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

  async verifyHeaderRowVisible() {
    await this.headerRow.waitFor({ state: 'visible', timeout: this.defaultTimeout });
  }

  async verifyGroupRowVisible(groupName) {
    await LOCATORS.FPLPositionsPage.groupRow(this.page, groupName)
      .waitFor({ state: 'visible', timeout: this.defaultTimeout });
  }

  async verifyPositionRowVisible(symbol) {
    await LOCATORS.FPLPositionsPage.positionRow(this.page, symbol)
      .waitFor({ state: 'visible', timeout: this.defaultTimeout });
  }

  async clickGroupRow(groupName) {
    const row = LOCATORS.FPLPositionsPage.groupRow(this.page, groupName);
    await row.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    try {
      await row.click();
    } catch (e) {
      await row.click({ force: true });
    }
  }

  async verifyGridCellVisible(text) {
    await LOCATORS.FPLPositionsPage.gridCell(this.page, text)
      .waitFor({ state: 'visible', timeout: this.defaultTimeout });
  }

  async getDataRowCount() {
    return await LOCATORS.FPLPositionsPage.allDataRows(this.page).count();
  }

  async isNoRowsOverlayVisible() {
    return await LOCATORS.FPLPositionsPage.noRowsOverlay(this.page).isVisible();
  }
}
