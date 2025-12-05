import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import type { SupabaseClient } from 'jsr:@supabase/supabase-js@2';
import type { GetEmployeesRawResponse, GetEmployeesResponse } from '../../../_contracts/index.ts';
import { ApiError } from '../../../_shared/core/errors.ts';
import { ResponseBuilder } from '../../../_shared/core/response.ts';
import type { Database } from '../../../_shared/core/types.ts';
import { parseQueryParams } from '../../../_shared/utils/query-params.ts';

export async function getEmployees(supabase: SupabaseClient<Database>, req: Request) {
  try {
    const params = parseQueryParams(req);
    const organizationId = params.getString('organizationId');

    if (organizationId.trim() === '') {
      throw ApiError.badRequest('organizationId is required');
    }

    const { data: orgProfileIds, error: orgError } = await supabase
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

    const { data, error } = await supabase
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

    return ResponseBuilder.success(result, 200);
  } catch (error) {
    return ResponseBuilder.error(error);
  }
}
