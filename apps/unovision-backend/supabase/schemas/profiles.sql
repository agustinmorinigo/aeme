-- ============================================================================
-- PROFILES SCHEMA
-- ============================================================================
-- Tabla principal de perfiles de usuario
-- DEPENDENCIAS: enums.sql (documentType, gender)

-- Crear tabla profiles
CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" NOT NULL,
    "name" character varying(80) NOT NULL,
    "lastName" character varying(80) NOT NULL,
    "documentType" "public"."documentType" NOT NULL,
    "documentValue" character varying(30) NOT NULL,
    "gender" "public"."gender" NOT NULL,
    "email" character varying(150) NOT NULL,
    "phone" character varying(30),
    "address" character varying(150),
    "birthDate" "date" NOT NULL
);

-- Asignar owner
ALTER TABLE "public"."profiles" OWNER TO "postgres";

-- Agregar constraints
ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_document_unique" UNIQUE ("documentType", "documentValue", "gender");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_email_unique" UNIQUE ("email");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");

-- Agregar foreign key (requiere que auth.users ya exista)
ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "fkprofilestoauthusers" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;

-- Habilitar Row Level Security
ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;

-- Crear políticas RLS básicas (las complejas están en rls-policies.sql)
CREATE POLICY "Enable insert for authenticated users only" ON "public"."profiles" FOR INSERT WITH CHECK (true);

CREATE POLICY "Profiles - authenticated only" ON "public"."profiles" TO "authenticated" USING (("auth"."uid"() IS NOT NULL));

CREATE POLICY "Profiles - users manage own" ON "public"."profiles" TO "authenticated" USING (("id" = "auth"."uid"())) WITH CHECK (("id" = "auth"."uid"()));

-- Permisos
GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";