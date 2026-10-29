# Experimental Git Deployment & Migration Guide — AI Square IT Solutions

Yes — deploying from **Git (GitHub / GitLab)** first as a live experiment is the **best way** to test your public site, Admin Portal, and Employee Portal on a real HTTPS URL before moving to your permanent production host and custom domain.

All cloud deployment configuration files have already been added to this workspace:
- **`.gitignore`** — Excludes `node_modules/`, `client_bundle/`, `data/*.db*`, `data/.bootstrap_token`, and private `storage/` uploads so sensitive records are never committed to Git.
- **`package.json`** — Configured with Node `>=20.0.0` and `vite` in `dependencies` so cloud hosts build cleanly even when `NODE_ENV=production` is set.
- **`render.yaml`** — 1-click Render Blueprint (`npm install && npm run build` &rarr; `npm start`).
- **`railway.json`** — 1-click Railway Git config.
- **`Dockerfile` + `.dockerignore`** — Ready for Fly.io, Koyeb, DigitalOcean, AWS, or any Docker VPS.

---

## Step 1: Push Your Project to a Private GitHub Repository

1. Create a new **Private** repository on GitHub (for example: `ai-square-platform`).
2. Download/export this workspace folder to your computer, open a terminal inside the project folder, and run:

```bash
git init -b main
git add .
git commit -m "Initial release: AI Square IT Solutions platform"
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/ai-square-platform.git
git push -u origin main
```

---

## Step 2: Deploy From Git for Free / Experimental Testing

Pick whichever Git host you prefer for your experiment:

### Option A: Render.com (Free Tier Experiment)
1. Sign in to **Render.com** &rarr; **New +** &rarr; **Web Service** &rarr; connect your GitHub repo.
2. Confirm settings (auto-detected):
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
3. Under **Environment Variables**, add:
   - `NODE_ENV` = `production`
   - `ADMIN_BOOTSTRAP_TOKEN` = *(choose any secret setup phrase you want, e.g. `AISquareSetup2026!`)*
4. Click **Deploy Web Service**.
5. Once live, open `https://<your-app>.onrender.com/admin/login`, enter the `ADMIN_BOOTSTRAP_TOKEN` you chose above, and create your Primary Administrator account!

*(Note on Free Tier vs. Paid Production: Render's Free tier spins down when idle and uses ephemeral disk on redeploy. When you're ready for permanent production, either attach a **Persistent Disk** mounted at `/opt/render/project/src/data` or switch to Railway / a VPS — zero code changes required.)*

### Option B: Railway.app (Instant Git Deploy + Persistent Volume)
1. Sign in to **Railway.app** &rarr; **New Project** &rarr; **Deploy from GitHub repo**.
2. Railway automatically reads `railway.json` (`npm install && npm run build` &rarr; `npm start`).
3. Under **Variables**, add:
   - `NODE_ENV` = `production`
   - `ADMIN_BOOTSTRAP_TOKEN` = *(your chosen one-time setup token)*
   - `PORT` = `3000`
4. *(Optional for permanent storage)* Right-click the service &rarr; **Add Volume** mounted at `/app/data` and set `AISQUARE_DATA_DIR=/app/data` and `AISQUARE_STORAGE_DIR=/app/storage`.
5. Click **Generate Domain** under Settings &rarr; Networking to get your live HTTPS link!

---

## Step 3: Moving to Your Final Host & Custom Domain Later
Whenever your experiment passes and you're ready to go live permanently:
1. Connect the **same GitHub repository** to any permanent host (VPS, Railway, Render Paid + Disk, Fly.io, AWS, DigitalOcean) — every `git push` updates your live platform automatically.
2. Point your custom domain (`aisquare...`) DNS `CNAME` / `A` record to the host — SSL/HTTPS and portal logins work out-of-the-box with zero code edits.
