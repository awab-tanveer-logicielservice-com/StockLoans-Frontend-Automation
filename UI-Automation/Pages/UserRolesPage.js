import { LOCATORS } from '../utils/locators.js';

const ALL_14_ROLES = [
  'Creates Entities',
  'Can enter contracts',
  'Can approve contracts',
  'Can edit contracts',
  'Can view a list of users',
  'Can create, update, destroy users',
  'Can update instrument data',
  'Can view FPL Accounts and Positions',
  'Can manage FPL Accounts',
  'Can trade from FPL Positions',
  'Can review contracts',
  'Can use LCOR functionality',
  'Can use Memoseg functionality',
  'Reveal beta features on the website',
];

export class UserRolesPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToUsers() {
    const origin = new URL(this.page.url()).origin;
    await this.page.goto(`${origin}/users`);
    await this.page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
    await LOCATORS.UserRolesPage.addNewUserButton(this.page).waitFor({ state: 'visible', timeout: 30000 }).catch(() => {});
  }

  async openFirstUserDetails() {
    const firstRow = LOCATORS.UserRolesPage.firstUserRow(this.page);
    await firstRow.waitFor({ state: 'visible', timeout: 30000 });
    await firstRow.click();
    // Wait for the side-panel heading to appear
    await this.page.locator('h2, h3').filter({ hasText: /\w+ \w+/ }).first()
      .waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
    await this.page.waitForTimeout(500);
  }

  async clickUserRolesTab() {
    const tab = LOCATORS.UserRolesPage.userRolesTab(this.page);
    await tab.waitFor({ state: 'visible', timeout: 20000 }).catch(() => {});
    await tab.click({ force: true });
    // Wait for the first role switch inside the Roles tabpanel to appear
    await this.page.getByRole('tabpanel', { name: 'Roles' }).getByRole('switch').first()
      .waitFor({ state: 'visible', timeout: 15000 }).catch(() => {});
  }

  async navigateToUserRolesSubpage() {
    await this.navigateToUsers();
    await this.openFirstUserDetails();
    await this.clickUserRolesTab();
  }

  // Returns the switch toggle for the given role name.
  // Scoped to the Roles tabpanel so nth() is not offset by switches elsewhere (e.g. snack bar).
  _getRoleSwitch(roleName) {
    const index = ALL_14_ROLES.indexOf(roleName);
    if (index === -1) throw new Error(`Unknown role: "${roleName}"`);
    return this.page.getByRole('tabpanel', { name: 'Roles' }).getByRole('switch').nth(index);
  }

  async isRoleAssigned(roleName) {
    // Wait for all 14 switches to be present — ensures the tabpanel has fully re-rendered
    const rolesPanel = this.page.getByRole('tabpanel', { name: 'Roles' });
    await rolesPanel.getByRole('switch').nth(ALL_14_ROLES.length - 1)
      .waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
    const sw = this._getRoleSwitch(roleName);
    const ariaChecked = await sw.getAttribute('aria-checked').catch(() => null);
    return ariaChecked === 'true';
  }

  async _ensureRolesTabActive() {
    const tab = LOCATORS.UserRolesPage.userRolesTab(this.page);
    const tabVisible = await tab.isVisible().catch(() => false);
    if (!tabVisible) return;
    const isSelected = await tab.getAttribute('aria-selected').catch(() => null);
    if (isSelected !== 'true') {
      await tab.click();
      await this.page.getByRole('tabpanel', { name: 'Roles' }).getByRole('switch').first()
        .waitFor({ state: 'visible', timeout: 15000 }).catch(() => {});
    }
    await this.page.waitForTimeout(300);
  }

  async addRole(roleName) {
    await this._ensureRolesTabActive();
    const assigned = await this.isRoleAssigned(roleName);
    if (!assigned) {
      await this._getRoleSwitch(roleName).click();
      await this.page.waitForTimeout(200);
    }
  }

  async removeRole(roleName) {
    await this._ensureRolesTabActive();
    const sw = this._getRoleSwitch(roleName);
    await sw.waitFor({ state: 'visible', timeout: 10000 });
    const ariaChecked = await sw.getAttribute('aria-checked').catch(() => null);
    if (ariaChecked === 'true') {
      await sw.click();
      // Wait until aria-checked actually becomes 'false' (handles Angular change detection bounce)
      await this.page.waitForFunction(
        ([tabRole, roleIndex]) => {
          const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));
          const rolesPanel = panels.find(p =>
            (p.getAttribute('aria-label') || p.getAttribute('aria-labelledby') || '').toLowerCase().includes('roles') ||
            p.textContent.toLowerCase().includes('user roles')
          ) || panels[panels.length - 1];
          if (!rolesPanel) return false;
          const switches = Array.from(rolesPanel.querySelectorAll('[role="switch"]'));
          const sw = switches[roleIndex];
          return sw && sw.getAttribute('aria-checked') === 'false';
        },
        ['Roles', ALL_14_ROLES.indexOf(roleName)],
        { timeout: 8000 }
      ).catch(async () => {
        // If waitForFunction times out, try clicking again with force
        await sw.click({ force: true });
        await this.page.waitForTimeout(500);
      });
    }
  }

  async addAllRoles() {
    for (const role of ALL_14_ROLES) {
      await this.addRole(role);
    }
  }

  async removeAllRoles() {
    for (const role of ALL_14_ROLES) {
      await this.removeRole(role);
    }
  }

  async saveRoles() {
    const snackBar = this.page.locator('mat-snack-bar-container');
    const saveBtn = this.page.getByRole('button', { name: 'Save Roles' });
    await saveBtn.waitFor({ state: 'visible', timeout: 10000 });
    // Dismiss any lingering snack bar from a previous save before triggering a new one
    await snackBar.waitFor({ state: 'hidden', timeout: 6000 }).catch(() => {});
    await saveBtn.click();
  }

  async cancelChanges() {
    // No Cancel button — navigate away to discard changes
    await this.navigateToUsers();
  }

  async verifySuccessSnackBar() {
    const snackBar = LOCATORS.UserRolesPage.snackBar(this.page);
    await snackBar.waitFor({ state: 'visible', timeout: 15000 });
  }

  async verifyUserRolesSubpageVisible() {
    const tab = LOCATORS.UserRolesPage.userRolesTab(this.page);
    await tab.waitFor({ state: 'visible', timeout: 10000 });
  }

  async verifyAllRolesListed() {
    for (const role of ALL_14_ROLES) {
      await this.verifyRoleListed(role);
    }
  }

  async verifyRoleListed(roleName) {
    const sw = this._getRoleSwitch(roleName);
    await sw.waitFor({ state: 'visible', timeout: 20000 }).catch(() => {});
  }

  async verifyRoleAssigned(roleName) {
    const assigned = await this.isRoleAssigned(roleName);
    if (!assigned) {
      throw new Error(`Expected role "${roleName}" to be assigned but it is not`);
    }
  }

  async verifyRoleNotAssigned(roleName) {
    // Wait for any active snack bar to dismiss — ensures the save round-trip is complete
    // and the component has re-rendered from the Firebase response before we read state.
    await this.page.locator('mat-snack-bar-container').waitFor({ state: 'hidden', timeout: 10000 }).catch(() => {});
    const assigned = await this.isRoleAssigned(roleName);
    if (assigned) {
      throw new Error(`Expected role "${roleName}" to NOT be assigned but it is`);
    }
  }

  async verifySaveButtonVisible() {
    const saveBtn = this.page.getByRole('button', { name: 'Save Roles' });
    await saveBtn.waitFor({ state: 'visible', timeout: 10000 });
  }

  async reloadPage() {
    await this.page.reload();
    await this.page.waitForTimeout(2000);
  }

  static get allRoles() {
    return ALL_14_ROLES;
  }
}
