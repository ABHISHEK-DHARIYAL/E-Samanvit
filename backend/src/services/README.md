# services/

- `dataAggregator/DataAggregatorService.js` — Part 1's core aggregation
  service. Combines results from multiple GovernmentAdapters (via
  AdapterRegistry) into one normalized response, with concurrent calls
  and partial-failure handling.
- `consent/ConsentManagerService.js` — owns consent lifecycle and scope
  enforcement (Prompt 4). The Data Aggregator/controller validate every
  fetch through this service rather than trusting raw request values.
- `audit/AuditService.js` — records consent-lifecycle, data-fetch, and
  service-preparation events (Prompt 4, extended Prompt 5).
- `serviceRegistry/ServiceRegistry.js` — single source of truth for
  registered government service schemas (Prompt 5).
- `fieldMapper/FieldMapperService.js` — maps NormalizedCitizenData into
  a service schema's field structure, preserving provenance and never
  fabricating missing values (Prompt 5).
