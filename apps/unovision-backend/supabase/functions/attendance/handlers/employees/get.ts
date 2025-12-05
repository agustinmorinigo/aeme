import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import type { GetEmployeesRawResponse, GetEmployeesResponse } from '../../../_contracts/index.ts';
import { requireAuthWithAdmin } from '../../../_shared/auth.ts';
import { ApiError } from '../../../_shared/errors.ts';
import { parseQueryParams } from '../../../_shared/query-params.ts';
import { ResponseBuilder } from '../../../_shared/response.ts';
import { supabaseAdmin } from '../../../_shared/supabase-admin.ts';

export async function getEmployees(req: Request) {
  try {
    // 1. Authenticate and verify admin role
    await requireAuthWithAdmin(req);

    // 2. Extract query params
    const params = parseQueryParams(req);
    const organizationId = params.getString('organizationId');

    if (organizationId.trim() === '') {
      throw ApiError.badRequest('organizationId is required');
    }

    const { data: orgProfileIds, error: orgError } = await supabaseAdmin
      .from('usersOrganizations')
      .select('profileId')
      .eq('organizationId', organizationId);

    if (orgError) {
      throw ApiError.internal(orgError.message);
    }

    if (!orgProfileIds?.length) {
      return ResponseBuilder.success({ employees: [] }, 200);
    }

    const profileIds = orgProfileIds.map((u) => u.profileId);

    const { data, error } = await supabaseAdmin
      .from('employees')
      .select(`
      *,
      profile:profiles!inner(*),
      employeeSchedules(*)
    `)
      .in('profileId', profileIds);

    if (error) {
      throw ApiError.internal(error.message);
    }

    if (!data) {
      return ResponseBuilder.success({ employees: [] }, 200);
    }

    const transformedData = data as unknown as GetEmployeesRawResponse[];

    const result: GetEmployeesResponse = {
      employees: transformedData.map((item) => ({
        id: item.id,
        netSalary: item.netSalary,
        schedules: item.employeeSchedules,
        profile: item.profile,
      })),
    };

    // 6. Successful response
    return ResponseBuilder.success(result, 200);
  } catch (error) {
    return ResponseBuilder.error(error);
  }
}
