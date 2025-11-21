-- ============================================================================
-- PAYMENT METHODS SCHEMA
-- ============================================================================
-- Tabla de métodos de pago
-- DEPENDENCIAS: enums.sql (paymentMethodType)

-- Crear secuencia
CREATE SEQUENCE IF NOT EXISTS "public"."payment_methods_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE "public"."payment_methods_id_seq" OWNER TO "postgres";

-- Crear tabla paymentMethods
CREATE TABLE IF NOT EXISTS "public"."paymentMethods" (
    "id" integer NOT NULL,
    "type" "public"."paymentMethodType" NOT NULL,
    "name" character varying(100) NOT NULL
);

-- Asignar owner
ALTER TABLE "public"."paymentMethods" OWNER TO "postgres";

-- Configurar sequence para la tabla
ALTER SEQUENCE "public"."payment_methods_id_seq" OWNED BY "public"."paymentMethods"."id";

-- Configurar default value
ALTER TABLE ONLY "public"."paymentMethods" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."payment_methods_id_seq"'::"regclass");

-- Agregar constraints
ALTER TABLE ONLY "public"."paymentMethods"
    ADD CONSTRAINT "payment_methods_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."paymentMethods"
    ADD CONSTRAINT "payment_methods_type_name_key" UNIQUE ("type", "name");

-- Habilitar Row Level Security
ALTER TABLE "public"."paymentMethods" ENABLE ROW LEVEL SECURITY;

-- Crear políticas RLS
CREATE POLICY "Allow authenticated users to select payment_methods" ON "public"."paymentMethods" FOR SELECT TO "authenticated" USING (true);

-- Permisos para tabla
GRANT ALL ON TABLE "public"."paymentMethods" TO "anon";
GRANT ALL ON TABLE "public"."paymentMethods" TO "authenticated";
GRANT ALL ON TABLE "public"."paymentMethods" TO "service_role";

-- Permisos para secuencia
GRANT ALL ON SEQUENCE "public"."payment_methods_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."payment_methods_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."payment_methods_id_seq" TO "service_role";