-- =====================================================
-- SEED DE USUARIOS - SOLO DESARROLLO LOCAL
-- =====================================================
-- IMPORTANTE: Este archivo NUNCA debe ejecutarse en producción
-- Ver README.md para configuración correcta

DO $$
DECLARE
  agustin_id uuid;
  luz_id uuid;
  luz_employee_id uuid;
  carlos_id uuid;
  carlos_employee_id uuid;
  maria_id uuid;
  maria_employee_id uuid;
  diego_id uuid;
  diego_employee_id uuid;
BEGIN
  -- Verificar que estamos en desarrollo local
  IF current_setting('app.environment', true) = 'production' THEN
    RAISE NOTICE 'Skipping user seed - Production environment detected';
    RETURN;
  END IF;

  RAISE NOTICE 'Starting user seed for local development...';

  -- =====================================================
  -- USUARIO 1: AGUSTIN MORINIGO (ADMIN CON MÚLTIPLES ROLES)
  -- =====================================================
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'agustinmorinigo1999@gmail.com',
    crypt('DevPassword123!', gen_salt('bf')),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    NOW(),
    NOW(),
    '',
    '',
    '',
    ''
  ) RETURNING id INTO agustin_id;

  INSERT INTO public.profiles (id, name, "lastName", "documentType", "documentValue", gender, email, phone, address, "birthDate")
  VALUES (agustin_id, 'Agustin', 'Morinigo', 'dni', '12345678', 'male', 'agustinmorinigo1999@gmail.com', '5491123456789', 'Buenos Aires', '1999-01-01');

  INSERT INTO public."profilesRoles" ("profileId", "roleId") 
  VALUES (agustin_id, 1), (agustin_id, 5);

  INSERT INTO public."usersOrganizations" ("profileId", "organizationId") 
  VALUES
    (agustin_id, 'd5728fcf-3642-4935-9918-22912368aa0b'),
    (agustin_id, '32921ea7-cec7-46ab-a012-a160ae847d8a'),
    (agustin_id, 'd579483f-6f06-4c4e-aae4-b19515d44caa');

  RAISE NOTICE 'Created user: agustinmorinigo1999@gmail.com';

  -- =====================================================
  -- USUARIO 2: LUZ HERGENREDER (EMPLEADA)
  -- =====================================================
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'luz.hergenreder@example.com',
    crypt('DevPassword123!', gen_salt('bf')),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    NOW(),
    NOW(),
    '',
    '',
    '',
    ''
  ) RETURNING id INTO luz_id;

  INSERT INTO public.profiles (id, name, "lastName", "documentType", "documentValue", gender, email, phone, address, "birthDate")
  VALUES (luz_id, 'Luz', 'Hergenreder', 'dni', '16704245', 'female', 'luz.hergenreder@example.com', '1142131311', 'Avenida Corrientes 1234, Buenos Aires', '1985-03-15');

  INSERT INTO public."usersOrganizations" ("profileId", "organizationId") 
  VALUES
    (luz_id, 'd5728fcf-3642-4935-9918-22912368aa0b'),
    (luz_id, '32921ea7-cec7-46ab-a012-a160ae847d8a'),
    (luz_id, 'd579483f-6f06-4c4e-aae4-b19515d44caa');

  INSERT INTO public.employees ("profileId", "startDate", cuil, "contractType", "netSalary")
  VALUES (luz_id, '2023-01-15', '27167042455', 'singleTax', 1200000)
  RETURNING id INTO luz_employee_id;

  INSERT INTO public."employeeSchedules" ("employeeId", weekday, "startTime", "endTime", "isRemote")
  VALUES
    (luz_employee_id, 1, '09:00', '18:00', false),
    (luz_employee_id, 2, '09:00', '18:00', false),
    (luz_employee_id, 3, '09:00', '18:00', false),
    (luz_employee_id, 4, '09:00', '18:00', false),
    (luz_employee_id, 5, '09:00', '18:00', false);

  INSERT INTO public."profilesRoles" ("profileId", "roleId") VALUES (luz_id, 2);

  RAISE NOTICE 'Created user: luz.hergenreder@example.com';

  -- =====================================================
  -- USUARIO 3: CARLOS FERNANDEZ (EMPLEADO)
  -- =====================================================
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'carlos.fernandez@example.com',
    crypt('DevPassword123!', gen_salt('bf')),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    NOW(),
    NOW(),
    '',
    '',
    '',
    ''
  ) RETURNING id INTO carlos_id;

  INSERT INTO public.profiles (id, name, "lastName", "documentType", "documentValue", gender, email, phone, address, "birthDate")
  VALUES (carlos_id, 'Carlos', 'Fernandez', 'dni', '28345678', 'male', 'carlos.fernandez@example.com', '1155667788', 'Calle San Martin 567, Buenos Aires', '1990-07-22');

  INSERT INTO public."usersOrganizations" ("profileId", "organizationId") 
  VALUES
    (carlos_id, 'd5728fcf-3642-4935-9918-22912368aa0b'),
    (carlos_id, '32921ea7-cec7-46ab-a012-a160ae847d8a');

  INSERT INTO public.employees ("profileId", "startDate", cuil, "contractType", "netSalary")
  VALUES (carlos_id, '2022-06-01', '20283456789', 'dependent', 950000)
  RETURNING id INTO carlos_employee_id;

  INSERT INTO public."employeeSchedules" ("employeeId", weekday, "startTime", "endTime", "isRemote")
  VALUES
    (carlos_employee_id, 1, '08:00', '17:00', true),
    (carlos_employee_id, 2, '08:00', '17:00', false),
    (carlos_employee_id, 3, '08:00', '17:00', true),
    (carlos_employee_id, 4, '08:00', '17:00', false),
    (carlos_employee_id, 5, '08:00', '17:00', true);

  INSERT INTO public."profilesRoles" ("profileId", "roleId") VALUES (carlos_id, 2);

  RAISE NOTICE 'Created user: carlos.fernandez@example.com';

  -- =====================================================
  -- USUARIO 4: MARIA RODRIGUEZ (EMPLEADA)
  -- =====================================================
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'maria.rodriguez@example.com',
    crypt('DevPassword123!', gen_salt('bf')),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    NOW(),
    NOW(),
    '',
    '',
    '',
    ''
  ) RETURNING id INTO maria_id;

  INSERT INTO public.profiles (id, name, "lastName", "documentType", "documentValue", gender, email, phone, address, "birthDate")
  VALUES (maria_id, 'Maria', 'Rodriguez', 'dni', '35678912', 'female', 'maria.rodriguez@example.com', '1166778899', 'Avenida Rivadavia 2890, Buenos Aires', '1995-11-08');

  INSERT INTO public."usersOrganizations" ("profileId", "organizationId") 
  VALUES (maria_id, 'd579483f-6f06-4c4e-aae4-b19515d44caa');

  INSERT INTO public.employees ("profileId", "startDate", cuil, "contractType", "netSalary")
  VALUES (maria_id, '2024-02-10', '27356789125', 'dependent', 650000)
  RETURNING id INTO maria_employee_id;

  INSERT INTO public."employeeSchedules" ("employeeId", weekday, "startTime", "endTime", "isRemote")
  VALUES
    (maria_employee_id, 1, '08:00', '17:00', true),
    (maria_employee_id, 2, '08:00', '17:00', false),
    (maria_employee_id, 3, '08:00', '17:00', true),
    (maria_employee_id, 4, '08:00', '17:00', false),
    (maria_employee_id, 5, '08:00', '17:00', true);

  INSERT INTO public."profilesRoles" ("profileId", "roleId") VALUES (maria_id, 2);

  RAISE NOTICE 'Created user: maria.rodriguez@example.com';

  -- =====================================================
  -- USUARIO 5: DIEGO MARTINEZ (EMPLEADO SENIOR)
  -- =====================================================
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'diego.martinez@example.com',
    crypt('DevPassword123!', gen_salt('bf')),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    NOW(),
    NOW(),
    '',
    '',
    '',
    ''
  ) RETURNING id INTO diego_id;

  INSERT INTO public.profiles (id, name, "lastName", "documentType", "documentValue", gender, email, phone, address, "birthDate")
  VALUES (diego_id, 'Diego', 'Martinez', 'dni', '31245789', 'male', 'diego.martinez@example.com', '1144556677', 'Calle Belgrano 1523, Buenos Aires', '1988-05-30');

  INSERT INTO public."usersOrganizations" ("profileId", "organizationId") 
  VALUES
    (diego_id, 'd5728fcf-3642-4935-9918-22912368aa0b'),
    (diego_id, 'd579483f-6f06-4c4e-aae4-b19515d44caa');

  INSERT INTO public.employees ("profileId", "startDate", cuil, "contractType", "netSalary")
  VALUES (diego_id, '2021-09-20', '20312457892', 'dependent', 1450000)
  RETURNING id INTO diego_employee_id;

  INSERT INTO public."employeeSchedules" ("employeeId", weekday, "startTime", "endTime", "isRemote")
  VALUES
    (diego_employee_id, 1, '07:00', '16:00', false),
    (diego_employee_id, 2, '07:00', '16:00', false),
    (diego_employee_id, 3, '07:00', '16:00', false),
    (diego_employee_id, 4, '07:00', '16:00', false),
    (diego_employee_id, 5, '07:00', '16:00', false);

  INSERT INTO public."profilesRoles" ("profileId", "roleId") VALUES (diego_id, 2);

  RAISE NOTICE 'Created user: diego.martinez@example.com';

  -- =====================================================
  RAISE NOTICE '✅ User seed completed successfully!';
  RAISE NOTICE '📧 All users have password: DevPassword123!';
  RAISE NOTICE '🔗 View OTP codes at: http://127.0.0.1:54324';
  
EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE '❌ Error during seed: %', SQLERRM;
    RAISE;
END $$;