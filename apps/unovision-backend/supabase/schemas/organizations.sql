-- ============================================================================
-- ORGANIZATIONS SCHEMA
-- ============================================================================
-- Tabla de organizaciones
-- DEPENDENCIAS: vat-categories.sql

-- Crear tabla organizations
CREATE TABLE IF NOT EXISTS "public"."organizations" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "legalName" character varying(80) NOT NULL,
    "businessName" character varying(80) NOT NULL,
    "address" character varying(180) NOT NULL,
    "vatCategoryId" integer NOT NULL,
    "cuit" character varying(20) NOT NULL
);

-- Asignar owner
ALTER TABLE "public"."organizations" OWNER TO "postgres";

-- Agregar constraints
ALTER TABLE ONLY "public"."organizations"
    ADD CONSTRAINT "organizations_pkey" PRIMARY KEY ("id");

-- Agregar foreign key
ALTER TABLE ONLY "public"."organizations"
    ADD CONSTRAINT "organizations_vat_category_id_fkey" FOREIGN KEY ("vatCategoryId") REFERENCES "public"."vatCategories"("id");

-- Habilitar Row Level Security
ALTER TABLE "public"."organizations" ENABLE ROW LEVEL SECURITY;

-- Crear políticas RLS
CREATE POLICY "Allow authenticated users to select organizations" ON "public"."organizations" FOR SELECT TO "authenticated" USING (true);

-- Permisos
GRANT ALL ON TABLE "public"."organizations" TO "anon";
GRANT ALL ON TABLE "public"."organizations" TO "authenticated";
GRANT ALL ON TABLE "public"."organizations" TO "service_role";