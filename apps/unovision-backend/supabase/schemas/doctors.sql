-- ============================================================================
-- DOCTORS SCHEMA
-- ============================================================================
-- Tabla de doctores
-- DEPENDENCIAS: profiles.sql

-- Crear tabla doctors
CREATE TABLE IF NOT EXISTS "public"."doctors" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "profileId" "uuid" NOT NULL,
    "isResident" boolean NOT NULL
);

-- Asignar owner
ALTER TABLE "public"."doctors" OWNER TO "postgres";

-- Agregar constraints
ALTER TABLE ONLY "public"."doctors"
    ADD CONSTRAINT "doctors_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."doctors"
    ADD CONSTRAINT "doctors_profileId_key" UNIQUE ("profileId");

-- Agregar foreign key
ALTER TABLE ONLY "public"."doctors"
    ADD CONSTRAINT "fkProfileIdToProfilesInDoctors" FOREIGN KEY ("profileId") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;

-- Habilitar Row Level Security
ALTER TABLE "public"."doctors" ENABLE ROW LEVEL SECURITY;

-- Crear políticas RLS básicas (las complejas están en rls-policies.sql)
-- Las políticas que dependen de profilesRoles se crean en rls-policies.sql

-- Permisos
GRANT ALL ON TABLE "public"."doctors" TO "anon";
GRANT ALL ON TABLE "public"."doctors" TO "authenticated";
GRANT ALL ON TABLE "public"."doctors" TO "service_role";