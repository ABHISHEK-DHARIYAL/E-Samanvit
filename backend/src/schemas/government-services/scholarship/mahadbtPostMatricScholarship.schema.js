/**
 * MahaDBT Post-Matric Scholarship — service schema.
 *
 * Prototype schema, not a reproduction of the official form. Follows
 * the same conventions as scholarship.schema.js (see that file for
 * the shared field-authoring rationale) — this is a second, distinctly
 * named demo scheme so the Students category page has more than one
 * real autofill-capable card, not just one generic "Scholarship
 * Application".
 */
const FieldType = require('../../../types/FieldType');
const GovernmentSource = require('../../../types/GovernmentSource');

module.exports = {
  serviceId: 'mahadbt-post-matric-scholarship',
  serviceName: 'MahaDBT Post-Matric Scholarship',
  department: 'Social Justice & Special Assistance Department, Maharashtra (via MahaDBT)',
  description: '100% tuition and examination fee waiver with monthly maintenance allowance for SC/ST/OBC/EWS students pursuing diploma and degree courses.',
  purpose: 'Post-Matric Scholarship application',
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
      fieldId: 'category',
      label: 'Reservation Category',
      type: FieldType.SELECT,
      required: true,
      editable: true,
      sensitive: true,
      options: ['SC', 'ST', 'OBC', 'EWS'],
      description: 'This scheme is restricted to these categories — self-declared, not verifiable from a connected government source in this prototype.'
    },
    {
      fieldId: 'casteCertificateNumber',
      label: 'Caste Certificate Number',
      type: FieldType.TEXT,
      required: true,
      editable: true,
      description: 'No connected government source provides this yet — entered manually. A real deployment would verify this against a DigiLocker-issued Caste Certificate.'
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
      label: 'Course Name (Diploma / Degree)',
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
      validation: { min: 0, max: 250000 },
      editable: true,
      description: 'This scheme has an income ceiling — verify the current limit before relying on this prototype value.'
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
