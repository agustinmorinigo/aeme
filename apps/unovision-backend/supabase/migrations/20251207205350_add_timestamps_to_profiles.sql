ALTER TABLE "public"."profiles" 
  ADD COLUMN IF NOT EXISTS "createdAt" timestamp with time zone DEFAULT NOW() NOT NULL,
  ADD COLUMN IF NOT EXISTS "updatedAt" timestamp with time zone DEFAULT NOW() NOT NULL;

UPDATE "public"."profiles" 
  SET "createdAt" = NOW(), "updatedAt" = NOW();

CREATE TRIGGER "set_updated_at_on_profiles"
  BEFORE UPDATE ON "public"."profiles"
  FOR EACH ROW
  EXECUTE FUNCTION "public"."handle_updated_at"();