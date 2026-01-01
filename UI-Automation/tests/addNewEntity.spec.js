import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage.js';
import { DashboardPage } from '../Pages/DashboardPage.js';
import { AddNewEntityPage } from '../Pages/AddNewEntityPage.js';
import { users } from '../utils/testdata';

// Helper function to generate random name
function generateRandomName() {
  const firstNames = ['Tester', 'Admin', 'Manager', 'Developer', 'Analyst'];
  const lastNames = ['User', 'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];

  // Generate 4 random digits
  let digits = '';
  for (let i = 0; i < 4; i++) {
    digits += Math.floor(Math.random() * 10);
  }

  // Select random first and last name
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

  return `${digits} - ${firstName} ${lastName}`;
}

test.describe('Add New Entity Tests', () => {
  let loginPage;
  let dashboardPage;
  let addNewEntityPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    addNewEntityPage = new AddNewEntityPage(page);

    // Set viewport to full screen
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Login
    await loginPage.navigate();
    await loginPage.login(users.username, users.password);
    await page.waitForTimeout(5000);
  });

  test('create new entity with active status', async ({ page }) => {
    const entityName = generateRandomName();

    // Navigate to entities and create new entity
    await addNewEntityPage.createNewEntity(entityName);

    // Verify entity was created successfully
    await expect(page.getByRole('row', { name: 'Name' })).toBeVisible();
  });

  test('navigate to entities page', async ({ page }) => {
    await addNewEntityPage.navigateToEntities();

    // Verify entities page is loaded
    await expect(page.getByRole('row', { name: 'Name' })).toBeVisible();
  });

  test('fill entity name and select status', async ({ page }) => {
    const entityName = generateRandomName();

    await addNewEntityPage.navigateToEntities();
    await addNewEntityPage.clickAddNewEntity();

    // Verify form is visible
    await expect(page.getByRole('tabpanel', { name: 'Basic Info' })).toBeVisible();

    await addNewEntityPage.fillEntityName(entityName);
    await addNewEntityPage.selectActiveStatus();

    // Verify option was selected
    await expect(page.getByRole('option', { name: 'Active', exact: true })).toBeVisible();
  });
});