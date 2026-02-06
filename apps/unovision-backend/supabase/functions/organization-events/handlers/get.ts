import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import type { SupabaseClient } from 'jsr:@supabase/supabase-js@2';
import type { GetOrganizationEventsResponse } from '../../_contracts/index.ts';
import { ResponseBuilder } from '../../_shared/core/response.ts';
import type { Database } from '../../_shared/core/types.ts';
import { buildDatePeriodFilter, calculatePagination } from '../../_shared/database/helpers.ts';
import { parseQueryParams } from '../../_shared/utils/query-params.ts';

export async function getOrganizationEvents(supabase: SupabaseClient<Database>, req: Request) {
  try {
    // 1. Extract query params
    const params = parseQueryParams(req);
    const offset = params.getNumber('offset', 0);
    const limit = params.getNumber('limit', 10);
    const sortBy = params.getString('sortBy', 'updatedAt');
    const sortOrder = params.getString('sortOrder', 'desc') as 'asc' | 'desc';
    const organizationId = params.getString('organizationId');
    const yearNumber = params.getNumber('yearNumber');
    const monthNumber = params.getNumber('monthNumber');

    // 2. Build base query
    let baseQuery = supabase.from('organizationEvents').select('*', { count: 'exact' });

    // 3. Apply filters
    // Filter by organizationId if provided
    if (organizationId) {
      baseQuery = baseQuery.eq('organizationId', organizationId);
    }

    // Filter by year and/or month if provided
    const dateFilter = buildDatePeriodFilter(
      { yearNumber, monthNumber },
      { dateField1: 'startDate', dateField2: 'endDate' },
    );
    if (dateFilter.hasFilter) {
      baseQuery = baseQuery.or(dateFilter.filterString);
    }

    // Apply sorting
    baseQuery = baseQuery.order(sortBy, { ascending: sortOrder === 'asc' });

    // Calculate pagination
    const paginationCalc = calculatePagination({ offset, limit }, Number.MAX_SAFE_INTEGER);

    // Execute query with pagination
    const { data, error, count } = await baseQuery.range(paginationCalc.from, paginationCalc.to);

    if (error) {
      throw error;
    }

    const totalCount = count || 0;
    const finalPagination = calculatePagination({ offset, limit }, totalCount);

    // 4. Build response
    const transformedData: GetOrganizationEventsResponse = {
      organizationEvents: data || [],
      count: totalCount,
      hasMore: finalPagination.hasMore,
    };

    // 5. Successful response
    return ResponseBuilder.success(transformedData, 200);
  } catch (error) {
    return ResponseBuilder.error(error);
  }
}
