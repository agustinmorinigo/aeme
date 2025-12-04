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
