/**
 * SessionStore — in-memory persistence for logged-in demo sessions.
 *
 * Mirrors ConsentStore's tokenHash-index pattern: the raw session
 * token is handed to the client exactly once, at login, and is never
 * stored — only its SHA-256 hash (see auth.controller.js) — so a
 * memory dump of this store can't be replayed as a valid session.
 *
 * PROTOTYPE LIMITATION: in-memory only, lost on backend restart —
 * same limitation every other store in this codebase documents today.
 * Swapping in a persistent store (DB/Redis) later means changing only
 * this file; auth.controller.js already only ever deals in hashes.
 */
const byTokenHash = new Map(); // tokenHash -> { citizenId, phone, createdAt }

function save(tokenHash, session) {
  byTokenHash.set(tokenHash, session);
  return session;
}

function get(tokenHash) {
  return byTokenHash.get(tokenHash) || null;
}

function destroy(tokenHash) {
  byTokenHash.delete(tokenHash);
}

module.exports = { save, get, destroy };
