import Loader from '@/components/common/loader';
import { usePagination } from '@/hooks/use-pagination';
import { columns } from '@/modules/justifications/components/justifications-table/columns';
import JustificationsTable from '@/modules/justifications/components/justifications-table/table';
import useGetJustificationsQuery from '@/modules/justifications/queries/use-get-justifications-query';

interface JustificationsTableContainerProps {
  search: string;
  organizationId: string;
  monthNumber: number;
  yearNumber: number;
}

export default function JustificationsTableContainer(props: JustificationsTableContainerProps) {
  const { search, organizationId, monthNumber, yearNumber } = props;
  const paginationState = usePagination({ initialPageSize: 50 });

  const { isPending, isError, data } = useGetJustificationsQuery({
    offset: paginationState.offset,
    limit: paginationState.limit,
    ...(search && search.trim().length > 0 ? { search: search.trim() } : {}),
    sortBy: 'updatedAt',
    sortOrder: 'desc',
    organizationId,
    monthNumber,
    yearNumber,
  });

  if (isPending) {
    return <Loader className='size-10 mt-14' />;
  }

  if (isError) {
    return <div>Error loading justifications.</div>;
  }

  if (!data) {
    return <div>No justifications found.</div>;
  }

  return (
    <div>
      <JustificationsTable
        columns={columns}
        data={data.justifications}
        paginationState={paginationState}
        hasMore={data.hasMore}
      />
    </div>
  );
}
