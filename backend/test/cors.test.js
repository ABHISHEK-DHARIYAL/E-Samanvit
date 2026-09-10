/**
 * CORS behavior — Render + Vercel production/preview origins.
 *
 * Runs against the real Express app (src/app.js) with FRONTEND_ORIGIN
 * set to the production value BEFORE the app (and its config/CORS
 * middleware) is required, so this exercises the exact production
 * configuration rather than the local-dev default.
 *
 * `node --test` runs each test file in its own process by default, so
 * setting process.env here does not leak into e2e.test.js or vice versa.
 */
process.env.FRONTEND_ORIGIN = 'https://e-samanvit.vercel.app';

const { test, describe, before, after } = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');

const app = require('../src/app');

let server;
let baseUrl;

before(async () => {
  server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, resolve));
  const { port } = server.address();
  baseUrl = `http://127.0.0.1:${port}`;
});

after(async () => {
  await new Promise((resolve) => server.close(resolve));
});

const PROD_ORIGIN = 'https://e-samanvit.vercel.app';
const DEPLOYMENT_ORIGIN = 'https://e-samanvit-lzmm50pyc-abhishek-0951.vercel.app';
const OTHER_PROJECT_ORIGIN = 'https://some-other-app-abc123.vercel.app';
const HTTP_PROD_ORIGIN = 'http://e-samanvit.vercel.app';
const EVIL_ORIGIN = 'https://evil-example.com';

async function getWithOrigin(origin) {
  const res = await fetch(`${baseUrl}/api/health`, {
    headers: origin ? { Origin: origin } : {}
  });
  return res;
}

async function preflight(origin) {
  return fetch(`${baseUrl}/api/health`, {
    method: 'OPTIONS',
    headers: {
      Origin: origin,
      'Access-Control-Request-Method': 'GET'
    }
  });
}

describe('CORS — allowed origins', () => {
  test('production origin (FRONTEND_ORIGIN) is allowed', async () => {
    const res = await getWithOrigin(PROD_ORIGIN);
    assert.equal(res.status, 200);
    assert.equal(res.headers.get('access-control-allow-origin'), PROD_ORIGIN);
  });

  test('current Vercel deployment/preview origin is allowed', async () => {
    const res = await getWithOrigin(DEPLOYMENT_ORIGIN);
    assert.equal(res.status, 200);
    assert.equal(res.headers.get('access-control-allow-origin'), DEPLOYMENT_ORIGIN);
  });

  test('Access-Control-Allow-Origin reflects the actual requesting origin, not a fixed string', async () => {
    const resProd = await getWithOrigin(PROD_ORIGIN);
    const resDeploy = await getWithOrigin(DEPLOYMENT_ORIGIN);
    assert.equal(resProd.headers.get('access-control-allow-origin'), PROD_ORIGIN);
    assert.equal(resDeploy.headers.get('access-control-allow-origin'), DEPLOYMENT_ORIGIN);
    assert.notEqual(
      resProd.headers.get('access-control-allow-origin'),
      resDeploy.headers.get('access-control-allow-origin')
    );
  });

  test('request with no Origin header (server-to-server / health check) is served normally', async () => {
    const res = await getWithOrigin(undefined);
    assert.equal(res.status, 200);
    // No browser is enforcing CORS here, so no allow-origin header is expected either way.
  });

  test('OPTIONS preflight from production origin is allowed', async () => {
    const res = await preflight(PROD_ORIGIN);
    assert.ok(res.status === 204 || res.status === 200, `expected preflight success, got ${res.status}`);
    assert.equal(res.headers.get('access-control-allow-origin'), PROD_ORIGIN);
  });

  test('OPTIONS preflight from Vercel deployment origin is allowed', async () => {
    const res = await preflight(DEPLOYMENT_ORIGIN);
    assert.ok(res.status === 204 || res.status === 200, `expected preflight success, got ${res.status}`);
    assert.equal(res.headers.get('access-control-allow-origin'), DEPLOYMENT_ORIGIN);
  });
});

describe('CORS — rejected origins', () => {
  test('an unrelated Vercel project origin is rejected', async () => {
    const res = await getWithOrigin(OTHER_PROJECT_ORIGIN);
    assert.notEqual(res.headers.get('access-control-allow-origin'), OTHER_PROJECT_ORIGIN);
    const body = await res.json().catch(() => null);
    if (body) assert.equal(body.error && body.error.code, 'CORS_ORIGIN_NOT_ALLOWED');
  });

  test('http:// (non-HTTPS) production hostname is rejected', async () => {
    const res = await getWithOrigin(HTTP_PROD_ORIGIN);
    assert.notEqual(res.headers.get('access-control-allow-origin'), HTTP_PROD_ORIGIN);
  });

  test('an arbitrary unrelated domain is rejected', async () => {
    const res = await getWithOrigin(EVIL_ORIGIN);
    assert.notEqual(res.headers.get('access-control-allow-origin'), EVIL_ORIGIN);
  });

  test('OPTIONS preflight from a disallowed origin gets no allow-origin header', async () => {
    const res = await preflight(EVIL_ORIGIN);
    assert.notEqual(res.headers.get('access-control-allow-origin'), EVIL_ORIGIN);
    assert.equal(res.headers.get('access-control-allow-origin'), null);
  });
});
