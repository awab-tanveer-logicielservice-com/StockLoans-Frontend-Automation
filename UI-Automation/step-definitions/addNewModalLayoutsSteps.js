import { createBdd } from 'playwright-bdd';
import { test } from './fixtures.js';

const { Given, When, Then } = createBdd(test);

// NOTE: The following steps are already registered in other step files and are
// reused here automatically by playwright-bdd:
//   - "the user is logged in to the application"       â†’ commonSteps.js
//   - "the user navigates to the application"          â†’ commonSteps.js
//   - "the user logs in with valid credentials"        â†’ LoginStepDef.js
//   - "the user should be redirected to the dashboard" â†’ LoginStepDef.js
//
// The following steps are defined HERE and shared with AddNewSecurity.feature
// (addNewModalLayoutsPage._getSaveButton() falls back to 'Add' when no module is set):
//   - "the user clicks the Save button"
//   - "a success confirmation should be displayed"
//   - "an appropriate error or warning message should be displayed"
//   - "the Save button should be disabled"
//   - "the Save button should be enabled"
//   - "the user closes the modal without saving"

// â”€â”€ Navigation â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

When('the user navigates to the Users module', async ({ addNewModalLayoutsPage }) => {
    await addNewModalLayoutsPage.navigateTo('user');
});

When('the user navigates to the Counterparty module', async ({ addNewModalLayoutsPage }) => {
    await addNewModalLayoutsPage.navigateTo('counterparty');
});

When('the user navigates to the Entity module', async ({ addNewModalLayoutsPage }) => {
    await addNewModalLayoutsPage.navigateTo('entity');
});

// â”€â”€ Add New button â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

When('the user clicks the Add New button', async ({ addNewModalLayoutsPage }) => {
    await addNewModalLayoutsPage.clickAddNewButton();
});

// â”€â”€ Modal visibility â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

Then('the Add New User modal should be visible', async ({ addNewModalLayoutsPage }) => {
    await addNewModalLayoutsPage.verifyModalVisible();
});

Then('the Add New Counterparty modal should be visible', async ({ addNewModalLayoutsPage }) => {
    await addNewModalLayoutsPage.verifyModalVisible();
});

Then('the Add New Entity modal should be visible', async ({ addNewModalLayoutsPage }) => {
    await addNewModalLayoutsPage.verifyModalVisible();
});

// â”€â”€ Modal closed â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

Then('the Add New User modal should be closed', async ({ addNewModalLayoutsPage }) => {
    await addNewModalLayoutsPage.verifyModalClosed();
});

Then('the Add New Counterparty modal should be closed', async ({ addNewModalLayoutsPage }) => {
    await addNewModalLayoutsPage.verifyModalClosed();
});

Then('the Add New Entity modal should be closed', async ({ addNewModalLayoutsPage }) => {
    await addNewModalLayoutsPage.verifyModalClosed();
});

// â”€â”€ Theme-aware styling â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

Then('the Add New User modal should be centered with theme-aware styling', async ({ addNewModalLayoutsPage }) => {
    await addNewModalLayoutsPage.verifyStyling();
});

Then('the Add New Counterparty modal should be centered with theme-aware styling', async ({ addNewModalLayoutsPage }) => {
    await addNewModalLayoutsPage.verifyStyling();
});

Then('the Add New Entity modal should be centered with theme-aware styling', async ({ addNewModalLayoutsPage }) => {
    await addNewModalLayoutsPage.verifyStyling();
});

// â”€â”€ Fill required fields â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

When('the user fills in all required fields in the Add New User modal', async ({ addNewModalLayoutsPage }) => {
    await addNewModalLayoutsPage.fillRequiredFields('user');
});

When('the user fills in all required fields in the Add New Counterparty modal', async ({ addNewModalLayoutsPage }) => {
    await addNewModalLayoutsPage.fillRequiredFields('counterparty');
});

When('the user fills in all required fields in the Add New Entity modal', async ({ addNewModalLayoutsPage }) => {
    await addNewModalLayoutsPage.fillRequiredFields('entity');
});

// â”€â”€ Fill required except one â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

When('the user fills in all required fields except one in the Add New User modal', async ({ addNewModalLayoutsPage }) => {
    await addNewModalLayoutsPage.fillRequiredFieldsExceptOne('user');
});

When('the user fills in all required fields except one in the Add New Counterparty modal', async ({ addNewModalLayoutsPage }) => {
    await addNewModalLayoutsPage.fillRequiredFieldsExceptOne('counterparty');
});

When('the user fills in all required fields except one in the Add New Entity modal', async ({ addNewModalLayoutsPage }) => {
    await addNewModalLayoutsPage.fillRequiredFieldsExceptOne('entity');
});

// â”€â”€ Fill with existing data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

When('the user fills in all required fields using details of an existing user', async ({ addNewModalLayoutsPage }) => {
    await addNewModalLayoutsPage.fillRequiredFieldsWithExisting('user');
});

When('the user fills in all required fields using details of an existing counterparty', async ({ addNewModalLayoutsPage }) => {
    await addNewModalLayoutsPage.fillRequiredFieldsWithExisting('counterparty');
});

When('the user fills in all required fields using details of an existing entity', async ({ addNewModalLayoutsPage }) => {
    await addNewModalLayoutsPage.fillRequiredFieldsWithExisting('entity');
});

// â”€â”€ Grid assertions â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

Then('the Users grid should refresh with the new user record', async ({ addNewModalLayoutsPage }) => {
    await addNewModalLayoutsPage.verifyGridRefreshed();
});

Then('the Counterparty grid should refresh with the new counterparty record', async ({ addNewModalLayoutsPage }) => {
    await addNewModalLayoutsPage.verifyGridRefreshed();
});

Then('the Entity grid should refresh with the new entity record', async ({ addNewModalLayoutsPage }) => {
    await addNewModalLayoutsPage.verifyGridRefreshed();
});

Then('the Users grid should remain unchanged', async ({ addNewModalLayoutsPage }) => {
    await addNewModalLayoutsPage.verifyGridUnchanged();
});

Then('the Counterparty grid should remain unchanged', async ({ addNewModalLayoutsPage }) => {
    await addNewModalLayoutsPage.verifyGridUnchanged();
});

Then('the Entity grid should remain unchanged', async ({ addNewModalLayoutsPage }) => {
    await addNewModalLayoutsPage.verifyGridUnchanged();
});

// â”€â”€ Toolbar visibility â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

Then('the Add New button should be visible and enabled on the toolbar', async ({ addNewModalLayoutsPage }) => {
    await addNewModalLayoutsPage.verifyAddButtonEnabledOnToolbar();
});

// â”€â”€ Read-only access â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

Given('the user is logged in with read-only permissions', async ({ page, loginPage, testUsers }) => {
    await page.setViewportSize({ width: 1536, height: 720 });
    await loginPage.navigate();
    await loginPage.login(
        testUsers.readOnlyUsername || testUsers.username,
        testUsers.readOnlyPassword || testUsers.password
    );
});

Then('the Add New button should not be available or should be disabled', async ({ addNewModalLayoutsPage }) => {
    await addNewModalLayoutsPage.verifyAddButtonNotAvailable();
});

// â”€â”€ Shared: Save / Success / Error / Close (also used by AddNewSecurity.feature) â”€â”€â”€â”€â”€

When('the user clicks the Save button', async ({ addNewModalLayoutsPage }) => {
    await addNewModalLayoutsPage.clickSaveButton();
});

Then('a success confirmation should be displayed', async ({ addNewModalLayoutsPage }) => {
    await addNewModalLayoutsPage.verifySuccessConfirmation();
});

Then('an appropriate error or warning message should be displayed', async ({ addNewModalLayoutsPage }) => {
    await addNewModalLayoutsPage.verifyErrorOrWarning();
});

Then('the Save button should be disabled', async ({ addNewModalLayoutsPage }) => {
    await addNewModalLayoutsPage.verifySaveButtonDisabled();
});

Then('the Save button should be enabled', async ({ addNewModalLayoutsPage }) => {
    await addNewModalLayoutsPage.verifySaveButtonEnabled();
});

When('the user closes the modal without saving', async ({ addNewModalLayoutsPage }) => {
    await addNewModalLayoutsPage.closeModalWithoutSaving();
});

// â”€â”€ Cross-module consistency â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

When('the user opens the Add New modal on the Users module', async ({ addNewModalLayoutsPage }) => {
    await addNewModalLayoutsPage.openModalOnModule('user');
});

When('the user opens the Add New modal on the Counterparty module', async ({ addNewModalLayoutsPage }) => {
    await addNewModalLayoutsPage.openModalOnModule('counterparty');
});

When('the user opens the Add New modal on the Entity module', async ({ addNewModalLayoutsPage }) => {
    await addNewModalLayoutsPage.openModalOnModule('entity');
});

Then('all three modals should have a consistent layout and styling', async ({ addNewModalLayoutsPage }) => {
    await addNewModalLayoutsPage.verifyConsistentLayout();
});
