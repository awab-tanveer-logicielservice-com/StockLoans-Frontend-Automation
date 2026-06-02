/**
 * Capture screenshots of each manual section from qa-sls-v2.web.app
 * and upload them as attachments to the Confluence page.
 *
 * Usage: node scripts/capture-and-upload.mjs
 */

import { chromium } from 'playwright';
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join, basename } from 'path';

// ── Config ────────────────────────────────────────────────────────────────────
const BASE_URL      = 'https://qa-sls-v2.web.app';
const APP_USER      = 'awab.tanveer@vcttechnologiesllc.com';
const APP_PWD       = 'Test+123456@!';
const SS_DIR        = 'screenshots';

const ATLASS_EMAIL  = process.env.ATLASSIAN_EMAIL || '';
const ATLASS_TOKEN  = process.env.ATLASSIAN_TOKEN || '';
const CONFLUENCE    = 'https://logicielservices.atlassian.net/wiki';
const PAGE_ID       = '2990505999';

const AUTH_HEADER   = 'Basic ' + Buffer.from(`${ATLASS_EMAIL}:${ATLASS_TOKEN}`).toString('base64');

// ── Helpers ───────────────────────────────────────────────────────────────────
async function hideSplash(page) {
  await page.evaluate(() => {
    document.querySelectorAll('app-splash-screen, .splash-overlay').forEach(el => {
      el.style.display = 'none';
    });
  });
}

async function waitForGrid(page) {
  await page.locator('ag-grid-angular').first()
    .waitFor({ state: 'visible', timeout: 30000 }).catch(() => {});
  // Wait for loading overlay to appear then disappear (Firestore subscription)
  const loadingOverlay = page.locator('.ag-overlay-loading-wrapper');
  await loadingOverlay.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
  await loadingOverlay.waitFor({ state: 'hidden', timeout: 90000 }).catch(() => {});
  await page.waitForTimeout(2000);
}

async function clickFirstRow(page) {
  try {
    const row = page.locator('.ag-center-cols-container .ag-row').first();
    await row.waitFor({ state: 'visible', timeout: 30000 });
    await row.click();
    await page.waitForTimeout(1000);
  } catch { /* no rows visible */ }
}

async function shot(page, filename, label) {
  const path = `${SS_DIR}/${filename}.png`;
  await hideSplash(page);
  await page.waitForTimeout(800);
  await page.screenshot({ path, fullPage: false });
  console.log(`  ✓ ${label} → ${path}`);
  return path;
}

async function navigateViaMenu(page, linkText) {
  const menuBtn = page.getByRole('button').filter({ hasText: 'menu' });
  if (await menuBtn.isVisible()) {
    await menuBtn.click();
    await page.waitForTimeout(600);
  }
  const link = page.getByRole('link', { name: linkText });
  await link.waitFor({ state: 'visible', timeout: 8000 });
  await link.click();
  await page.waitForTimeout(2000);
}

async function uploadToConfluence(filePath) {
  const filename = basename(filePath);
  const fileData = readFileSync(filePath);

  const formData = new FormData();
  const blob = new Blob([fileData], { type: 'image/png' });
  formData.append('file', blob, filename);
  formData.append('minorEdit', 'true');
  formData.append('comment', `Screenshot for manual section: ${filename}`);

  const url = `${CONFLUENCE}/rest/api/content/${PAGE_ID}/child/attachment`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': AUTH_HEADER,
      'X-Atlassian-Token': 'no-check',
    },
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text();
    // If already exists (409), try to update by looking up existing
    if (res.status === 409) {
      console.log(`  ↺ ${filename} already exists — updating…`);
      return await updateExistingAttachment(filename, fileData);
    }
    throw new Error(`Upload failed (${res.status}): ${text}`);
  }

  const json = await res.json();
  const results = json.results || [json];
  const att = results[0];
  const downloadUrl = `${CONFLUENCE}/download/attachments/${PAGE_ID}/${encodeURIComponent(filename)}`;
  console.log(`  ↑ Uploaded: ${downloadUrl}`);
  return { id: att.id, filename, downloadUrl };
}

async function updateExistingAttachment(filename, fileData) {
  // Get existing attachment ID
  const listUrl = `${CONFLUENCE}/rest/api/content/${PAGE_ID}/child/attachment?filename=${encodeURIComponent(filename)}`;
  const listRes = await fetch(listUrl, {
    headers: { 'Authorization': AUTH_HEADER },
  });
  const listJson = await listRes.json();
  const existing = listJson.results?.[0];
  if (!existing) throw new Error(`Cannot find existing attachment: ${filename}`);

  const updateUrl = `${CONFLUENCE}/rest/api/content/${PAGE_ID}/child/attachment/${existing.id}/data`;
  const formData = new FormData();
  const blob = new Blob([fileData], { type: 'image/png' });
  formData.append('file', blob, filename);
  formData.append('minorEdit', 'true');

  const res = await fetch(updateUrl, {
    method: 'POST',
    headers: {
      'Authorization': AUTH_HEADER,
      'X-Atlassian-Token': 'no-check',
    },
    body: formData,
  });

  const json = await res.json();
  const downloadUrl = `${CONFLUENCE}/download/attachments/${PAGE_ID}/${encodeURIComponent(filename)}`;
  return { id: existing.id, filename, downloadUrl };
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  mkdirSync(SS_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true, args: ['--start-maximized'] });
  const context = await browser.newContext({ viewport: { width: 1920, height: 945 } });
  const page    = await context.newPage();

  const attachments = {};

  try {
    // ── 1. LOGIN PAGE ─────────────────────────────────────────────────────────
    console.log('\n[1/15] Login page…');
    await page.goto(`${BASE_URL}/login`);
    await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
    await hideSplash(page);
    await page.waitForSelector('#email', { timeout: 15000 });
    attachments['Login'] = await shot(page, '01-login', 'Login page');

    // ── LOGIN ─────────────────────────────────────────────────────────────────
    await page.fill('#email', APP_USER);
    await page.fill('#password', APP_PWD);
    await page.click('button.login-btn');
    await page.waitForURL(url => !url.pathname.startsWith('/login'), { timeout: 60000 });
    await page.waitForTimeout(3000);
    await hideSplash(page);

    // ── 2. STOCK LOAN BLOTTER (Contract Summary = main blotter view) ──────────
    console.log('\n[2/15] Stock Loan Blotter (Contract Summary)…');
    await waitForGrid(page);
    await hideSplash(page);
    attachments['Stock Loan Blotter'] = await shot(page, '02-blotter', 'Stock Loan Blotter');

    // ── 3. NEW BORROW/LOAN ENTRY (Trade Panel) ────────────────────────────────
    console.log('\n[3/15] New Borrow/Loan Entry (Trade panel)…');
    try {
      await clickFirstRow(page);
      const tradeBtn = page.locator('button').filter({ hasText: /^trade$/i }).first();
      if (await tradeBtn.isVisible({ timeout: 5000 })) {
        await tradeBtn.click();
        await page.waitForTimeout(1500);
        await hideSplash(page);
      }
    } catch { /* panel may not be available in this view */ }
    attachments['New Borrow / Loan Entry (Floating Order Entry)'] =
      await shot(page, '03-order-entry', 'Order Entry');

    // ── 4. FIXED QUICK ORDER ENTRY (QOE) ──────────────────────────────────────
    console.log('\n[4/15] Fixed Quick Order Entry…');
    // Close any open dialog first
    await page.keyboard.press('Escape').catch(() => {});
    await page.waitForTimeout(500);
    await hideSplash(page);
    // QOE strip is typically visible on the same page — crop the top toolbar area
    attachments['Fixed Quick Order Entry (QOE)'] =
      await shot(page, '04-qoe', 'Fixed QOE');

    // ── 5. SERVER-SIDE FILTERING ──────────────────────────────────────────────
    console.log('\n[5/15] Server-Side Filtering…');
    // Navigate back to contract summary cleanly
    await page.goto(`${BASE_URL}/contract-summary`);
    await waitForGrid(page);
    await hideSplash(page);
    // Filters are visible on the page — show them
    const symbolFilter = page.locator('input[placeholder="Symbol / CUSIP"]');
    if (await symbolFilter.isVisible({ timeout: 5000 })) {
      await symbolFilter.fill('AAPL');
    }
    attachments['Server-Side Filtering'] =
      await shot(page, '05-filtering', 'Server-Side Filtering');

    // ── 6. PAGING ─────────────────────────────────────────────────────────────
    console.log('\n[6/15] Paging…');
    // Clear filter first
    const clearBtn = page.locator('button').filter({ hasText: /^clear$/i }).first();
    if (await clearBtn.isVisible({ timeout: 3000 })) {
      await clearBtn.click();
      await page.waitForTimeout(1000);
    }
    await hideSplash(page);
    // Scroll to bottom to show pagination controls
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(800);
    attachments['Paging'] = await shot(page, '06-paging', 'Paging');
    await page.evaluate(() => window.scrollTo(0, 0));

    // ── 7. TRANSACTION ACTIONS ────────────────────────────────────────────────
    console.log('\n[7/15] Transaction Actions…');
    await page.goto(`${BASE_URL}/contract-summary`);
    await waitForGrid(page);
    try {
      const firstRow2 = page.locator('.ag-center-cols-container .ag-row').first();
      await firstRow2.waitFor({ state: 'visible', timeout: 30000 });
      await firstRow2.click();
      await page.waitForTimeout(1000);
    } catch { /* no rows — take screenshot of empty state */ }
    await hideSplash(page);
    attachments['Transaction Actions'] =
      await shot(page, '07-transaction-actions', 'Transaction Actions');

    // ── 8. LOCATE REQUESTS (Lending Pit) ─────────────────────────────────────
    console.log('\n[8/15] Locate Requests (Lending Pit)…');
    try {
      await navigateViaMenu(page, 'Lending Pit');
      await page.waitForTimeout(2000);
      await hideSplash(page);
    } catch {
      await page.goto(`${BASE_URL}/lending-pit`).catch(() => {});
      await page.waitForTimeout(2000);
    }
    attachments['Locate Requests'] =
      await shot(page, '08-locate-requests', 'Locate Requests / Lending Pit');

    // ── 9. INCOMING REQUESTS (Bulk Import) ───────────────────────────────────
    console.log('\n[9/15] Incoming Requests (Bulk Import)…');
    try {
      await navigateViaMenu(page, 'Bulk Import');
      await page.waitForTimeout(2000);
      await hideSplash(page);
    } catch {
      await page.goto(`${BASE_URL}/bulk-import`).catch(() => {});
      await page.waitForTimeout(2000);
    }
    attachments['Incoming Requests'] =
      await shot(page, '09-incoming-requests', 'Incoming Requests / Bulk Import');

    // ── 10. INVENTORY (FPL Accounts) ─────────────────────────────────────────
    console.log('\n[10/15] Inventory (FPL Accounts)…');
    try {
      await navigateViaMenu(page, 'FPL Accounts');
      await page.waitForTimeout(2000);
      await hideSplash(page);
    } catch {
      await page.goto(`${BASE_URL}/fpl-accounts`).catch(() => {});
      await page.waitForTimeout(2000);
    }
    attachments['Inventory'] =
      await shot(page, '10-inventory', 'Inventory / FPL Accounts');

    // ── 11. MARK-TO-MARKET WINDOW (Contract Details) ─────────────────────────
    console.log('\n[11/15] Mark-to-Market Window (Contract Details)…');
    await page.goto(`${BASE_URL}/contract-summary`);
    await waitForGrid(page);
    try {
      const toggleBtn = page.locator('mat-slide-toggle').first();
      if (await toggleBtn.isVisible({ timeout: 5000 })) {
        const isChecked = await page.locator('button#mat-mdc-slide-toggle-0-button')
          .getAttribute('aria-checked').catch(() => 'false');
        if (isChecked !== 'true') await toggleBtn.click();
        await page.waitForTimeout(1000);
      }
      await clickFirstRow(page);
    } catch { /* fine */ }
    await hideSplash(page);
    attachments['Mark-to-Market Window'] =
      await shot(page, '11-mark-to-market', 'Mark-to-Market');

    // ── 12. POSITION SUMMARY (Contract Summary pinned totals) ─────────────────
    console.log('\n[12/15] Position Summary…');
    await page.goto(`${BASE_URL}/contract-summary`);
    await waitForGrid(page);
    await hideSplash(page);
    attachments['Position Summary'] =
      await shot(page, '12-position-summary', 'Position Summary');

    // ── 13. GRID ACTIONS (right-click context menu) ───────────────────────────
    console.log('\n[13/15] Grid Actions (right-click menu)…');
    await page.goto(`${BASE_URL}/contract-summary`);
    await waitForGrid(page);
    try {
      const headerCell = page.locator('.ag-header-cell-text').first();
      await headerCell.waitFor({ state: 'visible', timeout: 10000 });
      await headerCell.click({ button: 'right' });
      await page.waitForTimeout(1000);
      await hideSplash(page);
    } catch { /* skip if not available */ }
    attachments['Grid Actions (All Grids)'] =
      await shot(page, '13-grid-actions', 'Grid Actions');
    // Close context menu
    await page.keyboard.press('Escape').catch(() => {});

    // ── 14. BOTTOM TOOLBAR (sub-transactions / detail panel) ─────────────────
    console.log('\n[14/15] Bottom Toolbar…');
    await page.goto(`${BASE_URL}/contract-summary`);
    await waitForGrid(page);
    try {
      const toggle = page.locator('mat-slide-toggle').first();
      if (await toggle.isVisible({ timeout: 5000 })) {
        const isChecked = await page.locator('button#mat-mdc-slide-toggle-0-button')
          .getAttribute('aria-checked').catch(() => 'false');
        if (isChecked !== 'true') await toggle.click();
        await page.waitForTimeout(800);
      }
      await clickFirstRow(page);
    } catch { /* fine */ }
    await hideSplash(page);
    // Scroll to show bottom area
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await page.waitForTimeout(500);
    attachments['Bottom Toolbar'] =
      await shot(page, '14-bottom-toolbar', 'Bottom Toolbar');

    // ── 15. ADMIN TAB (hamburger menu open) ───────────────────────────────────
    console.log('\n[15/15] Admin Tab (navigation menu)…');
    await page.goto(`${BASE_URL}/contract-summary`);
    await waitForGrid(page);
    await hideSplash(page);
    try {
      const menuBtn = page.getByRole('button').filter({ hasText: 'menu' });
      if (await menuBtn.isVisible({ timeout: 5000 })) {
        await menuBtn.click();
        await page.waitForTimeout(1200);
        await hideSplash(page);
      }
    } catch { /* skip */ }
    attachments['Admin Tab'] =
      await shot(page, '15-admin', 'Admin Tab / Navigation Menu');

  } finally {
    await browser.close();
  }

  // ── Upload to Confluence ──────────────────────────────────────────────────
  console.log('\n\n── Uploading screenshots to Confluence ──────────────────────');
  const results = {};

  for (const [section, filePath] of Object.entries(attachments)) {
    console.log(`\nUploading: ${section}`);
    try {
      const att = await uploadToConfluence(filePath);
      results[section] = att.downloadUrl;
    } catch (err) {
      console.error(`  ✗ Failed: ${err.message}`);
      results[section] = null;
    }
  }

  // Save results for the page update step
  writeFileSync('screenshots/attachment-urls.json', JSON.stringify(results, null, 2));
  console.log('\n✅ Done. Attachment URLs saved to screenshots/attachment-urls.json');
  console.log(JSON.stringify(results, null, 2));
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
