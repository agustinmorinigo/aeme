import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { corsHeaders } from '../_shared/cors.ts';
import { supabaseAdmin } from '../_shared/supabase-admin.ts';

Deno.serve(async (req) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: corsHeaders,
    });
  }
  try {
    const body = await req.json();
    // Acá falta validación para validar q el usuario tenga el ROLE "admin" VER CÓMO SE PUEDE LOGRAR ESO, DE FORMA MUY SIMPLE...
    // 1. Crear usuario en auth.users
    const { data: user, error: userError } = await supabaseAdmin.auth.admin.createUser({
      email: body.profile.email,
      email_confirm: true,
    });
    if (userError || !user?.user) {
      throw new Error(`Error creando usuario: ${userError?.message}`);
    }
    const userId = user.user.id;
    // 2. Ejecutar función SQL para resto de inserciones
    const { error: dbError } = await supabaseAdmin.rpc('create_full_user', {
      p_user_id: userId,
      p_profile: body.profile,
      p_orgs: body.organizationIds,
      p_role_ids: body.roleIds ?? null,
      p_employee: body.employeeData ?? null,
      p_patient: body.patientData ?? null,
      p_doctor: body.doctorData ?? null,
    });
    if (dbError) {
      // rollback manual
      await supabaseAdmin.auth.admin.deleteUser(userId);
      throw new Error(`Error en DB: ${dbError.message}`);
    }
    const response = {
      message: 'Usuario creado correctamente',
      userId,
    };
    return new Response(JSON.stringify(response), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
      status: 200,
    });
  } catch (error) {
    console.error('Error en función create_full_user:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    return new Response(
      JSON.stringify({
        error: errorMessage,
      }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    );
  }
});
