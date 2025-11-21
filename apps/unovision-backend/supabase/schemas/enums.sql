-- ============================================================================
-- ENUMS DEFINITION
-- ============================================================================
-- Este archivo contiene todas las definiciones de ENUMs utilizadas en la base de datos
-- Se recomienda ejecutar este archivo ANTES que cualquier schema que utilice estos ENUMs

-- Tipo de contrato de empleado
CREATE TYPE "public"."contractType" AS ENUM (
    'singleTax',
    'dependent'
);

ALTER TYPE "public"."contractType" OWNER TO "postgres";

-- Tipo de documento de identidad
CREATE TYPE "public"."documentType" AS ENUM (
    'dni',
    'le',
    'lc',
    'ci',
    'passport',
    'other'
);

ALTER TYPE "public"."documentType" OWNER TO "postgres";

-- Tipo de categoría de gasto
CREATE TYPE "public"."expenseCategoryType" AS ENUM (
    'operating',
    'service',
    'supply',
    'miscellaneous',
    'extraordinary',
    'salary',
    'daily',
    'fuel',
    'perception',
    'stationery',
    'cleaning',
    'maintenance',
    'capture'
);

ALTER TYPE "public"."expenseCategoryType" OWNER TO "postgres";

-- Estado del gasto
CREATE TYPE "public"."expenseStatus" AS ENUM (
    'paid',
    'pending'
);

ALTER TYPE "public"."expenseStatus" OWNER TO "postgres";

-- Género
CREATE TYPE "public"."gender" AS ENUM (
    'male',
    'female',
    'other'
);

ALTER TYPE "public"."gender" OWNER TO "postgres";

-- Tipo de método de pago
CREATE TYPE "public"."paymentMethodType" AS ENUM (
    'cash',
    'bna',
    'mp',
    'galicia',
    'bbva',
    'uala',
    'brubank'
);

ALTER TYPE "public"."paymentMethodType" OWNER TO "postgres";

-- Tipo de categoría de IVA
CREATE TYPE "public"."vatCategoryType" AS ENUM (
    'registeredResponsible',
    'monotax',
    'exempt',
    'notResponsible',
    'finalConsumer',
    'uncategorizedSubject',
    'unregisteredResponsible',
    'subjectToVatWithholding',
    'notSubjectToVat',
    'registeredResponsibleM'
);

ALTER TYPE "public"."vatCategoryType" OWNER TO "postgres";