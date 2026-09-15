# CLAUDE.md — Living High Property Inspection App

Guidance for Claude Code (and any developer) working in this repo. Keep this file current when
architecture, conventions, or key decisions change.

## What this project is

A private, **mobile-first** web app for Living High (rental property company,
`livinghigh.com.au`) property managers. Managers log in on their **phone**, photograph rooms
during **incoming/outgoing** tenant inspections, and generate a branded **PDF report** that is
stored, downloadable, and auto-emailed.

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
- Login: **per-manager accounts** (no shared password). Public signup disabled; admins seed users.
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

- `profiles` — `id` (FK auth.users), `full_name`, `email`, `created_at`.
- `inspections` — `id`, `created_by` (FK profiles), `property_address`, `room_unit?`,
  `inspection_type` ('incoming'|'outgoing'), `tenant_name`, `owner_name?`, `lease_start?`,
  `lease_expiry?`, `lease_details?`, `rented_for?`, `inspection_date` (default today),
  `status` ('draft'|'completed'), `pdf_path?`, `gallery_token` (uuid), `created_at`.
- `rooms` — `id`, `inspection_id` (FK), `name`, `sort_order`.
- `photos` — `id`, `inspection_id` (FK), `room_id` (FK), `storage_path`, `taken_at`
  (EXIF DateTimeOriginal if present, else upload time), `sort_order`, `created_at`.

**RLS**: managers may read/write only their own inspections/rooms/photos. Storage buckets
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
`Living High Pty Ltd`. Keep these in one config module.

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

## Open items to confirm

- Report title wording per type ("Routine" vs "Incoming/Outgoing Inspection Report").
- Exact email recipients (office only, or also owner/tenant).
- Company header details still current (sample shows Perth; properties appear NSW).
- Whether to surface optional Owner/Lease fields in the form or leave blank like the sample.
