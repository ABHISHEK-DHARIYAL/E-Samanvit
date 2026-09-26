/**
 * Centralized identifiers for supported government data sources.
 *
 * Responsibility: every part of the backend that needs to refer to a
 * government source (adapters, registry, aggregator, routes) imports
 * this instead of using raw string literals like "revenue" scattered
 * around — a typo becomes an import/reference error instead of a
 * silent runtime mismatch.
 */
const GovernmentSource = Object.freeze({
  AAPLE_SARKAR: 'AAPLE_SARKAR',
  MAHADBT: 'MAHADBT',
  MAHABHUMI: 'MAHABHUMI',
  REVENUE: 'REVENUE'
});

module.exports = GovernmentSource;
