-- NOTE: As of 2026, Supabase best practices recommend defining storage buckets in config.toml
-- instead of SQL migrations. This migration is kept for historical purposes and existing
-- deployments. For local development, the bucket is now defined in:
-- apps/unovision-backend/supabase/config.toml under [[storage.buckets]]

-- Create storage bucket for justification documents
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'justification-documents',
  'justification-documents',
  true,
  5242880, -- 5MB in bytes
  ARRAY['application/pdf', 'image/jpeg', 'image/png', 'image/webp', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
);

-- Policy: Allow authenticated users with roleId 1 or 5 to upload files
CREATE POLICY "authorized_roles_upload_justification_documents"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'justification-documents'
    AND EXISTS (
      SELECT 1 FROM "public"."profilesRoles"
      WHERE "profileId" = auth.uid()
      AND "roleId" IN (1, 5)
    )
  );

-- Policy: Allow public read access to justification documents
CREATE POLICY "public_read_justification_documents"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'justification-documents');

-- Policy: Allow authenticated users with roleId 1 or 5 to update files
CREATE POLICY "authorized_roles_update_justification_documents"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'justification-documents'
    AND EXISTS (
      SELECT 1 FROM "public"."profilesRoles"
      WHERE "profileId" = auth.uid()
      AND "roleId" IN (1, 5)
    )
  );

-- Policy: Allow authenticated users with roleId 1 or 5 to delete files
CREATE POLICY "authorized_roles_delete_justification_documents"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'justification-documents'
    AND EXISTS (
      SELECT 1 FROM "public"."profilesRoles"
      WHERE "profileId" = auth.uid()
      AND "roleId" IN (1, 5)
    )
  );
