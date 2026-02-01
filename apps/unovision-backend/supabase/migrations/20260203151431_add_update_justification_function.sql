-- =====================================================
-- Function: update_justification
-- Description: Atomically updates a justification record and its associated days
-- =====================================================

CREATE OR REPLACE FUNCTION public.update_justification(
  p_justification_id UUID,
  p_type public."justificationType",
  p_days DATE[],
  p_description TEXT DEFAULT NULL,
  p_document_link TEXT DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- 1. Verify justification exists
  IF NOT EXISTS (
    SELECT 1 FROM public.justifications WHERE id = p_justification_id
  ) THEN
    RAISE EXCEPTION 'Justification with id % does not exist', p_justification_id;
  END IF;

  -- 2. Update justification record
  UPDATE public.justifications
  SET
    type = p_type,
    description = p_description,
    "documentLink" = p_document_link,
    "updatedAt" = NOW()
  WHERE id = p_justification_id;

  -- 3. Delete existing justificationDays
  DELETE FROM public."justificationDays"
  WHERE "justificationId" = p_justification_id;

  -- 4. Insert new justificationDays
  INSERT INTO public."justificationDays" ("justificationId", date)
  SELECT p_justification_id, unnest(p_days);

  -- If any step fails, PostgreSQL automatically rolls back the entire transaction
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.update_justification TO authenticated;

-- Add comment
COMMENT ON FUNCTION public.update_justification IS
'Atomically updates a justification and its associated days. All operations are wrapped in a transaction.';
