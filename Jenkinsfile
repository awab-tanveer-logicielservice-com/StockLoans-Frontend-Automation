pipeline {
    agent { label "QA_224" }

    environment {
        PLAYWRIGHT_BROWSERS_PATH = "0"
        CI       = "true"
        BASE_URL = "https://qa-sls-v2.web.app/login"
        // Must match publishHTML reportName below - ci-report.mjs builds the
        // report link from it.
        REPORT_NAME       = "Stock-Loan-Locate Automation Report"
        REPORT_RECIPIENTS = "awab.tanveer@logicielservice.com,kashaf.ali@logicielservice.com"
        // Output paths for the reporters chosen in 'Run BDD Tests'. Set here
        // rather than relying on playwright.config.js, so every branch/tag
        // produces them - older refs have no CI reporter config.
        PLAYWRIGHT_JUNIT_OUTPUT_FILE = "reports/junit.xml"
        PLAYWRIGHT_JSON_OUTPUT_FILE  = "reports/results.json"
        PLAYWRIGHT_HTML_OPEN         = "never"
    }

    tools {
        nodejs "node-22-standalone"
    }

    stages {
        stage('Clean Workspace') {
            steps {
                cleanWs()
                echo "Branch/tag: ${params.tagname}, suite: ${params.suite ?: 'all'}"
            }
        }

        stage('Cloning Stock_loan_locate_frontend') {
            steps {
                script {
                    // The node-sass fix and the CI reporting are both on master.
                    env.GIT_REF = params.tagname?.trim() ?: 'master'
                    echo "Cloning branch/tag: ${env.GIT_REF}"
                }
                // @echo off stops bat from printing the command, which would
                // otherwise write the token into the console log.
                bat """
                    @echo off
                    git clone --depth 1 --branch %GIT_REF% https://${gitUser}:${gitPAT}@github.com/awab-tanveer-logicielservice-com/StockLoans-Frontend-Automation.git frontend_Checkout
                """
            }
        }

        stage('Check Branch Has node-sass Fix') {
            steps {
                script {
                    // Refs without commit 1aae373 still list node-sass, which
                    // needs Visual Studio to compile and fails on this agent.
                    if (readFile('frontend_Checkout/package.json').contains('"node-sass"')) {
                        error "Branch '${env.GIT_REF}' still depends on node-sass. Build master, or merge master into it first."
                    }
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                bat """
                    cd frontend_Checkout
                    npm ci
                """
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat """
                    cd frontend_Checkout
                    npx playwright install chromium
                """
            }
        }

        stage('Generate BDD Specs') {
            steps {
                bat """
                    cd frontend_Checkout
                    npx bddgen
                """
            }
        }

        stage('Run BDD Tests') {
            steps {
                script {
                    def suite = params.suite ?: 'all'
                    def projects = suite == 'all'
                        ? '--project=bdd --project=login --project=access-review'
                        : "--project=${suite}"

                    // html -> playwright-report/, junit/json -> the paths set in
                    // environment. Named here so the output does not depend on
                    // the reporter list in the checked-out ref's config.
                    def runTests = {
                        bat """
                            cd frontend_Checkout
                            npx playwright test ${projects} --reporter=list,html,junit,json
                        """
                    }

                    // Login account, first match wins:
                    //  1. E2E_USER / E2E_PWD typed into Build with Parameters
                    //  2. the stored 'qa-e2e-credentials' Jenkins credential
                    //  3. the default QA account in UI-Automation/utils/testdata.js
                    // A wrong typed password fails 'auth setup', which skips the
                    // whole bdd project - so blank is the safe default.
                    def typedUser = params.E2E_USER?.trim()
                    def typedPwd  = params.E2E_PWD?.toString()
                    if (typedUser && typedPwd) {
                        echo "Running suite '${suite}' as ${typedUser} (Build with Parameters): ${projects}"
                        withEnv(["E2E_USER=${typedUser}", "E2E_PWD=${typedPwd}"]) { runTests() }
                    } else {
                        // Set once the credential resolves, so a test failure inside
                        // the block is rethrown instead of re-running the suite.
                        def credentialFound = false
                        try {
                            withCredentials([usernamePassword(
                                credentialsId   : 'qa-e2e-credentials',
                                usernameVariable: 'E2E_USER',
                                passwordVariable: 'E2E_PWD'
                            )]) {
                                credentialFound = true
                                echo "Running suite '${suite}' as the 'qa-e2e-credentials' account: ${projects}"
                                runTests()
                            }
                        } catch (err) {
                            if (credentialFound) throw err
                            echo "No 'qa-e2e-credentials' credential (${err.message}) - running suite '${suite}' as the default QA account in testdata.js: ${projects}"
                            runTests()
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            publishHTML(target: [
                allowMissing         : true,
                alwaysLinkToLastBuild: true,
                keepAll              : true,
                reportDir            : "frontend_Checkout/playwright-report",
                reportFiles          : "index.html",
                reportName           : env.REPORT_NAME
            ])

            // Native Jenkins test results: trend graph, per-test history and
            // the "Test Result" failure list on the build page.
            junit(testResults: 'frontend_Checkout/reports/junit.xml', allowEmptyResults: true)

            // Failure evidence - screenshots, videos, traces and error-context.md
            // page snapshots - so a failed run can be diagnosed from the build
            // page instead of from the agent's disk.
            archiveArtifacts(artifacts: 'frontend_Checkout/test-results/**', allowEmptyArchive: true)

            // Summary email body and subject. returnStatus keeps a report
            // failure from failing the build.
            script {
                if (!fileExists('frontend_Checkout/scripts/ci-report.mjs')) {
                    echo "scripts/ci-report.mjs is not on '${env.GIT_REF ?: params.tagname}' - skipping the summary report. Build master to get it."
                } else {
                    withEnv(["REPORT_BRANCH=${env.GIT_REF ?: params.tagname}"]) {
                        dir('frontend_Checkout') {
                            bat(returnStatus: true, script: 'node scripts/ci-report.mjs')
                        }
                    }
                }
            }

            archiveArtifacts(artifacts: 'frontend_Checkout/reports/**', allowEmptyArchive: true)

            script {
                def bodyPath    = "frontend_Checkout/reports/email.html"
                def subjectPath = "frontend_Checkout/reports/subject.txt"
                def hasSummary  = fileExists(bodyPath)
                emailext(
                    mimeType          : 'text/html',
                    subject           : hasSummary ? readFile(subjectPath).trim() : "Stock Loan and Locate Automation - ${env.JOB_NAME} #${env.BUILD_NUMBER} - ${currentBuild.currentResult}",
                    body              : hasSummary ? readFile(bodyPath) : "<p>No summary was generated. See <a href=\"${env.BUILD_URL}console\">the console log</a>.</p>",
                    to                : env.REPORT_RECIPIENTS,
                    from              : 'qa@logicielservice.com',
                    attachLog         : !hasSummary,
                    compressLog       : true,
                    recipientProviders: [
                        [$class: 'CulpritsRecipientProvider'],
                        [$class: 'DevelopersRecipientProvider']
                    ]
                )
            }
        }
    }
}
