/**
 * Citizen data routes.
 *
 * POST /api/citizen-data/fetch — prototype endpoint for exercising the
 * Data Aggregator / Adapter Registry / mock adapters end to end. This
 * is NOT a production citizen-data API: it demonstrates the
 * architecture (required-field filtering, source metadata, partial
 * failure handling, prototype consent-token validation), not a
 * finished, access-controlled government-data endpoint.
 */
const express = require('express');
const router = express.Router();

const validateCitizenDataRequest = require('../middleware/validateCitizenDataRequest');
const asyncHandler = require('../utils/asyncHandler');
const { fetchCitizenData } = require('../controllers/citizenData.controller');

router.post('/fetch', validateCitizenDataRequest, asyncHandler(fetchCitizenData));

module.exports = router;
