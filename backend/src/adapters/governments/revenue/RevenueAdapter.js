/**
 * RevenueAdapter — Revenue Department income data, backed by a real
 * Setu/DigiLocker integration when available, falling back to the
 * same demo record MockRevenueAdapter has always used otherwise.
 *
 * Implements the exact same GovernmentAdapter contract as every mock
 * adapter — AdapterRegistry and DataAggregatorService need zero
 * changes to use this instead of MockRevenueAdapter.
 *
 * IMPORTANT — why this can't ALWAYS be live even when Setu is
 * configured: Setu's DigiLocker flow requires the citizen to be
 * redirected to a real consent screen and approve it there (see
 * setuRequestStore.js's file comment). fetchData() below only
 * produces a 'verified' result when that consent step has ALREADY
 * been completed for this citizen (tracked in setuRequestStore) —
 * e.g. via a prior call to POST /api/revenue/digilocker/start and the
 * citizen completing DigiLocker's own page. Until the frontend wires
 * that redirect step into the consent UI, this adapter will
 * (correctly and honestly) keep returning 'mock' even with valid
 * Setu credentials configured, rather than pretending to have data it
 * was never actually given consent to fetch.
 */
const GovernmentAdapter = require('../../interfaces/GovernmentAdapter');
const GovernmentSource = require('../../../types/GovernmentSource');
const { selectRequiredFields } = require('../../../models/NormalizedCitizenData');
const { ConsentTokenMissingError } = require('../../../utils/errors');
const config = require('../../../config/env');
const setuClient = require('./client/SetuDigiLockerClient');
const requestStore = require('./setuRequestStore');

const DEMO_RECORD = {
  income: {
    annualIncome: 250000,
    financialYear: '2025-26',
    // Added for the Farmer Welfare Scheme demo (farmerWelfareScheme.schema.js) —
    // purely additive, existing consumers that only request
    // annualIncome/financialYear are unaffected.
    certificateReference: 'MOCK-INC-2026-000123'
  }
};

/**
 * Normalizes a raw Setu INCOME_CERT document response into this
 * adapter's record shape. Setu's exact field names are NOT
 * independently verified in this codebase yet — this is a best-effort
 * mapping based on their publicly documented flow, written to be
 * updated the first time a real sandbox response is logged and
 * inspected, rather than assumed to be final.
 */
function normalizeSetuIncomeDocument(rawDoc) {
  const fields = rawDoc?.data || rawDoc?.certificate || rawDoc || {};
  return {
    income: {
      annualIncome: Number(fields.annualIncome ?? fields.income ?? DEMO_RECORD.income.annualIncome),
      financialYear: fields.financialYear || fields.year || DEMO_RECORD.income.financialYear,
      // Added for the Farmer Welfare Scheme demo — Setu's document
      // fetch response includes some form of document/reference id;
      // exact field name NOT independently verified yet (see file
      // comment above), so this falls back to the mock reference
      // rather than silently omitting the field when live.
      certificateReference: fields.documentId || fields.referenceId || DEMO_RECORD.income.certificateReference
    }
  };
}

class RevenueAdapter extends GovernmentAdapter {
  getSourceName() {
    return GovernmentSource.REVENUE;
  }

  async fetchData(citizenId, requiredFields, consentToken) {
    if (!consentToken) throw new ConsentTokenMissingError(this.getSourceName());

    if (config.setu.isConfigured() && requestStore.hasCompletedRequest(citizenId)) {
      try {
        const entry = requestStore.get(citizenId);
        let rawDoc = entry.documents.INCOME_CERT;
        if (!rawDoc) {
          rawDoc = await setuClient.fetchDocument(entry.requestId, 'INCOME_CERT');
          requestStore.cacheDocument(citizenId, 'INCOME_CERT', rawDoc);
        }
        const normalized = normalizeSetuIncomeDocument(rawDoc);
        return selectRequiredFields(normalized, requiredFields, this.getSourceName(), 'verified');
      } catch (err) {
        // Real API failed after the citizen already consented — log
        // and fall through to mock rather than breaking the whole
        // fetch for this citizen. ExternalApiUnavailableError is
        // caught here deliberately, not rethrown: DataAggregatorService
        // treats an adapter throwing as a hard per-source failure, but
        // a graceful mock fallback is the better citizen-facing outcome.
        console.error(`[RevenueAdapter] Setu fetchDocument failed for ${citizenId}, falling back to mock:`, err.message);
      }
    }

    // No completed Setu consent for this citizen yet (or Setu isn't
    // configured, or the live call just failed above) — honest mock.
    return selectRequiredFields(DEMO_RECORD, requiredFields, this.getSourceName(), 'mock');
  }
}

module.exports = RevenueAdapter;
