/**
 * ApplicationService — Prompt 7 (Application Submission).
 *
 * Responsibility: turn a citizen's reviewed/confirmed field values
 * into a persisted Application record, without ever trusting the
 * client for two things a server must decide for itself:
 *
 *   1. Whether a field is genuinely "auto-filled from a government
 *      source" — this is recomputed here from a fresh consent-gated
 *      fetch, exactly the way /prepare (Prompt 5) computes it, rather
 *      than accepting whatever provenance the frontend's local state
 *      claims. A citizen's browser asserting `source: "REVENUE"` is
 *      not evidence that the value actually came from Revenue.
 *   2. Whether the submission is actually complete and valid — the
 *      frontend's validation (Prompt 6) is for citizen UX; this file
 *      is what actually gates whether an Application record gets
 *      created (see utils/fieldValidation.js for why this is a
 *      deliberate, rule-for-rule duplicate rather than a shared import).
 *
 * Deliberately reuses ConsentManagerService.validateConsentForFetch()
 * and DataAggregatorService.fetchCitizenData() completely unmodified —
 * the same boundary Prompt 5's prepareService() established. This
 * service never talks to an adapter or the consent store directly,
 * and a submission can never obtain more government data than the
 * citizen's consent actually authorizes.
 *
 * See models/Application.js for why SUBMITTED is the only status this
 * prototype can honestly produce.
 */
const crypto = require('node:crypto');
const ServiceRegistry = require('../serviceRegistry/ServiceRegistry');
const ConsentManagerService = require('../consent/ConsentManagerService');
const DataAggregatorService = require('../dataAggregator/DataAggregatorService');
const FieldMapperService = require('../fieldMapper/FieldMapperService');
const AuditService = require('../audit/AuditService');
const { AuditEventType } = require('../../models/AuditEvent');
const { ApplicationStatus } = require('../../models/Application');
const ApplicationStore = require('../../stores/ApplicationStore');
const { validateAllFields, isEmptyValue } = require('../../utils/fieldValidation');
const {
  ServiceNotFoundError,
  ApplicationNotFoundError,
  ApplicationIncompleteError,
  ApplicationValidationError
} = require('../../utils/errors');

/**
 * Reconciles the citizen's submitted values against a freshly fetched,
 * authoritative auto-fill result. A field counts as still auto-filled
 * (and keeps its government-sourced provenance) only if the citizen's
 * submitted value matches what was actually fetched; anything else —
 * a manual-entry field, or an auto-filled field the citizen edited —
 * is recorded as the citizen's own entry, with no invented source.
 */
function reconcileFields(schema, submittedValues, mapped) {
  const fields = {};
  for (const field of schema.fields) {
    const authoritative = mapped.fields[field.fieldId];
    const submitted = submittedValues[field.fieldId];

    const matchesAutoFilled = authoritative.autoFilled
      && !isEmptyValue(submitted)
      && String(submitted) === String(authoritative.value);

    if (matchesAutoFilled) {
      fields[field.fieldId] = {
        value: authoritative.value,
        source: authoritative.source,
        autoFilled: true,
        edited: false
      };
    } else {
      fields[field.fieldId] = {
        value: isEmptyValue(submitted) ? null : submitted,
        source: null,
        autoFilled: false,
        edited: !!authoritative.autoFilled // was auto-filled, citizen changed it
      };
    }
  }
  return fields;
}

/**
 * @param {object} params
 * @param {string} params.serviceId
 * @param {string} params.citizenId
 * @param {string} params.consentToken
 * @param {object} params.fields - { fieldId: value } — the citizen's confirmed values from the review screen
 * @returns {object} the persisted Application record
 */
async function submitApplication({ serviceId, citizenId, consentToken, fields: submittedValues }) {
  const schema = ServiceRegistry.get(serviceId);
  if (!schema) throw new ServiceNotFoundError(serviceId);

  const requiredSources = schema.requiredSources;
  const requiredDataPaths = ServiceRegistry.requiredDataPaths(schema);

  // Reused exactly as prepareService() does — throws 401/403/410 if
  // this citizen's consent doesn't actually cover what this schema needs.
  const consentContext = ConsentManagerService.validateConsentForFetch({
    consentToken,
    citizenId,
    sources: requiredSources,
    requiredFields: requiredDataPaths
  });

  // Prototype-level duplicate-submission protection (Prompt 10 #14):
  // a consent token is validated (and therefore known to this service)
  // but never invalidated after a successful submission, so a repeated
  // POST /api/applications with the SAME consent token — e.g. an
  // accidental double-click that fires two requests before the
  // frontend's `submitting` guard disables the button, or a retried
  // request after a dropped response — would otherwise create a
  // second Application record for what is really one citizen action.
  // Returning the already-created record instead (rather than a new
  // one) makes the endpoint idempotent per consent, without a
  // distributed idempotency-key system this prototype doesn't need.
  const existing = ApplicationStore.getByConsentId(consentContext.consentId);
  if (existing) return { ...existing, alreadySubmitted: true };

  // Re-fetched fresh rather than trusting client-supplied provenance —
  // see the file comment above.
  const aggregatorResult = await DataAggregatorService.fetchCitizenData({
    citizenId,
    consentToken,
    sources: requiredSources,
    requiredFields: requiredDataPaths
  });
  const mapped = FieldMapperService.mapServiceData(schema, aggregatorResult.data);

  const reconciled = reconcileFields(schema, submittedValues || {}, mapped);
  const finalValues = Object.fromEntries(
    Object.entries(reconciled).map(([fieldId, f]) => [fieldId, f.value])
  );

  const missingRequired = schema.fields
    .filter((f) => f.required && isEmptyValue(finalValues[f.fieldId]))
    .map((f) => f.fieldId);
  if (missingRequired.length > 0) {
    throw new ApplicationIncompleteError(missingRequired);
  }

  const fieldErrors = validateAllFields(schema.fields, finalValues);
  if (Object.keys(fieldErrors).length > 0) {
    throw new ApplicationValidationError(fieldErrors);
  }

  const record = {
    applicationId: `application-${crypto.randomUUID()}`,
    serviceId: schema.serviceId,
    serviceName: schema.serviceName,
    department: schema.department,
    citizenId,
    consentId: consentContext.consentId,
    status: ApplicationStatus.SUBMITTED,
    submittedAt: new Date().toISOString(),
    fields: reconciled
  };
  ApplicationStore.save(record);

  AuditService.log({
    event: AuditEventType.APPLICATION_SUBMITTED,
    consentId: consentContext.consentId,
    citizenId,
    sources: requiredSources,
    fields: requiredDataPaths,
    status: 'SUCCESS'
  });

  return record;
}

function getApplication(applicationId) {
  const record = ApplicationStore.getById(applicationId);
  if (!record) throw new ApplicationNotFoundError(applicationId);
  return record;
}

function listApplicationsForCitizen(citizenId) {
  return ApplicationStore.getByCitizenId(citizenId);
}

module.exports = { submitApplication, getApplication, listApplicationsForCitizen };
