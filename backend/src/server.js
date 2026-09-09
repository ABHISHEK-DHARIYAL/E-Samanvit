/**
 * Backend server entry point.
 *
 * This file is responsible only for starting the e-Samanvit API server
 * and reporting where it's listening. Business logic belongs in
 * controllers/services, not here — see app.js for how the app itself
 * is assembled.
 */
const app = require('./app');
const config = require('./config/env');

app.listen(config.port, () => {
  console.log(`[e-samanvit-backend] listening on http://localhost:${config.port} (${config.nodeEnv})`);
  console.log(`[e-samanvit-backend] CORS allowed origin: ${config.frontendOrigin}`);
});
