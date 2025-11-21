

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE TYPE "public"."contractType" AS ENUM (
    'singleTax',
    'dependent'
);


ALTER TYPE "public"."contractType" OWNER TO "postgres";


CREATE TYPE "public"."documentType" AS ENUM (
    'dni',
    'le',
    'lc',
    'ci',
    'passport',
    'other'
);


ALTER TYPE "public"."documentType" OWNER TO "postgres";


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


CREATE TYPE "public"."expenseStatus" AS ENUM (
    'paid',
    'pending'
);


ALTER TYPE "public"."expenseStatus" OWNER TO "postgres";


CREATE TYPE "public"."gender" AS ENUM (
    'male',
    'female',
    'other'
);


ALTER TYPE "public"."gender" OWNER TO "postgres";


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


CREATE OR REPLACE FUNCTION "public"."create_full_user"("p_user_id" "uuid", "p_profile" "jsonb", "p_orgs" "uuid"[], "p_role_ids" integer[] DEFAULT NULL::integer[], "p_employee" "jsonb" DEFAULT NULL::"jsonb", "p_patient" "jsonb" DEFAULT NULL::"jsonb", "p_doctor" "jsonb" DEFAULT NULL::"jsonb") RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$
declare
  invalid_roles boolean;
  employee_id uuid;
begin
  -- Validar roles si se proporcionan
  if p_role_ids is not null then
    -- Verificar que solo contenga los números 1 (admin) y/o 5 (accountant)
    select exists (
      select 1
      from unnest(p_role_ids) as role_id
      where role_id not in (1, 5)
    ) into invalid_roles;
    
    if invalid_roles then
      raise exception 'Los roles permitidos son solo 1 (admin) y/o 5 (accountant)';
    end if;
  end if;

  -- 1. Insertar en profiles
  insert into "profiles" ("id", "name", "lastName", "documentType", "documentValue", "gender", "email", "phone", "address", "birthDate")
  values (
    p_user_id,
    p_profile->>'name',
    p_profile->>'lastName',
    (p_profile->>'documentType')::"public"."documentType",
    p_profile->>'documentValue',
    (p_profile->>'gender')::"public"."gender",
    (p_profile->>'email'),
    p_profile->>'phone',
    p_profile->>'address',
    (p_profile->>'birthDate')::date
  );

   -- 2. Validar y asociar organizaciones
  if p_orgs is null or coalesce(array_length(p_orgs, 1), 0) = 0 then
    raise exception 'Debe enviarse al menos una organización';
  end if;

  if (select count(*) from unnest(p_orgs) as org_id
      where org_id not in (select id from organizations)) > 0 then
    raise exception 'Se enviaron IDs de organizaciones que no existen';
  end if;

  insert into "usersOrganizations" ("profileId", "organizationId")
  select p_user_id, unnest(p_orgs);

    -- 3. Insertar roles de admin/accountant si se proporcionan
  if p_role_ids is not null then
    insert into "profilesRoles" ("profileId", "roleId")
    select p_user_id, unnest(p_role_ids);
  end if;

  -- 4. Employee (opcional)
  if p_employee is not null then
    -- Insertar empleado y obtener el ID generado
    insert into "employees" ("profileId", "startDate", "exitDate", "cuil", "contractType", "netSalary")
    values (
      p_user_id,
      (p_employee->>'startDate')::date,
      (p_employee->>'exitDate')::date,
      p_employee->>'cuil',
      (p_employee->>'contractType')::"public"."contractType",
      (p_employee->>'netSalary')::decimal(12, 2)
    )
    returning id into employee_id;

      -- Insertar horarios usando el ID real del empleado
    insert into "employeeSchedules" ("employeeId", "weekday", "startTime", "endTime", "isRemote")
    select employee_id,
            (s->>'weekday')::int,
            (date_trunc('minute', (s->>'startTime')::time))::time(0),
            (date_trunc('minute', (s->>'endTime')::time))::time(0),
            (s->>'isRemote')::boolean
    from jsonb_array_elements(p_employee->'schedules') s;

    -- role
    insert into "profilesRoles" ("profileId", "roleId") values (p_user_id, 2);
  end if;

  -- 5. Patient (opcional)
  if p_patient is not null then
    insert into "patients" ("profileId", "healthInsuranceName")
    values (p_user_id, p_patient->>'healthInsuranceName');

    insert into "profilesRoles" ("profileId", "roleId") values (p_user_id, 3);
  end if;

  -- 6. Doctor (opcional)
  if p_doctor is not null then
    insert into "doctors" ("profileId", "isResident")
    values (p_user_id, (p_doctor->>'isResident')::boolean);

    insert into "profilesRoles" ("profileId", "roleId") values (p_user_id, 4);
  end if;
end;
$$;


ALTER FUNCTION "public"."create_full_user"("p_user_id" "uuid", "p_profile" "jsonb", "p_orgs" "uuid"[], "p_role_ids" integer[], "p_employee" "jsonb", "p_patient" "jsonb", "p_doctor" "jsonb") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_updated_at"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."handle_updated_at"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_full_user"("p_user_id" "uuid", "p_profile" "jsonb", "p_orgs" "uuid"[], "p_role_ids" integer[] DEFAULT NULL::integer[], "p_employee" "jsonb" DEFAULT NULL::"jsonb", "p_patient" "jsonb" DEFAULT NULL::"jsonb", "p_doctor" "jsonb" DEFAULT NULL::"jsonb") RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$
declare
  invalid_roles boolean;
  employee_id uuid;
begin
  -- Validar roles si se proporcionan
  if p_role_ids is not null then
    select exists (
      select 1
      from unnest(p_role_ids) as role_id
      where role_id not in (1, 5)
    ) into invalid_roles;
    
    if invalid_roles then
      raise exception 'Los roles permitidos son solo 1 (admin) y/o 5 (accountant)';
    end if;
  end if;

  -- 1. Update profiles
  update "profiles"
  set "name" = p_profile->>'name',
      "lastName" = p_profile->>'lastName',
      "documentType" = (p_profile->>'documentType')::"public"."documentType",
      "documentValue" = p_profile->>'documentValue',
      "gender" = (p_profile->>'gender')::"public"."gender",
      "email" = p_profile->>'email',
      "phone" = p_profile->>'phone',
      "address" = p_profile->>'address',
      "birthDate" = (p_profile->>'birthDate')::date
  where "id" = p_user_id;

  -- 2. Organizaciones
  if p_orgs is null or coalesce(array_length(p_orgs, 1), 0) = 0 then
    raise exception 'Debe enviarse al menos una organización';
  end if;

  if (select count(*) from unnest(p_orgs) as org_id
      where org_id not in (select id from organizations)) > 0 then
    raise exception 'Se enviaron IDs de organizaciones que no existen';
  end if;

  delete from "usersOrganizations" where "profileId" = p_user_id;
  insert into "usersOrganizations" ("profileId", "organizationId")
  select p_user_id, unnest(p_orgs);

  -- 3. Roles
  delete from "profilesRoles" where "profileId" = p_user_id;
  if p_role_ids is not null then
    insert into "profilesRoles" ("profileId", "roleId")
    select p_user_id, unnest(p_role_ids);
  end if;

  -- 4. Employee
  delete from "employeeSchedules"
  where "employeeId" in (select id from "employees" where "profileId" = p_user_id);
  delete from "employees" where "profileId" = p_user_id;

  if p_employee is not null then
    insert into "employees" ("profileId", "startDate", "exitDate", "cuil", "contractType", "netSalary")
    values (
      p_user_id,
      (p_employee->>'startDate')::date,
      (p_employee->>'exitDate')::date,
      p_employee->>'cuil',
      (p_employee->>'contractType')::"public"."contractType",
      (p_employee->>'netSalary')::decimal(12, 2)
    )
    returning id into employee_id;

    insert into "employeeSchedules" ("employeeId", "weekday", "startTime", "endTime", "isRemote")
    select employee_id,
            (s->>'weekday')::int,
            (date_trunc('minute', (s->>'startTime')::time))::time(0),
            (date_trunc('minute', (s->>'endTime')::time))::time(0),
            (s->>'isRemote')::boolean
    from jsonb_array_elements(p_employee->'schedules') s;

    insert into "profilesRoles" ("profileId", "roleId") values (p_user_id, 2);
  end if;

  -- 5. Patient
  delete from "patients" where "profileId" = p_user_id;
  if p_patient is not null then
    insert into "patients" ("profileId", "healthInsuranceName")
    values (p_user_id, p_patient->>'healthInsuranceName');

    insert into "profilesRoles" ("profileId", "roleId") values (p_user_id, 3);
  end if;

  -- 6. Doctor
  delete from "doctors" where "profileId" = p_user_id;
  if p_doctor is not null then
    insert into "doctors" ("profileId", "isResident")
    values (p_user_id, (p_doctor->>'isResident')::boolean);

    insert into "profilesRoles" ("profileId", "roleId") values (p_user_id, 4);
  end if;
end;
$$;


ALTER FUNCTION "public"."update_full_user"("p_user_id" "uuid", "p_profile" "jsonb", "p_orgs" "uuid"[], "p_role_ids" integer[], "p_employee" "jsonb", "p_patient" "jsonb", "p_doctor" "jsonb") OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."doctors" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "profileId" "uuid" NOT NULL,
    "isResident" boolean NOT NULL
);


ALTER TABLE "public"."doctors" OWNER TO "postgres";


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


ALTER TABLE "public"."employeeSchedules" OWNER TO "postgres";


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


ALTER TABLE "public"."employees" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."expenseCategories" (
    "id" integer NOT NULL,
    "type" "public"."expenseCategoryType" NOT NULL,
    "name" character varying(100) NOT NULL
);


ALTER TABLE "public"."expenseCategories" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."expense_categories_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."expense_categories_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."expense_categories_id_seq" OWNED BY "public"."expenseCategories"."id";



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


ALTER TABLE "public"."expenses" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."organizations" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "legalName" character varying(80) NOT NULL,
    "businessName" character varying(80) NOT NULL,
    "address" character varying(180) NOT NULL,
    "vatCategoryId" integer NOT NULL,
    "cuit" character varying(20) NOT NULL
);


ALTER TABLE "public"."organizations" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."patients" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "profileId" "uuid" NOT NULL,
    "healthInsuranceName" character varying(60) NOT NULL
);


ALTER TABLE "public"."patients" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."paymentMethods" (
    "id" integer NOT NULL,
    "type" "public"."paymentMethodType" NOT NULL,
    "name" character varying(100) NOT NULL
);


ALTER TABLE "public"."paymentMethods" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."payment_methods_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."payment_methods_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."payment_methods_id_seq" OWNED BY "public"."paymentMethods"."id";



CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" NOT NULL,
    "name" character varying(80) NOT NULL,
    "lastName" character varying(80) NOT NULL,
    "documentType" "public"."documentType" NOT NULL,
    "documentValue" character varying(30) NOT NULL,
    "gender" "public"."gender" NOT NULL,
    "email" character varying(150) NOT NULL,
    "phone" character varying(30),
    "address" character varying(150),
    "birthDate" "date" NOT NULL
);


ALTER TABLE "public"."profiles" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."profilesRoles" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "profileId" "uuid" NOT NULL,
    "roleId" integer NOT NULL
);


ALTER TABLE "public"."profilesRoles" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."roles" (
    "id" integer NOT NULL,
    "name" character varying(40) NOT NULL,
    "description" character varying(100)
);


ALTER TABLE "public"."roles" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."roles_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."roles_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."roles_id_seq" OWNED BY "public"."roles"."id";



CREATE TABLE IF NOT EXISTS "public"."usersOrganizations" (
    "organizationId" "uuid" NOT NULL,
    "profileId" "uuid" NOT NULL
);


ALTER TABLE "public"."usersOrganizations" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."vatCategories" (
    "id" integer NOT NULL,
    "type" "public"."vatCategoryType" NOT NULL,
    "name" character varying(100) NOT NULL
);


ALTER TABLE "public"."vatCategories" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."vat_categories_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."vat_categories_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."vat_categories_id_seq" OWNED BY "public"."vatCategories"."id";



ALTER TABLE ONLY "public"."expenseCategories" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."expense_categories_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."paymentMethods" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."payment_methods_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."roles" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."roles_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."vatCategories" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."vat_categories_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."doctors"
    ADD CONSTRAINT "doctors_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."doctors"
    ADD CONSTRAINT "doctors_profileId_key" UNIQUE ("profileId");



ALTER TABLE ONLY "public"."employeeSchedules"
    ADD CONSTRAINT "employeeSchedules_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."employees"
    ADD CONSTRAINT "employees_cuil_key" UNIQUE ("cuil");



ALTER TABLE ONLY "public"."employees"
    ADD CONSTRAINT "employees_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."employees"
    ADD CONSTRAINT "employees_profileId_key" UNIQUE ("profileId");



ALTER TABLE ONLY "public"."expenseCategories"
    ADD CONSTRAINT "expense_categories_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."expenseCategories"
    ADD CONSTRAINT "expense_categories_type_name_key" UNIQUE ("type", "name");



ALTER TABLE ONLY "public"."expenses"
    ADD CONSTRAINT "expenses_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."organizations"
    ADD CONSTRAINT "organizations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."patients"
    ADD CONSTRAINT "patients_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."patients"
    ADD CONSTRAINT "patients_profileId_key" UNIQUE ("profileId");



ALTER TABLE ONLY "public"."paymentMethods"
    ADD CONSTRAINT "payment_methods_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."paymentMethods"
    ADD CONSTRAINT "payment_methods_type_name_key" UNIQUE ("type", "name");



ALTER TABLE ONLY "public"."profilesRoles"
    ADD CONSTRAINT "profilesRoles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_document_unique" UNIQUE ("documentType", "documentValue", "gender");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_email_unique" UNIQUE ("email");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."roles"
    ADD CONSTRAINT "roles_name_key" UNIQUE ("name");



ALTER TABLE ONLY "public"."roles"
    ADD CONSTRAINT "roles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."employeeSchedules"
    ADD CONSTRAINT "uniqueEmployeeDay" UNIQUE ("employeeId", "weekday");



ALTER TABLE ONLY "public"."usersOrganizations"
    ADD CONSTRAINT "uniqueProfileOrganization" UNIQUE ("profileId", "organizationId");



ALTER TABLE ONLY "public"."profilesRoles"
    ADD CONSTRAINT "uniqueProfileRole" UNIQUE ("profileId", "roleId");



ALTER TABLE ONLY "public"."vatCategories"
    ADD CONSTRAINT "vat_categories_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."vatCategories"
    ADD CONSTRAINT "vat_categories_type_name_key" UNIQUE ("type", "name");



ALTER TABLE ONLY "public"."expenses"
    ADD CONSTRAINT "expenses_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."expenseCategories"("id");



ALTER TABLE ONLY "public"."expenses"
    ADD CONSTRAINT "expenses_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "public"."organizations"("id");



ALTER TABLE ONLY "public"."expenses"
    ADD CONSTRAINT "expenses_payment_method_id_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "public"."paymentMethods"("id");



ALTER TABLE ONLY "public"."employeeSchedules"
    ADD CONSTRAINT "fkEmployeeIdToEmployeesInEmployeesSchedules" FOREIGN KEY ("employeeId") REFERENCES "public"."employees"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."usersOrganizations"
    ADD CONSTRAINT "fkOrganizationIdToOrganizationsInUsersOrganizations" FOREIGN KEY ("organizationId") REFERENCES "public"."organizations"("id") ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."doctors"
    ADD CONSTRAINT "fkProfileIdToProfilesInDoctors" FOREIGN KEY ("profileId") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."employees"
    ADD CONSTRAINT "fkProfileIdToProfilesInEmployees" FOREIGN KEY ("profileId") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."patients"
    ADD CONSTRAINT "fkProfileIdToProfilesInPatients" FOREIGN KEY ("profileId") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."profilesRoles"
    ADD CONSTRAINT "fkProfileIdToProfilesInProfilesRoles" FOREIGN KEY ("profileId") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."usersOrganizations"
    ADD CONSTRAINT "fkProfileIdToProfilesInUsersOrganizations" FOREIGN KEY ("profileId") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."profilesRoles"
    ADD CONSTRAINT "fkRoleIdToRolesInProfilesRoles" FOREIGN KEY ("roleId") REFERENCES "public"."roles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "fkprofilestoauthusers" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."organizations"
    ADD CONSTRAINT "organizations_vat_category_id_fkey" FOREIGN KEY ("vatCategoryId") REFERENCES "public"."vatCategories"("id");



CREATE POLICY "Allow authenticated users full access on expenses" ON "public"."expenses" TO "authenticated" USING (true) WITH CHECK (true);



CREATE POLICY "Allow authenticated users full access on users_organizations" ON "public"."usersOrganizations" TO "authenticated" USING (true) WITH CHECK (true);



CREATE POLICY "Allow authenticated users to select expense_categories" ON "public"."expenseCategories" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "Allow authenticated users to select organizations" ON "public"."organizations" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "Allow authenticated users to select payment_methods" ON "public"."paymentMethods" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "Allow authenticated users to select vat_categories" ON "public"."vatCategories" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "Doctors - user or admin" ON "public"."doctors" TO "authenticated" USING ((("profileId" = "auth"."uid"()) OR (EXISTS ( SELECT 1
   FROM "public"."profilesRoles" "pr"
  WHERE (("pr"."profileId" = "auth"."uid"()) AND ("pr"."roleId" = 1)))))) WITH CHECK ((("profileId" = "auth"."uid"()) OR (EXISTS ( SELECT 1
   FROM "public"."profilesRoles" "pr"
  WHERE (("pr"."profileId" = "auth"."uid"()) AND ("pr"."roleId" = 1))))));



CREATE POLICY "Employees - user or admin" ON "public"."employees" TO "authenticated" USING ((("profileId" = "auth"."uid"()) OR (EXISTS ( SELECT 1
   FROM "public"."profilesRoles" "pr"
  WHERE (("pr"."profileId" = "auth"."uid"()) AND ("pr"."roleId" = 1)))))) WITH CHECK ((("profileId" = "auth"."uid"()) OR (EXISTS ( SELECT 1
   FROM "public"."profilesRoles" "pr"
  WHERE (("pr"."profileId" = "auth"."uid"()) AND ("pr"."roleId" = 1))))));



CREATE POLICY "Enable insert for authenticated users only" ON "public"."profiles" FOR INSERT WITH CHECK (true);



CREATE POLICY "Enable read access for all users" ON "public"."profilesRoles" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."roles" FOR SELECT USING (true);



CREATE POLICY "Patients - user or admin" ON "public"."patients" TO "authenticated" USING ((("profileId" = "auth"."uid"()) OR (EXISTS ( SELECT 1
   FROM "public"."profilesRoles" "pr"
  WHERE (("pr"."profileId" = "auth"."uid"()) AND ("pr"."roleId" = 1)))))) WITH CHECK ((("profileId" = "auth"."uid"()) OR (EXISTS ( SELECT 1
   FROM "public"."profilesRoles" "pr"
  WHERE (("pr"."profileId" = "auth"."uid"()) AND ("pr"."roleId" = 1))))));



CREATE POLICY "Profiles - admin full access" ON "public"."profiles" TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."profilesRoles" "pr"
  WHERE (("pr"."profileId" = "auth"."uid"()) AND ("pr"."roleId" = 1)))));



CREATE POLICY "Profiles - authenticated only" ON "public"."profiles" TO "authenticated" USING (("auth"."uid"() IS NOT NULL));



CREATE POLICY "Profiles - users manage own" ON "public"."profiles" TO "authenticated" USING (("id" = "auth"."uid"())) WITH CHECK (("id" = "auth"."uid"()));



CREATE POLICY "Schedules - user or admin" ON "public"."employeeSchedules" TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."employees" "e"
  WHERE (("e"."id" = "employeeSchedules"."employeeId") AND (("e"."profileId" = "auth"."uid"()) OR (EXISTS ( SELECT 1
           FROM "public"."profilesRoles" "pr"
          WHERE (("pr"."profileId" = "auth"."uid"()) AND ("pr"."roleId" = 1))))))))) WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."employees" "e"
  WHERE (("e"."id" = "employeeSchedules"."employeeId") AND (("e"."profileId" = "auth"."uid"()) OR (EXISTS ( SELECT 1
           FROM "public"."profilesRoles" "pr"
          WHERE (("pr"."profileId" = "auth"."uid"()) AND ("pr"."roleId" = 1)))))))));



ALTER TABLE "public"."doctors" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."employeeSchedules" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."employees" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."expenseCategories" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."expenses" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."organizations" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."patients" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."paymentMethods" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."profilesRoles" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."roles" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."usersOrganizations" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."vatCategories" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

























































































































































GRANT ALL ON FUNCTION "public"."create_full_user"("p_user_id" "uuid", "p_profile" "jsonb", "p_orgs" "uuid"[], "p_role_ids" integer[], "p_employee" "jsonb", "p_patient" "jsonb", "p_doctor" "jsonb") TO "anon";
GRANT ALL ON FUNCTION "public"."create_full_user"("p_user_id" "uuid", "p_profile" "jsonb", "p_orgs" "uuid"[], "p_role_ids" integer[], "p_employee" "jsonb", "p_patient" "jsonb", "p_doctor" "jsonb") TO "authenticated";
GRANT ALL ON FUNCTION "public"."create_full_user"("p_user_id" "uuid", "p_profile" "jsonb", "p_orgs" "uuid"[], "p_role_ids" integer[], "p_employee" "jsonb", "p_patient" "jsonb", "p_doctor" "jsonb") TO "service_role";



GRANT ALL ON FUNCTION "public"."handle_updated_at"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_updated_at"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_updated_at"() TO "service_role";



GRANT ALL ON FUNCTION "public"."update_full_user"("p_user_id" "uuid", "p_profile" "jsonb", "p_orgs" "uuid"[], "p_role_ids" integer[], "p_employee" "jsonb", "p_patient" "jsonb", "p_doctor" "jsonb") TO "anon";
GRANT ALL ON FUNCTION "public"."update_full_user"("p_user_id" "uuid", "p_profile" "jsonb", "p_orgs" "uuid"[], "p_role_ids" integer[], "p_employee" "jsonb", "p_patient" "jsonb", "p_doctor" "jsonb") TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_full_user"("p_user_id" "uuid", "p_profile" "jsonb", "p_orgs" "uuid"[], "p_role_ids" integer[], "p_employee" "jsonb", "p_patient" "jsonb", "p_doctor" "jsonb") TO "service_role";


















GRANT ALL ON TABLE "public"."doctors" TO "anon";
GRANT ALL ON TABLE "public"."doctors" TO "authenticated";
GRANT ALL ON TABLE "public"."doctors" TO "service_role";



GRANT ALL ON TABLE "public"."employeeSchedules" TO "anon";
GRANT ALL ON TABLE "public"."employeeSchedules" TO "authenticated";
GRANT ALL ON TABLE "public"."employeeSchedules" TO "service_role";



GRANT ALL ON TABLE "public"."employees" TO "anon";
GRANT ALL ON TABLE "public"."employees" TO "authenticated";
GRANT ALL ON TABLE "public"."employees" TO "service_role";



GRANT ALL ON TABLE "public"."expenseCategories" TO "anon";
GRANT ALL ON TABLE "public"."expenseCategories" TO "authenticated";
GRANT ALL ON TABLE "public"."expenseCategories" TO "service_role";



GRANT ALL ON SEQUENCE "public"."expense_categories_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."expense_categories_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."expense_categories_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."expenses" TO "anon";
GRANT ALL ON TABLE "public"."expenses" TO "authenticated";
GRANT ALL ON TABLE "public"."expenses" TO "service_role";



GRANT ALL ON TABLE "public"."organizations" TO "anon";
GRANT ALL ON TABLE "public"."organizations" TO "authenticated";
GRANT ALL ON TABLE "public"."organizations" TO "service_role";



GRANT ALL ON TABLE "public"."patients" TO "anon";
GRANT ALL ON TABLE "public"."patients" TO "authenticated";
GRANT ALL ON TABLE "public"."patients" TO "service_role";



GRANT ALL ON TABLE "public"."paymentMethods" TO "anon";
GRANT ALL ON TABLE "public"."paymentMethods" TO "authenticated";
GRANT ALL ON TABLE "public"."paymentMethods" TO "service_role";



GRANT ALL ON SEQUENCE "public"."payment_methods_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."payment_methods_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."payment_methods_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";



GRANT ALL ON TABLE "public"."profilesRoles" TO "anon";
GRANT ALL ON TABLE "public"."profilesRoles" TO "authenticated";
GRANT ALL ON TABLE "public"."profilesRoles" TO "service_role";



GRANT ALL ON TABLE "public"."roles" TO "anon";
GRANT ALL ON TABLE "public"."roles" TO "authenticated";
GRANT ALL ON TABLE "public"."roles" TO "service_role";



GRANT ALL ON SEQUENCE "public"."roles_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."roles_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."roles_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."usersOrganizations" TO "anon";
GRANT ALL ON TABLE "public"."usersOrganizations" TO "authenticated";
GRANT ALL ON TABLE "public"."usersOrganizations" TO "service_role";



GRANT ALL ON TABLE "public"."vatCategories" TO "anon";
GRANT ALL ON TABLE "public"."vatCategories" TO "authenticated";
GRANT ALL ON TABLE "public"."vatCategories" TO "service_role";



GRANT ALL ON SEQUENCE "public"."vat_categories_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."vat_categories_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."vat_categories_id_seq" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";






























drop extension if exists "pg_net";


