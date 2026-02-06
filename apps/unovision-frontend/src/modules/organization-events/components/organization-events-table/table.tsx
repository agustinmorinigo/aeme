import { DataTable } from '@/components/common/data-table';
import Loader from '@/components/common/loader';
import { usePagination } from '@/hooks/use-pagination';
import { columns } from '@/modules/organization-events/components/organization-events-table/columns';
import useGetOrganizationEventsQuery from '@/modules/organization-events/queries/use-get-organization-events-query';

interface OrganizationEventsTableProps {
  organizationId: string;
  monthNumber: number;
  yearNumber: number;
}

export default function OrganizationEventsTable(props: OrganizationEventsTableProps) {
  const { organizationId, monthNumber, yearNumber } = props;
  const paginationState = usePagination({ initialPageSize: 50 });

  const { isPending, isError, data } = useGetOrganizationEventsQuery({
    offset: paginationState.offset,
    limit: paginationState.limit,
    sortBy: 'startDate',
    sortOrder: 'asc',
    organizationId,
    monthNumber,
    yearNumber,
  });

  if (isPending) {
    return <Loader className='size-10 mt-14' />;
  }

  if (isError) {
    return <div>Error loading organization events.</div>;
  }

  if (!data) {
    return <div>No organization events found.</div>;
  }

  return (
    <div>
      <DataTable
        columns={columns}
        data={data.organizationEvents}
        paginationState={paginationState}
        hasMore={data.hasMore}
      />
    </div>
  );
}
