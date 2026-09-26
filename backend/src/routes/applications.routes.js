/**
 * Applications routes (Prompt 7).
 *
 * POST /api/applications                 — submit a service, from the citizen's reviewed/confirmed field values
 * GET  /api/applications/:applicationId  — retrieve one submitted application (receipt)
 * GET  /api/applications?citizenId=...   — a citizen's own submissions — DEV/DEMO ONLY, see controller
 *
 * Replaces the Prompt 2 empty placeholder now that ApplicationService
 * exists. See models/Application.js for why every application this
 * endpoint produces has status SUBMITTED and nothing further — this is
 * NOT delivery to a real government system, no such integration exists
 * (see adapters/mocks/).
 */
const express = require('express');
const router = express.Router();

const validateApplicationSubmitRequest = require('../middleware/validateApplicationSubmitRequest');
const asyncHandler = require('../utils/asyncHandler');
const { submitApplication, getApplication, listApplications } = require('../controllers/applications.controller');

router.post('/', validateApplicationSubmitRequest, asyncHandler(submitApplication));
router.get('/', asyncHandler(listApplications));
router.get('/:applicationId', asyncHandler(getApplication));

module.exports = router;
