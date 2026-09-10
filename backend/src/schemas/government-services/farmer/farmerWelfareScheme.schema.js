/**
 * Farmer Welfare Scheme Application — service schema.
 *
 * Multi-Source Autofill Demo — government data shown through
 * configured adapters/mock sources for demonstration purposes. This
 * is the second demo built on the same interoperability architecture
 * as the scholarship demos (mahadbtPostMatricScholarship, nsp,
 * ebc) — it exists to prove the SAME adapters/consent/aggregator/
 * field-mapper pipeline works for an entirely different kind of
 * government service (a farmer income-support + land-linked scheme),
 * not just scholarships. Nothing about the shared architecture was
 * duplicated or forked to build this — see RevenueAdapter,
 * MockMahaBhumiAdapter, MockMahaDBTAdapter, MockAapleSarkarAdapter,
 * FieldMapperService, DataAggregatorService, ConsentManagerService —
 * all reused exactly as-is.
 *
 * Loosely modeled on the real PM-KISAN / Namo Shetkari Mahasanman
 * Nidhi schemes (the "PM Kisan Samman Nidhi Yojana" card on the
 * frontend Farmers category), which genuinely require land records
 * and an Aadhaar-linked bank account for DBT — so pulling land and
 * bank data here isn't arbitrary. This is a demonstration form, not a
 * claim that e-Samanvit has production access to PM-KISAN, MahaBhumi,
 * or any other real government system.
 */
const FieldType = require('../../../types/FieldType');
const GovernmentSource = require('../../../types/GovernmentSource');

module.exports = {
  serviceId: 'farmer-welfare-scheme',
  serviceName: 'Farmer Welfare Scheme',
  department: 'Department of Agriculture, Government of Maharashtra (with Ministry of Agriculture & Farmers Welfare, GoI)',
  description: 'Demo application — government data shown through configured adapters/mock sources for demonstration purposes. Modeled on PM-KISAN-style direct income support, which requires land records and a DBT-linked bank account.',
  purpose: 'Farmer Welfare Scheme application',
  requiredSources: [
    GovernmentSource.AAPLE_SARKAR,
    GovernmentSource.REVENUE,
    GovernmentSource.MAHABHUMI,
    GovernmentSource.MAHADBT
  ],
  fields: [
    // -- Personal Details — Aaple Sarkar --------------------------------
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
      fieldId: 'mobileNumber',
      label: 'Mobile Number',
      type: FieldType.PHONE,
      required: true,
      validation: { pattern: '^[6-9]\\d{9}$' },
      editable: true,
      description: 'No connected government source provides this yet — entered manually.'
    },

    // -- Address Details — Aaple Sarkar ----------------------------------
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
      required: true,
      commonDataPath: 'address.village',
      editable: true
    },
    {
      fieldId: 'pincode',
      label: 'Pincode',
      type: FieldType.TEXT,
      required: true,
      commonDataPath: 'address.pincode',
      validation: { pattern: '^\\d{6}$' },
      editable: true
    },

    // -- Land Details — MahaBhumi ----------------------------------------
    // District/Taluka/Village are already shown in Address Details above
    // (same underlying record) and are not repeated here.
    {
      fieldId: 'landSurveyNumber',
      label: 'Land Survey/Gat Number',
      type: FieldType.TEXT,
      required: true,
      commonDataPath: 'land.surveyNumber',
      editable: true
    },
    {
      fieldId: 'landArea',
      label: 'Land Area',
      type: FieldType.NUMBER,
      required: true,
      commonDataPath: 'land.area',
      editable: true
    },
    {
      fieldId: 'landUnit',
      label: 'Land Unit',
      type: FieldType.SELECT,
      required: true,
      commonDataPath: 'land.unit',
      options: ['Hectare', 'Acre'],
      editable: true
    },
    {
      fieldId: 'ownershipStatus',
      label: 'Ownership/Holder Status',
      type: FieldType.SELECT,
      required: true,
      commonDataPath: 'land.ownershipStatus',
      options: ['Owner', 'Joint Owner', 'Tenant'],
      editable: true
    },

    // -- Agriculture Details — Citizen-entered ---------------------------
    // These intentionally have no commonDataPath: not every field on a
    // real government form comes from a government source, and these
    // are exactly the kind that don't (no adapter/mock in this project
    // models crop-level farming activity).
    {
      fieldId: 'cropType',
      label: 'Crop Type',
      type: FieldType.TEXT,
      required: true,
      editable: true,
      description: 'Source: Citizen. Verification: User provided.'
    },
    {
      fieldId: 'cultivatedArea',
      label: 'Cultivated Area',
      type: FieldType.NUMBER,
      required: true,
      editable: true,
      description: 'Source: Citizen. Verification: User provided.'
    },
    {
      fieldId: 'irrigationType',
      label: 'Irrigation Type',
      type: FieldType.SELECT,
      required: true,
      options: ['Rain-fed', 'Canal', 'Borewell', 'Drip/Sprinkler'],
      editable: true,
      description: 'Source: Citizen. Verification: User provided.'
    },
    {
      fieldId: 'season',
      label: 'Season',
      type: FieldType.SELECT,
      required: true,
      options: ['Kharif', 'Rabi', 'Zaid'],
      editable: true,
      description: 'Source: Citizen. Verification: User provided.'
    },
    {
      fieldId: 'farmingType',
      label: 'Farming Type',
      type: FieldType.SELECT,
      required: false,
      options: ['Subsistence', 'Commercial', 'Organic'],
      editable: true,
      description: 'Source: Citizen. Verification: User provided.'
    },

    // -- Income / Eligibility — Revenue -----------------------------------
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
      fieldId: 'eligibilityCategory',
      label: 'Eligibility Category',
      type: FieldType.SELECT,
      required: true,
      editable: true,
      sensitive: true,
      options: ['Small Farmer', 'Marginal Farmer', 'Other'],
      description: 'Self-declared, based on landholding — not independently verified from a connected government source in this prototype.'
    },

    // -- Bank Details — MahaDBT --------------------------------------------
    // NEVER a raw account number — only the same masked last-4
    // reference the scholarship demos already use.
    {
      fieldId: 'bankName',
      label: 'Bank Name',
      type: FieldType.TEXT,
      required: true,
      commonDataPath: 'bank.bankName',
      editable: true
    },
    {
      fieldId: 'accountReference',
      label: 'Account Reference (masked)',
      type: FieldType.TEXT,
      required: true,
      commonDataPath: 'bank.accountLast4',
      editable: false,
      description: 'Masked reference verified via MahaDBT — the full account number is never stored, logged, or displayed by this prototype.'
    },
    {
      fieldId: 'ifsc',
      label: 'IFSC Code',
      type: FieldType.TEXT,
      required: true,
      commonDataPath: 'bank.ifsc',
      editable: true
    },
    {
      fieldId: 'accountHolderName',
      label: 'Account Holder Name',
      type: FieldType.TEXT,
      required: true,
      commonDataPath: 'bank.accountHolderName',
      editable: true
    },

    // -- Documents — Setu/DigiLocker path (reused from Revenue adapter) --
    // Only the income certificate has any real adapter path in this
    // project (via RevenueAdapter -> Setu sandbox when configured,
    // mock otherwise). Land-record and identity documents have no
    // document-retrieval adapter anywhere in this codebase — rather
    // than inventing one, these stay honestly manual/citizen-supplied.
    {
      fieldId: 'incomeCertificateReference',
      label: 'Income Certificate Reference',
      type: FieldType.TEXT,
      required: true,
      commonDataPath: 'income.certificateReference',
      editable: false,
      description: 'Retrieved via the Revenue adapter\'s Setu/DigiLocker sandbox path when configured and consented; otherwise the existing honest mock reference is shown.'
    },
    {
      fieldId: 'landRecordDocumentReference',
      label: 'Land Record (7/12 or Property Card) Reference',
      type: FieldType.TEXT,
      required: false,
      editable: true,
      description: 'No document-retrieval adapter exists for this in the current prototype — the citizen supplies their own reference/upload here, distinct from the structured land fields above which ARE fetched from MahaBhumi.'
    },
    {
      fieldId: 'identityDocumentReference',
      label: 'Identity / Supporting Document Reference',
      type: FieldType.TEXT,
      required: false,
      editable: true,
      description: 'No document-retrieval adapter exists for this in the current prototype — entered manually.'
    }
  ]
};
