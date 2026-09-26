/**
 * Service routes.
 *
 * GET  /api/services                    — service discovery (summary metadata)
 * GET  /api/services/:serviceId         — full schema for one service
 * POST /api/services/:serviceId/prepare — consent-aware, schema-driven data preparation
 *
 * Replaces the Prompt 2 empty placeholder now that the Service
 * Registry / Field Mapper foundation exists (Prompt 5).
 */
const express = require('express');
const router = express.Router();

const validateServicePrepareRequest = require('../middleware/validateServicePrepareRequest');
const asyncHandler = require('../utils/asyncHandler');
const { listServices, getServiceDetail, prepareService } = require('../controllers/services.controller');

router.get('/', asyncHandler(listServices));
router.get('/:serviceId', asyncHandler(getServiceDetail));
router.post('/:serviceId/prepare', validateServicePrepareRequest, asyncHandler(prepareService));

module.exports = router;
