import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage.js';
import { DashboardPage } from '../Pages/DashboardPage.js';
import { AddNewUserPage } from '../Pages/addNewUserPage.js';
import { users } from '../utils/testdata.js';

// Helper function to generate random email
function generateRandomEmail() {
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 1000);
  return `testuser${timestamp}${randomNum}@yopmail.com`;
}

// Helper function to generate random user data
function generateRandomUserData() {
  const firstNames = ['John', 'Jane', 'Mike', 'Sarah', 'David', 'Emily', 'Alex', 'Lisa'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];
  const titles = ['Manager', 'Developer', 'Analyst', 'Tester', 'Admin', 'Coordinator'];
  const nicknames = ['Johnny', 'Jay', 'Mike', 'Sue', 'Dave', 'Em', 'Al', 'Lee'];

  return {
    email: generateRandomEmail(),
    firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
    lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
    title: titles[Math.floor(Math.random() * titles.length)],
    nickname: nicknames[Math.floor(Math.random() * nicknames.length)]
  };
}

test.describe('Add New User Tests', () => {
  let loginPage;
  let dashboardPage;
  let addNewUserPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    addNewUserPage = new AddNewUserPage(page);

    // Set viewport to full screen
    await page.setViewportSize({ width: 1900, height: 945 });

    // Login
    await loginPage.navigate();
    await loginPage.login(users.username, users.password);
    await page.waitForTimeout(5000);
  });

  test('All add new user scenarios in one test', async ({ page }) => {
    const userData = generateRandomUserData();

    // SCENARIO 1: Navigate to Users page and open Add New User form
    await addNewUserPage.navigateToUsers();
    await expect(addNewUserPage.addNewUserButton).toBeVisible();
    await addNewUserPage.clickAddNewUser();
    await expect(addNewUserPage.basicInfoTabpanel).toBeVisible();
    await expect(addNewUserPage.addUserButton).toBeVisible();

    // SCENARIO 2: Fill all required fields and verify Add button becomes enabled
    await addNewUserPage.fillEmail(userData.email);
    await addNewUserPage.fillFirstName(userData.firstName);
    await addNewUserPage.fillLastName(userData.lastName);
    await addNewUserPage.fillTitle(userData.title);
    await addNewUserPage.fillNickname(userData.nickname);
    await expect(addNewUserPage.addUserButton).toBeEnabled();

    // SCENARIO 3: Verify individual fields keep their values
    await expect(addNewUserPage.emailInput).toHaveValue(userData.email);
    await expect(addNewUserPage.firstNameInput).toHaveValue(userData.firstName);
    await expect(addNewUserPage.lastNameInput).toHaveValue(userData.lastName);
    await expect(addNewUserPage.titleInput).toHaveValue(userData.title);
    await expect(addNewUserPage.nicknameInput).toHaveValue(userData.nickname);

    // SCENARIO 4: Close form and re-open to ensure page stability
    await page.keyboard.press('Escape');
    await addNewUserPage.navigateToUsers();
    await addNewUserPage.clickAddNewUser();
    await expect(addNewUserPage.basicInfoTabpanel).toBeVisible();
  });
});
