/**
 * ServiceRegistry — the single source of truth for which government
 * services (schemas) this backend knows about.
 *
 * Responsibility: nothing else in the backend should hold an
 * `if (serviceId === "income-certificate") ...` branch. Controllers
 * ask this registry for "the schema for X" and get back whatever is
 * currently registered — the same one-lookup-point pattern
 * AdapterRegistry established in Prompt 3, applied to service schemas
 * instead of government adapters.
 *
 * Schemas are plain configuration objects (see schemas/government-
 * services/) — this registry does not know or care how a schema was
 * authored, only that it satisfies the minimal shape checked in
 * register() below.
 */
const { all: schemas } = require('../../schemas/government-services');

const registry = new Map(); // serviceId -> schema

function register(schema) {
  if (!schema || typeof schema.serviceId !== 'string' || !schema.serviceId) {
    throw new Error('ServiceRegistry.register() requires a schema with a non-empty serviceId');
  }
  if (!Array.isArray(schema.fields)) {
    throw new Error(`ServiceRegistry.register(): schema "${schema.serviceId}" must define a fields array`);
  }
  registry.set(schema.serviceId, schema);
}

function get(serviceId) {
  return registry.get(serviceId) || null;
}

function has(serviceId) {
  return registry.has(serviceId);
}

/** Summary metadata only — no field list — for the service-discovery listing. */
function list() {
  return Array.from(registry.values()).map((schema) => ({
    serviceId: schema.serviceId,
    serviceName: schema.serviceName,
    department: schema.department,
    description: schema.description,
    purpose: schema.purpose
  }));
}

/**
 * Derives the exact set of NormalizedCitizenData paths a schema needs,
 * from its fields — never more than what's actually mapped. Fields
 * with no commonDataPath need nothing fetched for them at all.
 *
 * Shared by both /prepare (Prompt 5) and /applications submit
 * (Prompt 7) so the two endpoints can never silently disagree about
 * what a schema requires from government sources.
 */
function requiredDataPaths(schema) {
  const paths = schema.fields.map((f) => f.commonDataPath).filter(Boolean);
  return [...new Set(paths)];
}

// Self-register every known schema at module load — adding a new
// service means adding it to schemas/government-services/index.js,
// not touching this file.
for (const schema of schemas) register(schema);

module.exports = { register, get, has, list, requiredDataPaths };
