import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createUserSchema } from '../_contracts/index.ts';
import { requireAuthWithAdmin } from '../_shared/auth.ts';
import { ApiError } from '../_shared/errors.ts';
import { ResponseBuilder } from '../_shared/response.ts';
import { supabaseAdmin } from '../_shared/supabase-admin.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return ResponseBuilder.cors();
  }

  try {
    // 1. Verify that the user is authenticated and has admin role
    await requireAuthWithAdmin(req);

    // 2. Parse and validate request body
    const body = await req.json();
    const validation = createUserSchema.safeParse(body);

    if (!validation.success) {
      return ResponseBuilder.validationError(validation.error);
    }

    const validated = validation.data;
    const { profile, organizationIds, roleIds, employeeData, patientData, doctorData } = validated;

    // 3. Check that the email does not already exist
    const { data: existingUser } = await supabaseAdmin
      .from('profiles')
      .select('id')
      .eq('email', profile.email)
      .single();

    if (existingUser) {
      throw ApiError.conflict('Email is already registered');
    }

    // 4. Create user in auth.users
    const { data: user, error: userError } = await supabaseAdmin.auth.admin.createUser({
      email: profile.email,
      email_confirm: true,
    });

    if (userError || !user?.user) {
      throw ApiError.internal(userError?.message || 'Error creating user');
    }

    const userId = user.user.id;

    // 5. Execute SQL function for the rest of the insertions
    const { error: dbError } = await supabaseAdmin.rpc('create_full_user', {
      p_user_id: userId,
      p_profile: profile,
      p_orgs: organizationIds,
      p_role_ids: roleIds,
      p_employee: employeeData ?? null,
      p_patient: patientData ?? null,
      p_doctor: doctorData ?? null,
    });

    if (dbError) {
      // Manual rollback: delete user from auth
      await supabaseAdmin.auth.admin.deleteUser(userId);
      throw ApiError.internal(dbError.message);
    }

    // 6. Successful response
    return ResponseBuilder.success(
      {
        message: 'User created successfully',
        userId,
      },
      201,
    );
  } catch (error) {
    return ResponseBuilder.error(error);
  }
});
