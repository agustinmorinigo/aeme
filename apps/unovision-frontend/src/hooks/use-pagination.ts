import { useState } from 'react';

interface UsePaginationOptions {
  initialPageSize?: number;
  initialPageIndex?: number;
}

export function usePagination(options: UsePaginationOptions = {}) {
  const { initialPageSize = 10, initialPageIndex = 0 } = options;

  const [pagination, setPagination] = useState({
    pageIndex: initialPageIndex,
    pageSize: initialPageSize,
  });

  const offset = pagination.pageIndex * pagination.pageSize;

  const goToNextPage = () => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: prev.pageIndex + 1,
    }));
  };

  const goToPreviousPage = () => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: Math.max(0, prev.pageIndex - 1),
    }));
  };

  const goToPage = (pageIndex: number) => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: Math.max(0, pageIndex),
    }));
  };

  const setPageSize = (pageSize: number) => {
    setPagination({
      pageIndex: 0, // Reset to first page when changing page size
      pageSize,
    });
  };

  const reset = () => {
    setPagination({
      pageIndex: initialPageIndex,
      pageSize: initialPageSize,
    });
  };

  const hasPrevious = pagination.pageIndex > 0;

  return {
    pagination,
    setPagination,
    offset,
    limit: pagination.pageSize,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    setPageSize,
    reset,
    hasPrevious,
    currentPage: pagination.pageIndex + 1, // 1-indexed for display
  };
}
