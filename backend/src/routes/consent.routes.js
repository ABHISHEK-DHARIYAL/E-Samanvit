/**
 * Consent routes.
 *
 * POST   /api/consent               — create a scoped, time-limited consent
 * GET    /api/consent/:consentId    — retrieve safe consent metadata (never the token)
 * POST   /api/consent/:consentId/revoke — revoke an active consent
 *
 * Replaces the Prompt 2 empty placeholder now that the Consent Manager exists.
 */
const express = require('express');
const router = express.Router();

const validateConsentRequest = require('../middleware/validateConsentRequest');
const asyncHandler = require('../utils/asyncHandler');
const { createConsent, getConsent, revokeConsent } = require('../controllers/consent.controller');

router.post('/', validateConsentRequest, asyncHandler(createConsent));
router.get('/:consentId', asyncHandler(getConsent));
router.post('/:consentId/revoke', asyncHandler(revokeConsent));

module.exports = router;
