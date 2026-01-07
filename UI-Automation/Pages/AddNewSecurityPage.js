import { LOCATORS } from '../utils/locators.js';

export class AddNewSecurityPage {
    constructor(page) {
        this.page = page;
        this.addNewSecurityButton = LOCATORS.AddNewSecurityPage.addNewSecurityButton(page);
        this.searchInput = LOCATORS.AddNewSecurityPage.searchInput(page);
        this.searchButton = LOCATORS.AddNewSecurityPage.searchButton(page);
        this.updateContractsCheckbox = LOCATORS.AddNewSecurityPage.updateContractsCheckbox(page);
        this.symbolInput = LOCATORS.AddNewSecurityPage.symbolInput(page);
        this.cusipInput = LOCATORS.AddNewSecurityPage.cusipInput(page);
        this.descriptionInput = LOCATORS.AddNewSecurityPage.descriptionInput(page);
        this.exchangeInput = LOCATORS.AddNewSecurityPage.exchangeInput(page);
        this.volumeInput = LOCATORS.AddNewSecurityPage.volumeInput(page);
        this.closePriceInput = LOCATORS.AddNewSecurityPage.closePriceInput(page);
        this.closeDateInput = LOCATORS.AddNewSecurityPage.closeDateInput(page);
        this.statusInput = LOCATORS.AddNewSecurityPage.statusInput(page);
        this.restrictionsListbox = LOCATORS.AddNewSecurityPage.restrictionsListbox(page);
        this.addButton = LOCATORS.AddNewSecurityPage.addButton(page);
        this.slideToggleBar = LOCATORS.AddNewSecurityPage.slideToggleBar(page);
    }

    async navigateToSecurityMaster() {
        await LOCATORS.AddNewSecurityPage.menuButton(this.page).click();
        await LOCATORS.AddNewSecurityPage.securityMasterLink(this.page).click();
    }

    async clickAddNewSecurity() {
        await this.addNewSecurityButton.click();
    }

    async searchSecurity(searchTerm) {
        await this.searchInput.click();
        await this.searchInput.fill(searchTerm);
        await this.searchButton.click();
    }

    async toggleUpdateContracts() {
        await this.slideToggleBar.click();
    }

    async fillSymbol(symbol) {
        await this.symbolInput.click();
        await this.symbolInput.fill(symbol);
    }

    async fillCusip(cusip) {
        await this.cusipInput.click();
        await this.cusipInput.fill(cusip);
    }

    async fillDescription(description) {
        await this.descriptionInput.click();
        await this.descriptionInput.fill(description);
    }

    async fillExchange(exchange) {
        await this.exchangeInput.click();
        await this.exchangeInput.fill(exchange);
    }

    async fillVolume(volume) {
        await this.volumeInput.click();
        await this.volumeInput.fill(volume);
    }

    async fillClosePrice(price) {
        await this.closePriceInput.click();
        await this.closePriceInput.fill(price);
    }

    async fillCloseDate(date) {
        await this.closeDateInput.click();
        await this.closeDateInput.fill(date);
    }

    async fillStatus(status) {
        await this.statusInput.click();
        await this.statusInput.fill(status);
    }

    async clickAddButton() {
        await this.addButton.waitFor({ state: 'visible', timeout: 10000 });
    }

    async verifyAddNewSecurityButtonVisible() {
        await this.addNewSecurityButton.waitFor({ state: 'visible', timeout: 10000 });
    }

    async verifyUpdateContractsCheckboxVisible() {
        await this.updateContractsCheckbox.waitFor({ state: 'visible', timeout: 10000 });
    }

    async createNewSecurity(securityData) {
        await this.navigateToSecurityMaster();
        await this.verifyAddNewSecurityButtonVisible();
        await this.clickAddNewSecurity();

        if (securityData.symbol) await this.fillSymbol(securityData.symbol);
        if (securityData.cusip) await this.fillCusip(securityData.cusip);
        if (securityData.description) await this.fillDescription(securityData.description);
        if (securityData.exchange) await this.fillExchange(securityData.exchange);
        if (securityData.volume) await this.fillVolume(securityData.volume);
        if (securityData.closePrice) await this.fillClosePrice(securityData.closePrice);
        if (securityData.closeDate) await this.fillCloseDate(securityData.closeDate);
        if (securityData.status) await this.fillStatus(securityData.status);

        await this.clickAddButton();
    }
}
