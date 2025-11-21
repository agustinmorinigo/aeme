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
    // ⚠️ TODO: Validar que el que ejecuta esto tenga rol admin (similar a create)
    // 1. Ejecutar función SQL para update
    const { error: dbError } = await supabaseAdmin.rpc('update_full_user', {
      p_user_id: body.userId,
      p_profile: body.profile,
      p_orgs: body.organizationIds,
      p_role_ids: body.roleIds ?? null,
      p_employee: body.employeeData ?? null,
      p_patient: body.patientData ?? null,
      p_doctor: body.doctorData ?? null,
    });
    if (dbError) {
      throw new Error(`Error en DB: ${dbError.message}`);
    }
    const response = {
      message: 'Usuario actualizado correctamente',
      userId: body.userId,
    };
    return new Response(JSON.stringify(response), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
      status: 200,
    });
  } catch (error) {
    console.error('Error en función update_full_user:', error);
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
