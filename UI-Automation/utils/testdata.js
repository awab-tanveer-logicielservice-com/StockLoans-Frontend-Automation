// QA account (https://qa-sls-v2.web.app). Used for any BASE_URL that isn't a
// 'dev' URL - see the switch in fixtures.js / auth.setup.js.
// The previous default here (awab.tanveer@vcttechnologiesllc.com) no longer
// authenticates on QA: login stays on /login until the 60s timeout.
export const users = {
  username: process.env.E2E_USER || 'awab.tanveer@logicielservice.com',
  password: process.env.E2E_PWD || 'Testing@123@!',
};

export const devUsers = {
  username: process.env.E2E_DEV_USER || 'hussain.raza@logicielservice.com',
  password: process.env.E2E_DEV_PWD || 'Rhussain123$$$',
};

/**
 * Identities for the SLL-236 Access Reviews workflow.
 *
 * These are QA accounts - the workflow needs two real, distinct logins and both
 * only exist in the QA Firebase project, so this feature must run with
 * BASE_URL=https://qa-sls-v2.web.app/login. On dev the logins return HTTP 400
 * from identitytoolkit.
 *
 * The display names ("Awab", "Myadmin") are what the Reviewer dropdowns and the
 * grid's Reviewer 1 / Reviewer 2 columns show, so scenarios refer to people by
 * those names and this map resolves them to credentials.
 */
const ACCESS_REVIEW_ACCOUNTS = {
  awab: {
    displayName: 'Awab',
    username: process.env.AR_AWAB_USER || 'awab.tanveer@logicielservice.com',
    password: process.env.AR_AWAB_PWD || 'Testing@123@!',
  },
  myadmin: {
    displayName: 'Myadmin',
    username: process.env.AR_MYADMIN_USER || 'adminuser@yopmail.com',
    password: process.env.AR_MYADMIN_PWD || 'Test@12345@!',
  },
};

// Workflow roles map onto those two accounts. Awab initiates, acts as Reviewer 2,
// and also performs the last two stages: whoever STARTS a review COMPLETES it, so
// "admin" here is the initiator, not the adminuser@ account. The app shows
// "Your turn (Admin)" only to the initiator and only enables Generate Final
// Snapshot for them (verified on QA review #30).
const ROLE_ALIASES = {
  awab: 'awab',
  myadmin: 'myadmin',
  initiator: 'awab',
  'reviewer 1': 'myadmin',
  'reviewer one': 'myadmin',
  'reviewer 2': 'awab',
  'reviewer two': 'awab',
  admin: 'awab',
};

export function accessReviewRoleUsers() {
  return {
    accounts: ACCESS_REVIEW_ACCOUNTS,
    forRole(role) {
      const key = ROLE_ALIASES[String(role).trim().toLowerCase()];
      if (!key) {
        throw new Error(
          `Unknown access review identity: "${role}". Known: ${Object.keys(ROLE_ALIASES).join(', ')}`
        );
      }
      return ACCESS_REVIEW_ACCOUNTS[key];
    },
  };
}