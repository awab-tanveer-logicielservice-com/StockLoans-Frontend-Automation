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
        // Ensure the Basic Info form is visible before interacting with fields
        await this.page.getByRole('tabpanel', { name: 'Basic Info' }).waitFor({ state: 'visible', timeout: 10000 });
    }

    async fillEntityName(name) {
        await this.entityNameInput.fill(name);
    }

    async selectActiveStatus() {
        // Try a few strategies to open the status dropdown in case the control is rendered differently
        const candidates = [
            this.statusDropdown,
            this.page.getByRole('button', { name: /Status/ }),
            this.page.locator('div').filter({ hasText: /^Status$/ }).first(),
            this.page.getByText('Status')
        ];

        let opened = false;
        for (const candidate of candidates) {
            try {
                const count = await candidate.count?.() ?? 0;
                if (count > 0) {
                    try {
                        await candidate.click({ timeout: 3000 });
                    } catch (e) {
                        // Fallback to force click if normal click fails
                        await candidate.click({ force: true });
                    }
                    opened = true;
                    break;
                }
            } catch (e) {
                // ignore and try next
            }
        }
        if (!opened) throw new Error('Could not locate or open the Status dropdown');

        const option = this.activeOption;
        await option.waitFor({ state: 'visible', timeout: 5000 });
        await option.click();
        // Ensure any overlay/backdrop is hidden before continuing
        await this.page.locator('.cdk-overlay-backdrop.cdk-overlay-backdrop-showing').waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
    }

    async clickAddButton() {
        await this.addButton.waitFor({ state: 'visible', timeout: 10000 });
        // Wait until the button becomes enabled before clicking
        await this.addButton.waitForElementState?.('enabled', { timeout: 5000 }).catch(() => {});
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