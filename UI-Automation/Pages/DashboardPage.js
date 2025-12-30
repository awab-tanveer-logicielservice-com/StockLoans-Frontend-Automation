import { LOCATORS } from '../Config/locators';

export class DashboardPage {
  page;
  tableHeader;
  symbolSearchInput;
  applyButton;
  firstExpandIcon;
  expandedRowIcon;
  symbol;

  constructor(page) {
    this.symbol = 'AAPR';
    this.page = page;
    this.tableHeader = LOCATORS.DashboardPage.tableHeader(page);
    this.symbolSearchInput = LOCATORS.DashboardPage.symbolSearchInput(page);
    this.applyButton = LOCATORS.DashboardPage.applyButton(page);
    this.firstExpandIcon = LOCATORS.DashboardPage.firstExpandIcon(page);
    this.expandedRowIcon = LOCATORS.DashboardPage.expandedRowIcon(page);
  }

  async verifyTableHeaderVisible() {
    await this.tableHeader.waitFor({ state: 'visible' });
  }

  async searchSymbol(symbol) {
    await this.symbolSearchInput.click();
    await this.symbolSearchInput.fill(symbol || this.symbol);
  }

  async clickApply() {
    await this.applyButton.click();  }

  async searchAndApply(symbol) {
    await this.searchSymbol(symbol);
    await this.clickApply();
  }

  async verifyRowVisible(rowName) {
    await LOCATORS.DashboardPage.getRowByName(this.page, rowName).waitFor({ state: 'visible' });
  }

  async doubleClickSymbol(symbol) {
    await LOCATORS.DashboardPage.getSymbolLocator(this.page, symbol).first().dblclick();
  }

  async clickSymbolByIndex(symbol, index) {
    await LOCATORS.DashboardPage.getSymbolByText(this.page, symbol).nth(index).click();
  }

  async expandFirstGroup() {
    await this.firstExpandIcon.waitFor({ state: 'visible', timeout: 10000 });
    await this.firstExpandIcon.dblclick();
  }

  async verifyBrokerDetailsHeader() {
    await LOCATORS.DashboardPage.getBrokerDetailsHeader(this.page).waitFor({ state: 'visible' });
  }
}
