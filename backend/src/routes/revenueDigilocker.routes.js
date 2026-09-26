/**
 * Revenue DigiLocker routes.
 *
 * POST /api/revenue/digilocker/start           — begin a real Setu consent request
 * GET  /api/revenue/digilocker/:citizenId/status — poll whether the citizen has approved it
 */
const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const { startDigilockerConsent, getDigilockerConsentStatus } = require('../controllers/revenueDigilocker.controller');

const router = express.Router();

router.post('/start', asyncHandler(startDigilockerConsent));
router.get('/:citizenId/status', asyncHandler(getDigilockerConsentStatus));

module.exports = router;
