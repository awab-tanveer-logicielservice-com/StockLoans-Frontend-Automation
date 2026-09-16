// QA account (https://qa-sls-v2.web.app). Used for any BASE_URL that isn't a
// 'dev' URL — see the switch in fixtures.js / auth.setup.js.
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
 * Identities for the SLL-236 access review workflow (requester -> two approvers
 * -> admin). There are no dedicated accounts on the test environments yet, so
 * each role falls back to the primary account unless its env vars are set.
 * Until real accounts exist, the role-restriction scenarios exercise what the
 * primary account is allowed to see rather than a genuinely separate identity —
 * set these before trusting those results.
 */
export function accessReviewRoleUsers(fallback) {
  const fromEnv = (userVar, pwdVar) =>
    process.env[userVar] && process.env[pwdVar]
      ? { username: process.env[userVar], password: process.env[pwdVar] }
      : { ...fallback, isFallback: true };

  const byRole = {
    requester: fromEnv('AR_REQUESTER_USER', 'AR_REQUESTER_PWD'),
    'approver one': fromEnv('AR_APPROVER1_USER', 'AR_APPROVER1_PWD'),
    'approver two': fromEnv('AR_APPROVER2_USER', 'AR_APPROVER2_PWD'),
    admin: fromEnv('AR_ADMIN_USER', 'AR_ADMIN_PWD'),
  };

  return {
    ...byRole,
    forRole(role) {
      const creds = byRole[String(role).trim().toLowerCase()];
      if (!creds) throw new Error(`Unknown access review role: "${role}"`);
      return creds;
    },
  };
}