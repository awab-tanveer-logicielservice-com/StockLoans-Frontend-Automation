pipeline {
    agent { label "FCM_QA_173" }
    // agent { label "Vflux_Automation_QA" }

    environment {
        PLAYWRIGHT_BROWSERS_PATH = "0"
        PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD = "0"
        CI    = "true"
        BASE_URL = "https://qa-sls-v2.web.app/login"
    }

    tools {
        nodejs "node-22-standalone"
    }

    stages {

        stage('Clean Workspace') {
            steps {
                cleanWs()
                echo "${params.tagname}"
            }
        }

        stage('Clone Repository') {
            steps {
                bat """
                    rmdir /S /Q frontend_Checkout & md frontend_Checkout & cd frontend_Checkout
                    git clone --depth 1 --branch ${params.tagname} https://${gitUser}:${gitPAT}@github.com/awab-tanveer-logicielservice-com/StockLoans-Frontend-Automation.git .
                """
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
                    npx playwright install chromium --with-deps
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
                withCredentials([
                    usernamePassword(
                        credentialsId: 'qa-e2e-credentials',
                        usernameVariable: 'E2E_USER',
                        passwordVariable: 'E2E_PWD'
                    )
                ]) {
                    bat """
                        cd frontend_Checkout
                        npx playwright test --project=bdd --reporter=list,html
                    """
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
                reportName           : "Stock-Loan Automation Report"
            ])

            script {
                def reportPath = "frontend_Checkout/playwright-report/index.html"
                if (fileExists(reportPath)) {
                    echo "Playwright report found — sending email."
                    emailext(
                        mimeType             : 'text/html',
                        attachLog            : true,
                        subject              : "Stock Loan Automation — ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                        body                 : readFile(reportPath),
                        to                   : "awab.tanveer@logicielservice.com",
                        from                 : 'qa@logicielservice.com',
                        recipientProviders   : [
                            [$class: 'CulpritsRecipientProvider'],
                            [$class: 'DevelopersRecipientProvider']
                        ],
                        attachmentsPattern   : reportPath
                    )
                } else {
                    echo "Playwright report not found — skipping email."
                }
            }
        }
    }
}
