create policy "Allow uploads for authenticated users"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'screenshots' AND auth.role() = 'authenticated'
);
