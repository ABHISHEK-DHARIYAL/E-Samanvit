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
  frontendOrigin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
  // Resend (https://resend.com) — used by the /api/contact route to
  // email "Contact Us" form submissions. resendApiKey is intentionally
  // allowed to be undefined in dev; the controller reports a clear
  // EMAIL_DELIVERY_FAILED error rather than crashing the process.
  resendApiKey: process.env.RESEND_API_KEY,
  contactFromEmail: process.env.CONTACT_FROM_EMAIL,
  contactToEmail: process.env.CONTACT_TO_EMAIL,

  // data.gov.in (Open Government Data Platform) — used only as a
  // secondary/backup source for pincode->address enrichment, behind
  // the always-free India Post Pincode API. Optional: the address
  // adapter falls back to bundled mock data if this isn't configured.
  dataGovIn: {
    apiKey: process.env.DATA_GOV_IN_API_KEY,
    pincodeResourceId: process.env.DATA_GOV_IN_PINCODE_RESOURCE_ID,
    isConfigured() {
      return Boolean(process.env.DATA_GOV_IN_API_KEY && process.env.DATA_GOV_IN_PINCODE_RESOURCE_ID);
    }
  },

  // Setu (https://setu.co) — a licensed DigiLocker Requesting Partner
  // that resells sandbox/production DigiLocker access, used by the
  // Revenue adapter to fetch Income/Caste/Domicile certificates via
  // OAuth-consented pulls. Optional: the Revenue adapter falls back to
  // its bundled demo record if this isn't configured or the call fails.
  setu: {
    clientId: process.env.SETU_CLIENT_ID,
    clientSecret: process.env.SETU_CLIENT_SECRET,
    productInstanceId: process.env.SETU_PRODUCT_INSTANCE_ID,
    baseUrl: process.env.SETU_ENV === 'production' ? 'https://dg.setu.co' : 'https://dg-sandbox.setu.co',
    isConfigured() {
      return Boolean(process.env.SETU_CLIENT_ID && process.env.SETU_CLIENT_SECRET);
    }
  },

  // Google Gemini (https://ai.google.dev) — used only by MITRA, the
  // citizen chat assistant, for free-text questions its own local
  // knowledge base (frontend/js/chatbot.js) doesn't match. Optional:
  // MITRA falls back to its existing scripted/localized responses if
  // this isn't configured or a call fails — nothing about MITRA's
  // existing quick-reply/knowledge-base behavior depends on this.
  gemini: {
    apiKey: process.env.GEMINI_API_KEY,
    // Configurable rather than hardcoded: Gemini model names/versions
    // change over time, and pinning one in code would silently break
    // if Google retires it — an env var lets that be fixed without a
    // code change. gemini-2.5-flash is the current safest default: as
    // of 2026, newer free-tier Google AI Studio projects have been
    // reported getting 0-quota/429 errors specifically on
    // gemini-2.0-flash, while the 2.5 series remains reliably free.
    model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
    isConfigured() {
      return Boolean(process.env.GEMINI_API_KEY);
    }
  }
};

module.exports = config;
