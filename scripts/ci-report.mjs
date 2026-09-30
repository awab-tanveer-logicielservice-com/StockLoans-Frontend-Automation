#!/usr/bin/env node
/**
 * CI run report: turns Playwright's JSON reporter output into
 *
 *   reports/summary.json    - run totals, per-feature breakdown, failures,
 *                             flaky tests and feature-file coverage
 *   reports/email.html      - Outlook-safe HTML body (tables + inline styles)
 *   reports/subject.txt     - one-line email subject with status and pass rate
 *   reports/teams-card.json - Adaptive Card payload for a Teams Workflows webhook
 *
 * and, with --notify, posts the card to TEAMS_WEBHOOK_URL.
 *
 *   node scripts/ci-report.mjs [--results reports/results.json] [--out reports] [--notify]
 *
 * Links in the email/card are built from the Jenkins env (BUILD_URL, JOB_NAME,
 * BUILD_NUMBER); REPORT_NAME must match the publishHTML reportName. Missing
 * results (a crash before the reporter flushed) still produce a report, with
 * status NO RESULTS, so the team hears about it. Never exits non-zero on a
 * reporting problem - it must not turn a green build red.
 */
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const argValue = (name, fallback) => {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};

const ROOT = process.cwd();
const RESULTS = path.resolve(ROOT, argValue('--results', 'reports/results.json'));
const OUT = path.resolve(ROOT, argValue('--out', 'reports'));
const NOTIFY = args.includes('--notify');
const CONFIG_FILE = path.resolve(ROOT, 'playwright.config.js');
const FEATURE_DIRS = ['UI-Automation/features', 'API-Automation/features'];

const MAX_FAILURES_EMAIL = 50;
const MAX_FAILURES_CARD = 10;

const env = process.env;
const BUILD_URL = (env.BUILD_URL || '').replace(/\/?$/, env.BUILD_URL ? '/' : '');
const REPORT_NAME = env.REPORT_NAME || 'Stock-Loan Automation Report';
const LINKS = BUILD_URL
  ? {
      report: `${BUILD_URL}${REPORT_NAME.replace(/ /g, '_20')}/`,
      tests: `${BUILD_URL}testReport/`,
      console: `${BUILD_URL}console`,
    }
  : {};

const ANSI = /\u001b\[[0-9;]*m/g;

// ---------------------------------------------------------------------------
// Playwright JSON results
// ---------------------------------------------------------------------------

function readResults() {
  try {
    return JSON.parse(fs.readFileSync(RESULTS, 'utf8'));
  } catch (e) {
    console.warn(`[ci-report] No readable results at ${RESULTS}: ${e.message}`);
    return null;
  }
}

function firstLines(message, max = 400) {
  const text = (message || '')
    .replace(ANSI, '')
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .slice(0, 2)
    .join(' - ');
  return text.length > max ? `${text.slice(0, max - 3)}...` : text;
}

// Generated spec path -> the feature file it came from:
// "../.features-gen/UI-Automation/features/Bulkimport.feature.spec.js" -> "Bulkimport.feature"
function featureFileOf(specFile) {
  return path.basename(specFile || '').replace(/\.spec\.js$/, '');
}

// Flattens the suite tree into one row per (spec, project). `titles` is the
// describe path below the file-level suite: [Feature, (Outline,) ...].
function collectTests(report) {
  const rows = [];
  const walk = (suite, titles, file) => {
    const f = suite.file || file;
    const isFileSuite = !titles.length && suite.title && /[\\/]|\.js$/.test(suite.title);
    const next = isFileSuite ? titles : [...titles, suite.title];
    for (const spec of suite.specs || []) {
      for (const t of spec.tests || []) {
        const results = t.results || [];
        const last = results[results.length - 1] || {};
        const failed = [...results].reverse().find((r) => r.error || r.errors?.length);
        rows.push({
          project: t.projectName,
          file: featureFileOf(spec.file || f),
          feature: next[0] || featureFileOf(spec.file || f),
          path: next.slice(1),
          title: spec.title,
          tags: spec.tags || [],
          // expected | unexpected | flaky | skipped
          status: t.status,
          attempts: results.length,
          durationMs: results.reduce((s, r) => s + (r.duration || 0), 0),
          lastStatus: last.status,
          error: firstLines(failed?.error?.message || failed?.errors?.[0]?.message),
          skipReason: (t.annotations || []).find((a) => a.type === 'skip')?.description || '',
        });
      }
    }
    for (const child of suite.suites || []) walk(child, next, f);
  };
  for (const s of report.suites || []) walk(s, [], s.file);
  return rows;
}

// ---------------------------------------------------------------------------
// Feature-file coverage (what was authored vs what this run executed)
// ---------------------------------------------------------------------------

function parseFeature(file) {
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  const scenarios = [];
  let featureTags = [];
  let pendingTags = [];
  let current = null;
  let inExamples = false;
  let headerSeen = false;

  for (const raw of lines) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;

    if (line.startsWith('@')) {
      pendingTags.push(...line.split(/\s+/).filter((t) => t.startsWith('@')).map((t) => t.slice(1)));
      continue;
    }
    if (/^Feature:/.test(line)) {
      featureTags = pendingTags;
      pendingTags = [];
      continue;
    }
    const sc = line.match(/^Scenario(?: Outline| Template)?:\s*(.*)$/);
    if (sc) {
      current = {
        title: sc[1].trim(),
        outline: /^Scenario (Outline|Template):/.test(line),
        tags: [...new Set([...featureTags, ...pendingTags])],
        tests: 0,
      };
      scenarios.push(current);
      pendingTags = [];
      inExamples = false;
      continue;
    }
    if (/^(Examples|Scenarios):/.test(line)) {
      inExamples = true;
      headerSeen = false;
      pendingTags = [];
      continue;
    }
    if (inExamples && line.startsWith('|')) {
      if (headerSeen) current.tests++;
      else headerSeen = true;
      continue;
    }
    if (/^(Background|Rule):/.test(line)) {
      current = null;
      pendingTags = [];
    }
    inExamples = false;
  }
  for (const s of scenarios) if (!s.outline || s.tests === 0) s.tests = Math.max(s.tests, 1);
  return scenarios;
}

// Feature paths listed in any defineBddConfig. Commented-out lines are ignored,
// so a feature disabled with // counts as unregistered.
function registeredFeatures() {
  try {
    const src = fs
      .readFileSync(CONFIG_FILE, 'utf8')
      .split(/\r?\n/)
      .filter((l) => !l.trim().startsWith('//'))
      .join('\n');
    const set = new Set();
    for (const m of src.matchAll(/'([^']+\.feature)'/g)) set.add(path.basename(m[1]));
    // Glob entries such as 'API-Automation/features/*.feature'
    for (const m of src.matchAll(/'([^']+)\/\*\.feature'/g)) {
      const dir = path.resolve(ROOT, m[1]);
      if (fs.existsSync(dir)) fs.readdirSync(dir).filter((f) => f.endsWith('.feature')).forEach((f) => set.add(f));
    }
    return set;
  } catch {
    return new Set();
  }
}

function buildCoverage(rows) {
  const registered = registeredFeatures();
  const executedKeys = new Map(); // file -> Set(test key)
  const executedByTag = {};
  for (const r of rows) {
    if (r.project === 'auth setup' || r.status === 'skipped') continue;
    const key = [...r.path, r.title].join(' > ');
    if (!executedKeys.has(r.file)) executedKeys.set(r.file, new Set());
    const set = executedKeys.get(r.file);
    if (set.has(key)) continue; // same scenario in two projects (e.g. bdd + smoke)
    set.add(key);
    for (const tag of r.tags.map((t) => t.replace(/^@/, ''))) executedByTag[tag] = (executedByTag[tag] || 0) + 1;
  }

  let files = [];
  for (const dir of FEATURE_DIRS) {
    const abs = path.resolve(ROOT, dir);
    if (!fs.existsSync(abs)) continue;
    for (const f of fs.readdirSync(abs).filter((x) => x.endsWith('.feature')).sort()) {
      let scenarios = [];
      try {
        scenarios = parseFeature(path.join(abs, f));
      } catch (e) {
        console.warn(`[ci-report] Could not parse ${f}: ${e.message}`);
      }
      files.push({
        file: f,
        suite: dir.split('/')[0],
        registered: registered.has(f),
        scenarios: scenarios.length,
        tests: scenarios.reduce((s, x) => s + x.tests, 0),
        smokeTests: scenarios.filter((x) => x.tags.includes('Smoke')).reduce((s, x) => s + x.tests, 0),
        regressionTests: scenarios.filter((x) => x.tags.includes('Regression')).reduce((s, x) => s + x.tests, 0),
        executed: executedKeys.get(f)?.size || 0,
      });
    }
  }

  // Only the suites this run touched (UI and/or API): the Jenkins job runs the
  // UI suite alone, and counting the never-scheduled API features against it
  // would understate coverage. Falls back to everything when nothing ran.
  const ranSuites = new Set(files.filter((f) => f.executed).map((f) => f.suite));
  if (ranSuites.size) files = files.filter((f) => ranSuites.has(f.suite));

  const sum = (list, k) => list.reduce((s, x) => s + x[k], 0);
  const pct = (a, b) => (b ? Math.round((a / b) * 1000) / 10 : 0);
  const authored = sum(files, 'tests');
  const reg = files.filter((f) => f.registered);
  const executed = sum(files, 'executed');
  const tagBlock = (tag, key) => ({
    authored: sum(files, key),
    registered: sum(reg, key),
    executed: executedByTag[tag] || 0,
    coverageOfAuthored: pct(executedByTag[tag] || 0, sum(files, key)),
  });

  return {
    suites: [...new Set(files.map((f) => f.suite))],
    featureFiles: files.length,
    registeredFiles: reg.length,
    unregistered: files.filter((f) => !f.registered).map((f) => ({ file: f.file, tests: f.tests })),
    authoredTests: authored,
    registeredTests: sum(reg, 'tests'),
    executedTests: executed,
    coverageOfAuthored: pct(executed, authored),
    coverageOfRegistered: pct(executed, sum(reg, 'tests')),
    smoke: tagBlock('Smoke', 'smokeTests'),
    regression: tagBlock('Regression', 'regressionTests'),
    files,
  };
}

// ---------------------------------------------------------------------------
// Summary
// ---------------------------------------------------------------------------

function buildSummary(report) {
  const meta = {
    job: env.JOB_NAME || 'local',
    build: env.BUILD_NUMBER || '',
    branch: env.REPORT_BRANCH || env.GIT_BRANCH || '',
    baseUrl: env.BASE_URL || '',
    generatedAt: new Date().toISOString(),
    links: LINKS,
  };

  if (!report) {
    return { meta, status: 'NO RESULTS', totals: null, features: [], failures: [], flaky: [], skipped: [], errors: [], coverage: buildCoverage([]) };
  }

  const all = collectTests(report);
  const setup = all.filter((r) => r.project === 'auth setup');
  const rows = all.filter((r) => r.project !== 'auth setup');
  const count = (s) => rows.filter((r) => r.status === s).length;

  const passed = count('expected');
  const failed = count('unexpected');
  const flaky = count('flaky');
  const skipped = count('skipped');
  const executed = rows.length - skipped;
  const totals = {
    total: rows.length,
    passed,
    failed,
    flaky,
    skipped,
    passRate: executed ? Math.round(((passed + flaky) / executed) * 1000) / 10 : 0,
    durationMs: Math.round(report.stats?.duration || 0),
    startTime: report.stats?.startTime || '',
    projects: [...new Set(rows.map((r) => r.project))],
  };

  const byFeature = new Map();
  for (const r of rows) {
    const k = r.feature;
    if (!byFeature.has(k)) byFeature.set(k, { feature: k, file: r.file, total: 0, passed: 0, failed: 0, flaky: 0, skipped: 0, durationMs: 0 });
    const f = byFeature.get(k);
    f.total++;
    f.durationMs += r.durationMs;
    f[{ expected: 'passed', unexpected: 'failed', flaky: 'flaky', skipped: 'skipped' }[r.status] || 'skipped']++;
  }
  const features = [...byFeature.values()].sort((a, b) => b.failed - a.failed || a.feature.localeCompare(b.feature));

  const pick = (r) => ({ feature: r.feature, scenario: [...r.path, r.title].join(' > '), project: r.project, attempts: r.attempts, error: r.error });
  const errors = (report.errors || []).map((e) => firstLines(e.message));
  const setupFailed = setup.some((r) => r.status === 'unexpected');
  if (setupFailed) errors.unshift(`Login setup (auth setup) failed - dependent scenarios did not run. ${setup.find((r) => r.error)?.error || ''}`.trim());

  if (!executed) errors.push('No tests executed - every scenario was skipped or none matched the selected project.');

  let status = 'PASSED';
  if (failed || errors.length) status = 'FAILED';
  else if (flaky) status = 'PASSED WITH FLAKY';

  return {
    meta,
    status,
    totals,
    features,
    failures: rows.filter((r) => r.status === 'unexpected').map(pick),
    flaky: rows.filter((r) => r.status === 'flaky').map(pick),
    skipped: rows.filter((r) => r.status === 'skipped').map((r) => ({ ...pick(r), reason: r.skipReason })),
    errors,
    coverage: buildCoverage(rows),
  };
}

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

function fmtDuration(ms) {
  if (!ms) return '-';
  const s = Math.round(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  return h ? `${h}h ${m}m` : m ? `${m}m ${s % 60}s` : `${s}s`;
}

const STATUS_COLOR = { PASSED: '#1a7f37', 'PASSED WITH FLAKY': '#9a6700', FAILED: '#cf222e', 'NO RESULTS': '#57606a' };

function subjectLine(s) {
  const t = s.totals;
  const where = [s.meta.job, s.meta.build && `#${s.meta.build}`].filter(Boolean).join(' ');
  if (!t) return `[${s.status}] Stock Loan Automation - ${where} - run produced no results`;
  return `[${s.status}] Stock Loan Automation - ${where} - ${t.passed + t.flaky}/${t.total - t.skipped} passed (${t.passRate}%)${t.failed ? `, ${t.failed} failed` : ''}`;
}

function emailHtml(s) {
  const color = STATUS_COLOR[s.status] || '#57606a';
  const t = s.totals;
  const cell = 'padding:6px 10px;border-bottom:1px solid #d0d7de;font-size:13px;';
  const head = `${cell}background:#f6f8fa;font-weight:bold;text-align:left;`;
  const num = `${cell}text-align:right;`;

  const kpi = (label, value, c = '#24292f') =>
    `<td style="padding:10px 14px;border:1px solid #d0d7de;text-align:center;">
       <div style="font-size:22px;font-weight:bold;color:${c};">${esc(value)}</div>
       <div style="font-size:11px;color:#57606a;text-transform:uppercase;">${esc(label)}</div></td>`;

  const button = (label, href) =>
    href ? `<a href="${esc(href)}" style="display:inline-block;margin:0 8px 8px 0;padding:8px 14px;background:#0969da;color:#ffffff;text-decoration:none;border-radius:4px;font-size:13px;">${esc(label)}</a>` : '';

  const section = (title, body) =>
    `<h3 style="font-size:15px;margin:24px 0 8px;color:#24292f;">${esc(title)}</h3>${body}`;

  const failuresTable = (list, label) => {
    if (!list.length) return '';
    const shown = list.slice(0, MAX_FAILURES_EMAIL);
    const rows = shown
      .map(
        (f) => `<tr><td style="${cell}">${esc(f.feature)}</td><td style="${cell}">${esc(f.scenario)}</td>
                <td style="${cell}color:#57606a;font-family:Consolas,monospace;font-size:12px;">${esc(f.error || '-')}</td></tr>`,
      )
      .join('');
    const more = list.length > shown.length ? `<p style="font-size:12px;color:#57606a;">...and ${list.length - shown.length} more - see the full report.</p>` : '';
    return section(
      `${label} (${list.length})`,
      `<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;">
         <tr><th style="${head}">Feature</th><th style="${head}">Scenario</th><th style="${head}">Error</th></tr>${rows}</table>${more}`,
    );
  };

  const featureRows = s.features
    .map(
      (f) => `<tr><td style="${cell}">${esc(f.feature)}</td><td style="${num}">${f.total}</td>
        <td style="${num}color:#1a7f37;">${f.passed}</td><td style="${num}${f.failed ? 'color:#cf222e;font-weight:bold;' : ''}">${f.failed}</td>
        <td style="${num}">${f.flaky}</td><td style="${num}">${f.skipped}</td><td style="${num}">${fmtDuration(f.durationMs)}</td></tr>`,
    )
    .join('');

  const c = s.coverage;
  const coverageBlock = section(
    'Coverage',
    `<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
       <tr><th style="${head}"></th><th style="${head}">Authored</th><th style="${head}">Executed this run</th><th style="${head}">Coverage</th></tr>
       <tr><td style="${cell}">All scenarios</td><td style="${num}">${c.authoredTests}</td><td style="${num}">${c.executedTests}</td><td style="${num}">${c.coverageOfAuthored}%</td></tr>
       <tr><td style="${cell}">@Smoke</td><td style="${num}">${c.smoke.authored}</td><td style="${num}">${c.smoke.executed}</td><td style="${num}">${c.smoke.coverageOfAuthored}%</td></tr>
       <tr><td style="${cell}">@Regression</td><td style="${num}">${c.regression.authored}</td><td style="${num}">${c.regression.executed}</td><td style="${num}">${c.regression.coverageOfAuthored}%</td></tr>
     </table>
     <p style="font-size:12px;color:#57606a;">${c.registeredFiles} of ${c.featureFiles} feature files are registered in playwright.config.js${
       c.unregistered.length ? `; not registered: ${c.unregistered.map((u) => `${esc(u.file)} (${u.tests})`).join(', ')}` : ''
     }.</p>`,
  );

  const info = [
    ['Job', [s.meta.job, s.meta.build && `#${s.meta.build}`].filter(Boolean).join(' ')],
    ['Branch / tag', s.meta.branch],
    ['Environment', s.meta.baseUrl],
    ['Projects', t?.projects.join(', ')],
    ['Started', t?.startTime && new Date(t.startTime).toUTCString()],
  ]
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="padding:2px 12px 2px 0;font-size:13px;color:#57606a;">${esc(k)}</td><td style="padding:2px 0;font-size:13px;">${esc(v)}</td></tr>`)
    .join('');

  const errorsBlock = s.errors.length
    ? section('Run errors', `<ul style="font-size:13px;color:#cf222e;">${s.errors.map((e) => `<li>${esc(e)}</li>`).join('')}</ul>`)
    : '';

  const body = t
    ? `<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-top:16px;"><tr>
         ${kpi('Total', t.total)}${kpi('Passed', t.passed, '#1a7f37')}${kpi('Failed', t.failed, t.failed ? '#cf222e' : '#24292f')}
         ${kpi('Flaky', t.flaky, t.flaky ? '#9a6700' : '#24292f')}${kpi('Skipped', t.skipped)}${kpi('Pass rate', `${t.passRate}%`)}${kpi('Duration', fmtDuration(t.durationMs))}
       </tr></table>
       ${errorsBlock}
       ${failuresTable(s.failures, 'Failed scenarios')}
       ${failuresTable(s.flaky, 'Flaky scenarios (passed on retry)')}
       ${section(
         'Results by feature',
         `<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;">
            <tr><th style="${head}">Feature</th><th style="${head}text-align:right;">Total</th><th style="${head}text-align:right;">Passed</th>
            <th style="${head}text-align:right;">Failed</th><th style="${head}text-align:right;">Flaky</th><th style="${head}text-align:right;">Skipped</th>
            <th style="${head}text-align:right;">Time</th></tr>${featureRows}</table>`,
       )}
       ${coverageBlock}`
    : `<p style="font-size:14px;margin-top:16px;">The run produced no test results - it most likely failed before or during test execution
       (dependency install, browser install, bddgen or a crash). Check the console log.</p>${errorsBlock}`;

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>${esc(subjectLine(s))}</title></head>
<body style="margin:0;padding:0;background:#ffffff;font-family:Segoe UI,Arial,sans-serif;color:#24292f;">
<table cellpadding="0" cellspacing="0" style="width:100%;max-width:960px;border-collapse:collapse;"><tr><td style="padding:20px;">
  <div style="background:${color};color:#ffffff;padding:14px 18px;border-radius:6px;">
    <div style="font-size:12px;text-transform:uppercase;letter-spacing:1px;">Stock Loan Automation</div>
    <div style="font-size:22px;font-weight:bold;">${esc(s.status)}</div>
  </div>
  <table cellpadding="0" cellspacing="0" style="margin-top:14px;">${info}</table>
  <div style="margin-top:14px;">${button('Open full report', LINKS.report)}${button('Test results & history', LINKS.tests)}${button('Console log', LINKS.console)}</div>
  ${body}
  <p style="font-size:11px;color:#8c959f;margin-top:28px;">Generated by scripts/ci-report.mjs at ${esc(s.meta.generatedAt)}</p>
</td></tr></table>
</body></html>`;
}

// Adaptive Card for a Teams "Post to a channel when a webhook request is
// received" Workflow (the replacement for retired Office 365 connectors).
function teamsPayload(s) {
  const t = s.totals;
  const colorName = { PASSED: 'Good', 'PASSED WITH FLAKY': 'Warning', FAILED: 'Attention' }[s.status] || 'Default';
  const facts = t
    ? [
        ['Passed', `${t.passed + t.flaky} / ${t.total - t.skipped} (${t.passRate}%)`],
        ['Failed', String(t.failed)],
        ['Flaky', String(t.flaky)],
        ['Skipped', String(t.skipped)],
        ['Duration', fmtDuration(t.durationMs)],
        ['Coverage', `${s.coverage.executedTests} / ${s.coverage.authoredTests} authored (${s.coverage.coverageOfAuthored}%)`],
      ]
    : [['Result', 'No test results produced - see console log']];
  if (s.meta.branch) facts.push(['Branch / tag', s.meta.branch]);
  if (s.meta.baseUrl) facts.push(['Environment', s.meta.baseUrl]);

  const body = [
    { type: 'TextBlock', text: 'Stock Loan Automation', size: 'Small', isSubtle: true },
    { type: 'TextBlock', text: `${s.status} - ${[s.meta.job, s.meta.build && `#${s.meta.build}`].filter(Boolean).join(' ')}`, weight: 'Bolder', size: 'Large', color: colorName, wrap: true },
    { type: 'FactSet', facts: facts.map(([title, value]) => ({ title, value })) },
  ];

  if (s.errors.length) {
    body.push({ type: 'TextBlock', text: s.errors.slice(0, 3).join('\n\n'), color: 'Attention', wrap: true, spacing: 'Medium' });
  }
  if (s.failures.length) {
    body.push({ type: 'TextBlock', text: `Failed scenarios (${s.failures.length})`, weight: 'Bolder', spacing: 'Medium' });
    for (const f of s.failures.slice(0, MAX_FAILURES_CARD)) {
      body.push({ type: 'TextBlock', text: `**${f.feature}** - ${f.scenario}`, wrap: true, spacing: 'Small' });
      if (f.error) body.push({ type: 'TextBlock', text: f.error, wrap: true, isSubtle: true, size: 'Small', spacing: 'None', maxLines: 3 });
    }
    if (s.failures.length > MAX_FAILURES_CARD) {
      body.push({ type: 'TextBlock', text: `...and ${s.failures.length - MAX_FAILURES_CARD} more`, isSubtle: true, spacing: 'Small' });
    }
  }

  const actions = [
    LINKS.report && { type: 'Action.OpenUrl', title: 'Full report', url: LINKS.report },
    LINKS.tests && { type: 'Action.OpenUrl', title: 'Test results', url: LINKS.tests },
    LINKS.console && { type: 'Action.OpenUrl', title: 'Console', url: LINKS.console },
  ].filter(Boolean);

  return {
    type: 'message',
    attachments: [
      {
        contentType: 'application/vnd.microsoft.card.adaptive',
        contentUrl: null,
        content: { $schema: 'http://adaptivecards.io/schemas/adaptive-card.json', type: 'AdaptiveCard', version: '1.4', msteams: { width: 'Full' }, body, actions },
      },
    ],
  };
}

async function postToTeams(payload) {
  const url = env.TEAMS_WEBHOOK_URL;
  if (!url) {
    console.log('[ci-report] TEAMS_WEBHOOK_URL not set - skipping Teams notification.');
    return;
  }
  try {
    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (res.ok) console.log(`[ci-report] Teams notification sent (HTTP ${res.status}).`);
    else console.warn(`[ci-report] Teams webhook returned HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`);
  } catch (e) {
    console.warn(`[ci-report] Teams notification failed: ${e.message}`);
  }
}

// ---------------------------------------------------------------------------

async function main() {
  const summary = buildSummary(readResults());
  fs.mkdirSync(OUT, { recursive: true });
  const card = teamsPayload(summary);
  fs.writeFileSync(path.join(OUT, 'summary.json'), JSON.stringify(summary, null, 2));
  fs.writeFileSync(path.join(OUT, 'email.html'), emailHtml(summary));
  fs.writeFileSync(path.join(OUT, 'subject.txt'), subjectLine(summary));
  fs.writeFileSync(path.join(OUT, 'teams-card.json'), JSON.stringify(card, null, 2));
  console.log(`[ci-report] ${subjectLine(summary)}`);
  console.log(`[ci-report] Wrote summary.json, email.html, subject.txt, teams-card.json to ${OUT}`);
  if (NOTIFY) await postToTeams(card);
}

main().catch((e) => {
  console.error(`[ci-report] Report generation failed: ${e.stack || e.message}`);
});
