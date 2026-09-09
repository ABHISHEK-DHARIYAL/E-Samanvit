/**
 * MITRA routes.
 *
 * POST /api/mitra/ask — see mitra.controller.js for the full contract.
 */
const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const { askMitra } = require('../controllers/mitra.controller');

const router = express.Router();

router.post('/ask', asyncHandler(askMitra));

module.exports = router;
