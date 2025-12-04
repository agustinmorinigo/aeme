import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@aeme/ui';
import type { usePagination } from '@/hooks/use-pagination';

interface PaginationControlsProps {
  paginationState: ReturnType<typeof usePagination>;
  hasMore: boolean;
  showPageSize?: boolean;
}

export default function PaginationControls(props: PaginationControlsProps) {
  const { paginationState, hasMore, showPageSize = true } = props;
  const { goToNextPage, goToPreviousPage, hasPrevious, setPageSize, pagination } = paginationState;

  return (
    <div className='flex items-center justify-between py-4'>
      <div className='flex items-center space-x-2'>
        {showPageSize && (
          <>
            <span className='text-sm text-muted-foreground'>Filas por página:</span>
            <Select value={pagination.pageSize.toString()} onValueChange={(value) => setPageSize(Number(value))}>
              <SelectTrigger className='w-[70px]'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[10, 20, 30, 50, 100].map((size) => (
                  <SelectItem key={size} value={size.toString()}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </>
        )}
      </div>

      <div className='flex items-center space-x-6'>
        {/* <span className='text-sm text-muted-foreground'>Página {currentPage}</span> */}
        <div className='flex items-center space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={goToPreviousPage}
            disabled={!hasPrevious}
            className='select-none'
          >
            Anterior
          </Button>
          <Button variant='outline' size='sm' onClick={goToNextPage} disabled={!hasMore} className='select-none'>
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
}
