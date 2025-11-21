-- ============================================================================
-- PATIENTS SCHEMA
-- ============================================================================
-- Tabla de pacientes
-- DEPENDENCIAS: profiles.sql

-- Crear tabla patients
CREATE TABLE IF NOT EXISTS "public"."patients" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "profileId" "uuid" NOT NULL,
    "healthInsuranceName" character varying(60) NOT NULL
);

-- Asignar owner
ALTER TABLE "public"."patients" OWNER TO "postgres";

-- Agregar constraints
ALTER TABLE ONLY "public"."patients"
    ADD CONSTRAINT "patients_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."patients"
    ADD CONSTRAINT "patients_profileId_key" UNIQUE ("profileId");

-- Agregar foreign key
ALTER TABLE ONLY "public"."patients"
    ADD CONSTRAINT "fkProfileIdToProfilesInPatients" FOREIGN KEY ("profileId") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;

-- Habilitar Row Level Security
ALTER TABLE "public"."patients" ENABLE ROW LEVEL SECURITY;

-- Crear políticas RLS
CREATE POLICY "Patients - user or admin" ON "public"."patients" TO "authenticated" USING ((("profileId" = "auth"."uid"()) OR (EXISTS ( SELECT 1
   FROM "public"."profilesRoles" "pr"
  WHERE (("pr"."profileId" = "auth"."uid"()) AND ("pr"."roleId" = 1)))))) WITH CHECK ((("profileId" = "auth"."uid"()) OR (EXISTS ( SELECT 1
   FROM "public"."profilesRoles" "pr"
  WHERE (("pr"."profileId" = "auth"."uid"()) AND ("pr"."roleId" = 1))))));

-- Permisos
GRANT ALL ON TABLE "public"."patients" TO "anon";
GRANT ALL ON TABLE "public"."patients" TO "authenticated";
GRANT ALL ON TABLE "public"."patients" TO "service_role";