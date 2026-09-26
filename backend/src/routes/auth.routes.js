/**
 * Auth routes.
 *
 * Responsibility: expose POST /api/auth/request-otp and
 * POST /api/auth/verify-otp for the demo phone+OTP login flow. See
 * auth.controller.js for the two explicit prototype limitations
 * (closed 2-user allow-list, fixed dev OTP) and how each is meant to
 * be swapped out later.
 */
const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const { requestOtp, verifyOtp } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/request-otp', asyncHandler(requestOtp));
router.post('/verify-otp', asyncHandler(verifyOtp));

module.exports = router;
