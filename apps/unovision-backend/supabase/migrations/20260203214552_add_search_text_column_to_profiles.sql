-- =====================================================
-- Migration: Add search_text column to profiles for multi-field search
-- Description: Creates a generated column that concatenates searchable fields
--              and adds a GIN trigram index for fast partial text search
-- =====================================================

-- 1. Enable pg_trgm extension for trigram-based text search
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- 2. Add generated search_text column to profiles table
-- This column automatically concatenates and lowercases all searchable fields
-- Note: documentType (ENUM) is excluded because cast to text is not immutable for generated columns
ALTER TABLE "public"."profiles"
  ADD COLUMN "searchText" text
  GENERATED ALWAYS AS (
    lower(
      coalesce("name", '') || ' ' ||
      coalesce("lastName", '') || ' ' ||
      coalesce("documentValue", '') || ' ' ||
      coalesce("email", '')
    )
  ) STORED;

-- 3. Create GIN index with trigram operator class for fast ILIKE queries
-- This index enables fast partial text search (e.g., "Fern" finds "Fernandez")
CREATE INDEX "idx_profiles_search_text_trgm"
  ON "public"."profiles"
  USING GIN ("searchText" gin_trgm_ops);

-- 4. Add comment to column
COMMENT ON COLUMN "public"."profiles"."searchText" IS
  'Auto-generated searchable text combining name, lastName, documentValue, and email. Used for multi-field text search with trigram index.';
