/**
 * Citizen Data controller.
 *
 * Responsibility: translate an HTTP request into consent validation +
 * a DataAggregatorService call, and shape the HTTP response. Contains
 * no consent, aggregation, adapter, or normalization logic itself —
 * that all lives in the service layer, per the
 * Route -> Controller -> Service -> Adapter separation.
 *
 * As of Prompt 4, the flow is:
 *   validate request shape (middleware, 400s)
 *     -> validate consent + enforce scope (ConsentManagerService, 401/403/410)
 *     -> fetch via DataAggregatorService (unchanged from Prompt 3)
 *     -> record an audit event
 *     -> respond
 *
 * IDENTITY LIMITATION: citizenId is read directly from the request
 * body — see ConsentManagerService's file comment for why that's
 * temporary and how it's meant to be replaced later.
 */
const DataAggregatorService = require('../services/dataAggregator/DataAggregatorService');
const ConsentManagerService = require('../services/consent/ConsentManagerService');
const AuditService = require('../services/audit/AuditService');
const { AuditEventType } = require('../models/AuditEvent');

function determineFetchEvent(sourceResults) {
  const statuses = sourceResults.map((s) => s.status);
  if (statuses.every((s) => s === 'success')) return AuditEventType.DATA_FETCH_SUCCESS;
  if (statuses.every((s) => s === 'error')) return AuditEventType.DATA_FETCH_FAILED;
  return AuditEventType.DATA_FETCH_PARTIAL;
}

async function fetchCitizenData(req, res) {
  const { citizenId, consentToken, sources, requiredFields } = req.body;

  // Throws (401/403/410) if the token is missing/invalid, the consent
  // is expired/revoked, the citizen doesn't match, or the request asks
  // for more sources/fields than the consent actually authorizes.
  const consentContext = ConsentManagerService.validateConsentForFetch({
    consentToken,
    citizenId,
    sources,
    requiredFields
  });

  const result = await DataAggregatorService.fetchCitizenData({
    citizenId,
    consentToken,
    sources,
    requiredFields
  });

  AuditService.log({
    event: determineFetchEvent(result.sources),
    consentId: consentContext.consentId,
    citizenId,
    sources,
    fields: requiredFields,
    status: determineFetchEvent(result.sources).replace('DATA_FETCH_', '')
  });

  res.json({
    success: true,
    citizenId,
    consentId: consentContext.consentId,
    requiredFields,
    ...result
  });
}

module.exports = { fetchCitizenData };
