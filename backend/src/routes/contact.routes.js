/**
 * Contact routes.
 *
 * Responsibility: expose POST /api/contact so the public "Contact Us"
 * page can deliver a citizen's message by email instead of it only
 * ever existing in the browser.
 */
const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const { submitContact } = require('../controllers/contact.controller');

const router = express.Router();

router.post('/', asyncHandler(submitContact));

module.exports = router;
