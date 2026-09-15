# backend

Server-side code for the Living High inspection app — Supabase access (auth,
Postgres, Storage), PDF report generation, and report emailing.

Never expose the Supabase service-role key to the client; it belongs here only.
See `../CLAUDE.md` for the data model and PDF report spec.
