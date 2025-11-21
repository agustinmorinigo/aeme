-- ============================================================================
-- FUNCTIONS SCHEMA
-- ============================================================================
-- Funciones utilizadas en la base de datos
-- DEPENDENCIAS: Todos los esquemas que las funciones utilizan

-- Función para manejar updated_at automáticamente
CREATE OR REPLACE FUNCTION "public"."handle_updated_at"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

ALTER FUNCTION "public"."handle_updated_at"() OWNER TO "postgres";

-- Función para crear usuario completo con todos sus roles y datos
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

-- Función para actualizar usuario completo con todos sus roles y datos
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

-- Permisos para funciones
GRANT ALL ON FUNCTION "public"."create_full_user"("p_user_id" "uuid", "p_profile" "jsonb", "p_orgs" "uuid"[], "p_role_ids" integer[], "p_employee" "jsonb", "p_patient" "jsonb", "p_doctor" "jsonb") TO "anon";
GRANT ALL ON FUNCTION "public"."create_full_user"("p_user_id" "uuid", "p_profile" "jsonb", "p_orgs" "uuid"[], "p_role_ids" integer[], "p_employee" "jsonb", "p_patient" "jsonb", "p_doctor" "jsonb") TO "authenticated";
GRANT ALL ON FUNCTION "public"."create_full_user"("p_user_id" "uuid", "p_profile" "jsonb", "p_orgs" "uuid"[], "p_role_ids" integer[], "p_employee" "jsonb", "p_patient" "jsonb", "p_doctor" "jsonb") TO "service_role";

GRANT ALL ON FUNCTION "public"."handle_updated_at"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_updated_at"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_updated_at"() TO "service_role";

GRANT ALL ON FUNCTION "public"."update_full_user"("p_user_id" "uuid", "p_profile" "jsonb", "p_orgs" "uuid"[], "p_role_ids" integer[], "p_employee" "jsonb", "p_patient" "jsonb", "p_doctor" "jsonb") TO "anon";
GRANT ALL ON FUNCTION "public"."update_full_user"("p_user_id" "uuid", "p_profile" "jsonb", "p_orgs" "uuid"[], "p_role_ids" integer[], "p_employee" "jsonb", "p_patient" "jsonb", "p_doctor" "jsonb") TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_full_user"("p_user_id" "uuid", "p_profile" "jsonb", "p_orgs" "uuid"[], "p_role_ids" integer[], "p_employee" "jsonb", "p_patient" "jsonb", "p_doctor" "jsonb") TO "service_role";