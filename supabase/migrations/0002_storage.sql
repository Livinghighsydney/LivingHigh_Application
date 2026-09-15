-- Storage buckets for the inspection app. Both private — served via signed URLs.
--
-- Path convention (first folder segment = inspection id):
--   inspection-photos/{inspection_id}/{room_id}/{filename}
--   inspection-reports/{inspection_id}/report.pdf

insert into storage.buckets (id, name, public)
values
  ('inspection-photos',  'inspection-photos',  false),
  ('inspection-reports', 'inspection-reports', false)
on conflict (id) do nothing;

-- Photos: authenticated managers may read/write objects only under an
-- inspection they own (matched by the first path segment).
create policy "photos bucket: owner read"
  on storage.objects for select to authenticated
  using (
    bucket_id = 'inspection-photos'
    and exists (
      select 1 from public.inspections i
      where i.id = ((storage.foldername(name))[1])::uuid
        and i.created_by = (select auth.uid())
    )
  );

create policy "photos bucket: owner insert"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'inspection-photos'
    and exists (
      select 1 from public.inspections i
      where i.id = ((storage.foldername(name))[1])::uuid
        and i.created_by = (select auth.uid())
    )
  );

create policy "photos bucket: owner delete"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'inspection-photos'
    and exists (
      select 1 from public.inspections i
      where i.id = ((storage.foldername(name))[1])::uuid
        and i.created_by = (select auth.uid())
    )
  );

-- Reports bucket: written and read by the backend via the service-role key
-- (bypasses RLS), so no authenticated-user policies are defined here.
