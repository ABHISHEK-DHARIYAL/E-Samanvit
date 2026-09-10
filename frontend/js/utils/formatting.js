/**
 * Small display-formatting helpers for the Dynamic Form Engine /
 * consent flow. Kept separate from validation.js — this file only
 * turns backend values into citizen-readable text, it never decides
 * whether a value is valid.
 */

/** Escapes text before it's interpolated into an HTML template string. */
function escapeHtml(value) {
  if (value === null || value === undefined) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Backend GovernmentSource identifiers (e.g. "AAPLE_SARKAR") shown in
// citizen-facing language rather than the raw internal enum value.
// Kept in sync manually with backend/src/types/GovernmentSource.js —
// if the backend adds a source this doesn't know about, the fallback
// below still shows something reasonable rather than breaking.
const SOURCE_LABELS = {
  AAPLE_SARKAR: 'Aaple Sarkar',
  MAHADBT: 'MahaDBT',
  MAHABHUMI: 'MahaBhumi',
  REVENUE: 'Revenue Department'
};

function sourceLabel(source) {
  if (!source) return '';
  return SOURCE_LABELS[source] || source;
}

/** "15 minutes" / "2 hours" from an ISO expiry timestamp, relative to now. */
function formatDurationUntil(isoTimestamp) {
  const ms = new Date(isoTimestamp).getTime() - Date.now();
  if (Number.isNaN(ms) || ms <= 0) return 'a few minutes';
  const minutes = Math.round(ms / 60000);
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'}`;
  const hours = Math.round(minutes / 60);
  return `${hours} hour${hours === 1 ? '' : 's'}`;
}

/** Best-effort human date, falls back to the raw string if unparseable. */
function formatDate(value) {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

/**
 * Best-effort human date+time (Prompt 8 — application tracking needs
 * a time alongside the date, formatDate() alone only gives the date).
 * Falls back to the raw string if unparseable, same as formatDate().
 */
function formatDateTime(value) {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: 'numeric', minute: '2-digit'
  });
}
