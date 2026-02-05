export interface PaginationParams {
  offset: number;
  limit: number;
}

/**
 * Parameters for date period filtering.
 */
export interface DatePeriodFilterParams {
  /** Year number (e.g., 2024). If provided with monthNumber, filters by specific month in that year. */
  yearNumber?: number;
  /** Month number (1-12). If provided alone, filters by month across all years. */
  monthNumber?: number;
}

/**
 * Configuration for applying date period filters to a query.
 */
export interface DatePeriodFilterConfig {
  /** The first date field name to filter on (e.g., "startDate") */
  dateField1: string;
  /** The second date field name to filter on (e.g., "endDate"). If omitted, only dateField1 is used. */
  dateField2?: string;
}

/**
 * Result of building a date period filter.
 */
export interface DatePeriodFilterResult {
  /** Whether a filter should be applied */
  hasFilter: boolean;
  /** The PostgREST filter string to use with .or() method */
  filterString: string;
}

/**
 * Builds a PostgREST filter string for filtering records by year and/or month on date fields.
 *
 * This helper handles three scenarios:
 * 1. Both year and month provided: filters by specific month in that year
 * 2. Only year provided: filters by entire year (Jan 1 - Dec 31)
 * 3. Only month provided: filters by month across all years using LIKE pattern
 *
 * The filter checks if EITHER date field falls within the period (OR logic).
 *
 * @param params - The date period parameters (yearNumber and/or monthNumber)
 * @param config - Configuration specifying which date fields to filter on
 * @returns Filter result with hasFilter flag and the filterString for .or() method
 *
 * @example
 * // Filter justifications by year and month
 * const filter = buildDatePeriodFilter(
 *   { yearNumber: 2024, monthNumber: 3 },
 *   { dateField1: 'startDate', dateField2: 'endDate' }
 * );
 * if (filter.hasFilter) {
 *   query = query.or(filter.filterString);
 * }
 *
 * @example
 * // Filter by single date field
 * const filter = buildDatePeriodFilter(
 *   { yearNumber: 2024 },
 *   { dateField1: 'createdAt' }
 * );
 * if (filter.hasFilter) {
 *   query = query.or(filter.filterString);
 * }
 */
export function buildDatePeriodFilter(
  params: DatePeriodFilterParams,
  config: DatePeriodFilterConfig,
): DatePeriodFilterResult {
  const { yearNumber, monthNumber } = params;
  const { dateField1, dateField2 } = config;

  // No filter if neither year nor month is provided
  if (yearNumber === undefined && monthNumber === undefined) {
    return { hasFilter: false, filterString: '' };
  }

  // Build conditions for a single date field
  const buildFieldConditions = (fieldName: string): string => {
    if (yearNumber !== undefined && monthNumber !== undefined) {
      // Both year and month: filter by specific month in that year
      const monthStr = String(monthNumber).padStart(2, '0');
      const lastDay = new Date(yearNumber, monthNumber, 0).getDate();
      const monthStart = `${yearNumber}-${monthStr}-01`;
      const monthEnd = `${yearNumber}-${monthStr}-${String(lastDay).padStart(2, '0')}`;
      return `and(${fieldName}.gte.${monthStart},${fieldName}.lte.${monthEnd})`;
    }

    if (yearNumber !== undefined) {
      // Only year: filter by entire year
      const yearStart = `${yearNumber}-01-01`;
      const yearEnd = `${yearNumber}-12-31`;
      return `and(${fieldName}.gte.${yearStart},${fieldName}.lte.${yearEnd})`;
    }

    // Only month: filter by month pattern across all years
    const monthStr = String(monthNumber).padStart(2, '0');
    const monthPattern = `%-${monthStr}-%`;
    return `${fieldName}.like.${monthPattern}`;
  };

  // Build the filter string
  const condition1 = buildFieldConditions(dateField1);

  if (dateField2) {
    // Two date fields: check if EITHER falls within the period
    const condition2 = buildFieldConditions(dateField2);
    return {
      hasFilter: true,
      filterString: `${condition1},${condition2}`,
    };
  }

  // Single date field
  return {
    hasFilter: true,
    filterString: condition1,
  };
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
  searchTerms?: string[];
  searchFields?: string[];
  sort?: {
    field: string;
    order: 'asc' | 'desc';
  };
}

/**
 * Normalizes a search string for multi-term searching.
 * - Removes dots between numbers only (to handle documents like 42.101.813 or 42101813)
 * - Keeps dots in emails (user@example.com remains user@example.com)
 * - Converts to lowercase
 * - Trims whitespace
 * - Splits into individual terms
 *
 * @param search - The raw search string
 * @returns Array of normalized search terms
 *
 * @example
 * normalizeSearchTerms("Diego Fern") // ["diego", "fern"]
 * normalizeSearchTerms("42.101.813") // ["42101813"]
 * normalizeSearchTerms("user@example.com") // ["user@example.com"]
 */
export function normalizeSearchTerms(search: string): string[] {
  // Remove dots only between numbers (for documents like 42.101.813)
  // This regex finds sequences of digits with dots and removes the dots
  // Example: "42.101.813" -> "42101813", but "test@example.com" stays the same
  const normalizedSearch = search
    .replace(/(\d+(?:\.\d+)+)/g, (match) => match.replace(/\./g, ''))
    .toLowerCase()
    .trim();
  return normalizedSearch.split(/\s+/).filter((term) => term.length > 0);
}

/**
 * Executes a paginated query with advanced multi-term search support.
 *
 * Search behavior:
 * - Use normalizeSearchTerms() BEFORE calling this function to get search terms
 * - Applies AND logic between terms (all terms must match)
 * - Applies OR logic between fields (term can match any field)
 *
 * @example
 * // Search in single field (recommended when using searchText)
 * const terms = search ? normalizeSearchTerms(search) : undefined;
 * await executePaginatedQuery(query, {
 *   pagination: { offset: 0, limit: 10 },
 *   searchTerms: terms,
 *   searchFields: ['searchText'],
 * });
 *
 * @example
 * // Search in nested field (for related tables)
 * const terms = search ? normalizeSearchTerms(search) : undefined;
 * await executePaginatedQuery(query, {
 *   pagination: { offset: 0, limit: 10 },
 *   searchTerms: terms,
 *   searchFields: ['employees.profiles.searchText'],
 * });
 */
export async function executePaginatedQuery<T>(
  query: any, // Supabase query builder
  options: PaginatedQueryOptions,
) {
  const { pagination, searchTerms, searchFields, sort } = options;

  // Apply advanced multi-term search if provided
  if (searchTerms && searchTerms.length > 0 && searchFields && searchFields.length > 0) {
    // Apply each term as a separate filter (AND logic between terms)
    // Each term must match at least one of the search fields (OR logic between fields)
    for (const term of searchTerms) {
      if (searchFields.length === 1) {
        // Single field: use ilike directly
        query = query.ilike(searchFields[0], `%${term}%`);
      } else {
        // Multiple fields: use OR between fields for each term
        const searchConditions = searchFields.map((field) => `${field}.ilike.%${term}%`).join(',');
        query = query.or(searchConditions);
      }
    }
  }

  // Apply sorting if provided
  if (sort) {
    query = query.order(sort.field, { ascending: sort.order === 'asc' });
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
