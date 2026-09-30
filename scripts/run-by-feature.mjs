#!/usr/bin/env node
/**
 * Runs the suite in separate Playwright invocations - one per feature file (or
 * one per module) - and then builds a single combined Allure report from all of
 * them.
 *
 *   npm run test:by-feature                 every UI feature, one run each
 *   npm run test:by-module                  same scenarios, grouped by module
 *   npm run test:by-feature -- --only=Bulk  only features matching "Bulk"
 *   npm run test:by-feature -- --grep=@Smoke
 *   npm run test:by-feature -- --no-open    don't launch the report viewer
 *   npm run test:by-feature -- --headed     watch the browser (headless otherwise)
 *
 * Runs headless by default, unlike a bare `npx playwright test`: the HEADLESS
 * switch in playwright.config.js only goes headless when CI is set. Force it
 * either way with HEADLESS=1 / HEADLESS=0, which wins over --headed.
 *
 * Target environment - QA by default, same as `npm run demo`:
 *   npm run test:by-feature                     QA   - https://qa-sls-v2.web.app/login
 *   npm run test:by-feature -- --dev            dev  - vcl-stockloan-dev-upgrade
 *   npm run test:by-feature -- --base-url=<url> anything else
 * An explicit BASE_URL in the environment wins over all of these. Note this
 * differs from a bare `npx playwright test`, which falls back to the dev
 * default in UI-Automation/Config/env.js.
 *
 * Credentials follow the URL (UI-Automation/utils/testdata.js): a URL containing
 * 'dev' uses E2E_DEV_USER/E2E_DEV_PWD, anything else - QA included - uses
 * E2E_USER/E2E_PWD.
 *
 * Caveat, unrelated to this script: ReportPage, ShortRateAdjustmentPage and
 * ShortInterestRateAdjustmentPage navigate to ENV.dev*URL directly, so the
 * Reporting and Rate Adjustment features hit dev-upgrade whatever BASE_URL says.
 * The script warns when those features are in a non-dev run.
 *
 * Why this works: allure-playwright appends to allure-results and never cleans
 * it, so N runs pile their raw results into one directory and a single
 * `allure generate` at the end merges them. We wipe allure-results ONCE up
 * front (pass --no-clean to keep what is already there, e.g. to bolt an extra
 * feature onto an existing report).
 *
 * Projects (--projects=, comma separated). Default: bdd,login
 *   bdd             the main UI suite (19 features)
 *   login           Login / Remember Me (runs logged out, own project)
 *   access-review   SLL-236 - QA only, needs BASE_URL=https://qa-sls-v2.web.app/login
 *   api             Velocity JSON API suite (no browser)
 * 'smoke' / 'regression' are not listed because they are the same features as
 * 'bdd' with a grep - use `--projects=bdd --grep=@Smoke` instead.
 *
 * Trade-off to be aware of: every 'bdd' run re-runs the 'auth setup' dependency
 * (Playwright does not apply file filters to dependency projects), so you pay
 * one extra login per feature - a few seconds each, ~1 minute over 19 features.
 * In exchange a hang or crash in one feature costs you that feature, not the
 * whole run, and the report is still built from everything that did finish.
 *
 * Any unrecognised argument is forwarded to `playwright test`.
 */
import { spawnSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const RESULTS = resolve(ROOT, 'allure-results');
const REPORT = resolve(ROOT, 'allure-report');
const STATS_DIR = resolve(ROOT, '.run-by-feature');

const QA_BASE_URL = 'https://qa-sls-v2.web.app/login';
const DEV_BASE_URL = 'https://vcl-stockloan-dev-upgrade.web.app/login';

// Features whose page objects navigate to ENV.dev*URL regardless of BASE_URL.
// Used only to warn - see the header comment.
const DEV_PINNED_FEATURES = ['ReportDateFiltersGrouping', 'ShortRateAdjustment', 'ShortInterestRateAdjustment'];

// Where each project's bddgen output lands (outputDir in playwright.config.js).
// The generated spec files mirror the .feature paths underneath it.
const PROJECTS = {
  bdd: 'UI-Automation/.features-gen/UI-Automation/features',
  login: 'UI-Automation/.features-gen-login/UI-Automation/features',
  'access-review': 'UI-Automation/.features-gen-access-review/UI-Automation/features',
  api: 'API-Automation/.features-gen/API-Automation/features',
};

// Module grouping for --group=module. Each entry is one Playwright invocation
// covering several features. This is a first cut by page/area - edit freely;
// any feature not listed here runs on its own, so the mapping can never drop
// scenarios.
const MODULES = {
  Contracts: ['ContractsSummary', 'ContractDetails', 'ContractManagement', 'ContractReview'],
  'Security Master': ['AddNewSecurity', 'SecurityMasterSearchEdit', 'AddNewModalLayouts'],
  'Bulk Import': ['Bulkimport', 'BulkImportFPLMode', 'BulkSnapshot'],
  'Rate Adjustments': ['ShortInterestRateAdjustment', 'ShortRateAdjustment'],
  'Lending Pit': ['LendingPitTweaks', 'memosegFeature'],
  Reporting: ['ReportDateFiltersGrouping', 'LCOR'],
  'Users and Access': ['AddNewUser', 'UserRoles', 'FplAccount'],
  Authentication: ['LoginFunctionalityFeatureFile', 'RememberMe'],
};

// --- arguments ---
const argv = process.argv.slice(2);
const flag = (name) => argv.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3);
const has = (name) => argv.includes(`--${name}`);

const group = flag('group') || 'feature';
const projectNames = (flag('projects') || 'bdd,login').split(',').map((s) => s.trim()).filter(Boolean);
const only = (flag('only') || '').split(',').map((s) => s.trim()).filter(Boolean);
const grep = flag('grep');
const openReport = !has('no-open');
const clean = !has('no-clean');
const dryRun = has('dry-run');

// Environment selection, mirroring scripts/run-demo.mjs: an explicit BASE_URL
// always wins, otherwise --dev / --base-url= override the QA default. env.js and
// the credential switch in testdata.js both read process.env.BASE_URL, and
// spawned children inherit it, so assigning it here is what retargets the run.
const BASE_URL = process.env.BASE_URL || flag('base-url') || (has('dev') ? DEV_BASE_URL : QA_BASE_URL);
process.env.BASE_URL = BASE_URL;
const targetsDev = /dev/.test(BASE_URL);

// Headless by default. playwright.config.js only goes headless when CI is set,
// so without this a local batched run would pop a browser window for every
// batch - 21 of them feature-by-feature. `--headed` opts back in; it is also
// forwarded to `playwright test`, where the CLI flag agrees with HEADLESS=0.
const headed = has('headed');
if (process.env.HEADLESS === undefined) process.env.HEADLESS = headed ? '0' : '1';
const runsHeadless = !['0', 'false', 'no'].includes(process.env.HEADLESS.toLowerCase());

// One retry by default. playwright.config.js sets retries to 0 off-CI, which on
// a run this long is the wrong default: in the 2026-09-22 run 7 of the 10
// "failures" passed when re-run unchanged, but the report called them failures
// and showed "flaky 0", so a genuine defect sat in a list of ten and nothing
// distinguished it. With a retry, Playwright marks those flaky and the summary's
// flaky column starts carrying information. It does not hide anything: a test
// that fails twice is still a failure. Override with --retries=N or --retries=0.
const retries = flag('retries') ?? '1';

const CONSUMED = new Set(['--no-open', '--no-clean', '--dry-run', '--dev', '--qa']);
const pwArgs = argv.filter(
  (a) =>
    !CONSUMED.has(a) &&
    !['group', 'projects', 'only', 'grep', 'base-url', 'retries'].some((n) => a.startsWith(`--${n}=`)),
);

for (const name of projectNames) {
  if (!PROJECTS[name]) {
    console.error(`Unknown project "${name}". Known: ${Object.keys(PROJECTS).join(', ')}`);
    process.exit(2);
  }
}
if (!['feature', 'module'].includes(group)) {
  console.error(`--group must be "feature" or "module", got "${group}"`);
  process.exit(2);
}

function step(label) {
  console.log(`\n\x1b[36m> ${label}\x1b[0m`);
}

// Scenario counts from a Playwright JSON report, excluding the 'auth setup'
// dependency - it re-runs with every batch, and counting it would add one
// phantom "pass" per feature to the totals. Playwright's own report.stats has
// no way to filter by project, hence walking the suites.
// The Reporting / Rate Adjustment page objects goto() ENV.dev*URL outright, so
// on a QA run those scenarios still exercise dev-upgrade. Say so rather than let
// the report imply the whole suite ran against QA.
function warnAboutDevPinning() {
  if (targetsDev) return;
  const affected = batches.flatMap((b) => (DEV_PINNED_FEATURES.includes(b.label) ? [b.label] : []));
  const inModules = batches.filter((b) =>
    (MODULES[b.label] || []).some((f) => DEV_PINNED_FEATURES.includes(f)),
  );
  if (!affected.length && !inModules.length) return;
  console.log(
    `\n\x1b[33m  note  ${[...affected, ...inModules.map((b) => b.label)].join(', ')} navigate to ` +
      `dev-upgrade directly (ENV.dev*URL in the page objects), so those scenarios run against DEV ` +
      `even though this run targets QA.\x1b[0m`,
  );
}

function countScenarios(report) {
  const counts = { expected: 0, unexpected: 0, flaky: 0, skipped: 0 };
  const walk = (suites = []) => {
    for (const suite of suites) {
      for (const spec of suite.specs || []) {
        for (const test of spec.tests || []) {
          if (test.projectName === 'auth setup') continue;
          if (test.status in counts) counts[test.status] += 1;
        }
      }
      walk(suite.suites);
    }
  };
  walk(report.suites);
  return counts;
}

function run(command, args, { allowFailure = false, env } = {}) {
  const res = spawnSync(command, args, {
    cwd: ROOT,
    stdio: 'inherit',
    shell: true,
    env: { ...process.env, ...env },
  });
  if (res.status !== 0 && !allowFailure) process.exit(res.status ?? 1);
  return res.status ?? 1;
}

// --- 1. Regenerate the specs so the feature list is current ---
step('Generating test specs from feature files (bddgen)');
run('npx', ['bddgen']);

// --- 2. Work out the batches ---
// Playwright's positional filter is a regex matched against the test file path.
// Anchored on both sides (a path separator before, end-of-string after) so a
// feature whose name is a suffix of another's can't pull it into the batch.
const specFilter = (file) => `[\\\\/]${file.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`;

const features = [];
for (const project of projectNames) {
  const dir = resolve(ROOT, PROJECTS[project]);
  if (!existsSync(dir)) {
    console.error(`No generated specs for project "${project}" at ${PROJECTS[project]} - skipping.`);
    continue;
  }
  for (const file of readdirSync(dir).filter((f) => f.endsWith('.spec.js'))) {
    const name = file.replace(/\.feature\.spec\.js$/, '');
    if (only.length && !only.some((o) => name.toLowerCase().includes(o.toLowerCase()))) continue;
    features.push({ project, name, filter: specFilter(file) });
  }
}

if (!features.length) {
  console.error('Nothing to run - check --projects / --only.');
  process.exit(2);
}

// One batch per feature, or per module when --group=module. Batches never span
// projects: 'login' needs its own project because it runs logged out.
let batches;
if (group === 'feature') {
  batches = features.map((f) => ({ label: f.name, project: f.project, filters: [f.filter] }));
} else {
  const byLabel = new Map();
  for (const f of features) {
    const moduleName = Object.keys(MODULES).find((m) => MODULES[m].includes(f.name));
    const key = `${f.project}::${moduleName || f.name}`;
    if (!byLabel.has(key)) {
      byLabel.set(key, { label: moduleName || f.name, project: f.project, filters: [] });
    }
    byLabel.get(key).filters.push(f.filter);
  }
  batches = [...byLabel.values()];
}

if (dryRun) {
  console.log(`\n\x1b[1mtarget\x1b[0m  ${BASE_URL}  ${targetsDev ? '(DEV)' : '(QA)'}`);
  console.log(`\x1b[1mbrowser\x1b[0m ${runsHeadless ? 'headless' : 'headed'}`);
  warnAboutDevPinning();
  console.log(`\n\x1b[1m${batches.length} batch(es) would run, in this order:\x1b[0m`);
  batches.forEach((b, i) => {
    console.log(`  ${String(i + 1).padStart(2)}. [${b.project}] ${b.label}`);
    for (const f of b.filters) console.log(`      ${f}`);
  });
  console.log('\nNothing was executed (--dry-run). allure-results left untouched.');
  process.exit(0);
}

// --- 3. Clean slate, but carry the trend history forward ---
if (clean) {
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
} else {
  mkdirSync(RESULTS, { recursive: true });
  console.log('\n  --no-clean: appending to the existing allure-results');
}
rmSync(STATS_DIR, { recursive: true, force: true });
mkdirSync(STATS_DIR, { recursive: true });

// --- 4. Run each batch in its own Playwright process ---
console.log(`\n\x1b[1mRunning ${batches.length} ${group === 'feature' ? 'features' : 'modules'} one at a time\x1b[0m`);
console.log(`  projects  ${projectNames.join(', ')}`);
console.log(`  target    ${BASE_URL}  ${targetsDev ? '(DEV)' : '(QA)'}`);
console.log(`  creds     ${targetsDev ? 'E2E_DEV_USER / E2E_DEV_PWD' : 'E2E_USER / E2E_PWD'}`);
console.log(`  browser   ${runsHeadless ? 'headless' : 'headed (a window opens per batch)'}`);
console.log(`  retries   ${retries}${retries === '1' ? ' (default - re-runs identify flaky tests)' : ''}`);
if (grep) console.log(`  grep      ${grep}`);
warnAboutDevPinning();

const summary = [];
batches.forEach((batch, i) => {
  step(`[${i + 1}/${batches.length}] ${batch.project} :: ${batch.label}`);
  // The JSON reporter gives us per-batch counts for the summary table; Allure
  // still receives the raw results it needs for the combined report.
  const statsFile = resolve(STATS_DIR, `${batch.project}-${batch.label.replace(/\W+/g, '_')}.json`);
  const started = Date.now();
  const status = run(
    'npx',
    [
      'playwright',
      'test',
      `--project=${batch.project}`,
      // Per-batch output dir. Playwright wipes its output dir at the start of
      // every run, so a shared 'test-results' would leave only the last batch's
      // screenshots/traces/error-context - exactly the evidence you need when a
      // batch 15 runs earlier failed.
      `--output=test-results/${batch.label.replace(/\W+/g, '_')}`,
      `--retries=${retries}`,
      '--reporter=list,allure-playwright,json',
      ...(grep ? [`--grep=${grep}`] : []),
      ...pwArgs,
      ...batch.filters,
    ],
    { allowFailure: true, env: { PLAYWRIGHT_JSON_OUTPUT_NAME: statsFile } },
  );

  let stats = null;
  try {
    stats = countScenarios(JSON.parse(readFileSync(statsFile, 'utf8')));
  } catch {
    // A crash before the reporter flushed - exit status is all we have.
  }
  summary.push({ ...batch, status, stats, seconds: Math.round((Date.now() - started) / 1000) });
});

// --- 5. Metadata that makes the combined report presentable ---
step('Writing Allure run metadata');
writeFileSync(
  resolve(RESULTS, 'environment.properties'),
  [
    `Suite=SLS V2 - ${group === 'feature' ? 'feature-by-feature' : 'module-by-module'} run`,
    `Environment=${targetsDev ? 'DEV' : 'QA'}`,
    `Environment.URL=${BASE_URL}`,
    `Projects=${projectNames.join(', ')}`,
    `Batches=${batches.length} (one Playwright run each)`,
    ...(grep ? [`Grep=${grep}`] : []),
    `Browser=Chromium (Playwright), ${runsHeadless ? 'headless' : 'headed'}`,
    'Framework=Playwright + playwright-bdd (Cucumber/Gherkin)',
    `Node=${process.version}`,
    `Executed=${new Date().toISOString()}`,
  ].join('\n'),
  'utf8',
);
writeFileSync(
  resolve(RESULTS, 'executor.json'),
  JSON.stringify(
    {
      name: 'Local Batched Run',
      type: 'local',
      buildName: `SLS V2 ${group}-by-${group} - ${new Date().toLocaleString()}`,
    },
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

// --- 6. Build the one combined report ---
step('Generating the combined Allure report');
const genStatus = run('npx', ['allure', 'generate', 'allure-results', '--clean', '-o', 'allure-report'], {
  allowFailure: true,
});
if (genStatus !== 0) {
  console.error(
    '\n\x1b[31mAllure report generation failed.\x1b[0m The Allure CLI needs Java on PATH - ' +
      'check `java -version`. The raw results are still in allure-results/.',
  );
}

// --- 7. Summary table ---
const pad = (s, n) => String(s).padEnd(n);
const labelWidth = Math.max(12, ...summary.map((s) => s.label.length + s.project.length + 4));
console.log(`\n\x1b[1mPer-${group} results\x1b[0m`);
console.log(`  ${pad('', labelWidth)}  pass  fail  flaky  skip   time`);
let totals = { expected: 0, unexpected: 0, flaky: 0, skipped: 0 };
for (const s of summary) {
  const st = s.stats || {};
  for (const k of Object.keys(totals)) totals[k] += st[k] || 0;
  const colour = s.status === 0 ? '\x1b[32m' : '\x1b[31m';
  console.log(
    `  ${colour}${pad(`${s.project} :: ${s.label}`, labelWidth)}\x1b[0m  ` +
      `${pad(st.expected ?? '-', 4)}  ${pad(st.unexpected ?? '-', 4)}  ${pad(st.flaky ?? '-', 5)}  ` +
      `${pad(st.skipped ?? '-', 4)}  ${s.seconds}s`,
  );
}
console.log(
  `\n  total  ${totals.expected} passed, ${totals.unexpected} failed, ${totals.flaky} flaky, ${totals.skipped} skipped`,
);
console.log(`\n\x1b[32mCombined Allure report:\x1b[0m ${REPORT}`);

const failedBatches = summary.filter((s) => s.status !== 0);
if (failedBatches.length) {
  console.log(
    `\x1b[33m! ${failedBatches.length} ${group}(s) had failures: ${failedBatches.map((s) => s.label).join(', ')}\x1b[0m`,
  );
}

if (openReport && genStatus === 0) {
  step('Opening the Allure report (Ctrl+C to stop the server)');
  run('npx', ['allure', 'open', 'allure-report'], { allowFailure: true });
} else if (genStatus === 0) {
  console.log('Open it with: npm run allure:open');
}

process.exit(failedBatches.length ? 1 : 0);
