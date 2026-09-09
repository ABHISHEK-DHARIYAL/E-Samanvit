/**
 * Route registration.
 *
 * Responsibility: this is the single place that maps URL prefixes to
 * route modules, so app.js doesn't need to know about individual routes.
 *
 * Status: /health, /citizen-data, /consent, /audit, /services,
 * /applications, /contact, /address, and /mitra have real behaviour.
 * /status remains a reserved, empty router with zero endpoints (see
 * status.routes.js) — the Status Aggregator is not built yet.
 */
const express = require('express');
const router = express.Router();

router.use('/health', require('./health.routes'));
router.use('/citizen-data', require('./citizenData.routes'));
router.use('/consent', require('./consent.routes'));
router.use('/audit', require('./audit.routes'));
router.use('/services', require('./services.routes'));
router.use('/applications', require('./applications.routes'));
router.use('/contact', require('./contact.routes'));
router.use('/address', require('./address.routes'));
router.use('/revenue/digilocker', require('./revenueDigilocker.routes'));
router.use('/mitra', require('./mitra.routes'));

// Reserved for a future prompt — currently an empty router, no endpoints yet.
router.use('/status', require('./status.routes'));

module.exports = router;
