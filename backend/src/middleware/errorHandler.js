/**
 * Centralized error handler.
 *
 * Responsibility: catch anything thrown/passed to next(err) in routes or
 * controllers and return a consistent JSON error shape, instead of each
 * route handling its own error formatting.
 *
 * Most errors only ever need { code, message } — but a couple of
 * Prompt 7 application-submission errors (ApplicationIncompleteError,
 * ApplicationValidationError) carry field-level detail the frontend
 * needs to highlight the right inputs, not just show one generic
 * message. That detail is passed through only when present, so every
 * other error's response shape is unchanged.
 */
function errorHandler(err, req, res, _next) {
  console.error('[error]', err);
  res.status(err.status || 500).json({
    success: false,
    error: {
      code: err.code || 'INTERNAL_ERROR',
      message: err.message || 'Internal server error',
      ...(err.missingFields ? { missingFields: err.missingFields } : {}),
      ...(err.fieldErrors ? { fieldErrors: err.fieldErrors } : {})
    }
  });
}

module.exports = errorHandler;
