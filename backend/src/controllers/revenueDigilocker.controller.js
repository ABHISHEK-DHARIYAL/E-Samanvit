/**
 * Revenue DigiLocker controller.
 *
 * Responsibility: the two endpoints that let a citizen actually
 * complete Setu's real DigiLocker consent flow, so RevenueAdapter can
 * later find a completed request in setuRequestStore and fetch real
 * data instead of falling back to mock. Kept separate from the
 * adapter itself — this is HTTP-facing orchestration, not adapter
 * logic.
 */
const { InvalidRequestError, ExternalApiUnavailableError } = require('../utils/errors');
const config = require('../config/env');
const setuClient = require('../adapters/governments/revenue/client/SetuDigiLockerClient');
const requestStore = require('../adapters/governments/revenue/setuRequestStore');

async function startDigilockerConsent(req, res) {
  const { citizenId, redirectUrl } = req.body || {};
  if (!citizenId) throw new InvalidRequestError('citizenId is required');
  if (!redirectUrl) throw new InvalidRequestError('redirectUrl is required');

  if (!config.setu.isConfigured()) {
    // Not an error for the citizen — the caller (frontend) should
    // treat this as "live DigiLocker isn't available right now, demo
    // data will be used instead" rather than a hard failure.
    return res.status(200).json({ success: true, liveAvailable: false });
  }

  try {
    const request = await setuClient.createConsentRequest(redirectUrl);
    requestStore.startRequest(citizenId, request.id);
    res.status(200).json({ success: true, liveAvailable: true, requestId: request.id, consentUrl: request.url });
  } catch (err) {
    throw new ExternalApiUnavailableError('Setu DigiLocker', err.message);
  }
}

async function getDigilockerConsentStatus(req, res) {
  const { citizenId } = req.params;
  const entry = requestStore.get(citizenId);
  if (!entry) {
    return res.status(200).json({ success: true, status: 'not-started' });
  }

  try {
    const remoteStatus = await setuClient.getRequestStatus(entry.requestId);
    requestStore.updateStatus(citizenId, remoteStatus.status);
    res.status(200).json({ success: true, status: remoteStatus.status });
  } catch (err) {
    throw new ExternalApiUnavailableError('Setu DigiLocker', err.message);
  }
}

module.exports = { startDigilockerConsent, getDigilockerConsentStatus };
