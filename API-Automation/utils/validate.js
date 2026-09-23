/**
 * A deliberately small response-shape checker.
 *
 * The suite does not pull in ajv/joi: the JSON API returns seven flat-ish
 * envelopes and all we need is "these keys exist and have these primitive
 * types". Anything richer belongs in an explicit assertion in a step, where it
 * reads as a business rule rather than as schema config.
 *
 * A schema is a plain object mapping a field name to either:
 *   - a type string: 'string' | 'number' | 'boolean' | 'object' | 'array'
 *   - '<type>?' to mark the field optional (absent or null is allowed)
 *   - a nested schema object, for nested objects such as `status`
 */

const PRIMITIVES = ['string', 'number', 'boolean', 'object', 'array'];

function typeOf(value) {
  if (Array.isArray(value)) return 'array';
  if (value === null) return 'null';
  return typeof value;
}

/**
 * Collects every mismatch rather than throwing on the first, so a failure
 * report names all the problems in one pass.
 *
 * @returns {string[]} human-readable problems; empty means the shape matches
 */
export function checkShape(actual, schema, path = '') {
  const problems = [];

  if (typeOf(actual) !== 'object') {
    return [`${path || 'response'}: expected an object, got ${typeOf(actual)}`];
  }

  for (const [field, rule] of Object.entries(schema)) {
    const where = path ? `${path}.${field}` : field;
    const present = Object.prototype.hasOwnProperty.call(actual, field);
    const value = actual[field];

    if (typeof rule === 'object') {
      if (!present) {
        problems.push(`${where}: missing required object`);
        continue;
      }
      problems.push(...checkShape(value, rule, where));
      continue;
    }

    const optional = rule.endsWith('?');
    const expected = optional ? rule.slice(0, -1) : rule;

    if (!PRIMITIVES.includes(expected)) {
      throw new Error(`Bad schema: unknown type "${expected}" for ${where}`);
    }

    if (!present || value === null || value === undefined) {
      if (!optional) problems.push(`${where}: missing required ${expected}`);
      continue;
    }

    const got = typeOf(value);
    if (got !== expected) {
      problems.push(`${where}: expected ${expected}, got ${got} (${JSON.stringify(value)})`);
    }
  }

  return problems;
}

/**
 * Throws with every mismatch listed, or returns the value unchanged.
 *
 * @param {object} actual   parsed response body
 * @param {object} schema   see checkShape
 * @param {string} label    what is being validated, used in the error message
 */
export function assertShape(actual, schema, label = 'response') {
  const problems = checkShape(actual, schema);
  if (problems.length) {
    throw new Error(
      `${label} does not match the JSON API Specification 1.4 shape:\n` +
        problems.map((p) => `  - ${p}`).join('\n') +
        `\nActual body:\n${JSON.stringify(actual, null, 2)}`
    );
  }
  return actual;
}
