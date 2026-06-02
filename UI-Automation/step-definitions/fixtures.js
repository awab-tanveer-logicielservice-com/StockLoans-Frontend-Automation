import { test as base } from 'playwright-bdd';
import { LoginPage } from '../Pages/LoginPage.js';
import { DashboardPage } from '../Pages/DashboardPage.js';
import { FPLAccountPage } from '../Pages/FPLAccountPage.js';
import { AddNewCounterPartyPage } from '../Pages/AddNewCounterPartyPage.js';
import { AddNewUserPage } from '../Pages/addNewUserPage.js';
import { UserRolesPage } from '../Pages/UserRolesPage.js';
import { AddNewSecurityPage } from '../Pages/AddNewSecurityPage.js';
import { AddNewModalLayoutsPage } from '../Pages/AddNewModalLayoutsPage.js';
import { MemoSegPage } from '../Pages/MemoSegPage.js';
import { ShortInterestRateAdjustmentPage } from '../Pages/ShortInterestRateAdjustmentPage.js';
import { ShortRateAdjustmentPage } from '../Pages/ShortRateAdjustmentPage.js';
import { ContractSummaryPage } from '../Pages/ContractSummaryPage.js';
import { ContractDetailsPage } from '../Pages/ContractDetailsPage.js';
import { ContractReviewPage } from '../Pages/ContractReviewPage.js';
import { ContractManagementPage } from '../Pages/ContractManagementPage.js';
import { LCORPage } from '../Pages/LCORPage.js';
import { RememberMePage } from '../Pages/RememberMePage.js';
import { SearchLendingPitLookUpPage } from '../Pages/SearchLendingPitLookUpPage.js';
import { BulkImportPage } from '../Pages/BulkImportPage.js';
import { ReportPage } from '../Pages/ReportPage.js';
import { users, devUsers } from '../utils/testdata.js';

export const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  fplAccountPage: async ({ page }, use) => {
    await use(new FPLAccountPage(page));
  },
  addNewUserPage: async ({ page }, use) => {
    await use(new AddNewUserPage(page));
  },
  userRolesPage: async ({ page }, use) => {
    await use(new UserRolesPage(page));
  },
  addNewCounterPartyPage: async ({ page }, use) => {
    await use(new AddNewCounterPartyPage(page));
  },
  addNewSecurityPage: async ({ page }, use) => {
    await use(new AddNewSecurityPage(page));
  },
  addNewModalLayoutsPage: async ({ page }, use) => {
    await use(new AddNewModalLayoutsPage(page));
  },
  memoSegPage: async ({ page }, use) => {
    await use(new MemoSegPage(page));
  },
  shortInterestRateAdjustmentPage: async ({ page }, use) => {
    await use(new ShortInterestRateAdjustmentPage(page));
  },
  shortRateAdjustmentPage: async ({ page }, use) => {
    await use(new ShortRateAdjustmentPage(page));
  },
  contractSummaryPage: async ({ page }, use) => {
    await use(new ContractSummaryPage(page));
  },
  contractDetailsPage: async ({ page }, use) => {
    await use(new ContractDetailsPage(page));
  },
  contractReviewPage: async ({ page }, use) => {
    await use(new ContractReviewPage(page));
  },
  contractManagementPage: async ({ page }, use) => {
    await use(new ContractManagementPage(page));
  },
  lcorPage: async ({ page }, use) => {
    await use(new LCORPage(page));
  },
  rememberMePage: async ({ page }, use) => {
    await use(new RememberMePage(page));
  },
  searchLendingPitLookUpPage: async ({ page }, use) => {
    await use(new SearchLendingPitLookUpPage(page));
  },
  bulkImportPage: async ({ page }, use) => {
    await use(new BulkImportPage(page));
  },
  reportPage: async ({ page }, use) => {
    await use(new ReportPage(page));
  },
  testUsers: async ({}, use) => {
    const baseURL = process.env.BASE_URL || '';
    await use(baseURL.includes('dev') ? devUsers : users);
  },
});
