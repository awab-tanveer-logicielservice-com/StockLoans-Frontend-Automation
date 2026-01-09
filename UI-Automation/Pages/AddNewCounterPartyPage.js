import { LOCATORS } from '../utils/locators.js';

export class AddNewCounterPartyPage {
    constructor(page) {
        this.page = page;
        this.addNewCounterpartyButton = LOCATORS.AddNewCounterPartyPage.addNewCounterpartyButton(page);
        this.basicInfoTabpanel = LOCATORS.AddNewCounterPartyPage.basicInfoTabpanel(page);
        this.entityDropdown = LOCATORS.AddNewCounterPartyPage.entityDropdown(page);
        this.nameInput = LOCATORS.AddNewCounterPartyPage.nameInput(page);
        this.shortCodeInput = LOCATORS.AddNewCounterPartyPage.shortCodeInput(page);
        this.billingReferenceInput = LOCATORS.AddNewCounterPartyPage.billingReferenceInput(page);
        this.currencyDropdown = LOCATORS.AddNewCounterPartyPage.currencyDropdown(page);
        this.defaultMarginInput = LOCATORS.AddNewCounterPartyPage.defaultMarginInput(page);
        this.lendLimitInput = LOCATORS.AddNewCounterPartyPage.lendLimitInput(page);
        this.borrowLimitInput = LOCATORS.AddNewCounterPartyPage.borrowLimitInput(page);
        this.typeDropdown = LOCATORS.AddNewCounterPartyPage.typeDropdown(page);
        this.statusDropdown = LOCATORS.AddNewCounterPartyPage.statusDropdown(page);
        this.roundingDropdown = LOCATORS.AddNewCounterPartyPage.roundingDropdown(page);
        this.businessEmailInput = LOCATORS.AddNewCounterPartyPage.businessEmailInput(page);
        this.operationsEmailInput = LOCATORS.AddNewCounterPartyPage.operationsEmailInput(page);
        this.addCounterpartyButton = LOCATORS.AddNewCounterPartyPage.addCounterpartyButton(page);
        this.backdropOverlay = LOCATORS.AddNewCounterPartyPage.backdropOverlay(page);
        this.headerRow = LOCATORS.AddNewCounterPartyPage.headerRow(page);
    }

    async navigateToCounterparties() {
        await LOCATORS.AddNewCounterPartyPage.menuButton(this.page).click();
        await LOCATORS.AddNewCounterPartyPage.counterpartiesLink(this.page).click();
    }

    async clickAddNewCounterparty() {
        await this.addNewCounterpartyButton.click();
    }

    async selectEntity(entityName) {
        await this.entityDropdown.click();
        // await LOCATORS.AddNewCounterPartyPage.getEntityOption(this.page, entityName).waitFor({ state: 'visible', timeout: 5000 });
        // await LOCATORS.AddNewCounterPartyPage.getEntityOption(this.page, entityName).click();
    }

    async fillName(name) {
        await this.nameInput.click();
        await this.nameInput.fill(name);
    }

    async fillShortCode(shortCode) {
        await this.shortCodeInput.click();
        await this.shortCodeInput.fill(shortCode);
    }

    async fillBillingReference(reference) {
        await this.billingReferenceInput.click();
        await this.billingReferenceInput.fill(reference);
    }

    async selectCurrency(currency = 'USD') {
        await this.currencyDropdown.click();
        await LOCATORS.AddNewCounterPartyPage.currencyOption(this.page, currency).waitFor({ state: 'visible', timeout: 5000 });
        await LOCATORS.AddNewCounterPartyPage.currencyOption(this.page, currency).click();
    }

    async fillDefaultMargin(margin) {
        await this.defaultMarginInput.click();
        await this.defaultMarginInput.fill(margin);
    }

    async fillLendLimit(limit) {
        await this.lendLimitInput.click();
        await this.lendLimitInput.fill(limit);
    }

    async fillBorrowLimit(limit) {
        await this.borrowLimitInput.click();
        await this.borrowLimitInput.fill(limit);
    }

    async selectType(type = 'Regular') {
        await this.typeDropdown.click();
        await LOCATORS.AddNewCounterPartyPage.typeOption(this.page, type).waitFor({ state: 'visible', timeout: 5000 });
        await LOCATORS.AddNewCounterPartyPage.typeOption(this.page, type).click();
    }

    async selectStatus(status = 'Active') {
        await this.statusDropdown.click();
        await LOCATORS.AddNewCounterPartyPage.statusOption(this.page, status).waitFor({ state: 'visible', timeout: 5000 });
        await LOCATORS.AddNewCounterPartyPage.statusOption(this.page, status).click();
    }

    async selectRounding(rounding = 'No rounding') {
        await this.roundingDropdown.click();
        await LOCATORS.AddNewCounterPartyPage.roundingOption(this.page, rounding).waitFor({ state: 'visible', timeout: 5000 });
        await LOCATORS.AddNewCounterPartyPage.roundingOption(this.page, rounding).click();
    }

    async fillBusinessEmail(email) {
        await this.businessEmailInput.click();
        await this.businessEmailInput.fill(email);
    }

    async fillOperationsEmail(email) {
        await this.operationsEmailInput.click();
        await this.operationsEmailInput.fill(email);
    }

    async clickAddCounterpartyButton() {
        await this.addCounterpartyButton.waitFor({ state: 'visible', timeout: 10000 });
    }

    async verifyBasicInfoVisible() {
        await this.basicInfoTabpanel.waitFor({ state: 'visible', timeout: 10000 });
    }

    async createNewCounterparty(counterpartyData) {
        await this.navigateToCounterparties();
        await this.clickAddNewCounterparty();
        await this.verifyBasicInfoVisible();

        if (counterpartyData.entity) await this.selectEntity(counterpartyData.entity);
        if (counterpartyData.name) await this.fillName(counterpartyData.name);
        if (counterpartyData.shortCode) await this.fillShortCode(counterpartyData.shortCode);
        if (counterpartyData.billingReference) await this.fillBillingReference(counterpartyData.billingReference);
        if (counterpartyData.currency) await this.selectCurrency(counterpartyData.currency);
        if (counterpartyData.defaultMargin) await this.fillDefaultMargin(counterpartyData.defaultMargin);
        if (counterpartyData.lendLimit) await this.fillLendLimit(counterpartyData.lendLimit);
        if (counterpartyData.borrowLimit) await this.fillBorrowLimit(counterpartyData.borrowLimit);
        if (counterpartyData.type) await this.selectType(counterpartyData.type);
        if (counterpartyData.status) await this.selectStatus(counterpartyData.status);
        if (counterpartyData.rounding) await this.selectRounding(counterpartyData.rounding);
        if (counterpartyData.businessEmail) await this.fillBusinessEmail(counterpartyData.businessEmail);
        if (counterpartyData.operationsEmail) await this.fillOperationsEmail(counterpartyData.operationsEmail);

        await this.clickAddCounterpartyButton();
    }
}