/**
 * e-Samanvit backend — end-to-end + negative-case test suite.
 *
 * Uses Node's built-in test runner (`node:test`) and `assert` only —
 * no new dependency was added, per Prompt 10's "don't introduce a huge
 * testing framework" instruction. The real Express app (src/app.js) is
 * started on an ephemeral port and exercised with real HTTP requests
 * via the built-in `fetch`, so this tests actual route → controller →
 * service → adapter wiring, not mocks of the backend itself.
 *
 * Run with:  npm test   (see package.json)
 *
 * Sections:
 *   1. Happy-path end-to-end flow (health → consent → fetch → services
 *      → prepare → submit → detail → list → tracking)
 *   2. Negative / failure-mode tests (consent, citizen-data, services,
 *      applications, tracking)
 *   3. Partial-adapter-failure simulation (see comment at that test —
 *      this is the one place a production module is monkey-patched,
 *      and only for the duration of that single test)
 *   4. Duplicate-submission / idempotency check
 *   5. Prototype-pollution guard check (Prompt 10 security audit)
 */
const { test, describe, before, after } = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');

const app = require('../src/app');

let server;
let baseUrl;

before(async () => {
  server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, resolve));
  const { port } = server.address();
  baseUrl = `http://127.0.0.1:${port}`;
});

after(async () => {
  await new Promise((resolve) => server.close(resolve));
});

async function api(path, options = {}) {
  const res = await fetch(`${baseUrl}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options
  });
  let body = null;
  try { body = await res.json(); } catch (e) { /* empty/non-JSON body */ }
  return { status: res.status, body };
}

const CITIZEN_ID = 'TEST-CITIZEN-001';
const OTHER_CITIZEN_ID = 'TEST-CITIZEN-002';

// The exact set of NormalizedCitizenData paths income-certificate.schema.js
// declares via commonDataPath (identity.fullName, identity.dateOfBirth,
// address.addressLine, address.district, address.taluka, income.annualIncome)
// — a consent must authorize all of these for prepare/submit to succeed.
const INCOME_CERT_FIELDS = [
  'identity.fullName', 'identity.dateOfBirth',
  'address.addressLine', 'address.district', 'address.taluka',
  'income.annualIncome'
];

// ---------------------------------------------------------------------
// 1. Happy-path end-to-end flow
// ---------------------------------------------------------------------
describe('End-to-end flow', () => {
  let consentToken;
  let consentId;
  let applicationId;

  test('Health — GET /api/health', async () => {
    const { status, body } = await api('/api/health');
    assert.equal(status, 200);
    assert.equal(body.success, true);
    assert.equal(body.status, 'healthy');
  });

  test('Create Consent — POST /api/consent', async () => {
    const { status, body } = await api('/api/consent', {
      method: 'POST',
      body: JSON.stringify({
        citizenId: CITIZEN_ID,
        purpose: 'Income certificate application (test)',
        sources: ['AAPLE_SARKAR', 'REVENUE'],
        requestedFields: ['identity.fullName', 'address.district', 'income.annualIncome'],
        expiresInMinutes: 15
      })
    });
    assert.equal(status, 201);
    assert.equal(body.success, true);
    assert.ok(body.consentToken, 'raw token must be returned at creation');
    assert.ok(body.consent.consentId);
    assert.equal(body.consent.tokenHash, undefined, 'token hash must never be exposed to the client');
    consentToken = body.consentToken;
    consentId = body.consent.consentId;
  });

  test('Validate Consent — GET /api/consent/:consentId', async () => {
    const { status, body } = await api(`/api/consent/${consentId}`);
    assert.equal(status, 200);
    assert.equal(body.consent.status, 'ACTIVE');
    assert.equal(body.consent.tokenHash, undefined);
  });

  test('Fetch Citizen Data — POST /api/citizen-data/fetch', async () => {
    const { status, body } = await api('/api/citizen-data/fetch', {
      method: 'POST',
      body: JSON.stringify({
        citizenId: CITIZEN_ID,
        consentToken,
        sources: ['AAPLE_SARKAR', 'REVENUE'],
        requiredFields: ['identity.fullName', 'address.district', 'income.annualIncome']
      })
    });
    assert.equal(status, 200);
    assert.equal(body.success, true);
    assert.equal(body.data.identity.fullName.value, 'Demo Citizen');
    assert.equal(body.data.income.annualIncome.source, 'REVENUE');
    assert.deepEqual(
      body.sources.map((s) => s.status).sort(),
      ['success', 'success']
    );
  });

  test('List Services — GET /api/services', async () => {
    const { status, body } = await api('/api/services');
    assert.equal(status, 200);
    assert.ok(Array.isArray(body.services));
    assert.ok(body.services.find((s) => s.serviceId === 'income-certificate'));
    // Discovery response must not leak the full field list.
    assert.equal(body.services[0].fields, undefined);
  });

  test('Prepare Service — POST /api/services/:serviceId/prepare', async () => {
    // A fresh consent scoped to exactly what income-certificate needs,
    // since the flow-level consent above was scoped more narrowly.
    const consentRes = await api('/api/consent', {
      method: 'POST',
      body: JSON.stringify({
        citizenId: CITIZEN_ID,
        purpose: 'Income certificate application (test)',
        sources: ['AAPLE_SARKAR', 'REVENUE'],
        requestedFields: INCOME_CERT_FIELDS,
        expiresInMinutes: 15
      })
    });
    consentToken = consentRes.body.consentToken;
    consentId = consentRes.body.consent.consentId;

    const { status, body } = await api('/api/services/income-certificate/prepare', {
      method: 'POST',
      body: JSON.stringify({ citizenId: CITIZEN_ID, consentToken })
    });
    assert.equal(status, 200);
    assert.equal(body.success, true);
    assert.equal(body.serviceId, 'income-certificate');
    assert.ok(body.fields.fullName.autoFilled);
  });

  test('Submit Application — POST /api/applications', async () => {
    const prepareRes = await api('/api/services/income-certificate/prepare', {
      method: 'POST',
      body: JSON.stringify({ citizenId: CITIZEN_ID, consentToken })
    });
    const fields = {};
    for (const [fieldId, f] of Object.entries(prepareRes.body.fields)) {
      fields[fieldId] = f.value;
    }
    // mobileNumber has a strict pattern (^[6-9]\d{9}$) — set a valid
    // value BEFORE the generic "any non-empty test value" fill-in
    // below, so that generic loop doesn't clobber it with a value the
    // schema's own validation will reject.
    fields.mobileNumber = '9876543210';
    // Fill in whatever OTHER manual fields the schema needs that
    // government sources can never supply (e.g. income source).
    for (const fieldId of prepareRes.body.missingRequiredFields) {
      fields[fieldId] = fields[fieldId] || 'test-value';
    }

    const { status, body } = await api('/api/applications', {
      method: 'POST',
      body: JSON.stringify({ serviceId: 'income-certificate', citizenId: CITIZEN_ID, consentToken, fields })
    });
    assert.equal(status, 201);
    assert.equal(body.success, true);
    assert.equal(body.application.status, 'SUBMITTED');
    assert.ok(body.application.applicationId);
    applicationId = body.application.applicationId;
  });

  test('Retrieve Application — GET /api/applications/:applicationId', async () => {
    const { status, body } = await api(`/api/applications/${applicationId}`);
    assert.equal(status, 200);
    assert.equal(body.application.applicationId, applicationId);
    assert.ok(body.application.tracking, 'Prompt 8 tracking field must be present');
    assert.equal(body.application.tracking.status, 'SUBMITTED');
    assert.equal(body.application.tracking.source, 'E_SAMANVIT_PROTOTYPE');
  });

  test('List Applications — GET /api/applications?citizenId=...', async () => {
    const { status, body } = await api(`/api/applications?citizenId=${CITIZEN_ID}`);
    assert.equal(status, 200);
    assert.ok(Array.isArray(body.applications));
    assert.ok(body.applications.find((a) => a.applicationId === applicationId));
    assert.ok(body.applications[0].tracking);
  });

  test('Tracking information is present and honest (only SUBMITTED, no fabricated stages)', async () => {
    const { body } = await api(`/api/applications/${applicationId}`);
    assert.equal(body.application.tracking.status, 'SUBMITTED');
    assert.notEqual(body.application.tracking.status, 'APPROVED');
    assert.notEqual(body.application.tracking.status, 'UNDER_REVIEW');
  });
});

// ---------------------------------------------------------------------
// 2. Negative / failure-mode tests
// ---------------------------------------------------------------------
describe('Negative tests — Consent', () => {
  test('missing consent fields -> 400', async () => {
    const { status, body } = await api('/api/consent', { method: 'POST', body: JSON.stringify({}) });
    assert.equal(status, 400);
    assert.equal(body.error.code, 'INVALID_REQUEST');
  });

  test('invalid consent token -> 401', async () => {
    const { status, body } = await api('/api/citizen-data/fetch', {
      method: 'POST',
      body: JSON.stringify({
        citizenId: CITIZEN_ID,
        consentToken: 'not-a-real-token',
        sources: ['REVENUE'],
        requiredFields: ['income.annualIncome']
      })
    });
    assert.equal(status, 401);
    assert.equal(body.error.code, 'CONSENT_TOKEN_INVALID');
  });

  test('expired consent -> 410', async () => {
    const created = await api('/api/consent', {
      method: 'POST',
      body: JSON.stringify({
        citizenId: CITIZEN_ID,
        purpose: 'test',
        sources: ['REVENUE'],
        requestedFields: ['income.annualIncome'],
        expiresInMinutes: 1
      })
    });
    const token = created.body.consentToken;
    const consentId = created.body.consent.consentId;

    // Force the record to be in the past without waiting a real minute —
    // read it straight from the in-memory store the same way the
    // service itself would encounter it after time has passed.
    const ConsentStore = require('../src/stores/ConsentStore');
    const record = ConsentStore.getById(consentId);
    record.expiresAt = new Date(Date.now() - 1000).toISOString();

    const { status, body } = await api('/api/citizen-data/fetch', {
      method: 'POST',
      body: JSON.stringify({
        citizenId: CITIZEN_ID, consentToken: token, sources: ['REVENUE'], requiredFields: ['income.annualIncome']
      })
    });
    assert.equal(status, 410);
    assert.equal(body.error.code, 'CONSENT_EXPIRED');
  });

  test('revoked consent -> 410', async () => {
    const created = await api('/api/consent', {
      method: 'POST',
      body: JSON.stringify({
        citizenId: CITIZEN_ID, purpose: 'test', sources: ['REVENUE'], requestedFields: ['income.annualIncome']
      })
    });
    const token = created.body.consentToken;
    const consentId = created.body.consent.consentId;
    await api(`/api/consent/${consentId}/revoke`, { method: 'POST' });

    const { status, body } = await api('/api/citizen-data/fetch', {
      method: 'POST',
      body: JSON.stringify({
        citizenId: CITIZEN_ID, consentToken: token, sources: ['REVENUE'], requiredFields: ['income.annualIncome']
      })
    });
    assert.equal(status, 410);
    assert.equal(body.error.code, 'CONSENT_REVOKED');
  });

  test('wrong citizen -> 403', async () => {
    const created = await api('/api/consent', {
      method: 'POST',
      body: JSON.stringify({
        citizenId: CITIZEN_ID, purpose: 'test', sources: ['REVENUE'], requestedFields: ['income.annualIncome']
      })
    });
    const token = created.body.consentToken;

    const { status, body } = await api('/api/citizen-data/fetch', {
      method: 'POST',
      body: JSON.stringify({
        citizenId: OTHER_CITIZEN_ID, consentToken: token, sources: ['REVENUE'], requiredFields: ['income.annualIncome']
      })
    });
    assert.equal(status, 403);
    assert.equal(body.error.code, 'CONSENT_CITIZEN_MISMATCH');
  });

  test('unauthorized source (outside consent scope) -> 403', async () => {
    const created = await api('/api/consent', {
      method: 'POST',
      body: JSON.stringify({
        citizenId: CITIZEN_ID, purpose: 'test', sources: ['REVENUE'], requestedFields: ['income.annualIncome']
      })
    });
    const token = created.body.consentToken;

    const { status, body } = await api('/api/citizen-data/fetch', {
      method: 'POST',
      body: JSON.stringify({
        citizenId: CITIZEN_ID, consentToken: token, sources: ['MAHABHUMI'], requiredFields: ['land.surveyNumber']
      })
    });
    assert.equal(status, 403);
    assert.equal(body.error.code, 'CONSENT_SCOPE_VIOLATION');
  });

  test('unauthorized field (outside consent scope) -> 403', async () => {
    const created = await api('/api/consent', {
      method: 'POST',
      body: JSON.stringify({
        citizenId: CITIZEN_ID, purpose: 'test', sources: ['REVENUE'], requestedFields: ['income.annualIncome']
      })
    });
    const token = created.body.consentToken;

    const { status, body } = await api('/api/citizen-data/fetch', {
      method: 'POST',
      body: JSON.stringify({
        citizenId: CITIZEN_ID, consentToken: token, sources: ['REVENUE'], requiredFields: ['income.financialYear']
      })
    });
    assert.equal(status, 403);
    assert.equal(body.error.code, 'CONSENT_SCOPE_VIOLATION');
  });
});

describe('Negative tests — Citizen Data', () => {
  test('missing citizenId -> 400', async () => {
    const { status, body } = await api('/api/citizen-data/fetch', {
      method: 'POST',
      body: JSON.stringify({ consentToken: 'x', sources: ['REVENUE'], requiredFields: ['income.annualIncome'] })
    });
    assert.equal(status, 400);
    assert.equal(body.error.code, 'INVALID_REQUEST');
  });

  test('missing requiredFields -> 400', async () => {
    const { status, body } = await api('/api/citizen-data/fetch', {
      method: 'POST',
      body: JSON.stringify({ citizenId: CITIZEN_ID, consentToken: 'x', sources: ['REVENUE'] })
    });
    assert.equal(status, 400);
    assert.equal(body.error.code, 'INVALID_REQUEST');
  });

  test('invalid/unknown source -> 400', async () => {
    const { status, body } = await api('/api/citizen-data/fetch', {
      method: 'POST',
      body: JSON.stringify({
        citizenId: CITIZEN_ID, consentToken: 'x', sources: ['NOT_A_REAL_SOURCE'], requiredFields: ['income.annualIncome']
      })
    });
    assert.equal(status, 400);
    assert.equal(body.error.code, 'INVALID_REQUEST');
  });

  test('malformed request (field path missing a dot) -> 400', async () => {
    const { status, body } = await api('/api/citizen-data/fetch', {
      method: 'POST',
      body: JSON.stringify({
        citizenId: CITIZEN_ID, consentToken: 'x', sources: ['REVENUE'], requiredFields: ['annualIncome']
      })
    });
    assert.equal(status, 400);
    assert.equal(body.error.code, 'INVALID_REQUEST');
  });
});

describe('Negative tests — Services', () => {
  test('unknown service ID -> 404', async () => {
    const { status, body } = await api('/api/services/not-a-real-service');
    assert.equal(status, 404);
    assert.equal(body.error.code, 'SERVICE_NOT_FOUND');
  });

  test('prepare with missing consent -> 400', async () => {
    const { status, body } = await api('/api/services/income-certificate/prepare', {
      method: 'POST',
      body: JSON.stringify({ citizenId: CITIZEN_ID })
    });
    assert.equal(status, 400);
    assert.equal(body.error.code, 'INVALID_REQUEST');
  });

  test('prepare with insufficient consent scope -> 403', async () => {
    const created = await api('/api/consent', {
      method: 'POST',
      body: JSON.stringify({
        citizenId: CITIZEN_ID, purpose: 'test', sources: ['REVENUE'], requestedFields: ['income.annualIncome']
      })
    });
    const { status, body } = await api('/api/services/income-certificate/prepare', {
      method: 'POST',
      body: JSON.stringify({ citizenId: CITIZEN_ID, consentToken: created.body.consentToken })
    });
    assert.equal(status, 403);
    assert.equal(body.error.code, 'CONSENT_SCOPE_VIOLATION');
  });
});

describe('Negative tests — Applications', () => {
  test('missing required application data (no fields at all) -> 422', async () => {
    const consentRes = await api('/api/consent', {
      method: 'POST',
      body: JSON.stringify({
        citizenId: CITIZEN_ID,
        purpose: 'test',
        sources: ['AAPLE_SARKAR', 'REVENUE'],
        requestedFields: INCOME_CERT_FIELDS
      })
    });
    const { status, body } = await api('/api/applications', {
      method: 'POST',
      body: JSON.stringify({
        serviceId: 'income-certificate', citizenId: CITIZEN_ID, consentToken: consentRes.body.consentToken, fields: {}
      })
    });
    assert.equal(status, 422);
    assert.equal(body.error.code, 'APPLICATION_INCOMPLETE');
    assert.ok(Array.isArray(body.error.missingFields));
  });

  test('invalid service ID -> 404', async () => {
    const { status, body } = await api('/api/applications', {
      method: 'POST',
      body: JSON.stringify({ serviceId: 'not-a-real-service', citizenId: CITIZEN_ID, consentToken: 'x' })
    });
    assert.equal(status, 404);
    assert.equal(body.error.code, 'SERVICE_NOT_FOUND');
  });

  test('malformed application ID -> 404 (not a crash)', async () => {
    const { status, body } = await api('/api/applications/not-a-real-id;drop-table');
    assert.equal(status, 404);
    assert.equal(body.error.code, 'APPLICATION_NOT_FOUND');
  });

  test('unknown application ID -> 404', async () => {
    const { status, body } = await api('/api/applications/application-00000000-0000-0000-0000-000000000000');
    assert.equal(status, 404);
    assert.equal(body.error.code, 'APPLICATION_NOT_FOUND');
  });

  test('invalid application payload (missing citizenId) -> 400', async () => {
    const { status, body } = await api('/api/applications', {
      method: 'POST',
      body: JSON.stringify({ serviceId: 'income-certificate', consentToken: 'x' })
    });
    assert.equal(status, 400);
    assert.equal(body.error.code, 'INVALID_REQUEST');
  });
});

describe('Negative tests — Tracking / listing', () => {
  test('unknown application (detail) -> 404 rather than a crash', async () => {
    const { status } = await api('/api/applications/does-not-exist');
    assert.equal(status, 404);
  });

  test('missing citizenId on list -> 400', async () => {
    const { status, body } = await api('/api/applications');
    assert.equal(status, 400);
    assert.equal(body.error.code, 'INVALID_REQUEST');
  });

  test('empty application list for an unseen citizen -> 200 with []', async () => {
    const { status, body } = await api('/api/applications?citizenId=NEVER-SEEN-BEFORE-CITIZEN');
    assert.equal(status, 200);
    assert.deepEqual(body.applications, []);
  });
});

// ---------------------------------------------------------------------
// 3. Partial-adapter-failure simulation
// ---------------------------------------------------------------------
describe('Partial adapter failure', () => {
  test('one source failing does not discard the others, and is reported honestly', async (t) => {
    // AdapterRegistry.getAdapter is monkey-patched for the duration of
    // this single test only, to simulate MAHABHUMI being unreachable —
    // there is no real failure-injection feature in the production
    // adapters (none should exist; that would be its own kind of
    // dishonesty). The original implementation is restored immediately
    // after, via t.after(), regardless of pass/fail.
    const AdapterRegistry = require('../src/adapters/AdapterRegistry');
    const originalGetAdapter = AdapterRegistry.getAdapter;
    t.after(() => { AdapterRegistry.getAdapter = originalGetAdapter; });

    AdapterRegistry.getAdapter = function (source) {
      if (source === 'MAHABHUMI') {
        throw new Error('Simulated MahaBhumi outage (test-only)');
      }
      return originalGetAdapter(source);
    };

    const consentRes = await api('/api/consent', {
      method: 'POST',
      body: JSON.stringify({
        citizenId: CITIZEN_ID,
        purpose: 'test',
        sources: ['REVENUE', 'MAHABHUMI'],
        requestedFields: ['income.annualIncome', 'land.surveyNumber']
      })
    });

    const { status, body } = await api('/api/citizen-data/fetch', {
      method: 'POST',
      body: JSON.stringify({
        citizenId: CITIZEN_ID,
        consentToken: consentRes.body.consentToken,
        sources: ['REVENUE', 'MAHABHUMI'],
        requiredFields: ['income.annualIncome', 'land.surveyNumber']
      })
    });

    assert.equal(status, 200, 'a partial failure must not fail the whole request');
    assert.equal(body.data.income.annualIncome.value, 250000, 'REVENUE data must still be present');
    assert.equal(body.data.land, undefined, 'no data may be fabricated for the failed source');

    const revenueResult = body.sources.find((s) => s.source === 'REVENUE');
    const mahabhumiResult = body.sources.find((s) => s.source === 'MAHABHUMI');
    assert.equal(revenueResult.status, 'success');
    assert.equal(mahabhumiResult.status, 'error');
    assert.ok(mahabhumiResult.error, 'the failure reason must be reported');
  });
});

// ---------------------------------------------------------------------
// 4. Duplicate submission / idempotency
// ---------------------------------------------------------------------
describe('Duplicate application submission protection', () => {
  test('submitting twice with the same consent token returns the SAME application, not a second one', async () => {
    const consentRes = await api('/api/consent', {
      method: 'POST',
      body: JSON.stringify({
        citizenId: CITIZEN_ID,
        purpose: 'test',
        sources: ['AAPLE_SARKAR', 'REVENUE'],
        requestedFields: INCOME_CERT_FIELDS
      })
    });
    const token = consentRes.body.consentToken;

    const prepareRes = await api('/api/services/income-certificate/prepare', {
      method: 'POST',
      body: JSON.stringify({ citizenId: CITIZEN_ID, consentToken: token })
    });
    const fields = {};
    for (const [fieldId, f] of Object.entries(prepareRes.body.fields)) fields[fieldId] = f.value;
    fields.mobileNumber = '9876543210';
    for (const fieldId of prepareRes.body.missingRequiredFields) fields[fieldId] = fields[fieldId] || 'test-value';

    const first = await api('/api/applications', {
      method: 'POST',
      body: JSON.stringify({ serviceId: 'income-certificate', citizenId: CITIZEN_ID, consentToken: token, fields })
    });
    assert.equal(first.status, 201);

    const second = await api('/api/applications', {
      method: 'POST',
      body: JSON.stringify({ serviceId: 'income-certificate', citizenId: CITIZEN_ID, consentToken: token, fields })
    });
    // Not created again — same record, non-201 status signals "already existed".
    assert.equal(second.status, 200);
    assert.equal(second.body.application.applicationId, first.body.application.applicationId);

    const list = await api(`/api/applications?citizenId=${CITIZEN_ID}`);
    const matching = list.body.applications.filter((a) => a.applicationId === first.body.application.applicationId);
    assert.equal(matching.length, 1, 'exactly one stored record must exist for this consent, not two');
  });
});

// ---------------------------------------------------------------------
// 5. Prototype-pollution guard (Prompt 10 security audit finding)
// ---------------------------------------------------------------------
describe('Security — prototype pollution guard', () => {
  test('a "__proto__"-shaped field path is rejected, not silently processed', async () => {
    const { status, body } = await api('/api/citizen-data/fetch', {
      method: 'POST',
      body: JSON.stringify({
        citizenId: CITIZEN_ID,
        consentToken: 'irrelevant-rejected-before-consent-check',
        sources: ['REVENUE'],
        requiredFields: ['__proto__.polluted']
      })
    });
    assert.equal(status, 400);
    assert.equal(body.error.code, 'INVALID_REQUEST');
    assert.equal({}.polluted, undefined, 'Object.prototype must be unaffected');
  });

  test('a "constructor.prototype"-shaped field path is rejected', async () => {
    const { status, body } = await api('/api/consent', {
      method: 'POST',
      body: JSON.stringify({
        citizenId: CITIZEN_ID,
        purpose: 'test',
        sources: ['REVENUE'],
        requestedFields: ['constructor.prototype']
      })
    });
    assert.equal(status, 400);
    assert.equal(body.error.code, 'INVALID_REQUEST');
  });
});
