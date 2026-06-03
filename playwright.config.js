import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const bddConfig = defineBddConfig({
  features: [
    'UI-Automation/features/ContractsSummary.feature',
    'UI-Automation/features/ContractDetails.feature',
    'UI-Automation/features/AddNewSecurity.feature',
    'UI-Automation/features/SecurityMasterSearchEdit.feature',
    'UI-Automation/features/AddNewModalLayouts.feature',
    'UI-Automation/features/LendingPitTweaks.feature',
    'UI-Automation/features/Bulkimport.feature',
    'UI-Automation/features/ContractManagement.feature',
    'UI-Automation/features/memosegFeature.feature',
    'UI-Automation/features/ShortInterestRateAdjustment.feature',
    'UI-Automation/features/ShortRateAdjustment.feature',
    'UI-Automation/features/ContractReview.feature',
    'UI-Automation/features/LCOR.feature',
    'UI-Automation/features/ReportDateFiltersGrouping.feature',
    'UI-Automation/features/AddNewUser.feature',
    'UI-Automation/features/UserRoles.feature',
  ],
  steps: 'UI-Automation/step-definitions/**/*.js',
  outputDir: 'UI-Automation/.features-gen',
});

export default defineConfig({
  testDir: 'UI-Automation/tests',
  timeout: 240_000,
  expect: { timeout: 10000 },
  fullyParallel: false,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [['list'], ['allure-playwright']],
  use: {
    baseURL: process.env.BASE_URL || 'https://qa-sls-v2.web.app/login',
    headless: true,
    viewport: { width: 1920, height: 1080 },
    actionTimeout: 10_000,
    ignoreHTTPSErrors: true,
    trace: 'on-first-retry'
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        headless: true,
      },
    },
    {
      name: 'bdd',
      testDir: bddConfig,
      use: {
        headless: true,
        slowMo: 500,
        viewport: null,
        deviceScaleFactor: undefined,
        launchOptions: {
          args: [
            '--start-maximized',
            '--window-position=0,0',
            '--window-size=1920,1080',
            // Prevent Chrome from throttling requestAnimationFrame in headless mode.
            // Angular schedules change detection via rAF; without these flags the
            // entity dropdown options never flush to the DOM in headless runs.
            '--disable-background-timer-throttling',
            '--disable-renderer-backgrounding',
            '--disable-backgrounding-occluded-windows',
          ]
        }
      },
    },
  ]
});
