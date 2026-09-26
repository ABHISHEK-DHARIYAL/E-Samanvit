/**
 * OtpStore — in-memory persistence for login OTP challenges.
 *
 * Same pattern as ConsentStore: the ONLY place that touches storage for
 * OTP challenges, keyed by phone number, so AuthService/auth.controller
 * never touch a raw Map directly and storage can be swapped later
 * (e.g. Redis, so OTPs survive a restart and expire natively) without
 * callers changing.
 *
 * PROTOTYPE LIMITATION: held in a process-memory Map and lost whenever
 * the backend restarts — same limitation ConsentStore documents.
 *
 * Only the OTP's SHA-256 hash is ever stored here (see
 * auth.controller.js), never the raw code — a memory dump of this
 * store can't be replayed to log in as someone else.
 */
const byPhone = new Map(); // phone -> { otpHash, expiresAt, attempts, requestedAt }

function save(phone, record) {
  byPhone.set(phone, record);
  return record;
}

function get(phone) {
  return byPhone.get(phone) || null;
}

function clear(phone) {
  byPhone.delete(phone);
}

module.exports = { save, get, clear };
