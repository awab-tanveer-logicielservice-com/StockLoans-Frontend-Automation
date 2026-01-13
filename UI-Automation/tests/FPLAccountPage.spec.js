import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage.js';
import { FPLAccountPage } from '../Pages/FPLAccountPage.js';
import { users } from '../utils/testdata.js';

test.describe('FPL Account Page', () => {
  test.setTimeout(60000);

  test('should navigate and filter FPL accounts', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(users.username, users.password);
    await page.setViewportSize({ width: 1900, height: 945 });

    const fplAccountPage = new FPLAccountPage(page);
    await fplAccountPage.navigate();
    await fplAccountPage.navigateToFPLAccounts();
    await fplAccountPage.verifyAccountRowVisible();

    await fplAccountPage.selectGTNRow();
    await fplAccountPage.verifyGTNRowVisible();

    await fplAccountPage.selectOMNIHK();
    await fplAccountPage.verifyGTNFPLTestRowVisible();

    await fplAccountPage.filterByOMNIHK();
    // Validate that filtering produced expected rows
    await fplAccountPage.verifyFilterResult();
  });
});
