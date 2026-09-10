/**
 * MITRA controller.
 *
 * Responsibility: proxy a citizen's free-text question to Google
 * Gemini, ONLY for messages MITRA's own local knowledge base
 * (frontend/js/chatbot.js's `knowledge` array + matchKnowledge()) did
 * not already answer. This is deliberately a thin proxy — no
 * conversation history, no memory, no unrelated capability — because
 * MITRA's existing scripted/localized responses already cover the
 * portal's core topics and are faster, deterministic, and don't
 * depend on this being configured.
 *
 * The API key must never reach the browser, which is why this exists
 * as a backend route rather than the frontend calling Gemini directly.
 *
 * Contract with the frontend: this route NEVER returns an HTTP error
 * for "Gemini isn't configured" or "Gemini failed" — those are
 * expected, routine states (most deployments of this prototype won't
 * have a Gemini key set), not failures. It always returns
 * `{ success: true, available: boolean, reply?: string }`, and the
 * frontend falls back to MITRA's existing getFallbackResponse() when
 * `available` is false. This mirrors the same "attempt a real
 * external call, degrade to the existing honest fallback" pattern
 * used by RevenueAdapter and AddressEnrichmentAdapter.
 */
const config = require('../config/env');
const { InvalidRequestError } = require('../utils/errors');

const GEMINI_TIMEOUT_MS = 8000;
const MAX_MESSAGE_LENGTH = 500;

const SYSTEM_CONTEXT = `You are MITRA, the citizen AI assistant for e-Samanvit, a Government of Maharashtra digital services portal (a Smart India Hackathon prototype). You are especially knowledgeable about Indian/Maharashtra government schemes, scholarships, farmer welfare, healthcare schemes, and how to use the e-Samanvit portal (applying for services, tracking applications, consent-based data autofill) — lead with that expertise when it's relevant. For questions on other topics, answer them helpfully and directly like a general-purpose assistant instead of redirecting the citizen back to portal topics; stay polite, safe, and factual, and decline only genuinely unsafe or inappropriate requests. Keep answers brief (3-4 sentences max) unless the question needs more. Do not claim to have live access to any government database — this is a demonstration portal using consented and configured/mock data sources.`;

function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error(`Timed out after ${ms}ms`)), ms))
  ]);
}

async function askMitra(req, res) {
  const { message, lang } = req.body || {};

  if (!message || typeof message !== 'string' || !message.trim()) {
    throw new InvalidRequestError('"message" is required and must be a non-empty string');
  }
  const trimmedMessage = message.trim().slice(0, MAX_MESSAGE_LENGTH);

  if (!config.gemini.isConfigured()) {
    // Routine, not an error — the frontend already knows to fall back.
    return res.status(200).json({ success: true, available: false });
  }

  const languageHint = lang === 'hi' ? 'Hindi' : lang === 'mr' ? 'Marathi' : 'English';

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${config.gemini.model}:generateContent`;
    const response = await withTimeout(
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': config.gemini.apiKey
        },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_CONTEXT }] },
          contents: [{ parts: [{ text: `Respond in ${languageHint}. Citizen's question: ${trimmedMessage}` }] }]
        })
      }),
      GEMINI_TIMEOUT_MS
    );

    if (!response.ok) {
      const body = await response.text().catch(() => '');
      console.error(`[MITRA] Gemini rejected the request (status ${response.status}): ${body.slice(0, 200)}`);
      return res.status(200).json({ success: true, available: false });
    }

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply || !reply.trim()) {
      console.error('[MITRA] Gemini returned no usable text in the response.');
      return res.status(200).json({ success: true, available: false });
    }

    res.status(200).json({ success: true, available: true, reply: reply.trim() });
  } catch (err) {
    // Network error, timeout, malformed response — MITRA's own
    // scripted fallback is always the safety net, so this never
    // becomes a citizen-facing error.
    console.error('[MITRA] Gemini call failed, frontend will use the existing fallback:', err.message);
    res.status(200).json({ success: true, available: false });
  }
}

module.exports = { askMitra };
