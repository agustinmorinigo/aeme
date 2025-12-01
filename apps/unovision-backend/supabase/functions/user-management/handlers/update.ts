import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { updateUserSchema } from '../../_contracts/index.ts';
import { requireAuthWithAdmin } from '../../_shared/auth.ts';
import { ApiError } from '../../_shared/errors.ts';
import { ResponseBuilder } from '../../_shared/response.ts';
import { supabaseAdmin } from '../../_shared/supabase-admin.ts';

export async function updateUser(req: Request, userId: string) {
  try {
    // 1. Authenticate and verify admin role
    await requireAuthWithAdmin(req);

    // 2. Parse and validate request body
    const body = await req.json();

    // Add userId to body for validation
    const bodyWithUserId = { ...body, userId };
    const validation = updateUserSchema.safeParse(bodyWithUserId);

    if (!validation.success) {
      return ResponseBuilder.validationError(validation.error);
    }

    const validated = validation.data;
    const { profile, organizationIds, roleIds, employeeData, patientData, doctorData } = validated;

    // 3. Verify that the user exists before updating
    const { data: existingUser, error: fetchError } = await supabaseAdmin.auth.admin.getUserById(userId);

    if (fetchError || !existingUser?.user) {
      throw ApiError.notFound(`User not found: ${fetchError?.message || 'Invalid ID'}`);
    }

    // 4. Execute SQL function to update user
    const { error: dbError } = await supabaseAdmin.rpc('update_full_user', {
      p_user_id: userId,
      p_profile: profile ?? null,
      p_orgs: organizationIds ?? null,
      p_role_ids: roleIds ?? undefined,
      p_employee: employeeData ?? null,
      p_patient: patientData ?? null,
      p_doctor: doctorData ?? null,
    });

    if (dbError) {
      throw ApiError.internal(`Database error: ${dbError.message}`);
    }

    // 5. Successful response
    return ResponseBuilder.success(
      {
        message: 'User updated successfully',
        userId,
      },
      200,
    );
  } catch (error) {
    return ResponseBuilder.error(error);
  }
}
