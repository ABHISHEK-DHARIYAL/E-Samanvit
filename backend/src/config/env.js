/**
 * Central environment configuration.
 *
 * Responsibility: this is the ONLY file that should read process.env
 * directly. Everything else in the backend should import `config` from
 * here, so environment variable names never get scattered across the
 * codebase.
 *
 * A tiny hand-written .env loader is used instead of the "dotenv"
 * dependency, since Prompt 2 explicitly asks to avoid adding packages
 * that aren't genuinely required for a two-endpoint backend.
 */
const fs = require('fs');
const path = require('path');

function loadDotEnvFile() {
  const envPath = path.join(__dirname, '..', '..', '.env');
  if (!fs.existsSync(envPath)) return;

  const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    // Don't overwrite variables already set in the real environment
    // (e.g. by a process manager or CI system).
    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

loadDotEnvFile();

const config = {
  port: parseInt(process.env.PORT, 10) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  frontendOrigin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173'
};

module.exports = config;
