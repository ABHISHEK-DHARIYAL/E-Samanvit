/**
 * SetuDigiLockerClient — raw HTTP calls to Setu's DigiLocker API only.
 *
 * Responsibility: this file knows Setu's wire protocol (headers, request
 * shapes, endpoint paths) and NOTHING about e-Samanvit's own data model
 * or consent rules — that translation happens one layer up, in
 * RevenueAdapter.js. If Setu changes their contract, this is the only
 * file that should need to change.
 *
 * Setu (https://setu.co) is a licensed DigiLocker Requesting Partner
 * that resells sandbox/production DigiLocker access — e-Samanvit is
 * not itself a registered DigiLocker partner, and doesn't need to be
 * to use this. See docs.setu.co/data/digilocker for the authoritative
 * contract; the shapes below match their publicly documented flow at
 * the time this was written and should be re-verified against Setu's
 * own docs once real sandbox credentials are in hand.
 *
 * Every method here throws on failure — callers (RevenueAdapter) are
 * responsible for catching and falling back to mock data. This file
 * never falls back to anything itself; it only speaks to Setu.
 */
const config = require('../../../../config/env');

function authHeaders() {
  return {
    'Content-Type': 'application/json',
    'x-client-id': config.setu.clientId,
    'x-client-secret': config.setu.clientSecret,
    'x-product-instance-id': config.setu.productInstanceId
  };
}

/**
 * Step 1 — create a DigiLocker consent request. The citizen must then
 * be redirected to the returned `url` to log into DigiLocker and
 * approve the request; e-Samanvit never sees the citizen's DigiLocker
 * credentials.
 *
 * @param {string} redirectUrl - where Setu sends the citizen back to
 *   after they approve/deny the request on DigiLocker's own page.
 * @returns {Promise<{id: string, status: string, url: string, validUpto: string}>}
 */
async function createConsentRequest(redirectUrl) {
  const response = await fetch(`${config.setu.baseUrl}/api/digilocker/`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ redirectUrl })
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new Error(`Setu createConsentRequest failed (status ${response.status}): ${body.slice(0, 200)}`);
  }

  return response.json();
}

/**
 * Step 2 — check whether the citizen has completed the DigiLocker
 * consent flow yet.
 *
 * @param {string} requestId - the `id` returned by createConsentRequest
 * @returns {Promise<{id: string, status: string}>} status becomes
 *   'authenticated' once the citizen has approved.
 */
async function getRequestStatus(requestId) {
  const response = await fetch(`${config.setu.baseUrl}/api/digilocker/${encodeURIComponent(requestId)}`, {
    method: 'GET',
    headers: authHeaders()
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new Error(`Setu getRequestStatus failed (status ${response.status}): ${body.slice(0, 200)}`);
  }

  return response.json();
}

/**
 * Step 3 — once status is 'authenticated', fetch a specific document
 * type the citizen has in their DigiLocker.
 *
 * @param {string} requestId
 * @param {'INCOME_CERT'|'CASTE_CERT'|'DOMICILE_CERT'|string} docType
 * @returns {Promise<object>} Setu's raw document response — shape not
 *   independently verified in this codebase yet; RevenueAdapter.js
 *   should log the raw response the first time this runs against real
 *   sandbox credentials and update its normalization accordingly.
 */
async function fetchDocument(requestId, docType) {
  const response = await fetch(`${config.setu.baseUrl}/api/digilocker/${encodeURIComponent(requestId)}/document`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ docType })
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new Error(`Setu fetchDocument failed (status ${response.status}): ${body.slice(0, 200)}`);
  }

  return response.json();
}

module.exports = { createConsentRequest, getRequestStatus, fetchDocument };
