/**
 * Land Record Request — service schema (MahaBhumi / Revenue Department).
 *
 * Prototype schema, not a reproduction of the official 7/12 request
 * form. See incomeCertificate.schema.js for the shared conventions.
 */
const FieldType = require('../../../types/FieldType');
const GovernmentSource = require('../../../types/GovernmentSource');

module.exports = {
  serviceId: 'land-record-service',
  serviceName: 'Land Record Request',
  department: 'MahaBhumi / Revenue Department',
  description: 'Requests a citizen\'s land record (7/12 extract) details for a specified survey number.',
  purpose: 'Land record request',
  requiredSources: [GovernmentSource.AAPLE_SARKAR, GovernmentSource.MAHABHUMI],
  fields: [
    {
      fieldId: 'fullName',
      label: 'Full Name',
      type: FieldType.TEXT,
      required: true,
      commonDataPath: 'identity.fullName',
      validation: { minLength: 2, maxLength: 100 },
      editable: true
    },
    {
      fieldId: 'district',
      label: 'District',
      type: FieldType.TEXT,
      required: true,
      commonDataPath: 'address.district',
      editable: true
    },
    {
      fieldId: 'taluka',
      label: 'Taluka',
      type: FieldType.TEXT,
      required: true,
      commonDataPath: 'address.taluka',
      editable: true
    },
    {
      fieldId: 'village',
      label: 'Village',
      type: FieldType.TEXT,
      required: false,
      commonDataPath: 'address.village',
      editable: true
    },
    {
      fieldId: 'surveyNumber',
      label: 'Survey Number',
      type: FieldType.TEXT,
      required: true,
      commonDataPath: 'land.surveyNumber',
      editable: true
    },
    {
      fieldId: 'propertyType',
      label: 'Property Type',
      type: FieldType.SELECT,
      required: true,
      editable: true,
      options: ['Agricultural', 'Residential', 'Commercial'],
      description: 'Self-declared — not verifiable from a connected government source in this prototype.'
    }
  ]
};
