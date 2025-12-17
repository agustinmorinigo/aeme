CREATE TYPE "public"."justificationType" AS ENUM (
  'medical',        -- Turno/Consulta médica.
  'illness',        -- Enfermedad.
  'procedure',      -- Trámite.
  'education',      -- Estudio/exámen académico.
  'training',       -- Capacitación/Cursos.
  'workAccident',   -- Accidente laboral.
  'bloodDonation',  -- Donación de sangre.
  'personal',       -- Motivo personal.
  'other'           -- Otro.
);

CREATE TABLE IF NOT EXISTS "public"."justifications" (
  "id"            "uuid" DEFAULT "gen_random_uuid"() PRIMARY KEY NOT NULL,
  "employeeId"    "uuid" NOT NULL,
  "type"          "public"."justificationType" NOT NULL,
  "documentLink"  "text" NOT NULL,
  "description"   character varying(200),
  "createdAt"     timestamp with time zone DEFAULT "now"() NOT NULL,
  "updatedAt"     timestamp with time zone DEFAULT "now"() NOT NULL,

  CONSTRAINT "fk_employee"
    FOREIGN KEY ("employeeId")
    REFERENCES "public"."employees" ("id")
    ON DELETE CASCADE
);

CREATE TRIGGER "set_updated_at_on_justifications"
  BEFORE UPDATE ON "public"."justifications"
  FOR EACH ROW
  EXECUTE FUNCTION "public"."handle_updated_at"();

CREATE TABLE IF NOT EXISTS "public"."justificationDays" (
  "id"              "uuid" DEFAULT "gen_random_uuid"() PRIMARY KEY NOT NULL,
  "justificationId" "uuid" NOT NULL,
  "date"            date   NOT NULL,

  CONSTRAINT "fk_justification"
    FOREIGN KEY ("justificationId")
    REFERENCES "public"."justifications" ("id")
    ON DELETE CASCADE,

  CONSTRAINT "unique_justification_date"
    UNIQUE ("justificationId", "date")
);

-- =====================================================
-- HABILITAR RLS EN LAS TABLAS
-- =====================================================

ALTER TABLE "public"."justifications" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."justificationDays" ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- POLÍTICAS SIMPLES: Solo roles 1 y 5 pueden hacer todo
-- =====================================================

CREATE POLICY "authorized_roles_all_justifications"
  ON "public"."justifications"
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM "public"."profilesRoles"
      WHERE "profileId" = auth.uid()
      AND "roleId" IN (1, 5)
    )
  );

CREATE POLICY "authorized_roles_all_justification_days"
  ON "public"."justificationDays"
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM "public"."profilesRoles"
      WHERE "profileId" = auth.uid()
      AND "roleId" IN (1, 5)
    )
  );