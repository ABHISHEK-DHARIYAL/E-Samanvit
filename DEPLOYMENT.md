# Deploying e-Samanvit — Render (backend) + Vercel (frontend)

This is a monorepo: `backend/` and `frontend/` deploy as two **separate**
services. Deploy the backend first — the frontend needs its URL.

---

## Order of operations (important — each step needs the previous one's output)

1. Deploy the **backend** to Render → note its URL
2. Deploy the **frontend** to Vercel, with `API_BASE_URL` set to that
   backend URL → note the frontend's URL
3. Go back to Render and set `FRONTEND_ORIGIN` to the frontend's real
   production URL, then redeploy the backend

---

## Step 1 — Backend on Render

**Option A — using the included `render.yaml` blueprint**
1. Push this repo to GitHub/GitLab
2. In Render: **New → Blueprint**, point it at the repo. It reads
   `render.yaml` at the repo root and creates the service automatically
   (root directory `backend`, `npm install`, `npm start`)

**Option B — manual setup**
1. Render: **New → Web Service**, connect the repo
2. **Root Directory:** `backend`
3. **Build Command:** `npm install`
4. **Start Command:** `npm start`
5. **Environment variables:**
   | Key | Value |
   |---|---|
   | `NODE_ENV` | `production` |
   | `FRONTEND_ORIGIN` | `https://e-samanvit.vercel.app` (your production Vercel URL — update after Step 2 if different) |

   Do **not** set `PORT` — Render injects it automatically, and
   `backend/src/config/env.js` already reads `process.env.PORT`.

6. Deploy. Once live, note the URL, e.g. `https://e-samanvit-backend.onrender.com`
7. Verify it's actually up: open `<that URL>/api/health` in a browser —
   should return `{"success":true,"service":"e-samanvit-backend","status":"healthy",...}`

   > Render's free plan spins the service down after inactivity — the
   > first request after idle can take ~30–60s to respond. This is
   > expected, not a bug.

---

## Step 2 — Frontend on Vercel

1. Vercel: **New Project**, connect the repo
2. **Root Directory:** `frontend`
3. Vercel should auto-detect `buildCommand`/`outputDirectory` from
   `frontend/vercel.json` (`npm run build`, output `dist`) — if it asks,
   confirm those explicitly
4. **Environment variable** (Project Settings → Environment Variables),
   for **Production** (and Preview, if you want preview deployments to
   also hit the real backend):
   | Key | Value |
   |---|---|
   | `API_BASE_URL` | the Render backend URL from Step 1, e.g. `https://e-samanvit-backend.onrender.com` — **must be `https://`**, no trailing slash |

   This is read by `frontend/build.js` at build time and baked into
   `js/config.js` — it is *not* read at runtime, so a change to this
   value always needs a redeploy to take effect.
5. Deploy. Note the resulting production URL, e.g.
   `https://e-samanvit.vercel.app`

---

## Step 3 — Point the backend's CORS at the real frontend URL

Back in Render, on the backend service's environment variables:
- Confirm `FRONTEND_ORIGIN` is set to the **exact** production Vercel URL
  from Step 2 (e.g. `https://e-samanvit.vercel.app`) — not a preview URL
- Redeploy the backend if you changed it

`backend/src/middleware/cors.js` automatically also allows any
`https://<that project's slug>-*.vercel.app` origin — so Vercel's
per-deployment preview URLs (e.g.
`https://e-samanvit-abc123-yourname.vercel.app`) work with **no further
configuration**, as long as `FRONTEND_ORIGIN` itself is set correctly.

---

## Verifying the full connection

1. Open the deployed frontend URL
2. Open the browser DevTools console — on page load you should see
   `[ApiClient] backend reachable: {...}` (logged by
   `frontend/js/services/apiClient.js`'s dev-only health check)
3. Navigate to **Apply Online / Government Services** — the service list
   should load instead of showing "Unable to connect to e-Samanvit
   services"

If it still fails:
- **"Unable to connect..."** → `API_BASE_URL` is wrong/missing, or the
  Render backend is asleep/down — check `<backend URL>/api/health` directly
- **A CORS error in the console** → `FRONTEND_ORIGIN` on Render doesn't
  match the frontend's actual origin — check it's the exact production
  URL, no trailing slash, `https://`

---

## Local development (unaffected by any of the above)

```
# terminal 1
cd backend && npm install && npm run start

# terminal 2
cd frontend && npm install && npm run dev
```

`frontend/build.js` falls back to `frontend/.env` (gitignored, copy from
`.env.example`) or `http://localhost:5000` when no `API_BASE_URL`
environment variable is present — so local dev needs no configuration
changes at all.
