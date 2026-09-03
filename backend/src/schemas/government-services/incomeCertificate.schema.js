/**
 * Income Certificate — service schema (Revenue Department).
 *
 * This is a prototype schema demonstrating interoperability, not a
 * reproduction of the official production application form.
 *
 * `commonDataPath` values are dot-paths into NormalizedCitizenData
 * (see models/NormalizedCitizenData.js) — the SAME field paths used
 * throughout Prompts 3–4. This schema does not invent a parallel data
 * model; it maps directly onto what the adapters already produce.
 *
 * Fields with no `commonDataPath` have no government-system source at
 * all (e.g. a mobile number, or a self-declared income category) —
 * the Field Mapper will correctly report these as manual-entry-only
 * rather than inventing a source for them.
 */
const FieldType = require('../../types/FieldType');
const GovernmentSource = require('../../types/GovernmentSource');

module.exports = {
  serviceId: 'income-certificate',
  serviceName: 'Income Certificate',
  department: 'Revenue Department',
  description: 'Certifies a citizen\'s annual income for eligibility and benefit purposes.',
  purpose: 'Income certificate application',
  requiredSources: [GovernmentSource.AAPLE_SARKAR, GovernmentSource.REVENUE],
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
      fieldId: 'dateOfBirth',
      label: 'Date of Birth',
      type: FieldType.DATE,
      required: true,
      commonDataPath: 'identity.dateOfBirth',
      editable: true
    },
    {
      fieldId: 'mobileNumber',
      label: 'Mobile Number',
      type: FieldType.PHONE,
      required: true,
      validation: { pattern: '^[6-9]\\d{9}$' },
      editable: true,
      description: 'No connected government source provides this yet — entered manually.'
    },
    {
      fieldId: 'address',
      label: 'Residential Address',
      type: FieldType.TEXTAREA,
      required: true,
      commonDataPath: 'address.addressLine',
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
      required: false,
      commonDataPath: 'address.taluka',
      editable: true
    },
    {
      fieldId: 'annualIncome',
      label: 'Annual Income (₹)',
      type: FieldType.NUMBER,
      required: true,
      commonDataPath: 'income.annualIncome',
      validation: { min: 0 },
      editable: true
    },
    {
      fieldId: 'incomeSource',
      label: 'Source of Income',
      type: FieldType.SELECT,
      required: true,
      editable: true,
      options: ['Salary', 'Business', 'Agriculture', 'Other'],
      description: 'Self-declared — not verifiable from a connected government source in this prototype.'
    }
  ]
};
