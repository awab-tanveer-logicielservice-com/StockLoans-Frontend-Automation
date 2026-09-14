/**
 * Session reuse for the Firebase-authenticated app.
 *
 * Playwright's built-in `storageState` is useless here: the app authenticates
 * with the Firebase JS SDK, which persists the session in IndexedDB
 * (`firebaseLocalStorageDb`), not in cookies or localStorage. A captured
 * storageState for this app contains 0 cookies and 0 localStorage entries, and
 * a context restored from it lands straight back on /login.
 *
 * So we capture the Firebase auth record from IndexedDB once (see
 * `auth.setup.js`) and replay it into every test context via an init script.
 *
 * Important: navigate to an in-app route, NOT to `/login`. Visiting /login
 * clears the injected session, which makes the reuse look broken.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));

export const AUTH_DIR = path.resolve(HERE, '../.auth');
export const AUTH_STATE_FILE = path.join(AUTH_DIR, 'firebase-auth.json');

const DB_NAME = 'firebaseLocalStorageDb';
const STORE_NAME = 'firebaseLocalStorage';

/** Reads the Firebase auth records out of IndexedDB on an authenticated page. */
export async function extractFirebaseAuth(page) {
  return page.evaluate(
    ({ dbName, storeName }) =>
      new Promise((resolve, reject) => {
        const open = indexedDB.open(dbName);
        open.onerror = () => reject(open.error);
        open.onsuccess = () => {
          try {
            const req = open.result
              .transaction(storeName, 'readonly')
              .objectStore(storeName)
              .getAll();
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
          } catch (e) {
            reject(e);
          }
        };
      }),
    { dbName: DB_NAME, storeName: STORE_NAME }
  );
}

export function saveFirebaseAuth(records) {
  fs.mkdirSync(AUTH_DIR, { recursive: true });
  fs.writeFileSync(AUTH_STATE_FILE, JSON.stringify(records, null, 2));
}

/** Returns the saved records, or null if the setup project hasn't run. */
export function loadFirebaseAuth() {
  try {
    const records = JSON.parse(fs.readFileSync(AUTH_STATE_FILE, 'utf8'));
    return Array.isArray(records) && records.length ? records : null;
  } catch {
    return null;
  }
}

/**
 * Replays the captured session into a context. Runs before any page script, so
 * the Firebase SDK finds an existing session when it initialises and the app's
 * auth guard lets the navigation through.
 */
export async function injectFirebaseAuth(context, records) {
  await context.addInitScript(
    ({ dbName, storeName, recs }) => {
      const open = indexedDB.open(dbName, 1);
      open.onupgradeneeded = () => {
        const db = open.result;
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath: 'fbase_key' });
        }
      };
      open.onsuccess = () => {
        try {
          const store = open.result
            .transaction(storeName, 'readwrite')
            .objectStore(storeName);
          recs.forEach((r) => store.put(r));
        } catch {
          // Leave the session absent; the login step falls back to a UI login.
        }
      };
    },
    { dbName: DB_NAME, storeName: STORE_NAME, recs: records }
  );
}
