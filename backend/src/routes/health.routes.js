/**
 * Health routes.
 *
 * Responsibility: expose GET /api/health so the frontend (and anyone
 * deploying this service) can verify the backend is running.
 */
const express = require('express');
const { getHealth } = require('../controllers/health.controller');

const router = express.Router();

router.get('/', getHealth);

module.exports = router;
