/**
 * MockAapleSarkarAdapter — stands in for the Aaple Sarkar citizen
 * registry until an authorized production integration exists.
 *
 * Owns: identity + address data.
 *
 * This is deliberately fake, deterministic demo data — not a real
 * citizen, not a real Aadhaar number, not a real address. Swapping
 * this for a real AapleSarkarAdapter later means implementing the
 * same GovernmentAdapter contract against the real API; nothing
 * above this file (registry, aggregator, controller) needs to change.
 */
const GovernmentAdapter = require('../interfaces/GovernmentAdapter');
const GovernmentSource = require('../../types/GovernmentSource');
const { selectRequiredFields } = require('../../models/NormalizedCitizenData');
const { ConsentTokenMissingError } = require('../../utils/errors');

// Clearly fictional demo record — same shape a real record would have.
const DEMO_RECORD = {
  identity: {
    fullName: 'Demo Citizen',
    dateOfBirth: '1998-05-14',
    gender: 'Male'
  },
  address: {
    addressLine: 'Plot 12, Model Colony',
    district: 'Pune',
    taluka: 'Haveli',
    village: 'Aundh',
    pincode: '411007'
  }
};

class MockAapleSarkarAdapter extends GovernmentAdapter {
  getSourceName() {
    return GovernmentSource.AAPLE_SARKAR;
  }

  async fetchData(citizenId, requiredFields, consentToken) {
    if (!consentToken) throw new ConsentTokenMissingError(this.getSourceName());
    // Prototype: any citizenId returns the same demo record. A real
    // adapter would use citizenId to look up an actual citizen.
    return selectRequiredFields(DEMO_RECORD, requiredFields, this.getSourceName(), 'mock');
  }
}

module.exports = MockAapleSarkarAdapter;
