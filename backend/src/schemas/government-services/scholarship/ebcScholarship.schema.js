/**
 * Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulk Shishyavrutti Yojana
 * (EBC Scholarship) — service schema.
 *
 * Prototype schema, not a reproduction of the official form. This is
 * the demo scheme built specifically to show off the Data Aggregator
 * pulling from THREE different mock government sources into one
 * autofilled form — Aaple Sarkar (identity/address), MahaBhumi (land
 * holding), MahaDBT (bank), and Revenue (income) — because the real
 * EBC scheme genuinely does use agricultural land holding as part of
 * its economic-eligibility assessment for rural families, alongside
 * the income certificate, so asking for land data here isn't
 * arbitrary padding.
 */
const FieldType = require('../../../types/FieldType');
const GovernmentSource = require('../../../types/GovernmentSource');

module.exports = {
  serviceId: 'ebc-scholarship',
  serviceName: 'Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulk Shishyavrutti Yojana (EBC Scholarship)',
  department: 'Directorate of Higher & Technical Education, Maharashtra',
  description: 'Tuition and examination fee reimbursement for Economically Backward Class (EBC) students in professional degree/diploma courses, with eligibility assessed on family income and — for agricultural families — landholding.',
  purpose: 'EBC Scholarship application',
  requiredSources: [
    GovernmentSource.AAPLE_SARKAR,
    GovernmentSource.REVENUE,
    GovernmentSource.MAHABHUMI,
    GovernmentSource.MAHADBT
  ],
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
      fieldId: 'gender',
      label: 'Gender',
      type: FieldType.SELECT,
      required: true,
      commonDataPath: 'identity.gender',
      options: ['Male', 'Female', 'Other'],
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
      fieldId: 'annualFamilyIncome',
      label: 'Annual Family Income (₹)',
      type: FieldType.NUMBER,
      required: true,
      commonDataPath: 'income.annualIncome',
      validation: { min: 0, max: 800000 },
      editable: true,
      description: 'EBC eligibility has an income ceiling — verify the current limit before relying on this prototype value.'
    },
    {
      fieldId: 'landSurveyNumber',
      label: 'Agricultural Land Survey/Gat Number (if applicable)',
      type: FieldType.TEXT,
      required: false,
      commonDataPath: 'land.surveyNumber',
      editable: true,
      description: 'Only required for agricultural families — used as part of the economic-eligibility assessment alongside income.'
    },
    {
      fieldId: 'landHoldingArea',
      label: 'Land Holding Area',
      type: FieldType.NUMBER,
      required: false,
      commonDataPath: 'land.area',
      editable: true
    },
    {
      fieldId: 'landHoldingUnit',
      label: 'Land Holding Unit',
      type: FieldType.SELECT,
      required: false,
      commonDataPath: 'land.unit',
      options: ['Hectare', 'Acre'],
      editable: true
    },
    {
      fieldId: 'collegeName',
      label: 'College / Institution Name',
      type: FieldType.TEXT,
      required: true,
      commonDataPath: 'education.institution',
      editable: true
    },
    {
      fieldId: 'courseName',
      label: 'Course Name',
      type: FieldType.TEXT,
      required: true,
      commonDataPath: 'education.qualification',
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
      fieldId: 'bankAccountLast4',
      label: 'Bank Account (last 4 digits)',
      type: FieldType.TEXT,
      required: false,
      commonDataPath: 'bank.accountLast4',
      editable: false,
      description: 'Masked reference verified via MahaDBT — the full account number is never stored or displayed by this prototype.'
    }
  ]
};
