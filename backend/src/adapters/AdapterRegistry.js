/**
 * AdapterRegistry — the single place that maps a GovernmentSource
 * identifier to a concrete adapter instance.
 *
 * Responsibility: nothing else in the backend should ever write
 * `new MockRevenueAdapter()` directly. The Data Aggregator (and any
 * future caller) asks this registry for "the REVENUE adapter" and
 * gets back whatever implementation is currently registered — mock
 * today, a real authorized adapter later — without knowing which.
 *
 * This is what makes the mock→production swap a one-line change here,
 * rather than a search-and-replace across services/controllers.
 */
const GovernmentSource = require('../types/GovernmentSource');
const { AdapterNotFoundError } = require('../utils/errors');

const MockAapleSarkarAdapter = require('./mocks/MockAapleSarkarAdapter');
const MockMahaDBTAdapter = require('./mocks/MockMahaDBTAdapter');
const MockMahaBhumiAdapter = require('./mocks/MockMahaBhumiAdapter');
// MockRevenueAdapter is intentionally still imported (not deleted)
// even though it's no longer registered below — if Setu access ever
// breaks right before a demo, swapping the REVENUE line back to
// `new MockRevenueAdapter()` is a one-line revert, not a rebuild.
const MockRevenueAdapter = require('./mocks/MockRevenueAdapter'); // eslint-disable-line no-unused-vars
const RevenueAdapter = require('./governments/revenue/RevenueAdapter');

// Adapters are stateless (no per-request data), so single shared
// instances are safe here. A real adapter with a connection pool or
// client SDK would likely follow the same pattern.
const registry = new Map([
  [GovernmentSource.AAPLE_SARKAR, new MockAapleSarkarAdapter()],
  [GovernmentSource.MAHADBT, new MockMahaDBTAdapter()],
  [GovernmentSource.MAHABHUMI, new MockMahaBhumiAdapter()],
  // RevenueAdapter itself falls back to the same mock data
  // MockRevenueAdapter always returned, whenever Setu isn't
  // configured or the citizen hasn't completed real DigiLocker
  // consent yet — see RevenueAdapter.js's file comment.
  [GovernmentSource.REVENUE, new RevenueAdapter()]
]);

function getAdapter(source) {
  const adapter = registry.get(source);
  if (!adapter) throw new AdapterNotFoundError(source);
  return adapter;
}

function getSupportedSources() {
  return Array.from(registry.keys());
}

module.exports = { getAdapter, getSupportedSources };
