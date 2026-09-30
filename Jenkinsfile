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
                    if (!params.E2E_USER?.trim() || !params.E2E_PWD?.toString()) {
                        error "E2E_USER and E2E_PWD must be supplied via Build with Parameters"
                    }

                    def suite = params.suite ?: 'all'
                    def projects = suite == 'all'
                        ? '--project=bdd --project=login --project=access-review'
                        : "--project=${suite}"

                    withEnv([
                        "E2E_USER=${params.E2E_USER}",
                        "E2E_PWD=${params.E2E_PWD}"
                    ]) {
                        echo "Running suite '${suite}' as ${params.E2E_USER}: ${projects}"
                        // No --reporter flag: with CI=true, playwright.config.js writes
                        // playwright-report/, reports/junit.xml and reports/results.json.
                        // Passing --reporter would replace that list and drop the last two.
                        bat """
                            cd frontend_Checkout
                            npx playwright test ${projects}
                        """
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

            // Summary email body, subject and Teams card. The Teams post is
            // skipped when the 'teams-webhook-url' credential does not exist.
            script {
                withEnv(["REPORT_BRANCH=${env.GIT_REF ?: params.tagname}"]) {
                    dir('frontend_Checkout') {
                        try {
                            withCredentials([string(credentialsId: 'teams-webhook-url', variable: 'TEAMS_WEBHOOK_URL')]) {
                                bat 'node scripts/ci-report.mjs --notify'
                            }
                        } catch (err) {
                            echo "Teams notification skipped (${err.message}) - generating the email report only."
                            bat 'node scripts/ci-report.mjs'
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
