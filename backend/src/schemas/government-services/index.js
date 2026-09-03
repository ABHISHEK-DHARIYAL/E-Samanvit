/**
 * Aggregates every government service schema in one place.
 *
 * Responsibility: this is the only file that needs to change when a
 * new service (birth-certificate, domicile-certificate, caste-
 * certificate, pension-application, farmer-scheme, ...) is added —
 * write the new schema file, then list it here. Nothing else in the
 * backend (registry, controllers, routes) needs to know how many
 * services exist or what their IDs are.
 */
const incomeCertificateSchema = require('./incomeCertificate.schema');
const scholarshipSchema = require('./scholarship.schema');
const landRecordSchema = require('./landRecord.schema');

module.exports = {
  incomeCertificateSchema,
  scholarshipSchema,
  landRecordSchema,
  all: [incomeCertificateSchema, scholarshipSchema, landRecordSchema]
};
