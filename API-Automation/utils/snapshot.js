/**
 * Locates the quote list inside a /snapshot response.
 *
 * Why this exists: the spec's printed sample for 1.10 shows an unnamed
 * `{ "symbol": "", "offerPx": 0.000 }` object sitting inside `data` with no
 * key, which is not valid JSON and so cannot be taken literally. The server
 * must be doing one of these instead:
 *
 *   A. a named array   -> data.quotes | data.quoteList | data.symbols | data.list
 *   B. an unnamed array-valued property, whatever it is called
 *   C. a single entry inlined next to the header fields
 *
 * Rather than guess and have every snapshot assertion break on the first real
 * response, this accepts any of them and reports which one was found. The
 * `shape` it returns is asserted in the feature file, so the first real run
 * documents the server's actual contract instead of silently passing.
 */

const KNOWN_KEYS = ['quotes', 'quoteList', 'quoteslist', 'symbols', 'list', 'data', 'items'];

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

  // A. a named array of entries, under one of the usual names
  for (const key of KNOWN_KEYS) {
    const value = data[key];
    if (Array.isArray(value) && value.every(looksLikeEntry)) {
      return { entries: value, shape: 'named-array', key };
    }
  }

  // B. any array-valued property whose members look like entries
  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value) && value.length && value.every(looksLikeEntry)) {
      return { entries: value, shape: 'array-under-unexpected-key', key };
    }
  }

  // C. a single entry inlined alongside the header fields
  if (looksLikeEntry(data)) {
    return {
      entries: [{ symbol: data.symbol, offerPx: data.offerPx }],
      shape: 'inlined-single-entry',
      key: null,
    };
  }

  // An empty inventory is a legitimate outcome, not a shape problem.
  const emptyArray = Object.entries(data).find(([, v]) => Array.isArray(v) && v.length === 0);
  if (emptyArray) {
    return { entries: [], shape: 'named-array', key: emptyArray[0] };
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
