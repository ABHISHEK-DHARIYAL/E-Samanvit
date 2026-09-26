/**
 * Auth controller — phone + OTP login for demo citizens.
 *
 * PROTOTYPE LOGIN LIMITATIONS (explicit, on purpose — see the two demo
 * phone numbers in data/demoUsers.js and DEV_FIXED_OTP below):
 *
 *   1. Only the phone numbers in data/demoUsers.js can log in at all
 *      right now — a closed allow-list, not open registration. Adding
 *      real signup later means replacing demoUsers.findByPhone() with
 *      a DB lookup; nothing else in this file needs to change.
 *
 *   2. The OTP is a fixed dev value ('000000') instead of a random
 *      code sent via a real SMS/email provider (MSG91 / Firebase Phone
 *      Auth / email OTP via the existing Resend setup are the intended
 *      next step). This is isolated to DEV_FIXED_OTP + the comment
 *      inside requestOtp() on purpose — verifyOtp() already compares
 *      against a hash, so swapping in crypto.randomInt(0, 1000000) and
 *      an actual send call is a small, contained diff, not a rewrite.
 *
 * Sessions are short random tokens (crypto.randomBytes), hashed before
 * storage — see SessionStore — the same pattern ConsentManagerService
 * uses for consent tokens.
 */
const crypto = require('node:crypto');
const OtpStore = require('../stores/OtpStore');
const SessionStore = require('../stores/SessionStore');
const { findByPhone, toPublicProfile } = require('../data/demoUsers');
const { InvalidRequestError } = require('../utils/errors');

// OTP validity window — also the countdown duration the frontend timer
// should show, so client and server agree on when a code goes stale.
const OTP_TTL_SECONDS = 60;
const MAX_OTP_ATTEMPTS = 5;

// TODO(auth): replace with crypto.randomInt(0, 1000000) padded to 6
// digits, plus a real send via an SMS/email provider, once one is
// wired in. Every login currently accepts exactly this code.
const DEV_FIXED_OTP = '000000';

const PHONE_RE = /^[6-9]\d{9}$/; // Indian 10-digit mobile, matches existing schema patterns

function hash(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function normalizePhone(phone) {
  return String(phone || '').trim();
}

async function requestOtp(req, res) {
  const phone = normalizePhone(req.body && req.body.phone);
  if (!PHONE_RE.test(phone)) {
    throw new InvalidRequestError('Enter a valid 10-digit mobile number');
  }

  const user = findByPhone(phone);
  if (!user) {
    // Deliberately generic — don't reveal which numbers are enabled.
    throw new InvalidRequestError('This number is not enabled for demo login yet');
  }

  const otp = DEV_FIXED_OTP;
  const expiresAt = Date.now() + OTP_TTL_SECONDS * 1000;

  OtpStore.save(phone, {
    otpHash: hash(otp),
    expiresAt,
    attempts: 0,
    requestedAt: Date.now()
  });

  res.status(200).json({
    success: true,
    message: 'OTP sent',
    expiresInSeconds: OTP_TTL_SECONDS,
    // DEV-ONLY: only present because the OTP is a fixed dev value right
    // now, so the demo login screen can display it instead of a real
    // SMS arriving. Delete this field the moment DEV_FIXED_OTP is
    // replaced with a real generated/sent code.
    devOtpHint: DEV_FIXED_OTP
  });
}

async function verifyOtp(req, res) {
  const phone = normalizePhone(req.body && req.body.phone);
  const otp = String((req.body && req.body.otp) || '').trim();

  if (!PHONE_RE.test(phone) || !otp) {
    throw new InvalidRequestError('Phone number and OTP are required');
  }

  const challenge = OtpStore.get(phone);
  if (!challenge) {
    throw new InvalidRequestError('Request an OTP before verifying');
  }

  if (Date.now() > challenge.expiresAt) {
    OtpStore.clear(phone);
    throw new InvalidRequestError('OTP has expired — request a new one');
  }

  challenge.attempts += 1;
  if (challenge.attempts > MAX_OTP_ATTEMPTS) {
    OtpStore.clear(phone);
    throw new InvalidRequestError('Too many incorrect attempts — request a new OTP');
  }

  if (hash(otp) !== challenge.otpHash) {
    throw new InvalidRequestError('Incorrect OTP');
  }

  OtpStore.clear(phone);

  const user = findByPhone(phone);
  const sessionToken = crypto.randomBytes(32).toString('hex');
  SessionStore.save(hash(sessionToken), {
    citizenId: user.citizenId,
    phone: user.phone,
    createdAt: Date.now()
  });

  res.status(200).json({
    success: true,
    sessionToken,
    user: toPublicProfile(user)
  });
}

module.exports = { requestOtp, verifyOtp, OTP_TTL_SECONDS };
