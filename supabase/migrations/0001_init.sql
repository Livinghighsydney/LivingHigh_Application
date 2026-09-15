-- Living High inspection app — core schema
-- Data model per CLAUDE.md: profiles, inspections, rooms, photos.

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------
create type public.inspection_type as enum ('incoming', 'outgoing');
create type public.inspection_status as enum ('draft', 'completed');

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

-- One row per manager, linked to the Supabase auth user.
create table public.profiles (
  id         uuid primary key references auth.users (id) on delete cascade,
  full_name  text,
  email      text not null,
  created_at timestamptz not null default now()
);

create table public.inspections (
  id               uuid primary key default gen_random_uuid(),
  created_by       uuid not null references public.profiles (id) on delete cascade,
  property_address text not null,
  room_unit        text,
  inspection_type  public.inspection_type   not null,
  tenant_name      text not null,
  owner_name       text,
  lease_start      date,
  lease_expiry     date,
  lease_details    text,
  rented_for       text,
  inspection_date  date not null default current_date,
  status           public.inspection_status not null default 'draft',
  pdf_path         text,
  gallery_token    uuid not null default gen_random_uuid(),
  created_at       timestamptz not null default now()
);

create table public.rooms (
  id            uuid primary key default gen_random_uuid(),
  inspection_id uuid not null references public.inspections (id) on delete cascade,
  name          text not null,
  sort_order    integer not null default 0
);

create table public.photos (
  id            uuid primary key default gen_random_uuid(),
  inspection_id uuid not null references public.inspections (id) on delete cascade,
  room_id       uuid not null references public.rooms (id) on delete cascade,
  storage_path  text not null,
  taken_at      timestamptz not null default now(),
  sort_order    integer not null default 0,
  created_at    timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Indexes
-- ---------------------------------------------------------------------------
create unique index inspections_gallery_token_idx on public.inspections (gallery_token);
create index inspections_created_by_idx on public.inspections (created_by);
create index rooms_inspection_id_idx   on public.rooms (inspection_id);
create index photos_inspection_id_idx  on public.photos (inspection_id);
create index photos_room_id_idx        on public.photos (room_id);

-- ---------------------------------------------------------------------------
-- Auto-create a profile when an auth user is created
-- (admins seed users; full_name comes from user metadata).
-- ---------------------------------------------------------------------------
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Row Level Security: managers may only touch their own data.
-- ---------------------------------------------------------------------------
alter table public.profiles    enable row level security;
alter table public.inspections enable row level security;
alter table public.rooms       enable row level security;
alter table public.photos      enable row level security;

-- profiles: read/update own row only.
create policy "profiles: select own"
  on public.profiles for select
  using (id = (select auth.uid()));

create policy "profiles: update own"
  on public.profiles for update
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

-- inspections: full access to own rows.
create policy "inspections: owner all"
  on public.inspections for all
  using (created_by = (select auth.uid()))
  with check (created_by = (select auth.uid()));

-- rooms: access gated by owning inspection.
create policy "rooms: owner all"
  on public.rooms for all
  using (
    exists (
      select 1 from public.inspections i
      where i.id = rooms.inspection_id and i.created_by = (select auth.uid())
    )
  )
  with check (
    exists (
      select 1 from public.inspections i
      where i.id = rooms.inspection_id and i.created_by = (select auth.uid())
    )
  );

-- photos: access gated by owning inspection.
create policy "photos: owner all"
  on public.photos for all
  using (
    exists (
      select 1 from public.inspections i
      where i.id = photos.inspection_id and i.created_by = (select auth.uid())
    )
  )
  with check (
    exists (
      select 1 from public.inspections i
      where i.id = photos.inspection_id and i.created_by = (select auth.uid())
    )
  );

-- NOTE: the public gallery reads by gallery_token via the backend using the
-- service-role key (which bypasses RLS). No anonymous policy is exposed here,
-- keeping buckets/tables private as CLAUDE.md requires.
