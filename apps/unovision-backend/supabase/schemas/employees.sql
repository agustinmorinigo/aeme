-- ============================================================================
-- EMPLOYEES SCHEMA
-- ============================================================================
-- Tabla de empleados y sus horarios
-- DEPENDENCIAS: enums.sql (contractType), profiles.sql

-- Crear tabla employees
CREATE TABLE IF NOT EXISTS "public"."employees" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "startDate" "date" NOT NULL,
    "exitDate" "date",
    "cuil" character varying(30) NOT NULL,
    "contractType" "public"."contractType" NOT NULL,
    "netSalary" numeric(12,2) NOT NULL,
    "profileId" "uuid" NOT NULL,
    CONSTRAINT "checkExitDateValid" CHECK ((("exitDate" IS NULL) OR ("exitDate" >= "startDate"))),
    CONSTRAINT "checkNetSalaryNotNegative" CHECK (("netSalary" >= (0)::numeric))
);

-- Asignar owner
ALTER TABLE "public"."employees" OWNER TO "postgres";

-- Agregar constraints
ALTER TABLE ONLY "public"."employees"
    ADD CONSTRAINT "employees_cuil_key" UNIQUE ("cuil");

ALTER TABLE ONLY "public"."employees"
    ADD CONSTRAINT "employees_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."employees"
    ADD CONSTRAINT "employees_profileId_key" UNIQUE ("profileId");

-- Agregar foreign key
ALTER TABLE ONLY "public"."employees"
    ADD CONSTRAINT "fkProfileIdToProfilesInEmployees" FOREIGN KEY ("profileId") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;

-- Crear tabla employeeSchedules
CREATE TABLE IF NOT EXISTS "public"."employeeSchedules" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "weekday" smallint NOT NULL,
    "startTime" time(0) without time zone NOT NULL,
    "endTime" time(0) without time zone NOT NULL,
    "isRemote" boolean DEFAULT false NOT NULL,
    "employeeId" "uuid" NOT NULL,
    CONSTRAINT "checkTimeOrder" CHECK (("endTime" > "startTime")),
    CONSTRAINT "employeeSchedules_weekday_check" CHECK ((("weekday" >= 1) AND ("weekday" <= 7)))
);

-- Asignar owner
ALTER TABLE "public"."employeeSchedules" OWNER TO "postgres";

-- Agregar constraints para employeeSchedules
ALTER TABLE ONLY "public"."employeeSchedules"
    ADD CONSTRAINT "employeeSchedules_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."employeeSchedules"
    ADD CONSTRAINT "uniqueEmployeeDay" UNIQUE ("employeeId", "weekday");

-- Agregar foreign key para employeeSchedules
ALTER TABLE ONLY "public"."employeeSchedules"
    ADD CONSTRAINT "fkEmployeeIdToEmployeesInEmployeesSchedules" FOREIGN KEY ("employeeId") REFERENCES "public"."employees"("id") ON DELETE CASCADE;

-- Habilitar Row Level Security
ALTER TABLE "public"."employees" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."employeeSchedules" ENABLE ROW LEVEL SECURITY;

-- Crear políticas RLS para employees
CREATE POLICY "Employees - user or admin" ON "public"."employees" TO "authenticated" USING ((("profileId" = "auth"."uid"()) OR (EXISTS ( SELECT 1
   FROM "public"."profilesRoles" "pr"
  WHERE (("pr"."profileId" = "auth"."uid"()) AND ("pr"."roleId" = 1)))))) WITH CHECK ((("profileId" = "auth"."uid"()) OR (EXISTS ( SELECT 1
   FROM "public"."profilesRoles" "pr"
  WHERE (("pr"."profileId" = "auth"."uid"()) AND ("pr"."roleId" = 1))))));

-- Crear políticas RLS para employeeSchedules
CREATE POLICY "Schedules - user or admin" ON "public"."employeeSchedules" TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."employees" "e"
  WHERE (("e"."id" = "employeeSchedules"."employeeId") AND (("e"."profileId" = "auth"."uid"()) OR (EXISTS ( SELECT 1
           FROM "public"."profilesRoles" "pr"
          WHERE (("pr"."profileId" = "auth"."uid"()) AND ("pr"."roleId" = 1))))))))) WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."employees" "e"
  WHERE (("e"."id" = "employeeSchedules"."employeeId") AND (("e"."profileId" = "auth"."uid"()) OR (EXISTS ( SELECT 1
           FROM "public"."profilesRoles" "pr"
          WHERE (("pr"."profileId" = "auth"."uid"()) AND ("pr"."roleId" = 1)))))))));

-- Permisos para employees
GRANT ALL ON TABLE "public"."employees" TO "anon";
GRANT ALL ON TABLE "public"."employees" TO "authenticated";
GRANT ALL ON TABLE "public"."employees" TO "service_role";

-- Permisos para employeeSchedules
GRANT ALL ON TABLE "public"."employeeSchedules" TO "anon";
GRANT ALL ON TABLE "public"."employeeSchedules" TO "authenticated";
GRANT ALL ON TABLE "public"."employeeSchedules" TO "service_role";