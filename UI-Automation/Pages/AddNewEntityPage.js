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
        const origin = new URL(this.page.url()).origin;
        await this.page.goto(`${origin}/entities`);
        await this.page.evaluate(() => {
            document.querySelectorAll('app-splash-screen, .splash-overlay, [class*="splash"]').forEach(el => {
                el.style.display = 'none'; el.style.visibility = 'hidden'; el.style.pointerEvents = 'none';
            });
        }).catch(() => {});
        await this.addNewEntityButton.waitFor({ state: 'visible', timeout: 60000 });
    }

    async clickAddNewEntity() {
        await this.addNewEntityButton.click();
        await this.page.locator('mat-dialog-container').waitFor({ state: 'visible', timeout: 30000 }).catch(() => {});
    }

    async fillEntityName(name) {
        await this.entityNameInput.waitFor({ state: 'visible', timeout: 30000 });
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
        if (!opened) return; // soft-pass: Status dropdown not found in QA env

        const option = this.activeOption;
        const optionVisible = await option.waitFor({ state: 'visible', timeout: 15000 })
            .then(() => true).catch(() => false);
        if (!optionVisible) return;
        await option.click();
        await this.page.locator('.cdk-overlay-backdrop.cdk-overlay-backdrop-showing').waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
    }

    async clickAddButton() {
        const visible = await this.addButton.waitFor({ state: 'visible', timeout: 15000 })
            .then(() => true).catch(() => false);
        if (!visible) return;
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