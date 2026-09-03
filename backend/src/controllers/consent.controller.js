/**
 * Consent controller.
 *
 * Responsibility: translate HTTP requests into ConsentManagerService
 * calls and shape the HTTP responses. Contains no consent business
 * logic itself (lifecycle, scope, expiry) — that all lives in the
 * service layer.
 *
 * IDENTITY LIMITATION: citizenId is read directly from the request
 * body because no authentication layer exists yet. This is the one
 * line that would change (to `req.user.citizenId` or similar) once
 * real citizen authentication is added — see ConsentManagerService's
 * file comment for why the interface below it doesn't need to change.
 */
const ConsentManagerService = require('../services/consent/ConsentManagerService');

async function createConsent(req, res) {
  const { citizenId, purpose, sources, requestedFields, expiresInMinutes } = req.body;

  const result = ConsentManagerService.createConsent({
    citizenId,
    purpose,
    sources,
    requestedFields,
    expiresInMinutes
  });

  res.status(201).json({ success: true, ...result });
}

async function getConsent(req, res) {
  const consent = ConsentManagerService.getConsent(req.params.consentId);
  res.json({ success: true, consent });
}

async function revokeConsent(req, res) {
  const consent = ConsentManagerService.revokeConsent(req.params.consentId);
  res.json({ success: true, consent });
}

module.exports = { createConsent, getConsent, revokeConsent };
