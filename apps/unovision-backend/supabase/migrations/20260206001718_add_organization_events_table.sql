-- =====================================================
-- ENUM: organizationEventType
-- =====================================================

CREATE TYPE "public"."organizationEventType" AS ENUM (
  'holiday',             -- Feriado
  'workdayNoon',         -- Jornada laboral mediodía
  'earlyClosing',        -- Cierre anticipado
  'powerOutage',         -- Corte de luz
  'timeRecorderFailure', -- Falla del reloj fichador
  'nonWorkingWeek',      -- Semana no laborable
  'specialEvent',        -- Evento especial
  'climateIssues',       -- Problemas climáticos
  'other'                -- Otro
);

-- =====================================================
-- TABLE: organizationEvents
-- =====================================================

CREATE TABLE IF NOT EXISTS "public"."organizationEvents" (
  "id"              "uuid" DEFAULT "gen_random_uuid"() PRIMARY KEY NOT NULL,
  "organizationId"  "uuid" NOT NULL,
  "type"            "public"."organizationEventType" NOT NULL,
  "startDate"       date NOT NULL,
  "endDate"         date,
  "description"     character varying(200),
  "createdAt"       timestamp with time zone DEFAULT "now"() NOT NULL,
  "updatedAt"       timestamp with time zone DEFAULT "now"() NOT NULL,

  CONSTRAINT "fk_organization"
    FOREIGN KEY ("organizationId")
    REFERENCES "public"."organizations" ("id")
    ON DELETE CASCADE
);

-- =====================================================
-- CONSTRAINT: endDate must be after startDate
-- =====================================================

ALTER TABLE "public"."organizationEvents"
  ADD CONSTRAINT "check_date_range"
  CHECK ("endDate" IS NULL OR "endDate" > "startDate");

-- =====================================================
-- TRIGGER: updated_at
-- =====================================================

CREATE TRIGGER "set_updated_at_on_organization_events"
  BEFORE UPDATE ON "public"."organizationEvents"
  FOR EACH ROW
  EXECUTE FUNCTION "public"."handle_updated_at"();

-- =====================================================
-- INDEXES
-- =====================================================

CREATE INDEX "idx_organization_events_organization_id"
  ON "public"."organizationEvents" ("organizationId");

CREATE INDEX "idx_organization_events_start_date"
  ON "public"."organizationEvents" ("startDate");

CREATE INDEX "idx_organization_events_type"
  ON "public"."organizationEvents" ("type");

-- =====================================================
-- ENABLE RLS
-- =====================================================

ALTER TABLE "public"."organizationEvents" ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- RLS POLICIES: Only roles 1 and 5 can do everything
-- =====================================================

CREATE POLICY "authorized_roles_all_organization_events"
  ON "public"."organizationEvents"
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM "public"."profilesRoles"
      WHERE "profileId" = auth.uid()
      AND "roleId" IN (1, 5)
    )
  );
