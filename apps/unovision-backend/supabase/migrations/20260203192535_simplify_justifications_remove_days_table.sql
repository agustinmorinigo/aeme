-- =====================================================
-- Migration: Simplify justifications by removing justificationDays table
-- Description: Add startDate, endDate, and organizationId directly to justifications
--              and remove the separate justificationDays table for simplicity
-- =====================================================

-- 1. Add new columns to justifications table (organizationId already exists)
ALTER TABLE "public"."justifications"
  ADD COLUMN "startDate" date,
  ADD COLUMN "endDate" date;

-- 2. Migrate existing data from justificationDays to new columns
-- For each justification, set startDate to MIN(date) and endDate to MAX(date)
UPDATE "public"."justifications" j
SET
  "startDate" = (
    SELECT MIN(date)
    FROM "public"."justificationDays"
    WHERE "justificationId" = j.id
  ),
  "endDate" = (
    SELECT CASE
      WHEN COUNT(*) > 1 THEN MAX(date)
      ELSE NULL
    END
    FROM "public"."justificationDays"
    WHERE "justificationId" = j.id
  );

-- 3. Make startDate NOT NULL after data migration (organizationId is already NOT NULL)
ALTER TABLE "public"."justifications"
  ALTER COLUMN "startDate" SET NOT NULL;

-- 4. Add check constraint to ensure endDate is after to startDate
ALTER TABLE "public"."justifications"
  ADD CONSTRAINT "check_date_range"
    CHECK ("endDate" IS NULL OR "endDate" > "startDate");

-- 5. Drop the update_justification function (no longer needed)
DROP FUNCTION IF EXISTS "public"."update_justification"(uuid, "justificationType", date[], text, text);

-- 6. Drop the justificationDays table and its policies
DROP POLICY IF EXISTS "authorized_roles_all_justification_days" ON "public"."justificationDays";
DROP TABLE IF EXISTS "public"."justificationDays";

-- 7. Add index on startDate for date range queries (organizationId index already exists)
CREATE INDEX IF NOT EXISTS "idx_justifications_start_date"
  ON "public"."justifications" ("startDate");

-- 8. Add comment to table
COMMENT ON TABLE "public"."justifications" IS
  'Stores employee justifications with date ranges. Use startDate for single-day justifications, and both startDate and endDate for multi-day ranges.';
