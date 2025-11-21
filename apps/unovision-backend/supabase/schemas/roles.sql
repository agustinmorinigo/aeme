-- ============================================================================
-- ROLES SCHEMA
-- ============================================================================
-- Tabla de roles del sistema
-- DEPENDENCIAS: ninguna

-- Crear secuencia
CREATE SEQUENCE IF NOT EXISTS "public"."roles_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE "public"."roles_id_seq" OWNER TO "postgres";

-- Crear tabla roles
CREATE TABLE IF NOT EXISTS "public"."roles" (
    "id" integer NOT NULL,
    "name" character varying(40) NOT NULL,
    "description" character varying(100)
);

-- Asignar owner
ALTER TABLE "public"."roles" OWNER TO "postgres";

-- Configurar sequence para la tabla
ALTER SEQUENCE "public"."roles_id_seq" OWNED BY "public"."roles"."id";

-- Configurar default value
ALTER TABLE ONLY "public"."roles" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."roles_id_seq"'::"regclass");

-- Agregar constraints
ALTER TABLE ONLY "public"."roles"
    ADD CONSTRAINT "roles_name_key" UNIQUE ("name");

ALTER TABLE ONLY "public"."roles"
    ADD CONSTRAINT "roles_pkey" PRIMARY KEY ("id");

-- Habilitar Row Level Security
ALTER TABLE "public"."roles" ENABLE ROW LEVEL SECURITY;

-- Crear políticas RLS
CREATE POLICY "Enable read access for all users" ON "public"."roles" FOR SELECT USING (true);

-- Permisos para tabla
GRANT ALL ON TABLE "public"."roles" TO "anon";
GRANT ALL ON TABLE "public"."roles" TO "authenticated";
GRANT ALL ON TABLE "public"."roles" TO "service_role";

-- Permisos para secuencia
GRANT ALL ON SEQUENCE "public"."roles_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."roles_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."roles_id_seq" TO "service_role";