import { LOCATORS } from '../utils/locators.js';

export class AddNewEntityPage {
    constructor(page) {
        this.page = page;
        this.addNewEntityButton = LOCATORS.AddNewEntityPage.addNewEntityButton(page);
        this.entityNameInput = LOCATORS.AddNewEntityPage.entityNameInput(page);
        this.statusDropdown = LOCATORS.AddNewEntityPage.statusDropdown(page);
        this.activeOption = LOCATORS.AddNewEntityPage.activeOption(page);
        this.addButton = LOCATORS.AddNewEntityPage.addButton(page);
    }

    async navigateToEntities() {
        await LOCATORS.AddNewEntityPage.menuButton(this.page).click();
        await LOCATORS.AddNewEntityPage.entitiesLink(this.page).click();
    }

    async clickAddNewEntity() {
        await this.addNewEntityButton.click();
    }

    async fillEntityName(name) {
        await this.entityNameInput.click();
        await this.entityNameInput.fill(name);
    }

    async selectActiveStatus() {
        await this.statusDropdown.click();
        await this.activeOption.click();
    }

    async clickAddButton() {
        await this.addButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.addButton.click();
    }

    async createNewEntity(entityName) {
        await this.navigateToEntities();
        await this.clickAddNewEntity();
        await this.fillEntityName(entityName);
        await this.selectActiveStatus();
        await this.clickAddButton();
    }
}