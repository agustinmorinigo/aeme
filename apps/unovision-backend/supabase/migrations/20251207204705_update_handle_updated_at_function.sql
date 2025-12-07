CREATE OR REPLACE FUNCTION "public"."handle_updated_at"() 
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW."updatedAt" = NOW();
  RETURN NEW;
END;
$$;