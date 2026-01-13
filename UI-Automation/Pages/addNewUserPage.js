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
        const menuBtn = LOCATORS.AddNewUserPage.menuButton(this.page);
        const usersLink = LOCATORS.AddNewUserPage.usersLink(this.page);

        await menuBtn.waitFor({ state: 'visible', timeout: 10000 });
        try {
            await menuBtn.click();
        } catch (e) {
            await menuBtn.click({ force: true });
        }

        await usersLink.waitFor({ state: 'visible', timeout: 10000 });
        try {
            await usersLink.click();
        } catch (e) {
            await usersLink.click({ force: true });
        }

        // Wait for Users page to finish loading by ensuring the Add New User button or the Users header is visible
        const timeout = 10000;
        const start = Date.now();
        while (Date.now() - start < timeout) {
            try {
                if (await this.addNewUserButton.isVisible()) return;
            } catch (e) {}
            try {
                if (await this.page.getByRole('row', { name: 'Name' }).isVisible()) return;
            } catch (e) {}
            await this.page.waitForTimeout(200);
        }
        throw new Error('Users page did not finish loading within timeout');
    }

    async clickAddNewUser() {
        await this.addNewUserButton.click();
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
    }

    async verifyBasicInfoVisible() {
        await this.basicInfoTabpanel.waitFor({ state: 'visible', timeout: 10000 });
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