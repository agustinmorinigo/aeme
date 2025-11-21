-- ============================================================================
-- PROFILES ROLES SCHEMA
-- ============================================================================
-- Tabla de relación entre perfiles y roles (many-to-many)
-- DEPENDENCIAS: profiles.sql, roles.sql

-- Crear tabla profilesRoles
CREATE TABLE IF NOT EXISTS "public"."profilesRoles" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "profileId" "uuid" NOT NULL,
    "roleId" integer NOT NULL
);

-- Asignar owner
ALTER TABLE "public"."profilesRoles" OWNER TO "postgres";

-- Agregar constraints
ALTER TABLE ONLY "public"."profilesRoles"
    ADD CONSTRAINT "profilesRoles_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."profilesRoles"
    ADD CONSTRAINT "uniqueProfileRole" UNIQUE ("profileId", "roleId");

-- Agregar foreign keys
ALTER TABLE ONLY "public"."profilesRoles"
    ADD CONSTRAINT "fkProfileIdToProfilesInProfilesRoles" FOREIGN KEY ("profileId") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."profilesRoles"
    ADD CONSTRAINT "fkRoleIdToRolesInProfilesRoles" FOREIGN KEY ("roleId") REFERENCES "public"."roles"("id") ON DELETE CASCADE;

-- Habilitar Row Level Security
ALTER TABLE "public"."profilesRoles" ENABLE ROW LEVEL SECURITY;

-- Crear políticas RLS
CREATE POLICY "Enable read access for all users" ON "public"."profilesRoles" FOR SELECT USING (true);

-- Permisos
GRANT ALL ON TABLE "public"."profilesRoles" TO "anon";
GRANT ALL ON TABLE "public"."profilesRoles" TO "authenticated";
GRANT ALL ON TABLE "public"."profilesRoles" TO "service_role";