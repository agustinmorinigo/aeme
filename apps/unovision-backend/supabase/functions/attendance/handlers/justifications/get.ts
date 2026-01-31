import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import type { SupabaseClient } from 'jsr:@supabase/supabase-js@2';
import type { GetJustificationsRawResponse, GetJustificationsResponse } from '../../../_contracts/index.ts';
import { ResponseBuilder } from '../../../_shared/core/response.ts';
import type { Database } from '../../../_shared/core/types.ts';
import { executePaginatedQuery } from '../../../_shared/database/helpers.ts';
import { parseQueryParams } from '../../../_shared/utils/query-params.ts';

export async function getJustifications(supabase: SupabaseClient<Database>, req: Request) {
  try {
    // 1. Extract query params
    const params = parseQueryParams(req);
    const offset = params.getNumber('offset', 0);
    const limit = params.getNumber('limit', 10);
    const search = params.getString('search');
    const sortBy = params.getString('sortBy', 'updatedAt'); // Default: updatedAt
    const sortOrder = params.getString('sortOrder', 'desc') as 'asc' | 'desc'; // Default: desc

    // 2. Build base query
    const baseQuery = supabase.from('justifications').select(
      `
        *,
        employees!inner(
          *,
          profiles!inner(*)
        ),
        justificationDays(*)
      `,
      { count: 'exact' },
    );

    // 3. Execute paginated query with search
    const result = await executePaginatedQuery<GetJustificationsRawResponse>(baseQuery, {
      pagination: { offset, limit },
      search,
      searchFields: ['description'],
      sort: {
        field: sortBy,
        order: sortOrder,
      },
    });

    // 4. Transform data
    const transformedData: GetJustificationsResponse = {
      // @ts-expect-error
      justifications: result.data.map((item) => {
        const { employees, justificationDays, ...justificationFields } = item;
        return {
          ...justificationFields,
          employee: {
            ...employees,
            profile: employees.profiles,
          },
          days: justificationDays,
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
