import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { corsHeaders } from '../_shared/cors.ts';
import { supabaseAdmin } from '../_shared/supabase-admin.ts';

Deno.serve(async (req) => {
  // Manejar OPTIONS para CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: corsHeaders,
    });
  }
  // // Solo permitir método DELETE
  // if (req.method !== "DELETE") {
  //   return new Response(
  //     JSON.stringify({ error: "Método no permitido. Use DELETE." }),
  //     {
  //       status: 405,
  //       headers: { ...corsHeaders, "Content-Type": "application/json" },
  //     }
  //   );
  // }
  try {
    const body = await req.json();
    // Validar que se envió el userId
    if (!body.userId || typeof body.userId !== 'string') {
      throw new Error('userId es requerido y debe ser un string válido');
    }
    // Acá puedes agregar validación para verificar que el usuario tenga rol "admin"
    // Ejemplo: await validateAdminRole(req);
    // Verificar que el usuario existe antes de eliminarlo
    // const { data: existingUser, error: fetchError } = await supabase.auth.admin
    //   .getUserById(body.userId);
    // if (fetchError || !existingUser?.user) {
    //   throw new Error(`Usuario no encontrado: ${fetchError?.message || 'ID inválido'}`);
    // }
    // 1. Eliminar datos relacionados en la base de datos (opcional)
    // Si tienes una función SQL para limpiar datos relacionados:
    // const { error: cleanupError } = await supabaseAdmin.rpc("delete_user_data", {
    //   p_user_id: body.userId
    // });
    // if (cleanupError) {
    //   throw new Error(`Error limpiando datos: ${cleanupError.message}`);
    // }
    // 2. Eliminar usuario del auth
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(body.userId);
    if (deleteError) {
      throw new Error(`Error eliminando usuario: ${deleteError.message}`);
    }
    const response = {
      message: 'Usuario eliminado correctamente',
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
    console.error('Error en función delete_user:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido al eliminar usuario';
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
