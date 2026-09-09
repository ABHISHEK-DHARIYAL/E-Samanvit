/**
 * Services controller.
 *
 * Responsibility: HTTP <-> ServiceRegistry / FieldMapperService /
 * ConsentManagerService / DataAggregatorService glue. Contains no
 * schema-authoring, mapping, consent, or fetching logic itself — all
 * of that lives in the service layer, per this project's established
 * Route -> Controller -> Service separation.
 *
 * prepareService() is the important one: it deliberately reuses
 * Prompt 3's DataAggregatorService and Prompt 4's ConsentManagerService
 * unmodified rather than talking to adapters or the consent store
 * directly — see the file comments on those services for why that
 * boundary matters.
 */
const ServiceRegistry = require('../services/serviceRegistry/ServiceRegistry');
const FieldMapperService = require('../services/fieldMapper/FieldMapperService');
const ConsentManagerService = require('../services/consent/ConsentManagerService');
const DataAggregatorService = require('../services/dataAggregator/DataAggregatorService');
const AuditService = require('../services/audit/AuditService');
const { AuditEventType } = require('../models/AuditEvent');
const { ServiceNotFoundError } = require('../utils/errors');

async function listServices(req, res) {
  res.json({ success: true, services: ServiceRegistry.list() });
}

async function getServiceDetail(req, res) {
  const schema = ServiceRegistry.get(req.params.serviceId);
  if (!schema) throw new ServiceNotFoundError(req.params.serviceId);
  res.json({ success: true, service: schema });
}

async function prepareService(req, res) {
  const { serviceId } = req.params;
  const { citizenId, consentToken } = req.body;

  const schema = ServiceRegistry.get(serviceId);
  if (!schema) throw new ServiceNotFoundError(serviceId);

  // Shared with the applications submit flow (Prompt 7) via
  // ServiceRegistry.requiredDataPaths — was a locally-duplicated
  // function here until then.
  const requiredFields = ServiceRegistry.requiredDataPaths(schema);
  const requiredSources = schema.requiredSources;

  // Reuses Prompt 4's scope enforcement exactly as citizen-data/fetch
  // does — throws (401/403/410) if this schema needs more than the
  // citizen's consent actually authorizes. A service schema can never
  // silently expand what a consent grants.
  const consentContext = ConsentManagerService.validateConsentForFetch({
    consentToken,
    citizenId,
    sources: requiredSources,
    requiredFields
  });

  // Reuses Prompt 3's aggregator exactly as citizen-data/fetch does —
  // this controller never talks to an adapter directly.
  const aggregatorResult = await DataAggregatorService.fetchCitizenData({
    citizenId,
    consentToken,
    sources: requiredSources,
    requiredFields
  });

  const mapped = FieldMapperService.mapServiceData(schema, aggregatorResult.data);

  AuditService.log({
    event: AuditEventType.SERVICE_PREPARED,
    consentId: consentContext.consentId,
    citizenId,
    sources: requiredSources,
    fields: requiredFields,
    status: mapped.readyForReview ? 'READY' : 'INCOMPLETE'
  });

  res.json({
    success: true,
    serviceId,
    consentId: consentContext.consentId,
    readyForReview: mapped.readyForReview,
    missingRequiredFields: mapped.missingRequiredFields,
    fields: mapped.fields,
    sources: aggregatorResult.sources
  });
}

module.exports = { listServices, getServiceDetail, prepareService };
