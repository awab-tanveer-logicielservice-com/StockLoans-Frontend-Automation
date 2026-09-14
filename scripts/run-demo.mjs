#!/usr/bin/env node
/**
 * One-command demo runner: Login + Trade BDD scenarios -> Allure report.
 *
 *   npm run demo              headless, generates the report and opens it
 *   npm run demo -- --headed  same, but you can watch the browser drive the app
 *   npm run demo -- --no-open generate the report but don't launch the viewer
 *   npm run demo -- --isolate fresh browser context per scenario (restores the
 *                             failure screenshot/video/trace capture)
 *
 * Target environment (QA by default):
 *   npm run demo                        QA   — https://qa-sls-v2.web.app/login
 *   npm run demo -- --dev               dev  — vcl-stockloan-dev-upgrade
 *   npm run demo -- --base-url=<url>    anything else
 * An explicit BASE_URL in the environment wins over all of these.
 *
 * Credentials come from UI-Automation/utils/testdata.js and are chosen by URL:
 * a URL containing 'dev' uses E2E_DEV_USER/E2E_DEV_PWD, anything else (QA
 * included) uses E2E_USER/E2E_PWD. Set those env vars to override.
 *
 * Any other argument is forwarded straight to `playwright test`
 * (e.g. `npm run demo -- --workers=2`).
 *
 * Scenarios are selected by title from UI-Automation/Config/demoScenarios.js —
 * edit that file to change what runs; the .feature files stay untouched. The
 * run is split across two Playwright projects because the Login scenario has to
 * start from a logged-out state while the Trade scenarios replay the session
 * captured by 'auth setup'.
 *
 * The Allure report is generated even when scenarios fail — a red report is
 * still the thing you want to walk a lead through.
 */
import { spawnSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const RESULTS = resolve(ROOT, 'allure-results');
const REPORT = resolve(ROOT, 'allure-report');

const QA_BASE_URL = 'https://qa-sls-v2.web.app/login';
const DEV_BASE_URL = 'https://vcl-stockloan-dev-upgrade.web.app/login';

const argv = process.argv.slice(2);
const openReport = !argv.includes('--no-open');

// Environment selection. An explicit BASE_URL always wins; otherwise --dev /
// --base-url= override the QA default. These flags are consumed here rather
// than forwarded, since `playwright test` wouldn't understand them.
const baseUrlFlag = argv.find((a) => a.startsWith('--base-url='));
const BASE_URL =
  process.env.BASE_URL ||
  (baseUrlFlag ? baseUrlFlag.slice('--base-url='.length) : argv.includes('--dev') ? DEV_BASE_URL : QA_BASE_URL);

// env.js and the credential switch in testdata.js both read process.env.BASE_URL,
// and spawned children inherit it, so setting it here is what actually retargets
// the run.
process.env.BASE_URL = BASE_URL;

// One browser window for the whole run instead of a fresh one per scenario.
// On by default for the demo; `--isolate` restores Playwright's per-test
// context if you need the failure screenshots/videos/traces back.
const singleBrowser = !argv.includes('--isolate');
if (singleBrowser) process.env.DEMO_SINGLE_BROWSER = '1';

const CONSUMED = new Set(['--no-open', '--dev', '--qa', '--isolate']);
const pwArgs = argv.filter((a) => !CONSUMED.has(a) && !a.startsWith('--base-url='));

const credsSource = /dev/.test(BASE_URL) ? 'E2E_DEV_USER / E2E_DEV_PWD' : 'E2E_USER / E2E_PWD';

function step(label) {
  console.log(`\n\x1b[36m▸ ${label}\x1b[0m`);
}

function run(command, args, { allowFailure = false } = {}) {
  const res = spawnSync(command, args, { cwd: ROOT, stdio: 'inherit', shell: true });
  if (res.status !== 0 && !allowFailure) {
    process.exit(res.status ?? 1);
  }
  return res.status ?? 1;
}

console.log(`\n\x1b[1mSLS V2 demo — Login + Trade\x1b[0m`);
console.log(`  target      ${BASE_URL}`);
console.log(`  credentials ${credsSource} (defaults in UI-Automation/utils/testdata.js)`);
console.log(
  `  browser     ${singleBrowser ? 'single window reused across all scenarios' : 'fresh context per scenario'}`,
);

// ── 1. Clean slate, but keep the trend history ──────────────────────────────
// Allure builds its Trend/History widgets from allure-report/history, so carry
// it into the fresh results dir before wiping the previous run's raw results.
step('Cleaning previous Allure results');
const previousHistory = resolve(REPORT, 'history');
const carriedHistory = existsSync(previousHistory);
const historyStash = resolve(ROOT, '.allure-history-tmp');
if (carriedHistory) {
  rmSync(historyStash, { recursive: true, force: true });
  cpSync(previousHistory, historyStash, { recursive: true });
}
rmSync(RESULTS, { recursive: true, force: true });
rmSync(REPORT, { recursive: true, force: true });
mkdirSync(RESULTS, { recursive: true });
if (carriedHistory) {
  cpSync(historyStash, resolve(RESULTS, 'history'), { recursive: true });
  rmSync(historyStash, { recursive: true, force: true });
  console.log('  carried trend history forward from the previous report');
}

// ── 2. Regenerate the Playwright specs from the .feature files ──────────────
step('Generating test specs from feature files (bddgen)');
run('npx', ['bddgen']);

// ── 3. Run the demo scenarios ───────────────────────────────────────────────
step('Running Login + Trade demo scenarios');
const testStatus = run(
  'npx',
  [
    'playwright',
    'test',
    '--project=demo-login',
    '--project=demo-trade',
    '--workers=1',
    '--reporter=list,allure-playwright',
    ...pwArgs,
  ],
  { allowFailure: true },
);

// ── 4. Metadata that makes the report presentable ───────────────────────────
step('Writing Allure run metadata');
writeFileSync(
  resolve(RESULTS, 'environment.properties'),
  [
    'Suite=SLS V2 Demo — Login and Trade',
    `Environment=${/dev/.test(BASE_URL) ? 'DEV' : 'QA'}`,
    `Environment.URL=${BASE_URL}`,
    'Browser=Chromium (Playwright)',
    'Framework=Playwright + playwright-bdd (Cucumber/Gherkin)',
    'Selection=Login + Trade demo set (Config/demoScenarios.js)',
    `Execution=${singleBrowser ? 'single browser window, scenarios serial' : 'fresh context per scenario'}`,
    `Node=${process.version}`,
    `Executed=${new Date().toISOString()}`,
  ].join('\n'),
  'utf8',
);
writeFileSync(
  resolve(RESULTS, 'executor.json'),
  JSON.stringify(
    { name: 'Local Demo Run', type: 'local', buildName: `SLS V2 Demo — ${new Date().toLocaleString()}` },
    null,
    2,
  ),
  'utf8',
);
writeFileSync(
  resolve(RESULTS, 'categories.json'),
  JSON.stringify(
    [
      { name: 'Product defects', matchedStatuses: ['failed'] },
      {
        name: 'Timeouts / environment',
        matchedStatuses: ['broken', 'failed'],
        messageRegex: '.*(Timeout|timed out|ERR_|net::).*',
      },
      { name: 'Missing step implementation', matchedStatuses: ['broken'], messageRegex: '.*[Uu]ndefined step.*' },
      { name: 'Skipped', matchedStatuses: ['skipped'] },
    ],
    null,
    2,
  ),
  'utf8',
);

// ── 5. Build and open the report ────────────────────────────────────────────
step('Generating the Allure report');
const genStatus = run('npx', ['allure', 'generate', 'allure-results', '--clean', '-o', 'allure-report'], {
  allowFailure: true,
});

if (genStatus !== 0) {
  console.error(
    '\n\x1b[31mAllure report generation failed.\x1b[0m The Allure CLI needs Java on PATH — ' +
      'check `java -version`. The raw results are still in allure-results/.',
  );
  process.exit(genStatus);
}

console.log(`\n\x1b[32m✔ Allure report written to\x1b[0m ${REPORT}`);
console.log(
  testStatus === 0
    ? '\x1b[32m✔ All demo scenarios passed\x1b[0m'
    : '\x1b[33m! Some demo scenarios failed — see the report for details\x1b[0m',
);

if (openReport) {
  step('Opening the Allure report (Ctrl+C to stop the server)');
  run('npx', ['allure', 'open', 'allure-report'], { allowFailure: true });
} else {
  console.log('\nOpen it with: npm run allure:open');
}

process.exit(testStatus);
