/**
 * Demo user directory — PROTOTYPE LOGIN LIMITATION.
 *
 * Only the phone numbers listed here can log in right now. This is a
 * deliberate closed allow-list, not open registration — same spirit as
 * the mock GovernmentAdapters: fake, deterministic demo data standing
 * in for a real store.
 *
 * Kept as a flat array (not a DB) on purpose, so swapping in a real
 * UserStore later means replacing findByPhone()'s body with a DB
 * lookup — nothing above this file (auth.controller.js) needs to
 * change, matching how ConsentStore/ApplicationStore are structured
 * elsewhere in this codebase.
 *
 * TO ADD A NEW DEMO USER LATER: append an object with a unique
 * citizenId + phone below. Nothing else in the auth flow needs to
 * change — requestOtp/verifyOtp both look users up by phone.
 *
 * identity/address/income mirror the same shape the mock government
 * adapters return (see adapters/mocks/), so a logged-in demo user can
 * flow straight into the existing consent → citizen-data → dashboard
 * pipeline without inventing a second data shape.
 */
const DEMO_USERS = [
  {
    citizenId: 'demo-citizen-001',
    phone: '9999900001',
    fullName: 'Aditi Sharma',
    identity: { fullName: 'Aditi Sharma', dateOfBirth: '2001-03-22', gender: 'Female' },
    address: {
      addressLine: 'Flat 4B, Kothrud Heights',
      district: 'Pune',
      taluka: 'Haveli',
      village: 'Kothrud',
      pincode: '411038'
    },
    income: { annualIncome: 185000, financialYear: '2025-26' }
  },
  {
    citizenId: 'demo-citizen-002',
    phone: '9999900002',
    fullName: 'Rahul Patil',
    identity: { fullName: 'Rahul Patil', dateOfBirth: '1999-11-08', gender: 'Male' },
    address: {
      addressLine: 'Plot 21, Shivaji Nagar',
      district: 'Nashik',
      taluka: 'Nashik',
      village: 'Panchavati',
      pincode: '422003'
    },
    income: { annualIncome: 240000, financialYear: '2025-26' }
  }
];

function findByPhone(phone) {
  return DEMO_USERS.find((u) => u.phone === String(phone).trim()) || null;
}

function findByCitizenId(citizenId) {
  return DEMO_USERS.find((u) => u.citizenId === citizenId) || null;
}

/** Strips nothing sensitive today (no password/OTP lives on the user
 * record itself), but funnels every controller response through one
 * place so a later field (e.g. an internal flag) can be hidden
 * without touching auth.controller.js. */
function toPublicProfile(user) {
  const { citizenId, phone, fullName, identity, address, income } = user;
  return { citizenId, phone, fullName, identity, address, income };
}

module.exports = { DEMO_USERS, findByPhone, findByCitizenId, toPublicProfile };
