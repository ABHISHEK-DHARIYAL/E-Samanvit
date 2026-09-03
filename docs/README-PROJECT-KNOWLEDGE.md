# e-Samanvit — Full Project Knowledge (Basic → Advanced)

This document explains what the project does, piece by piece, starting from
"what problem is this solving" and ending at "exactly which file talks to
which file, in what order, on a real click."

---

## PART A — The Basics (what & why)

### A.1 The problem, in one sentence
A Maharashtra citizen applying for an income certificate, a scholarship, and
a land record ends up typing their **same** name, address, income, and
identity details **three separate times**, into **three separate
government systems** (Aaple Sarkar, MahaDBT, MahaBhumi, Revenue) that don't
talk to each other.

### A.2 The idea, in one sentence
**Fetch once → verify once → reuse across every service** — the citizen
grants consent one time, e-Samanvit pulls only the authorized fields from
the relevant government sources, auto-fills whatever form they're
applying for, and they only review/correct what's actually missing or
wrong.

### A.3 The three "systems" in play
1. **The 4 real government systems** — Aaple Sarkar (identity/address),
   Revenue (income), MahaBhumi (land), MahaDBT (education + bank/DBT
   account). *None of these are actually connected yet — they're all
   represented by mock adapters that return realistic, fixed fake data.*
2. **e-Samanvit's backend** — the interoperability layer. It's the "broker"
   that knows how to talk to each source, remembers what a citizen
   consented to, and reshapes whatever it fetches into whatever form a
   given service needs.
3. **e-Samanvit's frontend** — a static citizen portal (no build framework)
   that walks the citizen through the whole journey: pick a service →
   understand + grant consent → see auto-filled data → fix what's missing
   → submit → track.

---

## PART B — The Architecture (the shape of the system)

```
Citizen
   ↓
Frontend (static HTML/CSS/vanilla JS, deployed on Vercel)
   ↓  fetch() calls, JSON over HTTPS
Backend API (Node.js/Express, deployed on Render)
   ↓
Consent Manager      → scoped, purpose-bound, time-limited grants
   ↓
Data Aggregator      → concurrent fetch, partial-failure tolerant
   ↓
Government Adapter Layer  (4 mock adapters today, one per source)
   ↓
Normalized Citizen Data   → { value, source, verifiedAt } per field
   ↓
Service Schema + Field Mapper   → schema-driven, no per-service code
   ↓
Dynamic Application Form → Review (auto-filled vs. citizen-edited)
   ↓
Application Submission   → re-validates + re-fetches, never trusts the client
   ↓
Application Record (status: SUBMITTED — the one honest status today)
   ↓
My Applications / Tracking
```

**The one idea that explains almost every design decision in this
codebase:** every layer only ever talks to the layer directly below it
through a fixed, narrow contract — never reaching past it. That's what
lets a mock adapter be swapped for a real one, or a new service schema be
added, without a ripple effect through the rest of the system.

---

## PART C — Folder Map (where things live)

```
e-samanvit/
├── frontend/
│   ├── index.html, style.css, css/          — existing static citizen portal
│   ├── js/app.js                            — page router
│   ├── js/components/govServices.js         — the NEW generic "Apply Online" engine
│   ├── js/components/myApplications.js      — the NEW "My Applications"/tracking engine
│   ├── js/components/fieldRenderer.js       — renders any schema field generically
│   ├── js/services/*Api.js                  — thin wrappers around each backend endpoint group
│   ├── js/services/apiClient.js             — the ONE place that knows the backend base URL
│   └── js/mock-api.js                       — OLD pre-existing prototype data, untouched, unconnected
│
└── backend/
    └── src/
        ├── routes/          — URL → controller wiring, one file per resource
        ├── controllers/     — parses the HTTP request, calls a service, shapes the HTTP response
        ├── services/        — the actual business logic (consent, aggregation, mapping, applications, audit)
        ├── adapters/
        │   ├── interfaces/  — the CONTRACTS (GovernmentAdapter, ApplicationStatusAdapter)
        │   └── mocks/       — the ONLY implementations that exist right now
        ├── models/          — shared data shapes (NormalizedCitizenData, ConsentRecord, Application, AuditEvent)
        ├── schemas/government-services/  — one file per service form (income cert, scholarship, land record)
        ├── stores/          — in-memory persistence, behind an abstraction (swappable for a real DB later)
        ├── middleware/      — cors, error handling, per-request body validation
        ├── config/env.js    — the ONLY file that reads process.env directly
        └── utils/errors.js  — typed error classes carrying an HTTP status + machine-readable code
```

---

## PART D — The Full Journey, Traced Step by Step

This is what actually happens, file by file, when a citizen applies for
the Income Certificate.

**1. Citizen clicks "Apply for a Service" on the dashboard.**
Frontend router (`js/app.js`) loads the `gov-services` page, handled by
`js/components/govServices.js`.

**2. Service list.**
`GovServices` calls `ServicesApi.list()` → `GET /api/services` →
`services.controller.js` → `ServiceRegistry` (built from
`schemas/government-services/index.js`) → returns the 3 registered
service schemas' summaries. The citizen picks "Income Certificate."

**3. Consent explanation, then explicit consent.**
The UI explains *why* consent is needed and *which* sources/fields will be
requested — nothing is fetched yet. On "Allow & Fetch My Data":
`ConsentApi.create()` → `POST /api/consent` →
`consent.controller.js` → `ConsentManagerService.createConsent()`
(`services/consent/ConsentManagerService.js`):
- Generates a raw token with `crypto.randomBytes` (never `Math.random`)
- Stores only its **SHA-256 hash** in `ConsentStore` (never the raw token)
- Returns the raw token to the frontend **exactly once**
- Writes a `ConsentRecord` (`citizenId`, `purpose`, `sources`,
  `requestedFields`, `status: ACTIVE`, `expiresAt`)
- Logs a `CONSENT_CREATED` audit event via `AuditService`

The frontend keeps the raw token **in memory only** — never
`localStorage`, never a URL.

**4. Fetch the citizen's data.**
`POST /api/citizen-data/fetch` → `citizenData.controller.js` →
`ConsentManagerService.validateAndConsume(token, ...)` checks: token
hashes to a known record, status is `ACTIVE` (lazy-expiry checked here),
citizen matches, and `requestedSources ⊆ consent.sources` **and**
`requestedFields ⊆ consent.requestedFields`. Only then does
`DataAggregatorService.fetchCitizenData()`
(`services/dataAggregator/DataAggregatorService.js`) run — it calls every
requested adapter **concurrently** via `Promise.allSettled`, so one source
failing never discards another source's successful data. Each adapter
(`adapters/mocks/Mock*.js`) implements the shared `GovernmentAdapter`
contract and returns only the exact `"section.field"` paths it was asked
for **and** actually owns, each wrapped as
`{ value, source, verifiedAt }` (`models/NormalizedCitizenData.js`). An
audit event (`DATA_FETCH_SUCCESS`/`_PARTIAL`/`_FAILED`) is recorded.

**5. Auto-fill the form.**
`POST /api/services/income-certificate/prepare` →
`services.controller.js` → `FieldMapperService.mapServiceData()`
(`services/fieldMapper/FieldMapperService.js`) walks the schema's field
list; for each field with a `commonDataPath`, it resolves that path
against the fetched normalized data and marks the field `autoFilled: true`
if found, `missing: true` otherwise — it **never guesses or defaults a
value**. Fields with no `commonDataPath` at all (e.g. a phone number) are
always `missing` here, since prepare only ever pulls from government
sources, never asks the citizen anything itself.

**6. Review screen.**
The frontend renders every field via `js/components/fieldRenderer.js` —
one generic renderer driven entirely by the schema's field `type`
(`text`/`number`/`date`/`select`/…), tagging each visibly as
"Auto-filled from `<source>`" or "Entered by you." The citizen fills in
whatever's missing and can override any editable field.

**7. Submit.**
`POST /api/applications` → `applications.controller.js` →
`ApplicationService.submitApplication()`
(`services/application/ApplicationService.js`) — this is the step that
**never trusts what the client claims**: it re-validates every field
against the schema's own rules (pattern/min/max/length) and re-fetches
from the consent-gated aggregator to reconcile which fields were really
auto-filled vs. citizen-entered, rather than believing the frontend's own
claim about provenance. `ApplicationStore` indexes by `consentId`, so a
second submit with the same consent (double-click, dropped-response
retry) returns the **existing** record (`200`) instead of creating a
duplicate (`201` only for a genuinely new one). A real `Application`
record is persisted with a real `applicationId`, and a submission audit
event is recorded.

**8. Confirmation, then tracking.**
The frontend shows the returned `applicationId`. Later, on "My
Applications" (`js/components/myApplications.js`):
`GET /api/applications?citizenId=...` and
`GET /api/applications/:id` both now also return one `tracking` field —
computed by `ApplicationTrackingService`
(`services/application/ApplicationTrackingService.js`) calling
`MockApplicationStatusAdapter`, which implements the
`ApplicationStatusAdapter` contract (`getStatus(application)`) and can
only ever honestly report `SUBMITTED` (`source: "E_SAMANVIT_PROTOTYPE"`)
— it does **not** talk to any real government system, and the UI
explicitly says so rather than fabricating "Under Review"/"Approved"
stages.

---

## PART E — Advanced Concepts (why it's built this way)

### E.1 The Adapter Pattern (the single most important idea here)
`adapters/interfaces/GovernmentAdapter.js` is an abstract base class with
two methods: `getSourceName()` and `fetchData()`. Every mock adapter
extends it. `DataAggregatorService` and the controllers only ever call
through this contract, obtained via `AdapterRegistry` — **never** a
department's actual API shape. Swapping a mock for a real, authorized
adapter later means writing one new class that implements the same two
methods; nothing above the adapter layer has to change. The same pattern
repeats for `ApplicationStatusAdapter` (tracking).

### E.2 Schema-driven forms (no per-service frontend code)
Adding a 4th, 5th, 10th government service means writing **one new schema
file** in `schemas/government-services/` and listing it in that folder's
`index.js` — the generic `ServiceRegistry`, `FieldMapperService`,
`gov-services` frontend page, and `fieldRenderer.js` all already know how
to handle it, because none of them hardcode a service name or field list.

### E.3 Provenance is carried, never reinvented
`{ value, source, verifiedAt }` is created once, by the adapter, at the
moment data is fetched (`NormalizedCitizenData.js`). Every later layer —
the field mapper, the application record, the tracking view — reads and
forwards that same wrapper. Nothing downstream computes or guesses a
source; that would risk claiming data came from Revenue when it was
actually typed in by the citizen.

### E.4 Consent as a real access-control boundary, not a formality
A consent token is a **capability**, not just an audit label: without a
valid, unexpired, unrevoked token whose `sources`/`requestedFields`
actually cover the request, `POST /api/citizen-data/fetch` never reaches
the aggregator at all (`401`/`410`/`403` first). Tokens are hashed at
rest (SHA-256) and never logged in raw form.

### E.5 "Never trust the client" at submission time
`ApplicationService.submitApplication()` doesn't just save whatever the
frontend sends — it re-validates against the schema and re-derives
provenance from a fresh, consent-gated fetch. This is what stops a
tampered request from claiming a self-entered income figure was
"verified by Revenue Department."

### E.6 Centralized, typed errors
Every failure mode (`ConsentExpiredError`, `ConsentScopeViolationError`,
`ApplicationIncompleteError`, `CorsOriginNotAllowedError`, …) is a small
class in `utils/errors.js` carrying an HTTP status and a stable `code`.
One `middleware/errorHandler.js` turns any of them into the same
`{ success: false, error: { code, message } }` shape — so the frontend
can branch on `error.code` without ever seeing a stack trace.

### E.7 CORS (Prompt 11 fix)
`middleware/cors.js` validates the request's `Origin` header against
exactly `FRONTEND_ORIGIN` **or** a regex derived from it that matches this
project's own Vercel preview/deployment hostnames — never a wildcard, and
never a hardcoded second origin. See
`docs/README-FUTURE-SCHOLARSHIP-DIRECT-SUBMISSION.md`'s security notes and
the CORS commit itself for the full reasoning.

### E.8 Testing philosophy
`backend/test/e2e.test.js` and `backend/test/cors.test.js` use Node's
**built-in** `node:test` runner against the **real** Express app on a real
ephemeral port — not mocks of the backend itself — so the tests exercise
actual route → controller → service → adapter wiring, including negative
cases (expired/revoked/scope-violating consent, malformed requests,
partial-adapter-failure, duplicate submission, CORS rejection).

---

## PART F — Glossary (for anyone new to the codebase)

| Term | Meaning here |
|---|---|
| **Adapter** | A small class that fetches data from one specific government source, hiding that source's real API shape behind a shared contract |
| **Consent token** | A one-time-issued secret string proving the citizen authorized a specific, scoped, time-limited data fetch |
| **Provenance** | Where a piece of data came from (`AAPLE_SARKAR`, citizen-entered, etc.) and when it was verified |
| **Normalized data** | Citizen data reshaped into one common structure regardless of which government source it came from |
| **Schema-driven** | The form's fields, labels, validation, and data sources are all *data* (a schema file), not hardcoded UI code |
| **Idempotency** | Submitting the same thing twice (e.g. a double-click) produces one record, not two |
| **Preflight (CORS)** | The browser's automatic `OPTIONS` check before a real cross-origin request, asking "is this origin allowed?" |
| **Mock adapter** | A fake stand-in for a real government API — returns realistic, fixed demo data so the rest of the system can be built and tested before real access exists |
