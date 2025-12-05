import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import type { GetUserByIdRawResponse, GetUserByIdResponse } from '../../_contracts/index.ts';
import { RoleName } from '../../_entities/index.ts';
import { ApiError } from '../../_shared/core/errors.ts';
import { ResponseBuilder } from '../../_shared/core/response.ts';
import { supabaseAdmin } from '../../_shared/database/clients.ts';

export async function getUserById(userId: string) {
  try {
    // 1. Verify that the user exists in auth
    const { data: existingUser, error: fetchError } = await supabaseAdmin.auth.admin.getUserById(userId);

    if (fetchError || !existingUser?.user) {
      throw ApiError.notFound(`User not found: ${fetchError?.message || 'Invalid id'}`);
    }

    // 2. Get user profile from database
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (profileError || !profile) {
      throw ApiError.notFound(`User profile not found: ${profileError?.message || 'Invalid id'}`);
    }

    // 3. Get user roles to determine what additional data to fetch
    const { data: userRoles, error: rolesError } = await supabaseAdmin
      .from('profilesRoles')
      .select('roles(*)')
      .eq('profileId', userId);

    if (rolesError) {
      throw ApiError.internal(`Error fetching user roles: ${rolesError.message}`);
    }

    // 4. Check what additional data we need based on roles
    const roleNames = userRoles.map((ur) => ur.roles.name) as RoleName[];
    const needsEmployeeInfo = roleNames.includes(RoleName.Employee);
    const needsPatientInfo = roleNames.includes(RoleName.Patient);
    const needsDoctorInfo = roleNames.includes(RoleName.Doctor);

    // 5. Build the select fields dynamically
    const selectFields: string[] = [
      `*`,
      `organizations:usersOrganizations!profileId(organizations(*))`,
      `roles:profilesRoles!profileId(roles(*))`,
    ];

    if (needsEmployeeInfo) {
      selectFields.push(`
        employees:employees!profileId(
          *,
          employeeSchedules:employeeSchedules!employeeId(*)
        )
      `);
    }

    if (needsPatientInfo) {
      selectFields.push(`patients:patients!profileId(*)`);
    }

    if (needsDoctorInfo) {
      selectFields.push(`doctors:doctors!profileId(*)`);
    }

    // 6. Get complete user details
    const { data: userDetails, error: detailsError } = await supabaseAdmin
      .from('profiles')
      .select(selectFields.join(',\n'))
      .eq('id', userId)
      .single();

    if (detailsError) {
      throw ApiError.internal(`Error fetching user details: ${detailsError.message}`);
    }

    // 7. Transform data
    const { organizations, roles, employees, patients, doctors, ...profileData } =
      userDetails as unknown as GetUserByIdRawResponse;

    const transformedData: GetUserByIdResponse = {
      profile: profileData,
      organizations: organizations.map((item) => item.organizations),
      roles: roles.map((item) => item.roles),
      ...(employees ? { employees } : {}),
      ...(patients ? { patients } : {}),
      ...(doctors ? { doctors } : {}),
    };

    // 8. Successful response
    return ResponseBuilder.success(transformedData, 200);
  } catch (error) {
    return ResponseBuilder.error(error);
  }
}
