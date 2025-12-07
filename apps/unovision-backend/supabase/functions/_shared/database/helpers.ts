export interface PaginationParams {
  offset: number;
  limit: number;
}

export interface PaginationResult {
  from: number;
  to: number;
  hasMore: boolean;
  hasPrevious: boolean;
}

export function calculatePagination(params: PaginationParams, totalCount: number): PaginationResult {
  const { offset, limit } = params;
  const from = offset;
  const to = offset + limit - 1;

  return {
    from,
    to,
    hasMore: to + 1 < totalCount,
    hasPrevious: offset > 0,
  };
}

export interface PaginationMeta {
  offset: number;
  limit: number;
  total: number;
  hasMore: boolean;
  hasPrevious: boolean;
  currentPage: number;
  totalPages: number;
}

export function createPaginationMeta(params: PaginationParams, totalCount: number): PaginationMeta {
  const { offset, limit } = params;
  const totalPages = Math.ceil(totalCount / limit);
  const currentPage = Math.floor(offset / limit) + 1;

  return {
    offset,
    limit,
    total: totalCount,
    hasMore: offset + limit < totalCount,
    hasPrevious: offset > 0,
    currentPage,
    totalPages,
  };
}

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
