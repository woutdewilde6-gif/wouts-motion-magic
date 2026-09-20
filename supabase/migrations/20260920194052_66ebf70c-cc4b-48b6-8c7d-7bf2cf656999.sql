CREATE POLICY "Iedereen kan automotive shorts video's afspelen"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'automotive-shorts');