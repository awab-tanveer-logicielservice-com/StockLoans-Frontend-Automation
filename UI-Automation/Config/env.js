// Single source of truth for which environment the suite targets.
// Default is dev; set BASE_URL to switch (e.g. BASE_URL=https://qa-sls-v2.web.app/login).
const DEV_BASE_URL = 'https://vcl-stockloan-dev-upgrade.web.app/login';

export const ENV = {
  get baseURL() {
    return process.env.BASE_URL || DEV_BASE_URL;
  },
  get dashboardURL() {
    return `${new URL(this.baseURL).origin}/contract-summary`;
  },
  get reportsURL() {
    return `${new URL(this.baseURL).origin}/reports`;
  },
  get shortRatesURL() {
    return `${new URL(this.baseURL).origin}/shortrates`;
  },
  get shortInterestRatesURL() {
    return `${new URL(this.baseURL).origin}/shortInterestRates`;
  },
};
