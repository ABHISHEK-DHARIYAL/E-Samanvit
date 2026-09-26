/**
 * ConsentStore — in-memory persistence for consent records.
 *
 * Responsibility: the ONLY place that touches the underlying storage
 * for consent. ConsentManagerService talks to this abstraction rather
 * than a raw Map directly, so storage can be swapped later:
 *
 *   ConsentStore (in-memory)  →  DatabaseConsentStore (e.g. Postgres)
 *
 * without ConsentManagerService (or anything above it) changing.
 *
 * PROTOTYPE LIMITATION: records are held in a process-memory Map and
 * are lost whenever the backend restarts. No database is used, per
 * Prompt 4's explicit instruction not to introduce one yet.
 *
 * Records are keyed by consentId, with a second index from tokenHash
 * to consentId so a fetch request (which only presents a token) can be
 * resolved without a full scan. The raw consent token is never stored
 * here — only its SHA-256 hash (see ConsentManagerService) — so a
 * memory dump of this store can't be used to replay a citizen's token.
 */
const byId = new Map();      // consentId -> record
const byTokenHash = new Map(); // tokenHash -> consentId

function save(record) {
  byId.set(record.consentId, record);
  if (record.tokenHash) byTokenHash.set(record.tokenHash, record.consentId);
  return record;
}

function getById(consentId) {
  return byId.get(consentId) || null;
}

function getByTokenHash(tokenHash) {
  const consentId = byTokenHash.get(tokenHash);
  return consentId ? byId.get(consentId) : null;
}

function updateStatus(consentId, status) {
  const record = byId.get(consentId);
  if (record) record.status = status;
  return record || null;
}

module.exports = { save, getById, getByTokenHash, updateStatus };
