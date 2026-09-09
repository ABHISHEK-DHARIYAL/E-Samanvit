/**
 * GovernmentAdapter defines the common contract every government
 * data-source integration must implement.
 *
 * This is the single most important boundary in the backend: the
 * Data Aggregator (and everything above it — controllers, eventually
 * the frontend) talks ONLY to this contract, never to a department's
 * API shape directly. That means a mock adapter today and a real
 * authorized production adapter tomorrow are interchangeable as long
 * as both extend this class — nothing above this layer needs to change
 * when a mock is swapped for the real thing.
 *
 * Plain JS has no `interface` keyword, so this is enforced as an
 * abstract base class: subclasses must override both methods, or
 * calling them throws.
 */
class GovernmentAdapter {
  /**
   * @returns {string} one of the GovernmentSource identifiers this
   *   adapter represents (see types/GovernmentSource.js).
   */
  getSourceName() {
    throw new Error(`${this.constructor.name} must implement getSourceName()`);
  }

  /**
   * @param {string} citizenId
   * @param {string[]} requiredFields - dot-paths like "identity.fullName"
   * @param {string} consentToken
   * @returns {Promise<object>} partial normalized data — see
   *   models/NormalizedCitizenData.js for the shape and field-selection
   *   rules every adapter is expected to follow.
   */
  async fetchData(citizenId, requiredFields, consentToken) {
    throw new Error(`${this.constructor.name} must implement fetchData()`);
  }
}

module.exports = GovernmentAdapter;
