/**
 * MockMahaDBTAdapter — stands in for the MahaDBT scholarship/benefit
 * portal until an authorized production integration exists.
 *
 * Owns: education + bank data (MahaDBT is the Direct Benefit Transfer
 * system, so it's the natural source for the account benefits get
 * disbursed to, alongside the education records scholarships key off).
 *
 * Fake, deterministic demo data only — see MockAapleSarkarAdapter for
 * the same disclaimer.
 */
const GovernmentAdapter = require('../interfaces/GovernmentAdapter');
const GovernmentSource = require('../../types/GovernmentSource');
const { selectRequiredFields } = require('../../models/NormalizedCitizenData');
const { ConsentTokenMissingError } = require('../../utils/errors');

const DEMO_RECORD = {
  education: {
    qualification: 'B.Tech Computer Engineering',
    institution: 'Government College of Engineering, Pune'
  },
  bank: {
    accountLast4: '4821',
    ifsc: 'SBIN0001234'
  }
};

class MockMahaDBTAdapter extends GovernmentAdapter {
  getSourceName() {
    return GovernmentSource.MAHADBT;
  }

  async fetchData(citizenId, requiredFields, consentToken) {
    if (!consentToken) throw new ConsentTokenMissingError(this.getSourceName());
    return selectRequiredFields(DEMO_RECORD, requiredFields, this.getSourceName());
  }
}

module.exports = MockMahaDBTAdapter;
