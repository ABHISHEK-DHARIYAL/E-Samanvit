/**
 * CORS configuration.
 *
 * Responsibility: allow the e-Samanvit frontend — and only the
 * e-Samanvit frontend — to call this API. Deliberately NOT a wildcard
 * ("*"); that's fine for a throwaway demo but not something we want
 * baked in as a habit this early.
 *
 * `FRONTEND_ORIGIN` remains the single canonical production origin
 * (e.g. "https://e-samanvit.vercel.app") — nothing here asks it to
 * hold a list. What changed: Vercel issues a fresh, unpredictable
 * hostname for every deployment/preview of this project (e.g.
 * "https://e-samanvit-lzmm50pyc-abhishek-0951.vercel.app"), and the
 * browser's real request Origin during those deployments is one of
 * those, not the canonical one. A single static-string comparison can
 * never anticipate that hostname, so `origin` below is a small
 * validation function instead: it allows the exact FRONTEND_ORIGIN,
 * *and* any HTTPS origin whose hostname matches this project's own
 * Vercel naming pattern (derived from FRONTEND_ORIGIN itself, so the
 * pattern can't drift from it) — nothing else.
 */
const cors = require('cors');
const config = require('../config/env');
const { CorsOriginNotAllowedError } = require('../utils/errors');

/**
 * Derive this project's Vercel slug from the canonical FRONTEND_ORIGIN,
 * e.g. "https://e-samanvit.vercel.app" -> "e-samanvit". Returns null if
 * FRONTEND_ORIGIN isn't itself a *.vercel.app origin (e.g. local dev,
 * where it's http://localhost:5173) — in that case there is no Vercel
 * preview pattern to allow, which is the correct behavior.
 */
function getVercelProjectSlug(frontendOrigin) {
  let hostname;
  try {
    hostname = new URL(frontendOrigin).hostname;
  } catch {
    return null;
  }
  const suffix = '.vercel.app';
  if (!hostname.endsWith(suffix)) return null;
  return hostname.slice(0, -suffix.length);
}

const vercelProjectSlug = getVercelProjectSlug(config.frontendOrigin);

// Matches any HTTPS deployment/preview URL Vercel generates for this
// project, e.g. https://e-samanvit-lzmm50pyc-abhishek-0951.vercel.app
// or https://e-samanvit-git-main-abhishek-0951.vercel.app.
// Intentionally does NOT match the bare production hostname itself
// (that's covered by the exact FRONTEND_ORIGIN check below) or any
// other Vercel project.
const vercelPreviewPattern = vercelProjectSlug
  ? new RegExp(`^https://${vercelProjectSlug}-[a-z0-9-]+\\.vercel\\.app$`)
  : null;

function isAllowedOrigin(origin) {
  if (origin === config.frontendOrigin) return true;
  if (vercelPreviewPattern && vercelPreviewPattern.test(origin)) return true;
  return false;
}

const corsMiddleware = cors({
  origin(origin, callback) {
    // No Origin header at all — not a browser cross-origin request
    // (server-to-server calls, health checks, curl). Nothing to
    // restrict here; there's no browser enforcing anything on the
    // response either way.
    if (!origin) return callback(null, true);

    if (isAllowedOrigin(origin)) return callback(null, true);

    // Deliberately no origin value logged here beyond what Express's
    // own request logging already does elsewhere — avoids echoing
    // arbitrary client-supplied strings into logs as a matter of
    // habit.
    return callback(new CorsOriginNotAllowedError());
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: false
});

module.exports = corsMiddleware;
