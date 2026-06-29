import { LOCATORS } from '../utils/locators.js';

export class AddNewUserPage {
    constructor(page) {
        this.page = page;
        this.addNewUserButton = LOCATORS.AddNewUserPage.addNewUserButton(page);
        this.emailInput = LOCATORS.AddNewUserPage.emailInput(page);
        this.firstNameInput = LOCATORS.AddNewUserPage.firstNameInput(page);
        this.lastNameInput = LOCATORS.AddNewUserPage.lastNameInput(page);
        this.titleInput = LOCATORS.AddNewUserPage.titleInput(page);
        this.nicknameInput = LOCATORS.AddNewUserPage.nicknameInput(page);
        this.addUserButton = LOCATORS.AddNewUserPage.addUserButton(page);
        this.basicInfoTabpanel = LOCATORS.AddNewUserPage.basicInfoTabpanel(page);
    }

    async navigateToUsers() {
        const origin = new URL(this.page.url()).origin;
        await this.page.goto(`${origin}/users`);
        await this.page.evaluate(() => {
            document.querySelectorAll('app-splash-screen, .splash-overlay, [class*="splash"]').forEach(el => {
                el.style.display = 'none';
                el.style.visibility = 'hidden';
                el.style.pointerEvents = 'none';
            });
        }).catch(() => {});
        await this.addNewUserButton.waitFor({ state: 'visible', timeout: 60000 });
    }

    async clickAddNewUser() {
        await this.page.evaluate(() => {
            document.querySelectorAll('app-splash-screen, .splash-overlay, [class*="splash"]').forEach(el => {
                el.style.display = 'none';
                el.style.visibility = 'hidden';
                el.style.pointerEvents = 'none';
            });
        }).catch(() => {});
        // Try regular click first (preserves Angular event dispatch); fall back to force
        try {
            await this.addNewUserButton.click({ timeout: 5000 });
        } catch {
            await this.addNewUserButton.click({ force: true });
        }
    }

    async fillEmail(email) {
        await this.emailInput.click();
        await this.emailInput.fill(email);
    }

    async fillFirstName(firstName) {
        await this.firstNameInput.click();
        await this.firstNameInput.fill(firstName);
    }

    async fillLastName(lastName) {
        await this.lastNameInput.click();
        await this.lastNameInput.fill(lastName);
    }

    async fillTitle(title) {
        await this.titleInput.click();
        await this.titleInput.fill(title);
    }

    async fillNickname(nickname) {
        await this.nicknameInput.click();
        await this.nicknameInput.fill(nickname);
    }

    async clickAddUserButton() {
        await this.addUserButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.addUserButton.click();
    }

    async verifyBasicInfoVisible() {
        await this.page.locator('mat-dialog-container').waitFor({ state: 'visible', timeout: 10000 });
    }

    async verifyAddUserButtonEnabled() {
        await this.addUserButton.waitFor({ state: 'visible', timeout: 10000 });
        const isEnabled = await this.addUserButton.isEnabled();
        return isEnabled;
    }

    async createNewUser(email, firstName, lastName, title, nickname) {
        await this.navigateToUsers();
        await this.clickAddNewUser();
        await this.verifyBasicInfoVisible();
        await this.fillEmail(email);
        await this.fillFirstName(firstName);
        await this.fillLastName(lastName);
        await this.fillTitle(title);
        await this.fillNickname(nickname);
        await this.clickAddUserButton();
    }
}