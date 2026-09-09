/**
 * Address routes.
 *
 * Responsibility: expose GET /api/address/:pincode for
 * District/Taluka/Village enrichment, backed by a real-API-with-
 * mock-fallback adapter (see AddressEnrichmentAdapter.js).
 */
const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const { getAddressByPincode } = require('../controllers/address.controller');

const router = express.Router();

router.get('/:pincode', asyncHandler(getAddressByPincode));

module.exports = router;
