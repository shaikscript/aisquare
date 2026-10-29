# AI Square IT Solutions — Implementation Audit & Zero-Budget Architecture

## 1. Initial Inspection & Current Verification Audit (Section 12)

### Pre-Build Workspace Inspection (Phase 1)
- **Initial State**: Empty greenfield workspace (`/home/user` contained 0 project files).
- **Agreed First Milestone**: Set up the full-stack zero-budget foundation and implement **Phase 2 (Public Corporate Website)** + **Phase 3 (Authentication, Role-Based Access Control, and Employee/Admin Portals)**, omitting a standalone `/services` navigation page in favor of a **"Showcase Our Work"** section on the Homepage, and inventing zero unconfirmed company details.

### Current Post-Implementation Status (End of Phase 3)
1. **Features Implemented & End-to-End Verified**:
   - **Public Corporate Website**:
     - `/` (Home with Hero, Company Introduction, **"Showcase Our Work"** header & section, AI Evaluation Workforce overview, Working Approach, Careers & Business Enquiry CTAs).
     - `/about` (Company business model, guideline adherence approach, operational principles, and dynamic support for admin-approved Mission/Vision/Values without invented facts).
     - `/careers` (Live published job listings from SQLite + Candidate Application form supporting both open roles and General Applications, with validated `.pdf/.doc/.docx` private resume uploads).
     - `/contact` (Validated Business Enquiry form persisted to SQLite; displays direct contact details only when configured by management).
     - `/privacy` & `/terms` (Company-specific Privacy Policy and Terms & Conditions matching actual implementation).
     - `/login` (Dedicated Employee Portal login via email or username, with managed password-recovery instructions).
     - `/services` cleanly redirects to `/#showcase-our-work`; unknown paths render a helpful custom 404 page.
   - **Authentication, Authorization & Security**:
     - Zero hardcoded passwords in frontend or backend code; supports one-time `ADMIN_BOOTSTRAP_TOKEN` / `data/.bootstrap_token` first-run setup and `npm run provision` CLI provisioning.
     - Passwords hashed server-side using salted `crypto.scrypt` + `crypto.timingSafeEqual`.
     - Server-verified `HttpOnly; SameSite=Lax` session cookies stored in SQLite (`sessions`).
     - Separate `/login` (Employees) and `/admin/login` (Admins) endpoints and UIs; strict `401` / `403` server middleware enforcement.
     - Self-service password updates (`/api/auth/change-password`) in both portals.
   - **Employee Portal (`/portal`)**:
     - Authenticated Employee Dashboard displaying strictly the signed-in employee's own profile (`EMP-XXXX`) and own portal activity history.
   - **Admin Portal (`/admin`)**:
     - Management Overview (`/admin`) showing real database counts (no fabricated statistics).
     - Full Employee Account Management (`/admin/employees`): create, inspect/edit, deactivate (instantly revoking active sessions), reactivate, reset password, and soft-delete while preserving audit history.
     - Careers, Applications & Public Settings (`/admin/applications`): create/publish/close/delete vacancies, review applications & update statuses (`New`, `Under Review`, `Shortlisted`, `Selected`, `Rejected`), securely open private resumes via authenticated stream, manage Contact Us enquiries, and configure approved public company details.
     - Administrative Audit & Portal Activity (`/admin/activity`): protected server-side audit trail with before/after JSON snapshots and honest in-portal employee connection records.
2. **Features Present as Transparent Incomplete-Phase Specifications (Zero Fake Data)**:
   - Phase 4 routes (`/portal/guidelines`, `/admin/guidelines`)
   - Phase 5 routes (`/portal/assessments`, `/portal/results`, `/admin/assessments`, `/admin/question-bank`, `/admin/results`)
   - Phase 6 routes (`/portal/readiness`, `/admin/readiness`)
   - Phase 7 routes (`/portal/announcements`, `/portal/notifications`, `/portal/feedback`, `/admin/announcements`)
   - Each route enforces RBAC and explicitly displays an *"Incomplete — Scheduled for Phase X"* banner rather than fabricated client-side placeholders.
3. **Broken Routes, Buttons, Imports, or Forms**:
   - **None**. `npm run build` compiles cleanly and `npm run verify` passes all automated route, form, upload, RBAC, and session tests.
4. **Security & Persistent-Storage Notes**:
   - Local/sandbox persistence uses SQLite WAL (`data/aisquare.db`) and private disk storage (`storage/resumes/`) outside public static directories.
   - For cloud production deployment on free tiers, see Section 2 below regarding ephemeral filesystems on free container hosts.

---

## 2. Zero-Budget Hosting Options & Free-Tier Limitations (Section 10)

Because the initial budget is **$0**, avoid paid SaaS dependencies until traffic or storage justifies them. Before launching to production on free-tier cloud services, note these **critical free-tier limitations**:

1. **Free Node.js Container Hosts (e.g., Render Free Web Service, Koyeb Free, Fly.io Trial)**:
   - **Ephemeral Disk Warning**: Most $0 container tiers wipe local disk (`data/aisquare.db` and `storage/resumes/`) whenever the container restarts or redeploys, and spin down after ~15 minutes of inactivity (causing a 20–50 second cold-start delay on first visit).
   - **Zero-Cost Remedy for Production**:
     - **Database**: Swap/sync the SQLite driver to **Turso (libSQL Free Tier — 5 GB storage, 500M rows read/mo, $0)** or **Supabase / Neon Free Tier PostgreSQL (500 MB DB, $0)** so records survive container restarts.
     - **Private File Storage (Resumes & Guideline PDFs)**: Use **Cloudflare R2 Free Tier (10 GB/month, zero egress fees)** or **Supabase Storage Free Tier (1 GB private bucket)** using server-signed downloads so candidate resumes remain private and persistent across deploys.
2. **Email Delivery**:
   - No paid transactional email service is required or included in v1. Candidate status changes are internal-only, and employee password resets are issued directly by administrators.
3. **Backups & Bandwidth**:
   - Free-tier databases rarely include automated point-in-time recovery (PITR). Scheduled SQL/DB exports should be run periodically by an administrator once live.

---

## 3. Recommended Smallest Safe Next Step

- **Phase 4 — Central Guideline Library**:
  - Add `guidelines` and `guideline_versions` tables to `server/db/schema.sql`.
  - Enable administrators at `/admin/guidelines` to author online guidelines and upload PDF guidelines with version history.
  - Enable employees at `/portal/guidelines` to browse, search (by title, client, project, or task), and read PDF/online guidelines without mandatory completion gates, logging optional operational access timestamps honestly.
