import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { requireAuthWithAdmin } from '../_shared/auth.ts';
import { ApiError } from '../_shared/errors.ts';
import { ResponseBuilder } from '../_shared/response.ts';
import { supabaseAdmin } from '../_shared/supabase-admin.ts';

// TO DO: BORRAR ESTA FUNCIÓN CUANDO user-management esté ON.
Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return ResponseBuilder.cors();
  }

  try {
    // 1. Authenticate and verify admin role
    await requireAuthWithAdmin(req);

    // 2. Parse and validate request body
    const body = await req.json();

    // Validate that userId was sent in the request body
    if (!body.userId || typeof body.userId !== 'string') {
      throw ApiError.badRequest('userId is required');
    }

    const userId = body.userId;

    // 3. Verify that the user exists before deleting
    const { data: existingUser, error: fetchError } = await supabaseAdmin.auth.admin.getUserById(userId);

    if (fetchError || !existingUser?.user) {
      throw ApiError.notFound(`User not found: ${fetchError?.message || 'Invalid id'}`);
    }

    // 5. Delete user from auth
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(userId);

    if (deleteError) {
      throw ApiError.internal(deleteError.message);
    }

    // 6. Successful response
    return ResponseBuilder.success(
      {
        message: 'User deleted successfully',
        userId,
      },
      200,
    );
  } catch (error) {
    return ResponseBuilder.error(error);
  }
});
