import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import type { GetUsersRawResponse, GetUsersResponse } from '../../../_contracts/index.ts';
import { ResponseBuilder } from '../../../_shared/core/response.ts';
import { supabaseAdmin } from '../../../_shared/database/clients.ts';
import { executePaginatedQuery } from '../../../_shared/database/helpers.ts';
import { parseQueryParams } from '../../../_shared/utils/query-params.ts';

export async function getJustifications(req: Request) {
  try {
    // 1. Extract query params
    const params = parseQueryParams(req);
    const offset = params.getNumber('offset', 0);
    const limit = params.getNumber('limit', 10);
    const search = params.getString('search');
    const sortBy = params.getString('sortBy', 'updatedAt'); // Default: updatedAt
    const sortOrder = params.getString('sortOrder', 'desc') as 'asc' | 'desc'; // Default: desc

    // 2. Build base query
    const baseQuery = supabaseAdmin // ESTO NO TIENE Q SER SUPABASE ADMIN.
      .from('profiles')
      .select(
        `
        *,
        roles:profilesRoles!profileId(roles(*))
      `,
        { count: 'exact' },
      )
      .neq('email', 'agustinmorinigo1999@gmail.com');

    // 3. Execute paginated query with search
    const result = await executePaginatedQuery<GetUsersRawResponse>(baseQuery, {
      pagination: { offset, limit },
      search,
      searchFields: ['name', 'lastName', 'email', 'documentValue'],
      sort: {
        field: sortBy,
        order: sortOrder,
      },
    });

    // 4. Transform data
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

    // 5. Successful response
    return ResponseBuilder.success(transformedData, 200);
  } catch (error) {
    return ResponseBuilder.error(error);
  }
}
