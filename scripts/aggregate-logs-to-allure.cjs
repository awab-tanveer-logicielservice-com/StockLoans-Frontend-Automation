#!/usr/bin/env node
/**
 * Aggregate every Playwright list-reporter log in the repo root into a single
 * Allure results directory, so one Allure report covers the full execution
 * history (not just the latest run).
 *
 * Each log becomes an Allure "parentSuite" (the run); each result line becomes
 * one Allure test result. Failures carry the real error text scraped from the
 * log's failure-detail blocks.
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = process.argv[2] || 'C:\\Users\\awab.tanveer\\StockLoans-Frontend-Automation';
const OUT = process.argv[3] || path.join(ROOT, 'allure-results-combined');

const ARROW = '\u203a'; // ›
const ANSI = /\u001b\[[0-9;]*m/g;

function stripAnsi(s) {
    return s.replace(ANSI, '');
}

function parseDuration(text) {
    // "(7.6s)" "(1.0m)" "(1.1h)" "(523ms)"
    const m = text.match(/\(([\d.]+)(ms|s|m|h)\)\s*$/);
    if (!m) return 0;
    const n = parseFloat(m[1]);
    const mult = { ms: 1, s: 1000, m: 60000, h: 3600000 }[m[2]];
    return Math.round(n * mult);
}

function splitTitle(rest) {
    // rest = "[project] › spec.js:12:3 › Feature › Scenario › ... @tags (7.6s)"
    // strip the trailing "(7.6s)" duration, else it lands in the test title
    // and makes every execution look like a different test
    const parts = rest
        .replace(/\s*\([\d.]+(?:ms|s|m|h)\)\s*$/, '')
        .split(` ${ARROW} `)
        .map((p) => p.trim());
    const projMatch = parts[0] && parts[0].match(/^\[(.+?)\]$/);
    const project = projMatch ? projMatch[1] : '(unknown)';
    const spec = parts[1] || '';
    const titles = parts.slice(2);
    return { project, spec, titles };
}

function idOf(project, spec, titles) {
    // Drop the :line:col and the generated-spec directory: both shift between
    // runs (bddgen regenerates specs), which would break test identity.
    const file = path.basename(spec).replace(/:\d+:\d+$/, '');
    return `${project}|${file}|${titles.join(' > ')}`;
}

function md5(s) {
    return crypto.createHash('md5').update(s).digest('hex');
}

function parseLog(file) {
    const raw = fs.readFileSync(file, 'utf8');
    const lines = stripAnsi(raw).split(/\r?\n/);
    const base = path.basename(file, '.log');
    const mtime = fs.statSync(file).mtime;

    let planned = null;
    let workers = 1;
    const results = [];
    const failureBlocks = []; // { project, file, titles, text }
    const footer = { passed: null, failed: null, flaky: null, skipped: null, duration: null };

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        const hdr = line.match(/^Running (\d+) tests? using (\d+) workers?/);
        if (hdr) {
            planned = parseInt(hdr[1], 10);
            workers = parseInt(hdr[2], 10);
            continue;
        }

        // result line: "  ok  12 [bdd] › spec › titles (7.6s)"
        const res = line.match(/^\s{2}(ok|x)\s+(\d+) (\[.*)$/);
        if (res) {
            const status = res[1] === 'ok' ? 'passed' : 'failed';
            const rest = res[3];
            const retry = / \(retry #(\d+)\)/.test(rest);
            const { project, spec, titles } = splitTitle(
                rest.replace(/ \(retry #\d+\)/, '')
            );
            if (!titles.length) continue;
            results.push({
                status,
                seq: parseInt(res[2], 10),
                retry,
                project,
                spec,
                titles,
                duration: parseDuration(rest),
            });
            continue;
        }

        // failure detail block: "  1) [bdd] › spec › titles › step"
        const fb = line.match(/^\s{2,4}\d+\) (\[.*)$/);
        if (fb) {
            const { project, spec, titles } = splitTitle(fb[1]);
            // last segment is the failing step, not part of the test title path
            const body = [];
            for (let j = i + 1; j < lines.length && body.length < 40; j++) {
                if (/^\s{2,4}\d+\) \[/.test(lines[j])) break;
                if (/^\s+\d+ (passed|failed|flaky|skipped)/.test(lines[j])) break;
                body.push(lines[j]);
            }
            const text = body.join('\n').replace(/\n{3,}/g, '\n\n').trim();
            // The block's title path ends with the failing step chain, which can
            // be several segments deep ("... > Before Hooks > Given I log in"),
            // so match it to a test by prefix rather than by an exact key.
            failureBlocks.push({
                project,
                file: path.basename(spec).replace(/:\d+:\d+$/, ''),
                titles,
                text,
            });
            continue;
        }

        const f = line.match(/^\s+(\d+) (passed|failed|flaky|skipped)(?: \(([\d.]+\w+)\))?/);
        if (f) {
            footer[f[2]] = parseInt(f[1], 10);
            if (f[3]) footer.duration = f[3];
        }
    }

    const interrupted = footer.passed === null && footer.failed === null;
    return { file, base, mtime, planned, workers, results, failureBlocks, footer, interrupted };
}

/** Find the failure-detail block belonging to a failed result, by prefix match. */
function findFailure(run, r) {
    const file = path.basename(r.spec).replace(/:\d+:\d+$/, '');
    let best = null;
    for (const b of run.failureBlocks) {
        if (b.used || b.project !== r.project || b.file !== file) continue;
        if (b.titles.length < r.titles.length) continue;
        let ok = true;
        for (let i = 0; i < r.titles.length; i++) {
            if (b.titles[i] !== r.titles[i]) { ok = false; break; }
        }
        // prefer the tightest match (fewest extra step segments)
        if (ok && (!best || b.titles.length < best.titles.length)) best = b;
    }
    if (best) best.used = true;
    return best;
}

// ---- collect runs ----
const logs = fs
    .readdirSync(ROOT)
    .filter((f) => f.endsWith('.log'))
    .map((f) => path.join(ROOT, f));

const runs = logs.map(parseLog).sort((a, b) => a.mtime - b.mtime);

// ---- emit allure results ----
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

let emitted = 0;
for (const run of runs) {
    const totalMs = run.results.reduce((s, r) => s + r.duration, 0);
    const wall = Math.round(totalMs / Math.max(run.workers, 1));
    const runStart = run.mtime.getTime() - wall;
    const dateLabel = run.mtime.toISOString().slice(0, 10);
    const runLabel = `${dateLabel}  ${run.base}`;

    // lay tests out across workers so timings look sane in the timeline
    const laneEnd = new Array(Math.max(run.workers, 1)).fill(runStart);

    for (const r of run.results) {
        const lane = laneEnd.indexOf(Math.min(...laneEnd));
        const start = laneEnd[lane];
        const stop = start + r.duration;
        laneEnd[lane] = stop;

        const specBase = path.basename(r.spec).replace(/:\d+:\d+$/, '');
        const featureTitle = r.titles[0] || specBase;
        const scenarioRaw = r.titles.slice(1).join(' > ') || featureTitle;
        const tags = (scenarioRaw.match(/@[\w.-]+/g) || []).map((t) => t.slice(1));
        const scenario = scenarioRaw.replace(/\s*@[\w.-]+/g, '').trim() || scenarioRaw;
        const id = idOf(r.project, r.spec, r.titles);
        // historyId must be unique per (test, run): Allure groups same-historyId
        // results as retries and shows only the newest, which would hide every
        // earlier run. testCaseId stays stable so the test identity survives.
        const historyId = md5(`${id}|${run.base}`);
        const testCaseId = md5(id);

        const result = {
            uuid: crypto.randomUUID(),
            historyId,
            testCaseId,
            name: scenario,
            fullName: `${specBase} > ${featureTitle} > ${scenario}`,
            status: r.status,
            stage: 'finished',
            start,
            stop,
            labels: [
                { name: 'parentSuite', value: runLabel },
                { name: 'suite', value: featureTitle },
                { name: 'subSuite', value: specBase },
                { name: 'epic', value: 'SLS V2 UI Automation' },
                { name: 'feature', value: featureTitle },
                { name: 'story', value: scenario },
                { name: 'framework', value: 'playwright-bdd' },
                { name: 'language', value: 'javascript' },
                { name: 'host', value: run.base },
                { name: 'thread', value: `${run.base}-w${lane + 1}` },
                { name: 'package', value: r.project },
                ...tags.map((t) => ({ name: 'tag', value: t })),
            ],
            parameters: [
                { name: 'run', value: run.base },
                { name: 'run date', value: run.mtime.toISOString().slice(0, 16).replace('T', ' ') },
                { name: 'project', value: r.project },
                { name: 'spec', value: r.spec },
            ],
            links: tags
                .filter((t) => /^SLL-/i.test(t))
                .map((t) => ({ name: t, type: 'issue', url: t })),
        };

        if (r.retry) result.parameters.push({ name: 'retry', value: 'yes' });

        if (r.status === 'failed') {
            const block = findFailure(run, r);
            const err = block ? block.text : '';
            const errLines = err.split('\n').map((l) => l.trim()).filter(Boolean);
            const firstLine =
                (
                    errLines.find((l) =>
                        /^(Error:|TimeoutError:|Test timeout|Test finished|expect\()/.test(l)
                    ) ||
                    errLines[0] ||
                    ''
                ).replace(/^Error:\s*/, '') || 'Failed (run was interrupted — no detail in log)';
            result.statusDetails = {
                known: false,
                muted: false,
                flaky: false,
                message: firstLine.slice(0, 500),
                trace: err || `No failure block captured in ${run.base}.log`,
            };
        }

        fs.writeFileSync(
            path.join(OUT, `${result.uuid}-result.json`),
            JSON.stringify(result, null, 1)
        );
        emitted++;
    }
}

// environment + executor metadata
const first = runs[0], last = runs[runs.length - 1];
fs.writeFileSync(
    path.join(OUT, 'environment.properties'),
    [
        `Report=Combined execution history (all runs)`,
        `Runs.included=${runs.length}`,
        `Executions.total=${emitted}`,
        `Window.first=${first.mtime.toISOString().slice(0, 16).replace('T', ' ')}`,
        `Window.last=${last.mtime.toISOString().slice(0, 16).replace('T', ' ')}`,
        `Source=Playwright list-reporter logs (repo root *.log)`,
        `Branch=fix/suite-stabilisation`,
    ].join('\n')
);
fs.writeFileSync(
    path.join(OUT, 'executor.json'),
    JSON.stringify({
        name: 'Local Playwright runs (aggregated)',
        type: 'local',
        buildName: `Combined history: ${runs.length} runs, ${emitted} executions`,
    }, null, 1)
);

// ---- summary for the console / markdown ----
const perRun = runs.map((r) => {
    const passed = r.results.filter((x) => x.status === 'passed').length;
    const failed = r.results.filter((x) => x.status === 'failed').length;
    return {
        run: r.base,
        date: r.mtime.toISOString().slice(0, 16).replace('T', ' '),
        planned: r.planned,
        executed: r.results.length,
        passed,
        failed,
        rate: r.results.length ? ((passed / r.results.length) * 100).toFixed(1) : '0.0',
        duration: r.footer.duration || '',
        interrupted: r.interrupted,
    };
});

// latest status per unique test
const byTest = new Map();
for (const r of runs) {
    for (const t of r.results) {
        const id = idOf(t.project, t.spec, t.titles);
        const e = byTest.get(id) || { id, runs: 0, passed: 0, failed: 0, last: null, lastRun: null, title: t.titles.join(' > '), project: t.project, spec: t.spec };
        e.runs++;
        if (t.status === 'passed') e.passed++; else e.failed++;
        e.last = t.status;
        e.lastRun = r.base;
        e.lastDate = r.mtime.toISOString().slice(0, 10);
        byTest.set(id, e);
    }
}
const tests = [...byTest.values()];
const summary = {
    emitted,
    runs: perRun,
    totals: {
        executions: emitted,
        passed: perRun.reduce((s, r) => s + r.passed, 0),
        failed: perRun.reduce((s, r) => s + r.failed, 0),
        uniqueTests: tests.length,
        lastPassed: tests.filter((t) => t.last === 'passed').length,
        lastFailed: tests.filter((t) => t.last === 'failed').length,
        neverPassed: tests.filter((t) => t.passed === 0).length,
        flaky: tests.filter((t) => t.passed > 0 && t.failed > 0).length,
    },
    currentlyFailing: tests
        .filter((t) => t.last === 'failed')
        .sort((a, b) => b.failed - a.failed)
        .map((t) => ({ title: t.title, project: t.project, spec: path.basename(t.spec), runs: t.runs, passed: t.passed, failed: t.failed, lastRun: t.lastRun, lastDate: t.lastDate })),
    flakiest: tests
        .filter((t) => t.passed > 0 && t.failed > 0)
        .sort((a, b) => b.failed - a.failed)
        .slice(0, 20)
        .map((t) => ({ title: t.title, runs: t.runs, passed: t.passed, failed: t.failed, last: t.last })),
};

fs.writeFileSync(path.join(path.dirname(OUT), 'combined-summary.json'), JSON.stringify(summary, null, 2));
console.log(JSON.stringify({ emitted, out: OUT, totals: summary.totals, runs: perRun.length }, null, 2));
