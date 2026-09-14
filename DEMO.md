# SLS V2 Automation — Demo Runbook (Login + Trade)

A single command runs the Login and Trade scenarios and opens an Allure report.

## The one command

```bash
npm run demo
```

That does everything, in order:

1. Wipes the previous `allure-results/` and `allure-report/` — but carries the
   **trend history** forward, so the report shows how runs compare over time.
2. Regenerates the Playwright specs from the `.feature` files (`bddgen`).
3. Logs in once (`auth setup`) and runs the selected scenarios serially.
4. Writes the Allure environment / executor / categories metadata.
5. Generates `allure-report/` and opens it in the browser.

Variants:

| Command | What it does |
| --- | --- |
| `npm run demo` | Headless run against **QA**, then opens the report |
| `npm run demo -- --headed` | Same, but you can **watch the browser drive the app** |
| `npm run demo -- --dev` | Run against the dev-upgrade environment instead |
| `npm run demo -- --base-url=<url>` | Run against any other environment |
| `npm run demo -- --no-open` | Generate the report without launching the viewer |
| `npm run demo -- --isolate` | Fresh browser context per scenario (see below) |
| `npm run allure:open` | Reopen the last generated report |

Anything after `--` that isn't one of those is passed straight through to
`playwright test`, e.g. `npm run demo -- --headed --workers=2`.

Stop the report server with `Ctrl+C` when you're done.

## Environment and credentials

Default target is **QA — `https://qa-sls-v2.web.app/login`**.

Credentials live in
[UI-Automation/utils/testdata.js](UI-Automation/utils/testdata.js) and are
picked by URL: a URL containing `dev` uses the dev account, anything else
(QA included) uses the QA account. Override without editing the file:

```bash
E2E_USER=someone@logicielservice.com E2E_PWD='...' npm run demo
```

## One browser window for the whole run

The demo runs **all scenarios in a single browser window** — it doesn't open
and close a window per test. Playwright's default is a fresh context per test;
the demo sets `DEMO_SINGLE_BROWSER=1`, which swaps in a worker-scoped shared
page ([fixtures.js](UI-Automation/step-definitions/fixtures.js)). Combined with
`--workers=1` that means one window, scenarios running back to back.

The trade-off worth knowing before you present: **there is no per-scenario
isolation.** State carries over, so a scenario that leaves a dialog or filter
behind can affect the next one. If something fails mid-demo, re-run with
`npm run demo -- --isolate` to see which failure is real.

Failure screenshots and traces *are* still captured — the shared context is
created from Playwright's `browser` fixture, which applies the project's
artifact settings to it (verified on a failing run).

Normal runs (`test:bdd`, `test:smoke`, `test:regression`, CI) are completely
unaffected — the flag is demo-only.

## What runs (9 tests)

Selected by scenario title from
[UI-Automation/Config/demoScenarios.js](UI-Automation/Config/demoScenarios.js).
The `.feature` files carry no demo-only tag — they stay the shared,
Jira-traceable specification.

**Setup — 1**
- `auth setup` — logs in once and captures the Firebase session the Trade
  scenarios replay, instead of every scenario driving the login form.

**Login — 1** (`LoginFunctionalityFeatureFile.feature`, SLL-169)
- Successful login with valid credentials redirects to Contract Summary
  dashboard → then filters by symbol and opens the details panel.

**Trade — 7** (`ContractDetails.feature`, SLL-192)

| # | Scenario | Type |
| --- | --- | --- |
| 1 | Trade panel — single **Borrow** submits successfully | happy path |
| 2 | Trade panel — single **Loan** submits successfully | happy path |
| 3 | **Match mode** — two linked trades are created | happy path |
| 4 | Symbol is **prefilled** when opened from a contract row | happy path |
| 5 | All **required fields** validated before submit | negative |
| 6 | **Counterparty** validated before submit | negative |
| 7 | **Full lifecycle** — login → Contract Details → filter → live quote → expand history → pinned totals → submit Trade | end-to-end |

The mix is deliberate: happy paths, negative/validation paths, and one
end-to-end scenario that ties the whole journey together.

## Suggested 5-minute walkthrough

1. **Show the Gherkin, not the code.** Open
   [ContractDetails.feature:278](UI-Automation/features/ContractDetails.feature#L278)
   — the Trade Panel block. The point: scenarios are readable by BAs and the
   lead, and each carries its Jira key (`@SLL-192`) and its suite tags
   (`@Smoke`, `@Regression`).
2. **Run it.** `npm run demo -- --headed` so the browser is visible. Narrate
   that `auth setup` logs in once for the whole run — that optimisation is why
   the full suite isn't paying the login cost ~480 times.
3. **Walk the Allure report:**
   - *Overview* — pass rate, duration, the Trend widget (history carried across runs).
   - *Behaviors / Suites* — scenarios grouped by feature.
   - Open one Trade scenario — every Gherkin step appears as an Allure step
     with its own timing, so a failure points at the exact step.
   - *Categories* — failures pre-bucketed into product defects vs.
     timeouts/environment vs. missing steps.
   - *Environment* — target URL, browser, framework, run timestamp.
4. **Show it scales.** Same framework, same tags:
   `npm run test:smoke` and `npm run test:regression` run the wider suites, and
   `Jenkinsfile` shows the CI hook.

## If something goes wrong on the day

| Symptom | Fix |
| --- | --- |
| Allure generation fails | The Allure CLI needs Java on `PATH` — check `java -version` |
| `auth setup` fails, stuck on `/login` | Wrong credentials for the target environment — check the account for that URL in `testdata.js`, or set `E2E_USER`/`E2E_PWD` |
| `auth setup` fails intermittently | Login blip; it retries twice, just re-run |
| Want a different environment | `npm run demo -- --dev` or `npm run demo -- --base-url=<url>` |
| A scenario fails and then the next few do too | Expected in single-browser mode — state carried over. Re-run with `--isolate` to confirm which failure is real |
| Report is empty | `allure-results/` was cleaned but tests didn't run — check the console output above the report step |

Have a **generated report from a known-good run** kept aside (copy
`allure-report/` somewhere) as a fallback, so a flaky dev environment can't
derail the demo.

## Adding or removing a scenario

Edit the title lists in
[UI-Automation/Config/demoScenarios.js](UI-Automation/Config/demoScenarios.js)
— `login` for scenarios that must start logged out, `trade` for everything that
replays the captured session. Titles must match the `Scenario:` line exactly.

If the scenario lives in a feature that isn't registered in
`playwright.config.js`, register it there too. Nothing else to change, and no
`.feature` file needs touching.
