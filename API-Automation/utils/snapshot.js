/**
 * Locates the quote list inside a /snapshot response.
 *
 * Confirmed 2026-10-14 against the full Velocity Clearing JSON API
 * Specification 1.4 PDF: the key is `data.items`, a plain array of
 * `{ symbol, offerPx }` entries. This used to guess between several possible
 * shapes because an earlier partial read of the spec's printed sample looked
 * unnamed/ambiguous - it was not; the document prints valid JSON. Kept a
 * fallback search for an array of entry-shaped objects under any key, in
 * case a future dev-host response ever drifts from the documented key, so a
 * shape change is reported rather than silently returning no entries.
 */

function looksLikeEntry(value) {
  return (
    value &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    'symbol' in value &&
    'offerPx' in value
  );
}

/**
 * @param {object} body parsed /snapshot response
 * @returns {{ entries: Array<{symbol: string, offerPx: number}>, shape: string, key: string|null }}
 */
export function extractSnapshotEntries(body) {
  const data = body?.data;
  if (!data || typeof data !== 'object') {
    return { entries: [], shape: 'missing-data', key: null };
  }

  // Spec 1.10: data.items is the documented key.
  if (Array.isArray(data.items)) {
    return { entries: data.items, shape: 'items', key: 'items' };
  }

  // Fallback: any array-valued property whose members look like entries.
  // Not expected on a spec-conformant server; kept so a key rename is
  // reported as "found under an unexpected key" instead of "nothing found".
  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value) && value.length && value.every(looksLikeEntry)) {
      return { entries: value, shape: 'array-under-unexpected-key', key };
    }
  }

  return { entries: [], shape: 'unrecognised', key: null };
}

/** True when `symbol` appears in the snapshot list (case-insensitive). */
export function snapshotHas(body, symbol) {
  const { entries } = extractSnapshotEntries(body);
  const wanted = String(symbol).toUpperCase();
  return entries.some((e) => String(e.symbol).toUpperCase() === wanted);
}

/** The offerPx for `symbol`, or null when it is not in inventory. */
export function snapshotPrice(body, symbol) {
  const { entries } = extractSnapshotEntries(body);
  const wanted = String(symbol).toUpperCase();
  const hit = entries.find((e) => String(e.symbol).toUpperCase() === wanted);
  return hit ? Number(hit.offerPx) : null;
}
