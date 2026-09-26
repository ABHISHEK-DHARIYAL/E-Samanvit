# Future Goal: Direct Scholarship Application Submission (MahaDBT)

**Scope of this document:** how e-Samanvit's *Scholarship Application* flow goes
from "prototype that records a submission internally" to "actually applies the
citizen's term/semester scholarship to the real MahaDBT system" — without
redesigning the architecture that already exists.

---

## 1. Where the scholarship flow stands today

| Piece | Current state |
|---|---|
| `backend/src/schemas/government-services/scholarship.schema.js` | Real schema: full name, DOB, mobile, email, category, college, course, **academic year (term)**, annual family income, DBT-linked bank account (last 4 digits) |
| `backend/src/adapters/mocks/MockMahaDBTAdapter.js` | Returns **fixed fake data** (`B.Tech Computer Engineering`, a fake bank last-4) — not connected to any real MahaDBT account |
| `POST /api/citizen-data/fetch`, `POST /api/services/:id/prepare` | Fully working *internally* — consent-checked, auto-filled, reviewable |
| `POST /api/applications` | Validates + "submits" — but "submitted" only means **recorded by e-Samanvit**, never sent to MahaDBT |
| Tracking (`ApplicationTrackingService`) | Can only ever honestly report `SUBMITTED` — there is no real channel back from MahaDBT, so no `Under Review` / `Approved` / `Disbursed` is possible yet |

In short: today, filling and "submitting" a scholarship application through
e-Samanvit is a realistic **rehearsal** of the real flow, not the real
transaction. The goal below is to close that last mile.

---

## 2. What "direct submission" actually requires

### 2.1 Government-side access (the real blocker — not code)
- Authorized API access / MoU with **MahaDBT** (Higher & Technical Education
  Department), or routing through **API Setu** (Government of India's
  API exchange for department-to-department integration)
- A sandbox/UAT environment from MahaDBT to test against before any live
  submission is attempted
- Legal/data-sharing sign-off, since scholarship data includes income and
  reservation category (sensitive fields already marked `sensitive: true`
  in the schema)

**This is the actual gating item.** Everything in section 2.2–2.5 can be
built today; none of it can go live without this.

### 2.2 A real citizen identity (replacing the demo `citizenId`)
MahaDBT will not accept a submission tied to a string the client made up.
Production needs:
- Aadhaar-based e-KYC, or
- DigiLocker-based identity assertion, or
- State SSO / Maha-IT single sign-on

`citizenId` is already passed as a plain parameter everywhere specifically
so `req.body.citizenId` can be swapped for `authenticatedUser.citizenId`
later — that substitution point already exists by design, it's just not
wired to anything real yet.

### 2.3 A real `MahaDBTAdapter` (fetch side)
`MockMahaDBTAdapter` already implements the `GovernmentAdapter` contract
(`getSourceName()`, `fetchData()`). A real adapter:
- Lives at `backend/src/adapters/production/MahaDBTAdapter.js` (new folder,
  parallel to `mocks/`)
- Implements the same two methods, calling MahaDBT's real data API instead
  of returning `DEMO_RECORD`
- Is registered in `AdapterRegistry` in place of the mock

**Nothing above the adapter layer changes.** `DataAggregatorService`,
`FieldMapperService`, the consent flow, and the entire frontend
`gov-services` page keep working exactly as they do today — this is the
whole reason the adapter pattern exists.

### 2.4 A new contract: submission (not just fetch)
`GovernmentAdapter` only covers *reading* data. Actually filing an
application needs a second, equally small contract — the same shape as the
`ApplicationStatusAdapter` boundary already built in Prompt 8:

```
GovernmentSubmissionAdapter
  getSourceName()
  submitApplication(payload, consentToken) → { referenceId, submittedAt }
```

- `backend/src/adapters/interfaces/GovernmentSubmissionAdapter.js` (new)
- `backend/src/adapters/mocks/MockMahaDBTSubmissionAdapter.js` — an honest
  mock that returns a clearly-fake reference until the real one exists
  (mirrors how `MockApplicationStatusAdapter` is honest about `SUBMITTED`
  being the only real status today)
- Later: `MahaDBTSubmissionAdapter` (real), same contract

`ApplicationService.submitApplication()` (`services/application/
ApplicationService.js`) is the one place that calls this — after its
existing re-validation and re-fetch step, not instead of it. The
application record then stores MahaDBT's **real** reference number instead
of only an internal one.

### 2.5 Real status tracking
`ApplicationStatusAdapter` already exists as a contract
(`getStatus(application)`). A real `MahaDBTStatusAdapter` implementing it —
via polling MahaDBT's status API or receiving a webhook — is what finally
lets `GET /api/applications/:id` report genuine stages (`Under Review`,
`Approved`, `Disbursed`, `Rejected`) instead of only `SUBMITTED`. This
slots into `ApplicationTrackingService` without changing its calling
convention.

### 2.6 Supporting infrastructure that has to exist before go-live
- **Persistent storage.** `ConsentStore`, `AuditStore`, `ApplicationStore`
  are in-memory today (already built behind an abstraction, per the
  README's stated limitation) — a real submission cannot be allowed to
  vanish on a backend restart, so this becomes a hard requirement, not a
  nice-to-have.
- **Document upload / DigiLocker fetch.** A real scholarship application
  needs supporting documents (marksheet, caste/income certificate) —
  today's schema has no file-upload field at all.
- **Security hardening** appropriate to handling real income/category data
  in transit and at rest, beyond the prototype-level CORS/consent-token
  hygiene already in place.

---

## 3. Phased roadmap

| Phase | Goal | Depends on |
|---|---|---|
| **Phase 1** | Request MahaDBT / API Setu sandbox access for the Higher & Technical Education Department's scholarship API | Government liaison, not code |
| **Phase 2** | Build `MahaDBTAdapter` (real fetch) against the sandbox, behind the existing `GovernmentAdapter` contract | Phase 1 sandbox credentials |
| **Phase 3** | Build `GovernmentSubmissionAdapter` contract + `MahaDBTSubmissionAdapter`, wire into `ApplicationService.submitApplication()` | Phase 2 |
| **Phase 4** | Add document upload/DigiLocker fetch to the scholarship schema + form engine | Independent of Phase 1–3, can start earlier |
| **Phase 5** | Replace demo `citizenId` with real Aadhaar/DigiLocker/SSO-based identity | Government identity-provider access |
| **Phase 6** | Move `ConsentStore`/`AuditStore`/`ApplicationStore` to a real database | Independent, can start any time |
| **Phase 7** | Add `MahaDBTStatusAdapter` for real tracking stages | Phase 3 (needs a real reference ID to track) |
| **Phase 8** | Security review, MahaDBT UAT sign-off, limited pilot, then general rollout | All of the above |

**Key point for judges/reviewers:** because every government touchpoint in
this codebase — fetch, submission, status — is expressed as a small,
swappable contract (`GovernmentAdapter`, `GovernmentSubmissionAdapter`,
`ApplicationStatusAdapter`), none of Phases 2, 3, 5, or 7 require touching
the consent flow, the field mapper, the schema engine, or a single line of
the citizen-facing frontend. The architecture was built so that closing
this gap is additive, not a rewrite.
