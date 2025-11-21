-- ============================================================================
-- USERS ORGANIZATIONS SCHEMA
-- ============================================================================
-- Tabla de relación entre usuarios y organizaciones (many-to-many)
-- DEPENDENCIAS: profiles.sql, organizations.sql

-- Crear tabla usersOrganizations
CREATE TABLE IF NOT EXISTS "public"."usersOrganizations" (
    "organizationId" "uuid" NOT NULL,
    "profileId" "uuid" NOT NULL
);

-- Asignar owner
ALTER TABLE "public"."usersOrganizations" OWNER TO "postgres";

-- Agregar constraints
ALTER TABLE ONLY "public"."usersOrganizations"
    ADD CONSTRAINT "uniqueProfileOrganization" UNIQUE ("profileId", "organizationId");

-- Agregar foreign keys
ALTER TABLE ONLY "public"."usersOrganizations"
    ADD CONSTRAINT "fkOrganizationIdToOrganizationsInUsersOrganizations" FOREIGN KEY ("organizationId") REFERENCES "public"."organizations"("id") ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."usersOrganizations"
    ADD CONSTRAINT "fkProfileIdToProfilesInUsersOrganizations" FOREIGN KEY ("profileId") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;

-- Habilitar Row Level Security
ALTER TABLE "public"."usersOrganizations" ENABLE ROW LEVEL SECURITY;

-- Crear políticas RLS
CREATE POLICY "Allow authenticated users full access on users_organizations" ON "public"."usersOrganizations" TO "authenticated" USING (true) WITH CHECK (true);

-- Permisos
GRANT ALL ON TABLE "public"."usersOrganizations" TO "anon";
GRANT ALL ON TABLE "public"."usersOrganizations" TO "authenticated";
GRANT ALL ON TABLE "public"."usersOrganizations" TO "service_role";