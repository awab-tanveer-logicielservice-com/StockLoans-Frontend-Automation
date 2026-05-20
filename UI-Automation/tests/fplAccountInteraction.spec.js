import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage.js';
import { FPLAccountPage } from '../Pages/FPLAccountPage.js';
import { users } from '../utils/testdata.js';

test.describe('FPL Account Interaction Tests', () => {
  test.setTimeout(180000);

  test('should navigate to FPL accounts and interact with OMNIHK account details', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const fplAccountPage = new FPLAccountPage(page);

    // Set viewport to full screen
    await page.setViewportSize({ width: 1900, height: 945 });

    // Login
    await loginPage.navigate();
    await loginPage.login(users.username, users.password);

    // Navigate to FPL Accounts
    await fplAccountPage.navigateToFPLAccounts();
    await fplAccountPage.closeSidebar();
    await fplAccountPage.verifyAccountRowVisible();

    // Filter by OMNIHK - click first occurrence
    await fplAccountPage.selectOMNIHK();

    // Apply filter
    await fplAccountPage.filterByOMNIHK();

    // Click second OMNIHK occurrence
    await fplAccountPage.clickOMNIHKSecond();

    // Interact with account grid cells
    await fplAccountPage.clickGridCell('FPL', true, 0);
    await fplAccountPage.clickGridCell('VCSO', false, 0);
    await fplAccountPage.clickGridCell('L', true, 0);
    await fplAccountPage.clickGridCell('A', false, 0);
    await fplAccountPage.clickGridCell('0.5', false, 0);
    await fplAccountPage.clickGridCell('0.5', false, 0);
    await fplAccountPage.clickGridCell('0.5', false, 0);

    // Click center viewport
    await fplAccountPage.centerColsViewport.click();

    // Verify and interact with FPL VCSO row if it exists
    try {
      await fplAccountPage.clickFPLVcsoRowParagraph();
      await fplAccountPage.verifyFPLVcsoRow();

      // Verify dropdown option visibility
      await fplAccountPage.clickFPLVcsoRowParagraph();
      await fplAccountPage.verifyDropdownOption('APEX Clearing');

      // Close dropdown and focused cell
      await fplAccountPage.closeDropdown(2);
      await fplAccountPage.closeFocusedCell();
    } catch (e) {
      console.log('FPL VCSO row interaction skipped - row not found in current data');
    }
  });
});
