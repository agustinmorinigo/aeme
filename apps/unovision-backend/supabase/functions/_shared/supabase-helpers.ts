import { calculatePagination, type PaginationParams } from './pagination.ts';

export interface PaginatedQueryOptions {
  pagination: PaginationParams;
  search?: string;
  searchFields?: string[];
}

export async function executePaginatedQuery<T>(
  query: any, // Supabase query builder
  options: PaginatedQueryOptions,
) {
  const { pagination, search, searchFields } = options;

  // Apply search if provided
  if (search && searchFields && searchFields.length > 0) {
    const searchConditions = searchFields.map((field) => `${field}.ilike.%${search}%`).join(',');
    query = query.or(searchConditions);
  }

  // Calculate pagination
  const paginationCalc = calculatePagination(pagination, Number.MAX_SAFE_INTEGER);

  // Execute query
  const { data, error, count } = await query.range(paginationCalc.from, paginationCalc.to);

  if (error) {
    throw error;
  }

  const totalCount = count || 0;
  const finalPagination = calculatePagination(pagination, totalCount);

  return {
    data: data as T[],
    count: totalCount,
    hasMore: finalPagination.hasMore,
    hasPrevious: finalPagination.hasPrevious,
  };
}