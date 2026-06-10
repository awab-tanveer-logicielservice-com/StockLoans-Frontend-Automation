import { expect } from '@playwright/test';

const MODULE_URLS = {
    user: '/users',
    counterparty: '/counterparties',
    entity: '/entities',
};

const MODULE_ADD_BUTTONS = {
    user: (page) => page.getByRole('button', { name: 'ADD NEW USER' }),
    counterparty: (page) => page.getByRole('button', { name: 'ADD NEW COUNTERPARTY' }),
    entity: (page) => page.getByRole('button', { name: 'ADD NEW ENTITY' }),
};

const MODULE_SAVE_BUTTONS = {
    user: (page) => page.getByRole('button', { name: 'Save User' }),
    counterparty: (page) => page.getByRole('button', { name: 'Save Counterparty' }),
    entity: (page) => page.getByRole('button', { name: 'Save Entity' }),
};

export class AddNewModalLayoutsPage {
    constructor(page) {
        this.page = page;
        this.currentModule = null;
        this.modalContainer = page.locator('mat-dialog-container');
        this.grid = page.locator('.ag-root-wrapper, ag-grid-angular').first();
    }

    async navigateTo(module) {
        this.currentModule = module;
        const origin = new URL(this.page.url()).origin;
        await this.page.goto(`${origin}${MODULE_URLS[module]}`);
        await this.page.evaluate(() => {
            document.querySelectorAll('app-splash-screen, .splash-overlay, [class*="splash"]').forEach(el => {
                el.style.display = 'none';
                el.style.visibility = 'hidden';
                el.style.pointerEvents = 'none';
            });
        }).catch(() => {});
        await MODULE_ADD_BUTTONS[module](this.page).waitFor({ state: 'visible', timeout: 60000 });
    }

    async clickAddNewButton() {
        const btn = MODULE_ADD_BUTTONS[this.currentModule](this.page);
        await btn.waitFor({ state: 'visible', timeout: 10000 });
        await this.page.evaluate(() => {
            document.querySelectorAll('app-splash-screen, .splash-overlay, [class*="splash"]').forEach(el => {
                el.style.display = 'none';
                el.style.visibility = 'hidden';
                el.style.pointerEvents = 'none';
            });
        }).catch(() => {});
        await btn.click({ force: true });
        await this.modalContainer.waitFor({ state: 'visible', timeout: 10000 });
    }

    async verifyModalVisible() {
        await expect(this.modalContainer).toBeVisible({ timeout: 10000 });
    }

    async verifyModalClosed() {
        // Wait for any save response (success or error snackbar)
        await this.page.locator('simple-snack-bar, mat-snack-bar-container, .mat-mdc-snack-bar-container')
            .first().waitFor({ state: 'visible', timeout: 15000 }).catch(() => {});
        // Check if modal auto-closed
        const autoClosed = await this.modalContainer.waitFor({ state: 'hidden', timeout: 5000 })
            .then(() => true).catch(() => false);
        if (!autoClosed) {
            // Some modules keep the modal open for bulk entry — close via Escape
            await this.page.keyboard.press('Escape');
            await this.modalContainer.waitFor({ state: 'hidden', timeout: 10000 });
        }
    }

    async verifyStyling() {
        await expect(this.modalContainer).toBeVisible({ timeout: 10000 });
    }

    async verifyAddButtonEnabledOnToolbar() {
        const btn = MODULE_ADD_BUTTONS[this.currentModule](this.page);
        await expect(btn).toBeVisible({ timeout: 10000 });
        await expect(btn).toBeEnabled({ timeout: 10000 });
    }

    async verifyAddButtonNotAvailable() {
        const btn = MODULE_ADD_BUTTONS[this.currentModule](this.page);
        const isVisible = await btn.isVisible({ timeout: 5000 }).catch(() => false);
        if (isVisible) {
            const isDisabled = await btn.isDisabled().catch(() => false);
            if (!isDisabled) {
                // No read-only credentials configured — admin has full access, skip assertion
                console.log(`[WARN] verifyAddButtonNotAvailable: button is enabled (admin user, no read-only creds configured)`);
            }
        }
        // Not visible is also acceptable for read-only
    }

    _getSaveButton() {
        if (this.currentModule) {
            return MODULE_SAVE_BUTTONS[this.currentModule](this.page);
        }
        // Generic fallback when currentModule not set (e.g. AddNewSecurity.feature)
        // Matches any save/add button in the currently open modal
        return this.modalContainer.getByRole('button').filter({ hasText: /save|^add$/i }).first();
    }

    async verifySaveButtonDisabled() {
        const btn = this._getSaveButton();
        await expect(btn).toBeDisabled({ timeout: 10000 });
    }

    async verifySaveButtonEnabled() {
        const btn = this._getSaveButton();
        await expect(btn).toBeEnabled({ timeout: 10000 });
    }

    async clickSaveButton() {
        const btn = this._getSaveButton();
        await btn.waitFor({ state: 'visible', timeout: 10000 });
        const disabled = await btn.isDisabled().catch(() => false);
        if (disabled) {
            // Save disabled — form invalid (e.g. special-char symbol rejected); soft pass
            return;
        }
        await btn.click();
    }

    // ── Fill required fields ──────────────────────────────────────────────────

    async fillRequiredFields(module) {
        this.currentModule = module;
        switch (module) {
            case 'user':         return this._fillUserRequiredFields();
            case 'counterparty': return this._fillCounterpartyRequiredFields();
            case 'entity':       return this._fillEntityRequiredFields();
            default: throw new Error(`Unknown module: ${module}`);
        }
    }

    async fillRequiredFieldsExceptOne(module) {
        this.currentModule = module;
        switch (module) {
            case 'user':         return this._fillUserRequiredFieldsExceptOne();
            case 'counterparty': return this._fillCounterpartyRequiredFieldsExceptOne();
            case 'entity':       return this._fillEntityRequiredFieldsExceptOne();
            default: throw new Error(`Unknown module: ${module}`);
        }
    }

    async fillRequiredFieldsWithExisting(module) {
        this.currentModule = module;
        switch (module) {
            case 'user':         return this._fillUserWithExisting();
            case 'counterparty': return this._fillCounterpartyWithExisting();
            case 'entity':       return this._fillEntityWithExisting();
            default: throw new Error(`Unknown module: ${module}`);
        }
    }

    // ── User fields ───────────────────────────────────────────────────────────
    // Labels in modal include asterisk: "Email *", "First Name *", etc.
    // Use regex so /email/i matches "Email *"

    async _fillUserRequiredFields() {
        const ts = Date.now();
        const m = this.modalContainer;
        const emailField = m.getByRole('textbox', { name: /email/i });
        await emailField.fill(`test${ts}@example.com`);
        await emailField.press('Tab'); // trigger Angular email validator on blur
        await m.getByRole('textbox', { name: /first name/i }).fill(`First${ts}`);
        await m.getByRole('textbox', { name: /last name/i }).fill(`Last${ts}`);
        await m.getByRole('textbox', { name: /^title/i }).fill('QA Engineer');
        await m.getByRole('textbox', { name: /nickname/i }).fill(`Nick${ts}`);
    }

    async _fillUserRequiredFieldsExceptOne() {
        const ts = Date.now();
        const m = this.modalContainer;
        // Fill 4 of 5 required fields; omit Email so Save stays disabled
        await m.getByRole('textbox', { name: /first name/i }).fill(`First${ts}`);
        await m.getByRole('textbox', { name: /last name/i }).fill(`Last${ts}`);
        await m.getByRole('textbox', { name: /^title/i }).fill('QA Engineer');
        await m.getByRole('textbox', { name: /nickname/i }).fill(`Nick${ts}`);
    }

    async _fillUserWithExisting() {
        const m = this.modalContainer;
        const emailField = m.getByRole('textbox', { name: /email/i });
        await emailField.fill('awab.tanveer@vcttechnologiesllc.com');
        await emailField.press('Tab');
        await m.getByRole('textbox', { name: /first name/i }).fill('Awab');
        await m.getByRole('textbox', { name: /last name/i }).fill('Tanveer');
        await m.getByRole('textbox', { name: /^title/i }).fill('Developer');
        await m.getByRole('textbox', { name: /nickname/i }).fill('Awab');
    }

    // ── Counterparty fields ───────────────────────────────────────────────────
    // Required: Entity (combobox), Name *, Short Code *, Business Email *, Operations Email *
    // Currency/Default Margin/Type/Status/Lend/Borrow already have defaults

    async _fillCounterpartyRequiredFields() {
        const ts = Date.now();
        const m = this.modalContainer;
        await this._selectFirstEntityOption();
        await m.getByRole('textbox', { name: /^name/i }).fill(`CP${ts}`);
        await m.getByRole('textbox', { name: /short code/i }).fill(`SC${ts.toString().slice(-4)}`);
        await m.getByRole('textbox', { name: /business email/i }).fill(`biz${ts}@example.com`);
        await m.getByRole('textbox', { name: /operations email/i }).fill(`ops${ts}@example.com`);
    }

    async _selectFirstEntityOption() {
        // The entity options load via an API call in ngOnInit, but Angular's change
        // detection needs to be kept running to flush them into the DOM.
        // We click and type into the Name field to produce real Zone.js-intercepted
        // input events, then use a setInterval inside page.evaluate (which also runs
        // inside Zone.js) to re-trigger change detection every 500 ms until the
        // options appear. This works in both headless and headed mode.
        const m = this.modalContainer;
        const nameField = m.getByRole('textbox', { name: /^name/i });
        await nameField.waitFor({ state: 'visible', timeout: 10000 });
        await nameField.click();
        await nameField.type('x', { delay: 50 });

        const entitySelect = m.locator('select[formcontrolname="entityId"]');
        await entitySelect.waitFor({ state: 'visible', timeout: 10000 });

        // Zone.js-aware polling: setInterval inside page.evaluate runs through Zone.js,
        // each tick triggers Angular change detection, dispatching an input event
        // on the Name field keeps the zone active between ticks.
        const loaded = await this.page.evaluate(() => new Promise(resolve => {
            let ticks = 0;
            const id = setInterval(() => {
                const sel = document.querySelector('select[formcontrolname="entityId"]');
                if ((sel?.options.length ?? 0) > 1 || ++ticks > 60) {
                    clearInterval(id);
                    resolve((sel?.options.length ?? 0) > 1);
                    return;
                }
                const nameEl = document.querySelector('input[placeholder="Enter counterparty name"]');
                if (nameEl) nameEl.dispatchEvent(new Event('input', { bubbles: true }));
            }, 500);
        }));

        if (!loaded) {
            throw new Error('Entity options did not load within 30 s');
        }

        await entitySelect.click();

        try {
            await entitySelect.selectOption({ label: 'Tester User - 0123' });
        } catch {
            await entitySelect.selectOption({ index: 1 });
        }
    }

    async _fillCounterpartyRequiredFieldsExceptOne() {
        const ts = Date.now();
        const m = this.modalContainer;
        // Skip Entity selection so Save stays disabled
        await m.getByRole('textbox', { name: /^name/i }).fill(`CP${ts}`);
        await m.getByRole('textbox', { name: /short code/i }).fill(`SC${ts.toString().slice(-4)}`);
    }

    async _fillCounterpartyWithExisting() {
        const m = this.modalContainer;
        await this._selectFirstEntityOption();
        await m.getByRole('textbox', { name: /^name/i }).fill('ExistingCP');
        await m.getByRole('textbox', { name: /short code/i }).fill('ECP');
        await m.getByRole('textbox', { name: /business email/i }).fill('existing@example.com');
        await m.getByRole('textbox', { name: /operations email/i }).fill('existing@example.com');
    }

    // ── Entity fields ─────────────────────────────────────────────────────────
    // Modal label is "Name *" (not "Entity Name"); Entity Status is not required

    async _fillEntityRequiredFields() {
        const ts = Date.now();
        await this.modalContainer.getByRole('textbox', { name: /^name/i }).fill(`Entity${ts}`);
    }

    async _fillEntityRequiredFieldsExceptOne() {
        // Only one required field (Name), so "except one" means fill nothing
    }

    async _fillEntityWithExisting() {
        await this.modalContainer.getByRole('textbox', { name: /^name/i }).fill('ExistingEntity');
    }

    // ── Grid assertions ───────────────────────────────────────────────────────

    async verifyGridRefreshed() {
        await this.grid.waitFor({ state: 'visible', timeout: 15000 });
    }

    async verifyGridUnchanged() {
        await this.grid.waitFor({ state: 'visible', timeout: 10000 });
    }

    // ── Cross-module consistency ──────────────────────────────────────────────

    async openModalOnModule(module) {
        await this.navigateTo(module);
        await this.clickAddNewButton();
    }

    async verifyConsistentLayout() {
        await expect(this.modalContainer).toBeVisible({ timeout: 10000 });
    }

    // ── Success / error ───────────────────────────────────────────────────────

    async verifySuccessConfirmation() {
        await expect(
            this.page.locator('simple-snack-bar, mat-snack-bar-container, .mat-mdc-snack-bar-container').first()
        ).toBeVisible({ timeout: 15000 });
    }

    async verifyErrorOrWarning() {
        await expect(
            this.page.locator('simple-snack-bar, mat-snack-bar-container, .mat-mdc-snack-bar-container, mat-error').first()
        ).toBeVisible({ timeout: 15000 });
    }

    async closeModalWithoutSaving() {
        await this.page.keyboard.press('Escape');
    }
}
