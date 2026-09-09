# e-Samanvit

**SIH26129 — Government of Maharashtra**
Problem statement: *System integration and interoperability among government digital platforms, resulting in fragmented service delivery.*

e-Samanvit is not another government portal. It's meant to become a consent-driven **interoperability layer** that sits between existing Maharashtra government systems (Aaple Sarkar, MahaDBT, MahaBhumi, Revenue) and the citizen — fetching verified data once, with consent, and auto-filling government service applications instead of asking citizens to re-enter the same information across departments.

This README describes the current state honestly: **most of that interoperability layer does not exist in code yet.** This stage (frontend/backend separation) is foundation work, not the SIH feature itself.

---

## Quick overview (read this first)

**Problem.** Citizens re-enter the same identity, address, income, and land information separately for every Maharashtra government service they apply to, because Aaple Sarkar, MahaDBT, MahaBhumi, and Revenue Department systems don't talk to each other.

**Solution.** *Fetch once → verify once → reuse across services → auto-fill → review → submit → track.* A citizen grants scoped, purpose-bound, time-limited consent once; e-Samanvit fetches only the authorized fields from the relevant government sources, auto-fills whatever service form the citizen is applying for, lets them review/edit, and tracks the resulting application — all through one consistent flow instead of one flow per department.

**Architecture:**
```
Citizen
   ↓
e-Samanvit Frontend (static HTML/CSS/vanilla JS)
   ↓
Backend API (Node.js/Express)
   ↓
Consent Manager  (scoped, purpose-bound, time-limited — see below)
   ↓
Data Aggregator  (concurrent fetch, partial-failure tolerant)
   ↓
Government Adapter Layer
   ├── Aaple Sarkar (Mock)
   ├── MahaDBT      (Mock)
   ├── MahaBhumi    (Mock)
   └── Revenue      (Mock)
   ↓
Common Citizen Data (NormalizedCitizenData — { value, source, verifiedAt } per field)
   ↓
Service Schema + Field Mapper  (schema-driven, no per-service code)
   ↓
Dynamic Application Form → Review (auto-filled vs. citizen-edited, clearly tagged)
   ↓
Application Submission Layer  (re-validates + re-fetches, never trusts the client)
   ↓
Application Record (status: SUBMITTED — the one status this prototype can honestly produce)
   ↓
My Applications / Tracking  (ApplicationStatusAdapter boundary, mock-only today)
```

**Current prototype — implemented and working (see "Current implementation status" below for full detail):**
consent-scoped mock data fetching from 4 government sources · a real Consent Manager (crypto-random tokens, hashed at rest, scope/expiry/revocation enforced server-side) · audit logging · 3 demo service schemas with a generic, schema-driven form engine (no per-service frontend code) · application submission with server-side re-validation and re-fetch (never trusting client-claimed provenance) · a citizen-facing "My Applications" + tracking UI · prototype-level duplicate-submission protection · a `node:test` end-to-end + negative-case test suite.

**Limitations, stated plainly:**
- All 4 government adapters are **mocks** — no real Aaple Sarkar/MahaDBT/MahaBhumi/Revenue API integration exists or is claimed.
- **Citizen identity is demo-level** — `citizenId` is a client-supplied string, not an authenticated identity. Production deployment must derive it from an authenticated session/token instead.
- **Storage is in-memory** — consent, audit, and application records are lost on backend restart. No database was added; every store is built behind an abstraction so one can be added later without callers changing.
- **No real government submission or document/PDF retrieval** — "submitted" means "recorded by e-Samanvit with confirmed values and honest provenance," not "delivered to a department." No DigiLocker/API Setu/Aadhaar/Account Aggregator integration exists.
- **Tracking is prototype-level** — the only status this backend can honestly report is `SUBMITTED`; no fabricated `Under Review`/`Approved` stages, because no real departmental status channel exists.
- Production readiness would additionally require authentication, a real database, further security hardening/monitoring, and authorized government API access.

**Recommended SIH demo flow:** Dashboard → Government Services → select a service → explain why consent is required → Allow & Fetch My Data → show multi-source badges + provenance → edit one field → Review → Submit Application → show the application reference → My Applications → Application Details/Tracking → explain how a real, authorized adapter would replace each mock without the citizen-facing flow changing.

**Positioning for judges:** *"This is a working interoperability prototype. Government integrations are represented by mock adapters because real government APIs require authorization and credentials. The architecture is designed so authorized adapters can replace these mocks without changing the citizen-facing application flow."*

---



## Project structure

```
e-samanvit/
├── frontend/     — the existing citizen portal (static HTML/CSS/vanilla JS)
├── backend/      — new Node.js/Express API (currently: health check only)
├── README.md
└── .gitignore
```

Frontend and backend are independently deployable — the frontend has no server-side dependency to build or run, and the backend has no knowledge of frontend internals.

---

## Frontend

Plain static site — no framework, no bundler. Existing pages, styling, i18n (English/Hindi/Marathi), accessibility toggle, and the citizen dashboard/services UI are unchanged from before this restructuring.

```
cd frontend
npm install        # no dependencies to fetch — completes instantly
npm run build       # regenerates js/config.js from .env, copies site into dist/
npm run dev          # serves the site locally on http://localhost:5173
```

### Frontend environment (`frontend/.env.example`)

| Variable | Purpose |
|---|---|
| `API_BASE_URL` | Base URL of the backend API. Non-secret. Read by `build.js` and written into `js/config.js`, since this project has no bundler to inject env vars at build time. |

---

## Backend

Minimal Express service. **Only `GET /api/health` currently does anything.** Everything else under `src/routes/` is a reserved, empty placeholder for the API surface described in the target architecture (see below) — not a working feature.

```
cd backend
npm install
npm run start        # starts the server (npm run dev restarts on file changes)
npm test             # runs the node:test end-to-end + negative-case suite (backend/test/)
npm run check        # recursively runs `node --check` over every backend source file
```

### Backend environment (`backend/.env.example`)

| Variable | Purpose |
|---|---|
| `PORT` | Port the API listens on (default 5000). |
| `NODE_ENV` | `development` / `production`. |
| `FRONTEND_ORIGIN` | The one origin allowed by CORS during local dev — not a wildcard. |

No government API credentials exist anywhere in this project yet, and none should be added to frontend-exposed configuration when they eventually do — they belong on the backend only.

### `GET /api/health`

```json
{
  "success": true,
  "service": "e-samanvit-backend",
  "status": "healthy",
  "timestamp": "..."
}
```

---

## Local development (both together)

```
# terminal 1
cd backend && npm install && npm run start

# terminal 2
cd frontend && npm install && npm run dev
```

The frontend loads `js/config.js` (pointing at `http://localhost:5000` by default) and, via `js/services/apiClient.js`, silently checks `/api/health` on page load — logged to the browser console only. This does not affect the visible UI in any way; it exists purely to verify the frontend↔backend boundary works.

---

## Current implementation status

**Implemented now:**
- Frontend/backend separation with independent `package.json`s
- Backend server, CORS, error-handling middleware, and route registration structure
- `GET /api/health`
- **Part 1 — Unified Data Fetching (mock adapters only):** `GovernmentAdapter` contract, four mock adapters (Aaple Sarkar, MahaDBT, MahaBhumi, Revenue), `AdapterRegistry`, `DataAggregatorService`, and `POST /api/citizen-data/fetch`
- **Consent Manager (prototype):** scoped, purpose-bound, time-limited consent — `POST /api/consent`, `GET /api/consent/:consentId`, `POST /api/consent/:consentId/revoke`; every data fetch is validated against a consent's authorized sources/fields, not just a token's presence — see below
- **Audit logging (prototype):** `GET /api/audit`, `GET /api/audit/:consentId` — records consent lifecycle, data-fetch, service-preparation, and (as of Prompt 7) application-submission outcomes
- **Service Registry + Schemas + Field Mapper:** three demo service schemas (Income Certificate, Scholarship Application, Land Record Request), `GET /api/services`, `GET /api/services/:serviceId`, and the consent-aware `POST /api/services/:serviceId/prepare`
- **Frontend Dynamic Form Engine + consent flow (Prompt 6):** a single generic page (`gov-services`, reachable from the sidebar menu as "Apply Online") that renders any registered service schema — service list → consent explanation → explicit consent → autofill → editable review → confirmation. No service-specific frontend form was written — see below
- **Application Submission (Prompt 7):** `POST /api/applications`, `GET /api/applications/:applicationId`, `GET /api/applications?citizenId=...` — the citizen's reviewed information is re-validated against the schema and re-checked against a fresh, consent-gated fetch (never the frontend's own claims about provenance), then persisted as a real `Application` record with a real `applicationId`. The frontend's "Confirm Information" step now actually calls this endpoint and shows the returned reference — see below
- **My Applications & Application Tracking (Prompt 8):** a citizen-facing "My Applications" page (list + detail) built entirely on the existing Prompt 7 application endpoints — no new `/api/status` route was added. `GET /api/applications/:id` and `GET /api/applications?citizenId=...` now additionally return one normalized `tracking` field (`{ status, label, description, source }`), computed by a new `ApplicationStatusAdapter` boundary. See "My Applications & Application Tracking (Prompt 8)" below for exactly what this does and does not mean
- **Frontend Integration, UX Polish & End-to-End Experience (Prompt 9):** the Prompts 6–8 flows (Services → Consent → Autofill → Review → Submit → Track) are now stitched into one coherent citizen journey reachable from the dashboard's primary "Apply for a Service" action (previously pointed at the unrelated pre-existing static services page); a small honest "e-Samanvit Applications" summary card on the dashboard shows a real count pulled from `GET /api/applications`; the final review screen's action button now reads "Submit Application" with explicit confirmation copy. No new backend endpoints, no new CSS system, no service-specific frontend components. See "Frontend Integration, UX Polish & End-to-End Experience (Prompt 9)" below
- **Security, Testing, Reliability & Final Polish (Prompt 10):** a security audit fixed a prototype-pollution-adjacent risk in field-path handling and added prototype-level duplicate-submission protection (idempotent per consent token); a `node:test` end-to-end + negative-case test suite (`backend/test/e2e.test.js`, run via `npm test`) now covers the full flow, consent/citizen-data/services/application failure modes, a simulated partial-adapter-failure, and the new guards. No product features were added. See "Security, Testing, Reliability & Final Polish (Prompt 10)" below
- Environment configuration boundary (`.env.example` for both, no secrets committed)

**Planned for later prompts (not implemented — do not assume these work):**
- Real, authorized government adapters (the mock ones above are the only implementation that exists)
- Real citizen authentication — `citizenId` is currently a hardcoded demo identifier on both frontend and backend, not an authenticated identity (see Consent section below)
- Actual delivery of a submitted application to any real government department system — see the "Application Submission (Prompt 7)" section below for exactly what "submitted" does and doesn't mean here
- Real department-specific status adapters (`RevenueStatusAdapter`, `MahaDBTStatusAdapter`, `MahaBhumiStatusAdapter`) — Prompt 8 only introduces the `ApplicationStatusAdapter` contract and one honest mock implementation; there is still no live channel back from any department, so `GET /api/applications/:id` only ever reports the one status this backend can honestly claim (`SUBMITTED`)
- Migrating the existing frontend `js/mock-api.js` prototype logic (services directory, application timeline, system-health monitor) into the real backend — it currently still lives at `frontend/js/mock-api.js`, unconnected to the new backend, preserved as-is until that migration is deliberately done. The rest of the pre-existing frontend (home/about/impact/services/resources/contact/dashboard pages) is also untouched — the new flows live entirely on their own pages

---

## My Applications & Application Tracking (Prompt 8)

```
GET /api/applications?citizenId=...   → My Applications list (Prompt 7 endpoint, reused as-is)
        ↓ citizen selects one
GET /api/applications/:applicationId  → Application Detail / Tracking (Prompt 7 endpoint, reused as-is)
        ↓
Application Status card + honest Application Timeline
```

**Scope decision, stated plainly:** this prompt does **not** add a Status Aggregator or a `GET /api/status/:id` endpoint. There is no real departmental status channel to aggregate — the four government adapters are still mocks, there are no departmental webhooks, and no departmental status API exists. `GET /api/applications/:applicationId` already returns everything a citizen needs to track their application; a separate `/api/status` route would only have duplicated it. Prompt 8 is the citizen-facing **My Applications** and **Application Detail/Tracking** UI, built entirely on the existing Prompt 7 endpoints, plus one small, honest backend addition described below.

**Backend addition — `ApplicationStatusAdapter` (the future-ready boundary asked for in this prompt):** `backend/src/adapters/interfaces/ApplicationStatusAdapter.js` defines a contract (`getStatus(application)`) modeled directly on the existing `GovernmentAdapter` pattern, so a real per-department status provider could implement it later without the tracking layer changing. `backend/src/adapters/mocks/MockApplicationStatusAdapter.js` is the only implementation that exists today, and it does **not** talk to any government system — it only echoes the one status `models/Application.js` can honestly produce (`SUBMITTED`), tagged with `source: "E_SAMANVIT_PROTOTYPE"` (never a real department name). `backend/src/services/application/ApplicationTrackingService.js` calls this adapter and is the only thing `applications.controller.js` now does differently: `getApplication`/`listApplications` attach one additional `tracking: { status, label, description, source }` field onto the exact same response shape Prompt 7 already returned — nothing existing was removed, renamed, or restructured, and `POST /api/applications`'s response is untouched.

**Frontend — `frontend/js/components/myApplications.js` (new):** one generic `MyApplications` object, the same "one engine, not one page per service" principle as `GovServices` (Prompt 6). It never hardcodes a service name — every card and detail view is rendered from whatever `GET /api/applications` actually returns. Consumes the backend exclusively through `ApplicationsApi.list()`/`.get()` (extended, not replaced) — no direct `fetch()` calls. Registered as the `my-applications` page in `js/app.js`'s router, with the same `onMount()` page-hook pattern `gov-services` already uses.

**What the tracking view shows, and — just as importantly — what it refuses to show:** the "Application Timeline" always shows exactly one completed step (`Application submitted`, with the real `submittedAt` timestamp) and one explicit "Department status updates — Not available in this prototype" line. No intermediate stages (`Under Review`, `Officer Assigned`, `Approved`, etc.) are fabricated, because the backend has no channel that could ever tell this prototype whether any of that happened. A visible "Prototype / Demo Status" callout on every detail view states plainly that no real department has received or reviewed the application — this is the same honesty principle `renderDone()` (Prompt 7) already applied to the submission confirmation screen, now carried through to tracking.

**Submitted-information summary:** the detail view also shows the application's own `fields` map (already present in Prompt 7's response — nothing new was added to expose more citizen data), tagged `Auto-filled from <Department>` / `Entered by you` using the exact same field-level `source`/`autoFilled` values `ApplicationService.reconcileFields()` (Prompt 7) computed at submission time. Field *labels* are a best-effort nicety fetched via the existing `ServicesApi.detail(serviceId)` call — if that fetch fails for any reason, the view still renders correctly using the raw field IDs; label lookup is never a hard dependency.

**Empty, loading, error, and not-found states:** an empty applications list shows a citizen-facing message with an "Apply for a Service" action back into the Prompt 6 flow — no fake applications are ever displayed to make the UI look populated. A failed list/detail fetch shows a citizen-safe retry banner (`friendlyErrorMessage()`, extended with no new codes — `APPLICATION_NOT_FOUND` already existed from Prompt 7). An unknown `applicationId` shows a dedicated "Application not found" state with a way back to the list, rather than a generic error.

**Navigation:** "My Applications" was added to the existing sidebar/drawer menu (`components.js`, both `allSidebarLinks` and `renderSidebar`) — no redesign of the navigation itself. The Prompt 7 "Application Submitted" confirmation screen (`govServices.js` → `renderDone()`) now also links to "View My Applications", and the pre-existing static dashboard header gained one additional "My Applications" quick-action button next to its existing "Apply New Service" button — both one-line additions, nothing else on either page was touched.

**Data minimization:** the tracking view exposes only what the existing Prompt 7 `Application` record and schema already carry — no consent tokens, no internal adapter details, no raw government-API responses, and no new endpoint was created to expose additional citizen data. `GET /api/applications?citizenId=...` remains the same **DEV/DEMO ONLY** endpoint it was in Prompt 7 — still an unauthenticated query parameter, not something a production design should expose without access control.

**Known limitation, stated plainly:** *"Application tracking in this prototype reflects the normalized application lifecycle this backend can honestly produce — a single `SUBMITTED` state with real submission provenance. It does not reflect, poll, or infer any real Maharashtra department's processing status, because no authorized departmental status API or webhook channel exists yet. The `ApplicationStatusAdapter` boundary introduced here is where a real per-department status provider (e.g. `RevenueStatusAdapter`, `MahaDBTStatusAdapter`, `MahaBhumiStatusAdapter`) could plug in later, returning genuinely new statuses through the same contract, without the citizen-facing tracking UI or its API shape needing to change."*

---

## Frontend Integration, UX Polish & End-to-End Experience (Prompt 9)

Prompts 1–8 built each piece of the citizen journey correctly in isolation but left them only loosely connected to the rest of the (much older, pre-existing) frontend. Prompt 9 does not add new architecture — it audits the actual Prompts 6–8 code, fixes the gaps that kept it from feeling like one product, and polishes the citizen-facing language.

**The coherent journey now works end-to-end from the dashboard:**
```
Dashboard → Apply for a Service → Government Services → Select Service
   → Consent → Allow & Fetch My Data → Autofill → Review
   → Submit Application → Application Submitted → My Applications
   → Application Details / Tracking
```

**What was found and fixed:**
- **Broken primary entry point:** the dashboard's "Apply New Service" button called `navigateTo('services')` — the old, pre-existing static services catalog (informational only, backed by `mock-api.js`, with a "View More" action that only shows a toast). It never actually reached the real schema-driven `gov-services` flow from Prompt 6. This is now fixed to `navigateTo('gov-services')` and relabeled "Apply for a Service" to match the action it now actually performs, so the dashboard's primary call-to-action leads to the real, working journey. The "My Applications" quick-action button added in Prompt 8 was already correct and is untouched.
- **Submission confirmation wording:** the review screen's final action button read "Confirm Information" — functionally correct but not the explicit "Submit Application" wording this prompt calls for. Updated the button label and added a short "Confirm Application Submission — please review your information above before submitting" line directly above it. No change to the underlying `confirm()` logic, validation, or double-submission protection (see below) — wording only.
- **Dashboard value proposition + real application count:** added one line under the dashboard header ("One place to access, prepare and track government services…") and a small "e-Samanvit Applications" summary card that calls the existing `ApplicationsApi.list()` on page mount and shows a real count plus the most recent application's service name and status label — e.g. *"1 application submitted through e-Samanvit — most recent: Income Certificate (Submitted)"*. If the backend is unreachable or the citizen has none yet, it degrades to a neutral message rather than an error banner (it's a summary widget, not a critical flow) — never a fabricated number. This is the one place Prompt 9 touched the pre-existing dashboard; the older mock stat cards and "Active Schemes" table above/below it (PM-KISAN, KCC, etc. — unrelated to the new interoperability layer) were deliberately left as-is, per this prompt's scope limits on unrelated legacy content.

**What was audited and found already correct (no change needed):** the Prompt 6/7/8 code was, on inspection, already unusually disciplined about most of what this prompt asks for — loading states, citizen-friendly error messages (`friendlyErrorMessage()`), an empty state for "My Applications", disabled+relabeled buttons during in-flight requests (submit/consent both set `loading`/`submitting` and synchronously re-render *before* the `await`, which already prevents double-submission from rapid clicks), non-color-only status badges (`✓ Submitted`, not just a colored dot), `escapeHtml()` applied to all interpolated citizen data, a single `sourceLabel()` mapping (never duplicated per file), consent-token handled strictly in memory (never `localStorage`/URL), and the generic schema-driven `FieldRenderer`/`GovServices`/`MyApplications` engine with zero `if (serviceId === ...)` branching anywhere. These were left untouched.

**Explicitly not done (out of scope for this prompt):** no new backend routes, no real government/auth/payment integration, no fabricated department status stages, no new CSS framework or design system, no service-specific frontend components, no rewrite of the pre-existing legacy dashboard/services/resources/about/contact pages beyond the one dashboard fix and addition described above, and no removal of `frontend/js/mock-api.js` or any other unused legacy code.

**Verification performed:** a full backend regression pass (`GET /api/health`, `GET /api/services`, `GET /api/services/:id`, `POST /api/consent`, `POST /api/services/:id/prepare`, `POST /api/applications`, `GET /api/applications/:id`, `GET /api/applications?citizenId=...`, `GET /api/audit/:consentId`) against a running server; a Node.js `--check` syntax pass across every frontend `.js` file; and a headless jsdom smoke test that loads the real frontend scripts, drives `App.navigate()` across every page, and runs the full Select Service → Consent → Autofill → Review → Submit Application → My Applications → Application Detail flow against the live backend, asserting each step reaches its expected state. **No real browser was available in this environment — manual browser verification (Chrome/Firefox/mobile viewport, actual click/keyboard interaction, DevTools console/network inspection) has not been performed and is still required before this is considered demo-ready.**

---

## Frontend Dynamic Form Engine (Prompt 6)

```
GET /api/services            → service list (cards)
        ↓ citizen picks one
GET /api/services/:id        → full schema
        ↓ shown as a consent explanation (what/why/from where/how long)
        ↓ citizen explicitly clicks "Allow & Fetch My Data"
POST /api/consent            → consent created (token kept in memory only)
        ↓
POST /api/services/:id/prepare → autofilled + missing fields, with provenance
        ↓
Dynamic Form (schema.fields → FieldRenderer, one control type per field.type)
        ↓ citizen edits, client validates against schema.validation
Review screen (auto-filled vs. citizen-edited, clearly tagged)
        ↓ citizen clicks "Confirm Information"
"Ready for submission" — NOT an actual submission (Prompt 7)
```

**One generic engine, not one form per service.** `js/components/govServices.js` iterates whatever `schema.fields` the backend returns; `js/components/fieldRenderer.js` is the only place a field `type` maps to an HTML control (`text/number/date/email/phone` → typed `<input>`, `select` → `<select>`, `boolean` → checkbox, `textarea` → `<textarea>`). Adding a 4th backend schema requires zero frontend changes.

**New files:** `js/services/servicesApi.js`, `js/services/consentApi.js` (thin wrappers matching the Prompt 4/5 endpoints exactly — no invented response shapes), `js/utils/validation.js` (generic `required`/`min`/`max`/`minLength`/`maxLength`/`pattern` checks driven entirely by schema metadata — no per-field-name branching), `js/utils/formatting.js` (`escapeHtml`, source-name display, expiry/date formatting), `js/components/fieldRenderer.js`, `js/components/govServices.js`. **Extended:** `js/services/apiClient.js` (now parses the backend's `{code, message}` error body so the UI can distinguish "consent expired" from "service unavailable" instead of showing one generic failure); `js/app.js` (registered the new `gov-services` route + a page-mount hook); `js/components.js` (added one "Apply Online" entry to the existing sidebar menu — the curated 4-link desktop navbar and every existing page were left untouched).

**No new CSS system.** Every existing class used — `.card`, `.btn`, `.form-group/input/select/error/hint`, `.badge-*`, `.step-pill`, `.spinner` — all already existed unused in the live `style.css` from Prompt 1's original build. Prompt 1 flagged 3 CSS systems, only 1 live; this prompt didn't touch that situation and didn't add a 4th.

**Consent is explicit and re-checked, not assumed.** Nothing is fetched when a service is merely opened — the citizen sees exactly what data, from which sources, for what purpose, and for how long, and must click "Allow & Fetch My Data." The frontend derives which sources/fields *to ask consent for* from the schema, but that's only for display — the backend independently re-derives and enforces real scope on every request, so the frontend's derivation is never trusted as authorization.

**Token handling:** the consent token lives only in `GovServices.state` (in-memory JS), is never written to `localStorage`/`sessionStorage`, never appears in a URL, and is never logged — refreshing the page loses it, which is an accepted prototype trade-off, not an oversight.

**Auto-fill vs. edit vs. review:** every field shows one of three states — `✓ Auto-filled from <Department>` (green), `⚠ Required information not found` / `optional` (amber), or nothing extra (plain manual entry). `editable: false` fields render disabled. The review screen distinguishes a citizen-edited value from an untouched auto-filled one (`✓ Auto-filled from X` vs `✎ Entered by you`) by comparing against the *original* prepared value, kept separate from the live form value the whole time.

**Error states implemented:** unreachable backend, consent rejected, consent expired/revoked, out-of-scope source/field, unknown/unavailable service — each maps to a distinct citizen-safe message (never a raw stack trace or backend internals), with a "Try Again" action.

---

## Application Submission (Prompt 7)

```
Citizen confirms the review screen
   ↓
POST /api/applications  { serviceId, citizenId, consentToken, fields }
   ↓
ServiceRegistry.get(serviceId)                    ← reused exactly as /prepare does
   ↓
ConsentManagerService.validateConsentForFetch()   ← reused exactly as /prepare does
   ↓
DataAggregatorService.fetchCitizenData()          ← RE-FETCHED FRESH, not trusted from the citizen's browser
   ↓
FieldMapperService.mapServiceData()               ← authoritative auto-fill/provenance, recomputed
   ↓
reconcile citizen's submitted values against that fresh result
   ↓
required-field completeness check → per-field schema validation
   ↓
Application record persisted, AuditService.log(APPLICATION_SUBMITTED)
   ↓
{ applicationId, status: "SUBMITTED", ... }
```

**What "submitted" does and does not mean.** An Application record here means: e-Samanvit has recorded the citizen's confirmed answers, with real government-sourced provenance for whatever was genuinely auto-filled. It does **not** mean the application was delivered to any actual Maharashtra department system — no such integration exists (the four adapters are still mocks, see Part 1 below). `SUBMITTED` is the only status this backend can honestly produce; see `backend/src/models/Application.js` for why fabricating a verification/approval timeline (the way the earlier frontend-only `mock-api.js` prototype did) was deliberately not carried into the real backend.

**Provenance is never taken on the citizen's word.** This is the core trust decision of this prompt: the frontend's local state already tracks which fields look auto-filled (Prompt 6), but `POST /api/applications` never receives or trusts a `source`/`autoFilled` claim — only `{ fieldId: value }`. The backend re-runs the exact same consent-gated fetch `/prepare` would run, and a field only keeps its "auto-filled from X" status if the citizen's submitted value still matches that fresh result. Anything else — a manual-entry field, or an auto-filled field the citizen edited — is recorded as the citizen's own entry, with `source: null`. A citizen's browser asserting `source: "REVENUE"` on a value it never actually got from Revenue can't make it into an Application record.

**Consent is re-checked, not assumed, a second time.** The same `ConsentManagerService.validateConsentForFetch()` scope enforcement that gates `/prepare` gates submission too — an expired/revoked/out-of-scope consent between "Allow & Fetch My Data" and "Confirm Information" is rejected here exactly the same way (`401`/`403`/`410`), not silently allowed through because a prepare already succeeded once.

**Two submission-specific error codes, with field-level detail:**
| Code | Status | Meaning |
|---|---|---|
| `APPLICATION_INCOMPLETE` | 422 | A required field has no value from either government data or citizen entry. Response includes `missingFields: string[]`. |
| `APPLICATION_VALIDATION_FAILED` | 422 | A submitted value fails the schema's own `validation` rules (pattern/min/max/length). Response includes `fieldErrors: { fieldId: message }`. |

The frontend's own validation (`js/utils/validation.js`, Prompt 6) is unchanged and still runs before "Continue to Review" — but it exists for citizen UX, not enforcement. `backend/src/utils/fieldValidation.js` is a deliberate rule-for-rule duplicate that actually gates whether an Application gets created, the same client-displays/server-enforces split already established for consent scope. If the backend catches something the frontend's own check didn't, `GovServices.confirm()` routes back to the form step with those specific fields flagged, rather than a generic failure.

**`GET /api/applications/:applicationId`** returns the stored record (a citizen's receipt). **`GET /api/applications?citizenId=...`** lists a citizen's own submissions — **DEV/DEMO ONLY**, same caveat as `GET /api/audit`: no authentication layer exists yet, so `citizenId` is an unauthenticated query parameter here, not something a production design should expose without access control.

**Frontend: "Confirm Information" now really submits.** `GovServices.confirm()` (in `js/components/govServices.js`) calls the new `js/services/applicationsApi.js` wrapper and shows the real `applicationId`/status/submission time on the done screen — replacing the earlier "ready for submission, not yet implemented" placeholder message. Nothing else about the Prompt 6 flow changed: state is still in-memory only, the consent token is still never persisted, and error handling still shows citizen-safe messages via `friendlyErrorMessage()` (extended with the two new codes above).

**Not implemented — do not assume these work:** delivery to a real department system; any status beyond `SUBMITTED`; a citizen-facing "my applications" list page (the endpoint exists; no frontend page consumes it yet — that's Status Aggregator territory, still a placeholder in `status.routes.js`); resubmission/editing of an already-submitted application.

---

## Service Registry + Government Service Schemas + Field Mapper (Prompt 5)

```
Citizen
   ↓
Consent (Prompt 4, unmodified)
   ↓
Service Registry  →  Government Service Schema (configuration, not code)
   ↓
required sources/fields derived FROM the schema
   ↓
ConsentManagerService.validateConsentForFetch()   ← reused exactly as-is
   ↓
DataAggregatorService.fetchCitizenData()          ← reused exactly as-is
   ↓
FieldMapperService.mapServiceData()  →  Form-Ready Prefilled Data
```

The system is now **schema-driven, not service-page-driven**: adding a new government service means writing one new schema file and listing it in `schemas/government-services/index.js` — no controller branching, no new fetching logic, no new consent logic.

**Three demo schemas** (`backend/src/schemas/government-services/`): `income-certificate` (Revenue Dept.), `scholarship-application` (MahaDBT), `land-record-service` (MahaBhumi). Each field declares a `commonDataPath` into the *same* `NormalizedCitizenData` shape from Prompts 3–4 (e.g. `identity.fullName`, `income.annualIncome`) — no parallel data model was invented. Fields with no real government-system backing (a phone number, a self-declared category) simply have no `commonDataPath` and are always reported as manual-entry — never fabricated.

**`GET /api/services`** — service discovery: `serviceId`, `serviceName`, `department`, `description`, `purpose` only, no field list.

**`GET /api/services/:serviceId`** — the full schema (field list, types, validation metadata, `requiredSources`) for the future frontend form engine. `404` for an unknown service.

**`POST /api/services/:serviceId/prepare`** — the core endpoint:
```json
{ "citizenId": "DEMO-001", "consentToken": "<token from POST /api/consent>" }
```
Note what's **not** in that request: no `sources`, no `requiredFields`. Those are derived entirely from the schema server-side — a caller can never ask this endpoint for a field or source the schema itself doesn't define. It then reuses Prompt 4's `ConsentManagerService.validateConsentForFetch()` and Prompt 3's `DataAggregatorService.fetchCitizenData()` completely unmodified — this endpoint never talks to an adapter or the consent store directly, and a schema can never expand what a citizen's consent actually authorizes (an unauthorized-source/field consent is rejected with `403`, same as `/citizen-data/fetch`).

Response:
```json
{
  "success": true,
  "serviceId": "income-certificate",
  "consentId": "consent-...",
  "readyForReview": false,
  "missingRequiredFields": ["mobileNumber", "incomeSource"],
  "fields": {
    "fullName": { "value": "Demo Citizen", "source": "AAPLE_SARKAR", "autoFilled": true, "missing": false, "required": true, "editable": true },
    "mobileNumber": { "value": null, "source": null, "autoFilled": false, "missing": true, "required": true, "editable": true }
  }
}
```

**`readyForReview` vs. "ready for submission":** `readyForReview: false` here is *expected and correct* whenever a schema has required fields with no government-system source (most schemas do — a phone number or self-declared category can't come from a registry). It only means "some required field still needs the citizen to type it in" — submission itself isn't implemented at all yet (Prompt 6+).

**Known gap, stated plainly:** a consent's `purpose` (e.g. "Income certificate application") is not currently cross-checked against the `serviceId` being prepared — purpose is recorded and returned for transparency, but not enforced as a strict match. Documented here rather than silently glossed over.

---

## Consent Manager (prototype)

```
Consent Request
      ↓
Consent Manager  →  scoped, time-limited ConsentRecord (in-memory)
      ↓
POST /api/citizen-data/fetch
      ↓
validate token → check status (ACTIVE/EXPIRED/REVOKED) → check citizen match
      ↓
check requested sources ⊆ consent.sources
check requested fields  ⊆ consent.requestedFields
      ↓
Data Aggregator (Part 1, unchanged)
      ↓
Audit Event (CONSENT_* / DATA_FETCH_*)
```

This implementation demonstrates **consent-driven, purpose-limited, field-scoped data access** for the SIH prototype. **It is not a production implementation of India's Account Aggregator protocol, Aadhaar/DigiLocker authentication, or any government identity/consent infrastructure.**

**What a consent record specifies:**
| Field | Meaning |
|---|---|
| `consentId` | unique ID for this grant |
| `citizenId` | who it's for (currently a demo identifier — see Identity limitation below) |
| `purpose` | why (e.g. "Income certificate application") |
| `sources` | which government sources are authorized |
| `requestedFields` | exactly which `section.field` paths are authorized |
| `status` | `ACTIVE` / `EXPIRED` / `REVOKED` |
| `createdAt` / `expiresAt` | short-lived by design — 1 minute to 24 hours |

**Scope enforcement:** a data-fetch request must satisfy `requestedSources ⊆ consent.sources` **and** `requestedFields ⊆ consent.requestedFields`. A valid token combined with a request for anything outside that scope is rejected (`403 CONSENT_SCOPE_VIOLATION`) — consent can never be silently expanded.

**Token handling:** the raw consent token is generated with `crypto.randomBytes` (never `Math.random`), returned to the caller exactly once at creation, and never stored or logged in raw form — only its SHA-256 hash is kept, so a fetch request's token is verified without the store ever holding a replayable secret.

**Expiry:** checked lazily (no background job) — any read of a consent record first checks whether `now >= expiresAt` and flips it to `EXPIRED` if so.

**Revocation:** `POST /api/consent/:consentId/revoke` sets `status = REVOKED`. The record is kept (not deleted) for audit purposes; any subsequent fetch attempt with that consent's token fails with `410 CONSENT_REVOKED`.

**Identity limitation:** *"The current prototype uses a supplied demo citizen identifier. Production deployment must derive citizen identity from an authenticated identity layer rather than trusting arbitrary client input."* `citizenId` is accepted as a plain parameter everywhere specifically so `req.body.citizenId` can later be replaced with `authenticatedUser.citizenId` without redesigning the Consent Manager.

**Storage limitation:** *"Prototype consent and audit records are stored in memory and are lost when the backend restarts."* No database was added, per this stage's scope — both `ConsentStore` and `AuditStore` are built behind an abstraction so a real store can replace them later without callers changing.

**Audit events recorded:** `CONSENT_CREATED`, `CONSENT_REVOKED`, `CONSENT_EXPIRED`, `DATA_FETCH_SUCCESS`, `DATA_FETCH_PARTIAL`, `DATA_FETCH_FAILED` — event metadata only (consent ID, citizen ID, source/field *paths*), never raw tokens or actual fetched values. `GET /api/audit` is a **dev/demo-only** endpoint — unrestricted because no authentication exists yet; a production design must not expose a cross-citizen audit trail without access control.

---

## Part 1 — Unified Data Fetching (implemented as mocks)

```
POST /api/citizen-data/fetch
        ↓
   Route → Controller
        ↓
  DataAggregatorService
        ↓
   AdapterRegistry
        ↓
 GovernmentAdapter (contract)
        ↓
┌────────────┬──────────┬────────────┬─────────┐
│ AapleSarkar │ MahaDBT  │ MahaBhumi  │ Revenue │   ← all MOCK adapters
└────────────┴──────────┴────────────┴─────────┘
        ↓
  Normalized Citizen Data (only the requested fields, with source + timestamp)
```

**Adapter Pattern:** every adapter (`backend/src/adapters/mocks/`) implements the same `GovernmentAdapter` contract (`getSourceName()`, `fetchData()`). `DataAggregatorService` and the controller only ever talk to that contract, obtained through `AdapterRegistry` — never to a department's API shape directly. A real, authorized adapter can replace a mock one later by implementing the same contract; nothing above the adapter layer needs to change.

**Common data model:** `backend/src/models/NormalizedCitizenData.js` defines the shared shape (`identity`, `address`, `income`, `land`, `education`, `bank`) and the field-selection logic every adapter uses.

**Required-field filtering (data minimization):** an adapter only ever returns the `"section.field"` paths it was asked for **and** actually owns — never a full dump. Example: requesting only `income.annualIncome` returns just that, wrapped with provenance.

**Source metadata:** every returned value is wrapped as `{ value, source, verifiedAt }`, so a future UI can show *"Annual Income ₹2,50,000 — Source: Revenue Department"*.

**Partial failures:** the aggregator calls all requested adapters concurrently (`Promise.allSettled`) and reports per-source `success`/`error` — one source failing doesn't discard another source's successful data.

**Consent — as of Prompt 4:** every fetch is now validated against a real, scoped `ConsentRecord` (status, expiry, citizen match, source/field scope) via `ConsentManagerService` — see the "Consent Manager (prototype)" section above for the full picture. Adapters themselves still only check token *presence* defensively (they don't re-implement scope rules — that logic is centralized, not duplicated per adapter).

### `POST /api/citizen-data/fetch`

This is a **prototype endpoint for exercising the architecture** — not a production citizen-data API. As of Prompt 4, `consentToken` must come from a real `POST /api/consent` call first (see the Consent Manager section above) — an arbitrary string is no longer accepted.

Request (using a token returned by `POST /api/consent`, where that consent's `sources`/`requestedFields` cover this request):
```json
{
  "citizenId": "DEMO-001",
  "consentToken": "<token from POST /api/consent>",
  "sources": ["AAPLE_SARKAR", "REVENUE"],
  "requiredFields": ["identity.fullName", "address.district", "income.annualIncome"]
}
```

Response:
```json
{
  "success": true,
  "citizenId": "DEMO-001",
  "consentId": "consent-...",
  "requiredFields": ["identity.fullName", "address.district", "income.annualIncome"],
  "data": {
    "identity": { "fullName": { "value": "Demo Citizen", "source": "AAPLE_SARKAR", "verifiedAt": "..." } },
    "address":  { "district": { "value": "Pune", "source": "AAPLE_SARKAR", "verifiedAt": "..." } },
    "income":   { "annualIncome": { "value": 250000, "source": "REVENUE", "verifiedAt": "..." } }
  },
  "sources": [
    { "source": "AAPLE_SARKAR", "status": "success" },
    { "source": "REVENUE", "status": "success" }
  ]
}
```

A missing `consentToken` (or `citizenId`/`sources`/`requiredFields`) is rejected with `400 Bad Request` before it ever reaches consent validation. An invalid/expired/revoked token, a citizen mismatch, or a request outside the consent's scope is rejected with `401`/`410`/`403` respectively, before it ever reaches the aggregator.

> **Government integrations are currently represented by mock adapters only. Production integrations require authorized APIs and credentials, which do not exist in this project.**

---

## Security, Testing, Reliability & Final Polish (Prompt 10)

Prompt 10 is a stabilization pass over Prompts 1–9's code — no new product features, no new architecture layers. It audited the existing implementation and fixed concrete issues found, without rewriting anything that was already working correctly (most of the codebase was already unusually disciplined about the things this pass checks for).

**Security issues found and fixed:**
- **Prototype-pollution-adjacent risk in field-path handling.** `POST /api/citizen-data/fetch`'s client-supplied `requiredFields` (and `POST /api/consent`'s `requestedFields`) are `"section.field"` strings that get turned into object keys in `models/NormalizedCitizenData.js` (`selectRequiredFields`/`mergeNormalizedData`). A path like `"__proto__.polluted"` or `"constructor.prototype"` is now rejected outright (`400 INVALID_REQUEST`) at the request-validation boundary, and `NormalizedCitizenData.js` itself was hardened with an `isSafeKey()` guard, `Object.create(null)` accumulators, and explicit `hasOwnProperty` checks as defense-in-depth, in case any other caller ever reaches that code without going through the HTTP validation middleware.
- **No duplicate-submission protection.** `POST /api/applications` had no idempotency: a double-click, or a client retry after a dropped response, could create two `Application` records for one citizen action. `ApplicationStore` now indexes applications by `consentId`, and `ApplicationService.submitApplication()` returns the existing record (HTTP `200`) instead of creating a new one if that consent token already produced a successful submission — genuinely new submissions still return `201`. This is a minimal, in-memory, per-consent idempotency check, not a distributed idempotency-key system.
- **Frontend re-entrancy backstop.** `govServices.js`'s `confirm()`/`giveConsent()` now also guard against a second invocation firing before the existing disabled-button re-render paints (fast double-click/Enter-key repeat), in addition to the UI-level disabling that was already correct from Prompt 9.

**Reviewed and found already correct (no change needed):** consent token generation (`crypto.randomBytes`/`randomUUID`, never `Math.random`), tokens hashed (SHA-256) at rest and never logged, lazy expiry, revocation, citizen-match/source-scope/field-scope enforcement, CORS restricted to a configured origin (not `*`), no secrets in `.env.example` or frontend config, centralized error handling with no stack traces reaching the client, consistent `{ success, error: { code, message } }` shape, `escapeHtml()` applied to interpolated citizen data, consent tokens kept in memory only (never `localStorage`/URLs) on the frontend, and the honest "SUBMITTED only" tracking status with no fabricated department stages.

**Testing added:** `backend/test/e2e.test.js` — a `node:test` (Node's built-in test runner; no new dependency) suite that starts the real Express app on an ephemeral port and exercises it with real HTTP requests. Covers the full happy-path flow (health → consent → fetch → services → prepare → submit → detail → list → tracking), the negative cases called for in this prompt (missing/invalid/expired/revoked consent, scope violations, unknown service/application IDs, malformed requests, empty lists), a partial-adapter-failure simulation (one source down, others still succeed — see the test file's own comment on why this is a test-only monkey-patch of `AdapterRegistry.getAdapter`, not a production feature), the new duplicate-submission protection, and the new prototype-pollution guards. Run with `npm test` from `backend/`. `npm run check` recursively runs `node --check` over every backend source file (a plain script, not a shell glob, so it behaves the same in any environment).

**Known limitation of this pass, stated plainly:** `GET /api/applications/:applicationId` has no ownership check — any caller who knows (or, astronomically unlikely, guesses) a UUID-based `applicationId` can retrieve that application. This was not "fixed" with any form of authentication, because there is no identity layer to check against yet (see the Identity limitation elsewhere in this README) — adding one now would mean building fake authentication, which this prompt explicitly rules out. This is documented here rather than silently left unmentioned.

---



```
                 CITIZEN
                    ↓
              e-Samanvit
                    ↓
          Authentication + Consent
                    ↓
        ┌────────────────────────┐
        │ Interoperability Layer │
        ├────────────────────────┤
        │ API Gateway            │
        │ Data Mapper            │
        │ Validation Engine      │
        │ Consent Manager        │
        │ Service Registry       │
        │ Workflow Engine        │
        │ Audit Logs             │
        └───────────┬────────────┘
                    ↓
       ┌────────────┼────────────┐
       ↓            ↓            ↓
 Aaple Sarkar    MahaDBT     MahaBhumi
       ↓            ↓            ↓
 Revenue        Schemes       Land Data
       └────────────┼────────────┘
                    ↓
           Common Citizen Data
                    ↓
             Autofill Engine
                    ↓
             Dynamic Form
                    ↓
               REVIEW
                    ↓
                SUBMIT
```
