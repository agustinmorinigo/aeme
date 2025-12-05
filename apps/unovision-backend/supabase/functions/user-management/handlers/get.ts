import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import type { GetUsersRawResponse, GetUsersResponse } from '../../_contracts/index.ts';
import { requireAuthWithAdmin } from '../../_shared/auth.ts';
import { parseQueryParams } from '../../_shared/query-params.ts';
import { ResponseBuilder } from '../../_shared/response.ts';
import { supabaseAdmin } from '../../_shared/supabase-admin.ts';
import { executePaginatedQuery } from '../../_shared/supabase-helpers.ts';

export async function getUsers(req: Request) {
  try {
    // 1. Authenticate and verify admin role
    await requireAuthWithAdmin(req);

    // 2. Extract query params
    const params = parseQueryParams(req);
    const offset = params.getNumber('offset', 0);
    const limit = params.getNumber('limit', 10);
    const search = params.getString('search');

    // 3. Build base query
    const baseQuery = supabaseAdmin
      .from('profiles')
      .select(
        `
        *,
        roles:profilesRoles!profileId(roles(*))
      `,
        { count: 'exact' },
      )
      .neq('email', 'agustinmorinigo1999@gmail.com');

    // 4. Execute paginated query with search
    const result = await executePaginatedQuery<GetUsersRawResponse>(baseQuery, {
      pagination: { offset, limit },
      search,
      searchFields: ['name', 'lastName', 'email'],
    });

    // 5. Transform data
    const transformedData: GetUsersResponse = {
      users: result.data.map((item) => {
        const { roles, ...rest } = item;
        return {
          profile: { ...rest },
          roles: roles.map((role) => role.roles),
        };
      }),
      count: result.count,
      hasMore: result.hasMore,
    };

    // 6. Successful response
    return ResponseBuilder.success(transformedData, 200);
  } catch (error) {
    return ResponseBuilder.error(error);
  }
}
