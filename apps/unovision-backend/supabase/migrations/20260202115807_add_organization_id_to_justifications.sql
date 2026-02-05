-- Add organizationId column to justifications table
ALTER TABLE "public"."justifications"
ADD COLUMN "organizationId" "uuid" NOT NULL;

-- Add foreign key constraint to organizations table
ALTER TABLE "public"."justifications"
ADD CONSTRAINT "fk_organization"
  FOREIGN KEY ("organizationId")
  REFERENCES "public"."organizations" ("id")
  ON DELETE CASCADE;

-- Create index for queries by organization
CREATE INDEX "idx_justifications_organization_id"
  ON "public"."justifications" ("organizationId");

-- Drop existing RLS policy
DROP POLICY IF EXISTS "authorized_roles_all_justifications" ON "public"."justifications";

-- Create updated RLS policy that validates organization membership
CREATE POLICY "authorized_roles_all_justifications"
  ON "public"."justifications"
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM "public"."profilesRoles" pr
      JOIN "public"."usersOrganizations" uo ON uo."profileId" = pr."profileId"
      WHERE pr."profileId" = auth.uid()
      AND pr."roleId" IN (1, 5)
      AND uo."organizationId" = "justifications"."organizationId"
    )
  );
