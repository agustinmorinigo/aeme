-- ============================================================================
-- VAT CATEGORIES SCHEMA
-- ============================================================================
-- Tabla de categorías de IVA
-- DEPENDENCIAS: enums.sql (vatCategoryType)

-- Crear secuencia
CREATE SEQUENCE IF NOT EXISTS "public"."vat_categories_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE "public"."vat_categories_id_seq" OWNER TO "postgres";

-- Crear tabla vatCategories
CREATE TABLE IF NOT EXISTS "public"."vatCategories" (
    "id" integer NOT NULL,
    "type" "public"."vatCategoryType" NOT NULL,
    "name" character varying(100) NOT NULL
);

-- Asignar owner
ALTER TABLE "public"."vatCategories" OWNER TO "postgres";

-- Configurar sequence para la tabla
ALTER SEQUENCE "public"."vat_categories_id_seq" OWNED BY "public"."vatCategories"."id";

-- Configurar default value
ALTER TABLE ONLY "public"."vatCategories" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."vat_categories_id_seq"'::"regclass");

-- Agregar constraints
ALTER TABLE ONLY "public"."vatCategories"
    ADD CONSTRAINT "vat_categories_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."vatCategories"
    ADD CONSTRAINT "vat_categories_type_name_key" UNIQUE ("type", "name");

-- Habilitar Row Level Security
ALTER TABLE "public"."vatCategories" ENABLE ROW LEVEL SECURITY;

-- Crear políticas RLS
CREATE POLICY "Allow authenticated users to select vat_categories" ON "public"."vatCategories" FOR SELECT TO "authenticated" USING (true);

-- Permisos para tabla
GRANT ALL ON TABLE "public"."vatCategories" TO "anon";
GRANT ALL ON TABLE "public"."vatCategories" TO "authenticated";
GRANT ALL ON TABLE "public"."vatCategories" TO "service_role";

-- Permisos para secuencia
GRANT ALL ON SEQUENCE "public"."vat_categories_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."vat_categories_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."vat_categories_id_seq" TO "service_role";