# CLAUDE.md — Living High Property Inspection App

Guidance for Claude Code (and any developer) working in this repo. Keep this file current when
architecture, conventions, or key decisions change.

## What this project is

A private, **mobile-first** web app for Living High (rental property company,
`livinghigh.com.au`) property managers. Managers log in on their **phone**, photograph rooms
during **incoming/outgoing** tenant inspections, and generate a branded **PDF report** that is
stored, downloadable, and auto-emailed.

There are two roles: **managers** (the default) do inspections; a smaller set of **admins** manage
manager accounts, view every manager's inspections, and edit company/report settings — see
[Admin features](#admin-features). The login is a shared entry point; the app routes each role to
what they can access.

- Deployed on **Vercel** at `inspections.livinghigh.com.au` (subdomain via DNS CNAME).
- Linked from the WordPress main site via a **private/hidden link** (security is the app login,
  not URL secrecy).
- Replaces an earlier proof-of-concept mockup (`living-high-inspections.vercel.app`).

Reference assets live in `mockup/`: `S1.png` (login), `S2.png` (home), `S3.png` (new inspection
form), `report_format.pdf` (the exact target report layout).

## Tech stack

- **Next.js (App Router) + TypeScript**, **Tailwind CSS**.
- **Supabase**: Auth (email/password, public signup disabled), Postgres, Storage (private buckets,
  signed URLs).
- **@react-pdf/renderer** — server-side PDF generation matching `mockup/report_format.pdf`.
- **Resend** — auto-email the PDF as an attachment.
- **browser-image-compression** — client-side photo compression before upload.
- PWA manifest + icons (installable "Add to home screen").

## Core product decisions (do not silently change)

- Camera: **native capture** via `<input type="file" accept="image/*" capture="environment" multiple>`
  — NOT a custom `getUserMedia` UI.
- Login: **per-account** (no shared password), for both managers and admins. Public signup
  disabled; **admins seed/manage users in-app** (see Admin features), no self-registration.
- Roles: **`manager`** (default) and **`admin`**, stored on `profiles.role`. Admin-only screens
  live under `/admin/*`, gated by the proxy and by RLS.
- Reports are **stored and viewable later** (My Inspections history + shareable gallery).
- PDF delivery: **download to phone + auto-email**.
- Capture flow: **multiple rooms per inspection**, **free-typed** room names, **photos only**
  (no per-photo notes, no signature).
- Keep the mockup brand and terminology (**Incoming / Outgoing**, not Move-in/Move-out).

## Brand / design tokens

- Navy background/base: `#0f1729`. White cards on light-grey (`~#dfe3ea`) app background.
- Gold accent for selected toggles (e.g. Inspection Type).
- Uppercase, letter-spaced, muted-grey field labels; bold sans headings.
- Mountain "Living High" logo (three-peak strokes).
- Report blue banner accent: `~#1F5C8B`.
- Mobile-first, single column, large touch targets, sticky bottom primary CTA.

## Data model (Supabase / Postgres)

- `profiles` — `id` (FK auth.users), `full_name`, `email`, `role` ('manager'|'admin', default
  'manager'), `is_active` (bool, default true), `created_at`.
- `inspections` — `id`, `created_by` (FK profiles), `property_address`, `room_unit?`,
  `inspection_type` ('incoming'|'outgoing'), `tenant_name`, `owner_name?`, `lease_start?`,
  `lease_expiry?`, `lease_details?`, `rented_for?`, `inspection_date` (default today),
  `status` ('draft'|'completed'), `pdf_path?`, `gallery_token` (uuid), `created_at`.
- `rooms` — `id`, `inspection_id` (FK), `name`, `sort_order`.
- `photos` — `id`, `inspection_id` (FK), `room_id` (FK), `storage_path`, `taken_at`
  (EXIF DateTimeOriginal if present, else upload time), `sort_order`, `created_at`.
- `settings` — **singleton row** of admin-editable company/report values used at generate time:
  `company_address`, `company_phone`, `company_email`, `signatory`, `footer`,
  `report_office_email`, `report_cc?`, `updated_by` (FK profiles), `updated_at`. Overrides the
  code defaults in the company config module (config is the fallback/seed).

**RLS**: managers may read/write only their own inspections/rooms/photos. **Admins** may
read/write across all managers' inspections/rooms/photos — gate this with an `is_admin()`
`security definer` helper that checks the caller's `profiles.role`, and add admin policies that
use it. Only admins may write `settings`; all authenticated roles may read it. Storage buckets
`inspection-photos` and `inspection-reports` are private; serve via signed URLs. The public
gallery reads by `gallery_token` through a scoped policy / server route only.

## Routes / screens

- `/login` — S1 sign-in.
- `/` — S2 home: greeting, **Start Inspection**, **My Inspections**, Sign out.
- `/inspections/new` — S3 form: Property Address, Room/Unit, Inspection Type toggle, Tenant Name;
  optional collapsed Owner/Lease fields. Creates a `draft`.
- `/inspections/[id]/capture` — rooms list, "Add room" (free-type), per-room "Add photos"
  (native camera) with thumbnail grid + delete. Compress client-side, upload **directly** to
  Supabase Storage. Sticky "Review & Generate".
- `/inspections/[id]` — review + **Generate Report**.
- `/inspections` — My Inspections list.
- `/gallery/[token]` — public shareable photo gallery (the PDF "Gallery Link").
- `POST /api/inspections/[id]/generate` — build PDF, store, email, return signed download URL.

Admin-only (gated to `role = 'admin'`):

- `/admin` — admin dashboard / entry.
- `/admin/users` — manager account management (invite, edit, deactivate, reset password).
- `/admin/inspections` — org-wide inspection list with filters; view/download any report.
- `/admin/settings` — edit company & report settings (the `settings` singleton).
- `POST /api/admin/users` (and `PATCH`/`DELETE`) — create/update/deactivate accounts via the
  Supabase Admin API (service-role, server-only).
- `PUT /api/admin/settings` — persist company/report settings (admin-only).

## Admin features

Admins are managers with `profiles.role = 'admin'`. All admin UI lives under `/admin/*` and all
privileged mutations go through **server routes using the service-role key** — never the client.
Access is enforced twice: the proxy redirects non-admins away from `/admin/*` and `/api/admin/*`,
and RLS (`is_admin()`) backs it at the database.

1. **Manager account management** (`/admin/users`) — invite/create manager accounts by email, edit
   `full_name`, deactivate/reactivate (`is_active`), and trigger password resets. Backed by the
   Supabase **Admin API** (`auth.admin.*`) in a server route; set `full_name` in user metadata so
   the profile trigger fills it. Replaces manual seeding in the Supabase dashboard.
2. **Org-wide inspections** (`/admin/inspections`) — list **every** manager's inspections with
   filters (manager, date range, `status`); open the review page, download any report PDF, and
   open galleries. Managers still only see their own via `/inspections`.
3. **Company & report settings** (`/admin/settings`) — edit the `settings` singleton: company
   header (address, phone, email), `signatory`, `footer`, and report email recipients. The PDF and
   email modules read `settings` at generate time, falling back to the company config module when a
   value is blank.
4. **Roles & access control** — `profiles.role` (+ `is_active`); proxy gating for `/admin/*`; an
   `is_admin()` `security definer` helper and admin RLS policies granting org-wide read/write.
   Deactivated accounts (`is_active = false`) are rejected at login.

**First admin**: seed one account and set `role = 'admin'` directly in SQL (or the dashboard);
thereafter admins create others in-app.

## PDF report (must match `mockup/report_format.pdf`)

1. **Cover page**: right-aligned company header (address/phone/email), rule, title
   "…Inspection Report", details table (Address, Owner Name, Tenant Name, Lease Start/Expiry,
   Lease Details, Rented for, Inspection Date — blanks allowed), italic letter body,
   "View your photos/videos online via **Gallery Link**" → `/gallery/[token]`, "Regards /
   Sophia Russell".
2. **Observations page**: blue "Detailed Observations From This Inspection" banner; table
   `Area of Property | Clean | Undamaged | Working | Maintenance | Notes`, one row per room
   (check columns blank — photos-only); disclaimer block.
3. **Media pages**: blue "Media" banner; **2-column grid grouped by room**; caption per photo:
   "`Room :`" + "`Photo: Taken: DD/MM/YYYY - HH:MM`".
4. **Every page**: header "Address of Premises:" + address; footer "Living High Pty Ltd" (left)
   + "Page X of Y" (right).

Company constants (from the sample — confirm before launch): `200 Infinity Loop, Perth New South
Wales 6000`, phone `0421189546`, `Sophia@livinghigh.com.au`, signature `Sophia Russell`, footer
`Living High Pty Ltd`. Keep these in one config module as **defaults/seed**; the admin-editable
`settings` row overrides them at generate time when present.

## Environment variables

- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server-only; used by the generate route)
- `RESEND_API_KEY`, `REPORT_FROM_EMAIL`, `REPORT_OFFICE_EMAIL`
- `NEXT_PUBLIC_APP_URL`

## Conventions

- TypeScript throughout; App Router server components by default, client components only where
  interactivity/camera is needed.
- Never expose the service-role key to the client; use it only in server routes.
- Compress images client-side (target ~1600px, quality ~0.7) before upload; show upload progress;
  handle EXIF orientation.
- All camera/upload pages require HTTPS (Vercel provides it) — camera will not work over HTTP.
- Keep the UI minimal: few buttons, big tap targets, sticky bottom CTA.

## Deploy

- Vercel project → add custom domain `inspections.livinghigh.com.au` → CNAME in DNS.
- WordPress: private/hidden menu item or password-protected page linking to the subdomain.

## Verification

- `npm run dev`, then walk login → new → capture → generate.
- Test on a **real phone** via a Vercel preview URL (HTTPS): native camera opens, multi-add,
  compression, upload progress.
- Generate a report and **visually diff against `mockup/report_format.pdf`**.
- Confirm Resend email arrives with the PDF; confirm mobile download.
- Confirm RLS: one manager cannot see another's inspections.
- Confirm admin gating: a `manager` is redirected from `/admin/*`; an `admin` can list all
  inspections, manage users, and save settings. A deactivated account cannot log in.
- Confirm `settings` edits flow through to a freshly generated PDF (header/signatory/recipients).

## Open items to confirm

- Report title wording per type ("Routine" vs "Incoming/Outgoing Inspection Report").
- Exact email recipients (office only, or also owner/tenant).
- Company header details still current (sample shows Perth; properties appear NSW).
- Whether to surface optional Owner/Lease fields in the form or leave blank like the sample.
