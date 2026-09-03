/**
 * MockMahaBhumiAdapter — stands in for the Mahabhulekh/MahaBhumi land
 * records registry until an authorized production integration exists.
 *
 * Owns: land data (7/12 survey record shape).
 *
 * Fake, deterministic demo data only — see MockAapleSarkarAdapter for
 * the same disclaimer.
 */
const GovernmentAdapter = require('../interfaces/GovernmentAdapter');
const GovernmentSource = require('../../types/GovernmentSource');
const { selectRequiredFields } = require('../../models/NormalizedCitizenData');
const { ConsentTokenMissingError } = require('../../utils/errors');

const DEMO_RECORD = {
  land: {
    surveyNumber: '142/2A',
    area: 1.2,
    unit: 'Hectare'
  }
};

class MockMahaBhumiAdapter extends GovernmentAdapter {
  getSourceName() {
    return GovernmentSource.MAHABHUMI;
  }

  async fetchData(citizenId, requiredFields, consentToken) {
    if (!consentToken) throw new ConsentTokenMissingError(this.getSourceName());
    return selectRequiredFields(DEMO_RECORD, requiredFields, this.getSourceName());
  }
}

module.exports = MockMahaBhumiAdapter;
