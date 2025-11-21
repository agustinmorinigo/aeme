-- ============================================================================
-- EXPENSE CATEGORIES SCHEMA
-- ============================================================================
-- Tabla de categorías de gastos
-- DEPENDENCIAS: enums.sql (expenseCategoryType)

-- Crear secuencia
CREATE SEQUENCE IF NOT EXISTS "public"."expense_categories_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE "public"."expense_categories_id_seq" OWNER TO "postgres";

-- Crear tabla expenseCategories
CREATE TABLE IF NOT EXISTS "public"."expenseCategories" (
    "id" integer NOT NULL,
    "type" "public"."expenseCategoryType" NOT NULL,
    "name" character varying(100) NOT NULL
);

-- Asignar owner
ALTER TABLE "public"."expenseCategories" OWNER TO "postgres";

-- Configurar sequence para la tabla
ALTER SEQUENCE "public"."expense_categories_id_seq" OWNED BY "public"."expenseCategories"."id";

-- Configurar default value
ALTER TABLE ONLY "public"."expenseCategories" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."expense_categories_id_seq"'::"regclass");

-- Agregar constraints
ALTER TABLE ONLY "public"."expenseCategories"
    ADD CONSTRAINT "expense_categories_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."expenseCategories"
    ADD CONSTRAINT "expense_categories_type_name_key" UNIQUE ("type", "name");

-- Habilitar Row Level Security
ALTER TABLE "public"."expenseCategories" ENABLE ROW LEVEL SECURITY;

-- Crear políticas RLS
CREATE POLICY "Allow authenticated users to select expense_categories" ON "public"."expenseCategories" FOR SELECT TO "authenticated" USING (true);

-- Permisos para tabla
GRANT ALL ON TABLE "public"."expenseCategories" TO "anon";
GRANT ALL ON TABLE "public"."expenseCategories" TO "authenticated";
GRANT ALL ON TABLE "public"."expenseCategories" TO "service_role";

-- Permisos para secuencia
GRANT ALL ON SEQUENCE "public"."expense_categories_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."expense_categories_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."expense_categories_id_seq" TO "service_role";