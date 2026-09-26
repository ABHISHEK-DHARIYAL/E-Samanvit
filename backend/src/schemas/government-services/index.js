/**
 * Aggregates every government service schema in one place.
 *
 * Responsibility: this is the only file that needs to change when a
 * new service (birth-certificate, domicile-certificate, caste-
 * certificate, pension-application, farmer-scheme, ...) is added —
 * write the new schema file, then list it here. Nothing else in the
 * backend (registry, controllers, routes) needs to know how many
 * services exist or what their IDs are.
 *
 * Folder layout (schema content/behavior unchanged from before this
 * reorganization — only file locations and these require() paths
 * moved):
 *   scholarship/                                      — all four
 *     scholarship-related schemas live flat in this one folder:
 *     scholarship.schema.js is the original, unmodified "Scholarship
 *     Application" schema (functionality/serviceId/fields untouched);
 *     mahadbtPostMatricScholarship.schema.js, nspScholarship.schema.js,
 *     and ebcScholarship.schema.js are the three additional named
 *     scholarship demos added afterward specifically to showcase
 *     real/multi-source autofill on the Students category page. These
 *     are live, ServiceRegistry-registered services wired to real
 *     "Apply" buttons on the frontend — not a separate, disconnected
 *     demo bundle.
 *   revenue/revenue.schema.js                        — was
 *     incomeCertificate.schema.js (Income Certificate is a Revenue
 *     Department document).
 *   land/land.schema.js                              — was
 *     landRecord.schema.js.
 *   farmer/farmerWelfareScheme.schema.js              — the second
 *     demo built on this same architecture (personal/address from
 *     Aaple Sarkar, income from Revenue, land from MahaBhumi, bank
 *     from MahaDBT), proving the interoperability layer isn't
 *     scholarship-specific.
 */
const scholarshipSchema = require('./scholarship/scholarship.schema');
const mahadbtPostMatricScholarshipSchema = require('./scholarship/mahadbtPostMatricScholarship.schema');
const nspScholarshipSchema = require('./scholarship/nspScholarship.schema');
const ebcScholarshipSchema = require('./scholarship/ebcScholarship.schema');
const incomeCertificateSchema = require('./revenue/revenue.schema');
const landRecordSchema = require('./land/land.schema');
const farmerWelfareSchemeSchema = require('./farmer/farmerWelfareScheme.schema');

module.exports = {
  incomeCertificateSchema,
  scholarshipSchema,
  landRecordSchema,
  mahadbtPostMatricScholarshipSchema,
  nspScholarshipSchema,
  ebcScholarshipSchema,
  farmerWelfareSchemeSchema,
  all: [
    incomeCertificateSchema,
    scholarshipSchema,
    landRecordSchema,
    mahadbtPostMatricScholarshipSchema,
    nspScholarshipSchema,
    ebcScholarshipSchema,
    farmerWelfareSchemeSchema
  ]
};
