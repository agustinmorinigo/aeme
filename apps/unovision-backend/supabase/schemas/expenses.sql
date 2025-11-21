-- ============================================================================
-- EXPENSES SCHEMA
-- ============================================================================
-- Tabla de gastos
-- DEPENDENCIAS: enums.sql (expenseStatus), organizations.sql, expense-categories.sql, payment-methods.sql

-- Crear tabla expenses
CREATE TABLE IF NOT EXISTS "public"."expenses" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "organizationId" "uuid" NOT NULL,
    "categoryId" integer NOT NULL,
    "status" "public"."expenseStatus" NOT NULL,
    "title" character varying(100) NOT NULL,
    "description" character varying(250),
    "amount" numeric(12,2) NOT NULL,
    "paymentMethodId" integer,
    "datePaid" timestamp with time zone,
    "invoiceLink" character varying(250) NOT NULL,
    "paymentReceiptLink" character varying(250),
    "expirationDate" timestamp with time zone NOT NULL,
    "createdBy" character varying NOT NULL,
    "updatedBy" character varying,
    "createdAt" timestamp with time zone DEFAULT "now"(),
    "updatedAt" timestamp with time zone
);

-- Asignar owner
ALTER TABLE "public"."expenses" OWNER TO "postgres";

-- Agregar constraints
ALTER TABLE ONLY "public"."expenses"
    ADD CONSTRAINT "expenses_pkey" PRIMARY KEY ("id");

-- Agregar foreign keys
ALTER TABLE ONLY "public"."expenses"
    ADD CONSTRAINT "expenses_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."expenseCategories"("id");

ALTER TABLE ONLY "public"."expenses"
    ADD CONSTRAINT "expenses_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "public"."organizations"("id");

ALTER TABLE ONLY "public"."expenses"
    ADD CONSTRAINT "expenses_payment_method_id_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "public"."paymentMethods"("id");

-- Habilitar Row Level Security
ALTER TABLE "public"."expenses" ENABLE ROW LEVEL SECURITY;

-- Crear políticas RLS
CREATE POLICY "Allow authenticated users full access on expenses" ON "public"."expenses" TO "authenticated" USING (true) WITH CHECK (true);

-- Permisos
GRANT ALL ON TABLE "public"."expenses" TO "anon";
GRANT ALL ON TABLE "public"."expenses" TO "authenticated";
GRANT ALL ON TABLE "public"."expenses" TO "service_role";