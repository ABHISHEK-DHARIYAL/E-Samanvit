# SIH26129 Presentation — Content Reference

Slide-by-slide content, drawn directly from what's actually built (per the
project's own honesty principle — nothing below claims a real government
integration that doesn't exist). Use this as the source data when building
the actual `.pptx`; not a design spec.

---

### Slide 1 — Title
- **e-Samanvit**
- SIH26129 — Government of Maharashtra
- Category: Software · Theme: Miscellaneous
- Problem: *System integration and interoperability among government
  digital platforms, resulting in fragmented service delivery*
- [Team name / members / institution — fill in]

---

### Slide 2 — Problem Statement
- Citizens re-enter the **same** identity, address, income, and land
  information separately for **every** Maharashtra government service
  they apply to
- Root cause: Aaple Sarkar, MahaDBT, MahaBhumi, and the Revenue Department
  systems don't talk to each other
- Result: fragmented service delivery, repeated paperwork, repeated
  verification, citizen frustration

---

### Slide 3 — Proposed Solution
- **e-Samanvit**: a consent-driven interoperability layer sitting between
  citizens and existing government systems
- Core flow: **Fetch once → verify once → reuse across services → auto-fill
  → review → submit → track**
- Citizen grants one scoped, purpose-bound, time-limited consent — not a
  blanket permission
- e-Samanvit fetches only the authorized fields, auto-fills whichever
  service form is being applied for, and lets the citizen review/correct
  before submitting

---

### Slide 4 — Architecture Diagram
```
Citizen
   ↓
e-Samanvit Frontend (static HTML/CSS/vanilla JS)
   ↓
Backend API (Node.js/Express)
   ↓
Consent Manager  (scoped, purpose-bound, time-limited)
   ↓
Data Aggregator  (concurrent fetch, partial-failure tolerant)
   ↓
Government Adapter Layer
   ├── Aaple Sarkar   ├── MahaDBT   ├── MahaBhumi   ├── Revenue
   ↓
Normalized Citizen Data  ({ value, source, verifiedAt } per field)
   ↓
Service Schema + Field Mapper  (schema-driven, no per-service code)
   ↓
Dynamic Form → Review → Submit → Track
```

---

### Slide 5 — What Makes This Different (Innovation)
- **Adapter pattern**: every government source is a swappable module behind
  one shared contract — a real, authorized adapter can replace a mock one
  later without touching anything above it (no rewrite when real API
  access is granted)
- **Schema-driven forms**: adding a new government service = writing one
  schema file, not new frontend/backend code per service
- **Provenance-aware data**: every auto-filled value visibly shows *where*
  it came from and *when* it was verified — not a black box
- **Consent as real access control**, not a checkbox formality: scope,
  expiry, and revocation are enforced server-side on every fetch
- **Honesty by design**: the system only ever reports statuses/data it can
  actually back up (e.g. tracking never fabricates "Approved" without a
  real departmental channel)

---

### Slide 6 — Technical Stack
| Layer | Technology |
|---|---|
| Frontend | Static HTML/CSS/vanilla JS (no framework, no bundler) — i18n (English/Hindi/Marathi), accessibility toggle |
| Backend | Node.js + Express |
| Data model | Normalized citizen data with source/timestamp provenance |
| Consent | Crypto-random tokens, SHA-256 hashed at rest, server-enforced scope/expiry/revocation |
| Storage (prototype) | In-memory, built behind a swappable abstraction |
| Testing | Node's built-in `node:test` — real end-to-end HTTP tests, no external framework |
| Deployment | Frontend on Vercel, Backend on Render |

---

### Slide 7 — Current Prototype: What's Actually Working
- Consent-scoped mock data fetching from 4 government sources (concurrent,
  partial-failure tolerant)
- A real Consent Manager: crypto-random tokens, hashed at rest,
  scope/expiry/revocation enforced server-side
- Full audit logging of consent and data-fetch events
- 3 live demo services on one generic, schema-driven form engine:
  **Income Certificate, Scholarship Application, Land Record Request**
- Application submission with server-side re-validation and re-fetch
  (never trusts client-claimed provenance)
- Duplicate-submission protection (idempotent per consent)
- A citizen-facing **My Applications** + tracking UI
- A full automated end-to-end + negative-case test suite

---

### Slide 8 — Stated Limitations (transparency slide — judges respect this)
- All 4 government adapters are **mocks** — no real department API access
  exists yet or is claimed
- `citizenId` is a demo identifier, not yet an authenticated identity
- Storage is in-memory (lost on restart) — built to swap in a real database
- No real submission ever reaches a government department; tracking can
  only honestly report `SUBMITTED`
- **Positioning:** *"This is a working interoperability prototype. Real
  government integrations are mocked because production access requires
  government authorization and credentials. The architecture is designed
  so authorized adapters can replace the mocks without changing the
  citizen-facing flow."*

---

### Slide 9 — Roadmap (next steps toward a real deployment)
1. Request sandbox/API access from MahaDBT / Aaple Sarkar / MahaBhumi /
   Revenue (or via API Setu)
2. Replace mock adapters with real ones behind the same contract
3. Add real citizen identity (Aadhaar / DigiLocker / State SSO)
4. Move consent/audit/application storage to a persistent database
5. Add a real submission adapter + real status/tracking adapters
6. Security hardening, government sign-off, pilot rollout

---

### Slide 10 — Impact
- **Citizens**: apply once, reuse verified data across every service — no
  repeated paperwork or repeated document submission
- **Departments**: reduced manual verification load, standardized
  consent/audit trail across services
- **Government of Maharashtra**: a reusable interoperability layer — each
  new service onboarded via a schema file, not a new integration project
- **Scalable by design**: the same architecture extends to any future
  Maharashtra e-governance service without redesign

---

### Slide 11 — Live Demo Flow (for the judges, walk through this order)
1. Dashboard → **Government Services**
2. Select a service (e.g. Scholarship Application)
3. Explain *why* consent is required
4. **Allow & Fetch My Data** → show multi-source badges + provenance
5. Edit one field manually → show it's tagged "Entered by you"
6. **Review** screen
7. **Submit Application** → show the returned application reference
8. **My Applications** → open **Application Details/Tracking**
9. Explain: a real, authorized adapter would replace each mock here
   without the citizen-facing flow changing at all

---

### Slide 12 — Thank You / Q&A
- Team contact details
- [Repository link / demo link — fill in]
