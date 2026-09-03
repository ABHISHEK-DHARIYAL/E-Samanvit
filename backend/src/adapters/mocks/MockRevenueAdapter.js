/**
 * MockRevenueAdapter — stands in for the Revenue Department's income
 * registry until an authorized production integration exists.
 *
 * Owns: income data.
 *
 * Fake, deterministic demo data only — see MockAapleSarkarAdapter for
 * the same disclaimer.
 */
const GovernmentAdapter = require('../interfaces/GovernmentAdapter');
const GovernmentSource = require('../../types/GovernmentSource');
const { selectRequiredFields } = require('../../models/NormalizedCitizenData');
const { ConsentTokenMissingError } = require('../../utils/errors');

const DEMO_RECORD = {
  income: {
    annualIncome: 250000,
    financialYear: '2025-26'
  }
};

class MockRevenueAdapter extends GovernmentAdapter {
  getSourceName() {
    return GovernmentSource.REVENUE;
  }

  async fetchData(citizenId, requiredFields, consentToken) {
    if (!consentToken) throw new ConsentTokenMissingError(this.getSourceName());
    return selectRequiredFields(DEMO_RECORD, requiredFields, this.getSourceName());
  }
}

module.exports = MockRevenueAdapter;
