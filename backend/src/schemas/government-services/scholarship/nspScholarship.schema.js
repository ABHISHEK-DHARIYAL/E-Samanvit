/**
 * National Scholarship Portal (NSP) — service schema.
 *
 * Prototype schema, not a reproduction of the official form. Follows
 * the same conventions as scholarship.schema.js. This is the central-
 * government-scheme counterpart to the two Maharashtra-specific
 * scholarship schemas, giving the Students category page a third
 * distinct, real autofill-capable demo.
 */
const FieldType = require('../../../types/FieldType');
const GovernmentSource = require('../../../types/GovernmentSource');

module.exports = {
  serviceId: 'nsp-scholarship',
  serviceName: 'National Scholarship Portal (NSP)',
  department: 'Ministry of Education & Minority Affairs, Government of India',
  description: 'Central sector scholarship scheme for college and university students based on higher secondary merit and national entrance scores.',
  purpose: 'NSP Scholarship application',
  requiredSources: [GovernmentSource.AAPLE_SARKAR, GovernmentSource.REVENUE],
  fields: [
    {
      fieldId: 'fullName',
      label: 'Full Name (as per Aadhaar)',
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
      fieldId: 'gender',
      label: 'Gender',
      type: FieldType.SELECT,
      required: true,
      commonDataPath: 'identity.gender',
      options: ['Male', 'Female', 'Other'],
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
      fieldId: 'email',
      label: 'Email Address',
      type: FieldType.EMAIL,
      required: false,
      editable: true,
      description: 'No connected government source provides this yet — entered manually.'
    },
    {
      fieldId: 'aadhaarSeededBankAccount',
      label: 'Bank Account is Aadhaar-Seeded (DBT-Ready)',
      type: FieldType.BOOLEAN,
      required: true,
      editable: true,
      description: 'NSP genuinely requires an Aadhaar-seeded account for disbursement — self-declared here, not verifiable from a connected government source in this prototype.'
    },
    {
      fieldId: 'collegeName',
      label: 'College / University Name',
      type: FieldType.TEXT,
      required: true,
      editable: true
    },
    {
      fieldId: 'courseName',
      label: 'Course Name',
      type: FieldType.TEXT,
      required: true,
      editable: true
    },
    {
      fieldId: 'academicYear',
      label: 'Academic Year',
      type: FieldType.TEXT,
      required: true,
      validation: { pattern: '^\\d{4}-\\d{2}$' },
      editable: true,
      description: 'e.g. 2025-26'
    },
    {
      fieldId: 'annualFamilyIncome',
      label: 'Annual Family Income (₹)',
      type: FieldType.NUMBER,
      required: true,
      commonDataPath: 'income.annualIncome',
      validation: { min: 0 },
      editable: true
    }
  ]
};
