/**
 * Scholarship Application — service schema (MahaDBT).
 *
 * Prototype schema, not a reproduction of the official form. See
 * incomeCertificate.schema.js for the shared conventions this follows.
 *
 * Note on `bankAccountLast4`: MockMahaDBTAdapter only ever exposes a
 * masked last-4-digit reference (see NormalizedCitizenData / the mock
 * adapter itself) — never a full account number. The field is named
 * and described accordingly rather than implying data this prototype
 * doesn't actually have.
 */
const FieldType = require('../../types/FieldType');
const GovernmentSource = require('../../types/GovernmentSource');

module.exports = {
  serviceId: 'scholarship-application',
  serviceName: 'Scholarship Application',
  department: 'Higher & Technical Education Department (via MahaDBT)',
  description: 'Merit/means-based scholarship application for enrolled students.',
  purpose: 'Scholarship application',
  requiredSources: [GovernmentSource.AAPLE_SARKAR, GovernmentSource.REVENUE, GovernmentSource.MAHADBT],
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
      fieldId: 'email',
      label: 'Email Address',
      type: FieldType.EMAIL,
      required: false,
      editable: true,
      description: 'No connected government source provides this yet — entered manually.'
    },
    {
      fieldId: 'category',
      label: 'Reservation Category',
      type: FieldType.SELECT,
      required: true,
      editable: true,
      sensitive: true,
      options: ['Open', 'OBC', 'SC', 'ST', 'EWS', 'Other'],
      description: 'Self-declared — not verifiable from a connected government source in this prototype.'
    },
    {
      fieldId: 'collegeName',
      label: 'College / Institution Name',
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
    },
    {
      fieldId: 'bankAccountLast4',
      label: 'DBT-Linked Bank Account (last 4 digits)',
      type: FieldType.TEXT,
      required: false,
      commonDataPath: 'bank.accountLast4',
      editable: false,
      description: 'Masked reference verified via MahaDBT — the full account number is never stored or displayed by this prototype.'
    }
  ]
};
