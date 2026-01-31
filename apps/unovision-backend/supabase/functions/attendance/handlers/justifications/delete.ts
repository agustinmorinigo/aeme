import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { ApiError } from '../../../_shared/core/errors.ts';
import { ResponseBuilder } from '../../../_shared/core/response.ts';
import { supabaseAdmin } from '../../../_shared/database/clients.ts';

export async function deleteJustification(userId: string) {
  try {
    // 1. Verify that the user exists before deleting
    const { data: existingUser, error: fetchError } = await supabaseAdmin.auth.admin.getUserById(userId);

    if (fetchError || !existingUser?.user) {
      throw ApiError.notFound(`User not found: ${fetchError?.message || 'Invalid id'}`);
    }

    // 2. Delete user from auth
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(userId);

    if (deleteError) {
      throw ApiError.internal(deleteError.message);
    }

    // 3. Successful response
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
