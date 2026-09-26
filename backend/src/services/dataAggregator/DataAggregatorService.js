/**
 * DataAggregatorService — Part 1 (Unified Data Fetching) core service.
 *
 * Responsibility: given a citizen, a consent token, a set of requested
 * government sources, and the specific fields needed, call only the
 * relevant adapters (concurrently, since they're independent), merge
 * their normalized results, and report per-source success/failure.
 *
 * Critically: this file must NEVER contain department-specific logic
 * (no knowledge of what Aaple Sarkar's API looks like, etc). It only
 * knows the GovernmentAdapter contract, obtained through
 * AdapterRegistry. That boundary is what lets mock adapters be
 * replaced with real ones later without touching this file.
 */
const AdapterRegistry = require('../../adapters/AdapterRegistry');
const { mergeNormalizedData } = require('../../models/NormalizedCitizenData');

/**
 * @param {object} params
 * @param {string} params.citizenId
 * @param {string} params.consentToken
 * @param {string[]} params.sources - GovernmentSource identifiers
 * @param {string[]} params.requiredFields - dot-paths, e.g. "identity.fullName"
 * @returns {Promise<{data: object, sources: Array<{source:string,status:string,error?:string}>}>}
 */
async function fetchCitizenData({ citizenId, consentToken, sources, requiredFields }) {
  // Independent adapter calls are launched concurrently — there is no
  // dependency between, say, Revenue and MahaBhumi, so there's no
  // reason to make one wait on the other.
  const settled = await Promise.allSettled(
    sources.map(async (source) => {
      const adapter = AdapterRegistry.getAdapter(source); // may throw AdapterNotFoundError synchronously
      return adapter.fetchData(citizenId, requiredFields, consentToken);
    })
  );

  const data = {};
  const sourceResults = [];

  settled.forEach((result, i) => {
    const source = sources[i];
    if (result.status === 'fulfilled') {
      mergeNormalizedData(data, result.value);
      sourceResults.push({ source, status: 'success' });
    } else {
      // A partial failure (one source down) must not destroy the
      // successful results from other sources — it's reported
      // alongside them, not thrown.
      sourceResults.push({ source, status: 'error', error: result.reason.message });
    }
  });

  return { data, sources: sourceResults };
}

module.exports = { fetchCitizenData };
