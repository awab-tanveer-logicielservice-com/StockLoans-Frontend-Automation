import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'UI-Automation/tests',
  timeout: 60_000,
  expect: { timeout: 5000 },
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? '50%' : undefined,
  reporter: [['list'], ['allure-playwright']],
  use: {
    baseURL: process.env.BASE_URL || 'https://vcl-stockloan-dev.firebaseapp.com',
    headless: true,
    viewport: { width: 1920, height: 945 },
    actionTimeout: 10_000,
    ignoreHTTPSErrors: true,
    trace: 'on-first-retry'
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } }
  ]
});
