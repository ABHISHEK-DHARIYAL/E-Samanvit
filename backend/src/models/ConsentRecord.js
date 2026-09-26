/**
 * Consent record shape + status/expiry helpers.
 *
 * Responsibility: define the lifecycle vocabulary (ACTIVE / EXPIRED /
 * REVOKED) that ConsentManagerService and ConsentStore share, and the
 * one piece of logic ("is this record past its expiry?") that both
 * the lazy-expiry check and any future background job would need —
 * kept here so it isn't duplicated.
 *
 * Prototype lifecycle simplification: consent is created directly as
 * ACTIVE (no separate REQUESTED/pending-approval step). A real citizen-
 * facing consent screen (Part 2/6+) would introduce that step; it's out
 * of scope here.
 *
 * Full record shape (see ConsentManagerService for how it's built):
 * {
 *   consentId, citizenId, purpose,
 *   sources: string[], requestedFields: string[],
 *   status: ConsentStatus, createdAt, expiresAt,
 *   tokenHash   // SHA-256 of the raw token — the raw token itself is
 *               // never stored (see ConsentManagerService.hashToken)
 * }
 */
const ConsentStatus = Object.freeze({
  ACTIVE: 'ACTIVE',
  EXPIRED: 'EXPIRED',
  REVOKED: 'REVOKED'
});

function isPastExpiry(record, now = new Date()) {
  return now.getTime() >= new Date(record.expiresAt).getTime();
}

module.exports = { ConsentStatus, isPastExpiry };
