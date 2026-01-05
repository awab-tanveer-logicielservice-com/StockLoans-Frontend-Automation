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
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Login
    await loginPage.navigate();
    await loginPage.login(users.username, users.password);
    await page.waitForTimeout(5000);
  });

  test('create new user with all required fields', async ({ page }) => {
    const userData = generateRandomUserData();

    // Navigate to users page and open form
    await addNewUserPage.navigateToUsers();
    await addNewUserPage.clickAddNewUser();
    await addNewUserPage.verifyBasicInfoVisible();

    // Fill all required fields
    await addNewUserPage.fillEmail(userData.email);
    await addNewUserPage.fillFirstName(userData.firstName);
    await addNewUserPage.fillLastName(userData.lastName);
    await addNewUserPage.fillTitle(userData.title);
    await addNewUserPage.fillNickname(userData.nickname);

    // Verify the Add User button is enabled
    await expect(addNewUserPage.addUserButton).toBeEnabled();
  });

  test('navigate to users page', async ({ page }) => {
    await addNewUserPage.navigateToUsers();

    // Verify users page is loaded
    await expect(page.getByRole('row', { name: 'First Last Disabled' })).toBeVisible();
  });

  test('open add new user form', async ({ page }) => {
    await addNewUserPage.navigateToUsers();
    await addNewUserPage.clickAddNewUser();

    // Verify form is visible
    await expect(addNewUserPage.basicInfoTabpanel).toBeVisible();
    await expect(addNewUserPage.addUserButton).toBeVisible();
  });

  test('fill user form and verify button is enabled', async ({ page }) => {
    const userData = generateRandomUserData();

    await addNewUserPage.navigateToUsers();
    await addNewUserPage.clickAddNewUser();

    // Verify form is visible
    await addNewUserPage.verifyBasicInfoVisible();

    // Fill all fields
    await addNewUserPage.fillEmail(userData.email);
    await addNewUserPage.fillFirstName(userData.firstName);
    await addNewUserPage.fillLastName(userData.lastName);
    await addNewUserPage.fillTitle(userData.title);
    await addNewUserPage.fillNickname(userData.nickname);

    // Verify button is visible and enabled
    await expect(addNewUserPage.addUserButton).toBeVisible();
  });

  test('fill individual form fields', async ({ page }) => {
    const userData = generateRandomUserData();

    await addNewUserPage.navigateToUsers();
    await addNewUserPage.clickAddNewUser();
    await addNewUserPage.verifyBasicInfoVisible();

    // Test email field
    await addNewUserPage.fillEmail(userData.email);
    await expect(addNewUserPage.emailInput).toHaveValue(userData.email);

    // Test first name field
    await addNewUserPage.fillFirstName(userData.firstName);
    await expect(addNewUserPage.firstNameInput).toHaveValue(userData.firstName);

    // Test last name field
    await addNewUserPage.fillLastName(userData.lastName);
    await expect(addNewUserPage.lastNameInput).toHaveValue(userData.lastName);

    // Test title field
    await addNewUserPage.fillTitle(userData.title);
    await expect(addNewUserPage.titleInput).toHaveValue(userData.title);

    // Test nickname field
    await addNewUserPage.fillNickname(userData.nickname);
    await expect(addNewUserPage.nicknameInput).toHaveValue(userData.nickname);
  });
});
