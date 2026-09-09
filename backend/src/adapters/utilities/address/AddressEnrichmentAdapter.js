/**
 * AddressEnrichmentAdapter — pincode -> District/Taluka/Village lookup.
 *
 * This is deliberately NOT a GovernmentAdapter. It doesn't fetch
 * citizen-specific consent-gated data from a government platform — it
 * enriches an address from public reference data anyone can query
 * (no citizen identifier involved at all). That's why it lives under
 * adapters/utilities/ rather than adapters/governments/: mixing it
 * into AdapterRegistry alongside real consent-gated sources would
 * make it too easy to accidentally treat a non-consent utility as if
 * it required the same consent checks a GovernmentAdapter enforces.
 *
 * Fetch order (each step try/caught — this function never throws):
 *   1. India Post Pincode API — always attempted, no config needed,
 *      no API key, genuinely official (India Post).
 *   2. data.gov.in — only attempted if step 1 fails AND
 *      config.dataGovIn.isConfigured() is true.
 *   3. Bundled mock-pincode-data.json — last resort, always succeeds
 *      for the ~15 seeded pincodes, otherwise returns a clearly-marked
 *      "not found" result. Never fabricated as anything but 'mock'.
 *
 * Every path returns the exact same shape, so callers never need to
 * know or care which tier actually answered.
 */
const config = require('../../../config/env');
const mockPincodeData = require('./mock-pincode-data.json');

const INDIA_POST_TIMEOUT_MS = 5000;
const DATA_GOV_IN_TIMEOUT_MS = 5000;

function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error(`Timed out after ${ms}ms`)), ms))
  ]);
}

function buildResult({ pincode, district, taluka, village, state, sourcePlatform, verificationStatus }) {
  return {
    pincode,
    district: district || null,
    taluka: taluka || null,
    village: village || null,
    state: state || null,
    provenance: {
      sourcePlatform, // 'india-post' | 'data-gov-in' | 'mock'
      fetchedAt: new Date().toISOString(),
      verificationStatus // 'live' | 'mock'
    }
  };
}

/**
 * Tries the India Post Pincode API. Returns null (never throws) if it
 * fails, isn't reachable, or the pincode isn't found there.
 */
async function tryIndiaPost(pincode) {
  try {
    const response = await withTimeout(
      fetch(`https://api.postalpincode.in/pincode/${encodeURIComponent(pincode)}`),
      INDIA_POST_TIMEOUT_MS
    );
    if (!response.ok) return null;

    const body = await response.json();
    // India Post's own response is an array (rarely more than one
    // entry per pincode query); a "Block" field is Block/Taluka-ish
    // but is documented to often be absent/"NA" — never assumed present.
    const entry = Array.isArray(body) ? body[0] : null;
    if (!entry || entry.Status !== 'Success' || !Array.isArray(entry.PostOffice) || entry.PostOffice.length === 0) {
      return null;
    }

    const office = entry.PostOffice[0];
    return buildResult({
      pincode,
      district: office.District,
      taluka: office.Block && office.Block !== 'NA' ? office.Block : null,
      village: office.Name, // nearest available proxy — a post office name, not always the exact revenue village
      state: office.State,
      sourcePlatform: 'india-post',
      verificationStatus: 'live'
    });
  } catch {
    return null; // network error, timeout, malformed response — fall through, never throw
  }
}

/**
 * Tries data.gov.in's pincode-directory resource. Only called if
 * India Post failed AND data.gov.in credentials are configured.
 * Returns null (never throws) on any failure.
 */
async function tryDataGovIn(pincode) {
  if (!config.dataGovIn.isConfigured()) return null;

  try {
    const url = new URL(`https://api.data.gov.in/resource/${config.dataGovIn.pincodeResourceId}`);
    url.searchParams.set('api-key', config.dataGovIn.apiKey);
    url.searchParams.set('format', 'json');
    url.searchParams.set('filters[pincode]', pincode);

    const response = await withTimeout(fetch(url.toString()), DATA_GOV_IN_TIMEOUT_MS);
    if (!response.ok) return null;

    const body = await response.json();
    const record = Array.isArray(body.records) ? body.records[0] : null;
    if (!record) return null;

    return buildResult({
      pincode,
      district: record.district,
      taluka: record.taluka || record.block || null,
      village: record.village || record.officename || null,
      state: record.statename || record.state,
      sourcePlatform: 'data-gov-in',
      verificationStatus: 'live'
    });
  } catch {
    return null;
  }
}

/** Bundled fallback — always resolves, honestly tagged as 'mock'. */
function mockLookup(pincode) {
  const entry = mockPincodeData[pincode];
  if (!entry) {
    // Not even in the seed data — return an honest empty result rather
    // than guessing. Callers (e.g. the field mapper) already know how
    // to treat a missing value as "not available", not as an error.
    return buildResult({ pincode, sourcePlatform: 'mock', verificationStatus: 'mock' });
  }
  return buildResult({
    pincode,
    district: entry.district,
    taluka: entry.taluka,
    village: entry.village,
    state: entry.state,
    sourcePlatform: 'mock',
    verificationStatus: 'mock'
  });
}

async function lookupByPincode(pincode) {
  const fromIndiaPost = await tryIndiaPost(pincode);
  if (fromIndiaPost) return fromIndiaPost;

  const fromDataGovIn = await tryDataGovIn(pincode);
  if (fromDataGovIn) return fromDataGovIn;

  return mockLookup(pincode);
}

module.exports = { lookupByPincode };
