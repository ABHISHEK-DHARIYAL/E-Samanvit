/**
 * Audit routes.
 *
 * GET /api/audit              — DEV/DEMO ONLY. Lists all recorded
 *                                events across all citizens. No
 *                                authentication layer exists yet, so
 *                                this is intentionally unrestricted in
 *                                the prototype — a production design
 *                                must not expose this without access
 *                                control.
 * GET /api/audit/:consentId   — events for one consent (the endpoint
 *                                Prompt 4 recommends preferring).
 *
 * New in Prompt 4 — no Prompt 2 placeholder existed for this path.
 */
const express = require('express');
const router = express.Router();

const asyncHandler = require('../utils/asyncHandler');
const { getAuditByConsent, getAllAudit } = require('../controllers/audit.controller');

router.get('/', asyncHandler(getAllAudit));
router.get('/:consentId', asyncHandler(getAuditByConsent));

module.exports = router;
