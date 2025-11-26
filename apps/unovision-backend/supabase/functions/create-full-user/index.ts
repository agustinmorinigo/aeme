import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
// import { handleUserFormSchema } from '@aeme/contracts';
import { createUserSchema } from '../../../../../packages/contracts/src/index.ts'; // q esto venga de shared. TODO: VER SI CON ESTO, NO HACE FALTA ALGUNAS COSAS COMO QUITAR deno.json y ESO.
// import { requireRole } from '../_shared/auth.ts';
import { ApiError } from '../_shared/errors.ts';
import { ResponseBuilder } from '../_shared/response.ts';
import { supabaseAdmin } from '../_shared/supabase-admin.ts';

Deno.serve(async (req) => {
  console.log('req: ', req);
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return ResponseBuilder.cors();
  }

  try {
    // HAY UN BUG ACÁ!
    // console.log('ACÁ 1');
    // // 1. Autenticar y verificar rol de admin
    // const authHeader = req.headers.get('Authorization');
    // if (!authHeader) {
    //   throw ApiError.unauthorized('Token de autorización requerido');
    // }

    // // Crear cliente con el token del usuario para verificar auth
    // const supabase = getSupabaseClient(authHeader);
    // console.log('ACÁ 2');
    // // Verificar que el usuario tenga rol "admin"
    // await requireRole(supabase, 'admin');

    console.log('ACÁ 3');

    // 2. Validar body
    const body = await req.json();
    console.log('BODYYYYYYY: ', body);

    const validation = createUserSchema.safeParse(body);
    console.log('VALIDATIONNNNNNNNNNNN: ', validation);

    if (!validation.success) {
      return ResponseBuilder.validationError(validation.error);
    }

    const validated = validation.data;

    // 3. Verificar que el email no exista
    const { data: existingUser } = await supabaseAdmin
      .from('profiles')
      .select('id')
      .eq('email', validated.profile.email)
      .single();

    if (existingUser) {
      throw ApiError.conflict('El email ya está registrado');
    }

    // 4. Crear usuario en auth.users
    const { data: user, error: userError } = await supabaseAdmin.auth.admin.createUser({
      email: validated.profile.email,
      email_confirm: true,
    });

    if (userError || !user?.user) {
      throw ApiError.internal(`Error creando usuario: ${userError?.message}`);
    }

    const userId = user.user.id;

    // 5. Ejecutar función SQL para resto de inserciones
    const profileData = {
      name: validated.profile.name,
      lastName: validated.profile.lastName,
      documentType: validated.profile.documentType,
      documentValue: validated.profile.documentValue,
      gender: validated.profile.gender,
      email: validated.profile.email,
      phone: validated.profile.phone,
      address: validated.profile.address,
      birthDate: validated.profile.birthDate,
    };

    const { error: dbError } = await supabaseAdmin.rpc('create_full_user', {
      p_user_id: userId,
      p_profile: profileData,
      p_orgs: validated.organizationIds,
      // p_role_ids: validated.roleIds?.map((role) => parseInt(role)).filter((id) => !Number.isNaN(id)) ?? undefined,
      p_role_ids: [], // Por ahora roles vacíos
      p_employee: validated.employeeData ?? null,
      p_patient: validated.patientData ?? null,
      p_doctor: validated.doctorData ?? null,
    });

    if (dbError) {
      // Rollback manual: eliminar usuario de auth
      await supabaseAdmin.auth.admin.deleteUser(userId);
      throw ApiError.internal(`Error en DB: ${dbError.message}`);
    }

    // 6. Response exitosa
    return ResponseBuilder.success(
      {
        message: 'Usuario creado correctamente',
        userId,
      },
      201,
    );
  } catch (error) {
    return ResponseBuilder.error(error);
  }
});
