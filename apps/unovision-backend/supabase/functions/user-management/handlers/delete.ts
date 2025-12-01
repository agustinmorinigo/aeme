import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { requireAuthWithAdmin } from '../../_shared/auth.ts';
import { ApiError } from '../../_shared/errors.ts';
import { ResponseBuilder } from '../../_shared/response.ts';
import { supabaseAdmin } from '../../_shared/supabase-admin.ts';

// TO DO: Verificar que cuando se borra de acá, se borran TODOS los datos relacionados. profile, roles, organizations, etc.
export async function deleteUser(req: Request, userId: string) {
  try {
    // 1. Authenticate and verify admin role
    await requireAuthWithAdmin(req);

    // 2. Verify that the user exists before deleting
    const { data: existingUser, error: fetchError } = await supabaseAdmin.auth.admin.getUserById(userId);

    if (fetchError || !existingUser?.user) {
      throw ApiError.notFound(`User not found: ${fetchError?.message || 'Invalid id'}`);
    }

    // 3. Delete user from auth
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(userId);

    if (deleteError) {
      throw ApiError.internal(deleteError.message);
    }

    // 4. Successful response
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
}
