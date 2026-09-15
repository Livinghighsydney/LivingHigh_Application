# supabase

Database schema and Storage setup for the Living High inspection app.

```
migrations/
  0001_init.sql      # enums, tables, indexes, profile trigger, RLS policies
  0002_storage.sql   # private buckets + Storage RLS policies
```

## Applying the schema

**Option A — Dashboard (no tooling):** open the project's **SQL Editor**, paste
`0001_init.sql`, run it, then paste `0002_storage.sql` and run it. In that order.

**Option B — Supabase CLI:**

```bash
supabase init            # once, if not already initialised
supabase link --project-ref <your-project-ref>
supabase db push         # applies everything in migrations/
```

## What the schema does

- Tables `profiles`, `inspections`, `rooms`, `photos` (per CLAUDE.md).
- A trigger auto-creates a `profiles` row when an auth user is added; it reads
  `full_name` from the user's metadata.
- RLS so a manager can only see/edit their own inspections and related rooms/photos.
- Two **private** Storage buckets: `inspection-photos`, `inspection-reports`.
- The public gallery is served by the backend via the service-role key (no
  anonymous DB/storage access is exposed).

---

## What I need from you

1. **A Supabase project.** Create one at https://supabase.com (I can't create it
   for you). Note the region.
2. **The project keys** (Project Settings → API):
   - Project URL
   - `anon` public key
   - `service_role` secret key
   Send these and I'll drop them into `frontend/.env.local` and `backend/.env`
   (or you can fill those yourself from the `.env.example` files).
3. **Apply the migrations** using Option A or B above, and confirm they ran
   without errors.
4. **Disable public signup** (Authentication → Providers/Settings → turn off
   "Allow new users to sign up"). Managers are seeded, not self-registered.
5. **Seed the manager accounts** (Authentication → Users → Add user). Set a
   `full_name` in the user's metadata so the profile trigger fills it in, e.g.:
   ```json
   { "full_name": "Sophia Russell" }
   ```

Once I have the keys (item 2) I'll wire the frontend auth + upload flow and the
backend generate endpoint to the live project. Everything else you can do from
the dashboard.
