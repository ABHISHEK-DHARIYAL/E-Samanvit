/**
 * Audit controller.
 *
 * DEV/DEMO ENDPOINT — no authentication layer exists yet, so this is
 * currently unrestricted. A production design must not expose an
 * audit trail across all citizens without access control; that
 * restriction is deliberately not implemented here (see routes/audit.routes.js).
 */
const AuditService = require('../services/audit/AuditService');

async function getAuditByConsent(req, res) {
  res.json({ success: true, events: AuditService.getByConsentId(req.params.consentId) });
}

async function getAllAudit(req, res) {
  res.json({ success: true, events: AuditService.getAll() });
}

module.exports = { getAuditByConsent, getAllAudit };
