/**
 * Wraps an async route/controller function so a rejected promise is
 * forwarded to Express's error-handling middleware automatically,
 * instead of every controller needing its own try/catch block.
 *
 * Usage (once real controllers exist):
 *   router.get('/thing', asyncHandler(async (req, res) => { ... }));
 */
function asyncHandler(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

module.exports = asyncHandler;
