/**
 * Health controller.
 *
 * Responsibility: report that the e-Samanvit backend process is up and
 * responding. This is the ONLY endpoint with real behaviour in this
 * prompt — it exists purely to prove Frontend -> Backend connectivity
 * before any government-integration logic is built on top.
 */
function getHealth(req, res) {
  res.json({
    success: true,
    service: 'e-samanvit-backend',
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
}

module.exports = { getHealth };
