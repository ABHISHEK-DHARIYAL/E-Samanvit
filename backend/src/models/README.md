# models/

- `NormalizedCitizenData.js` — common normalized data shape returned by
  every government adapter, plus field-selection (data minimization)
  and merge helpers used by the Data Aggregator.
- `ConsentRecord.js` — consent status vocabulary (ACTIVE/EXPIRED/REVOKED)
  and the expiry-check helper shared by ConsentManagerService.
- `AuditEvent.js` — the fixed set of audit event types the AuditService
  is allowed to record.

Government service schemas themselves live in `schemas/government-
services/`, not here — they're configuration data (see that folder),
not a runtime data model.

Still reserved for later: a real Application record shape, once a
database exists.
