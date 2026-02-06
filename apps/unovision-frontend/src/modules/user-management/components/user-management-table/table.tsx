import { DataTable } from '@/components/common/data-table';
import Loader from '@/components/common/loader';
import { usePagination } from '@/hooks/use-pagination';
import { columns } from '@/modules/user-management/components/user-management-table/columns';
import useGetUsersQuery from '@/modules/user-management/queries/use-get-users-query';

interface UserManagementTableProps {
  search: string;
}

export default function UserManagementTable({ search }: UserManagementTableProps) {
  const paginationState = usePagination({ initialPageSize: 50 });

  const { isPending, isError, data } = useGetUsersQuery({
    offset: paginationState.offset,
    limit: paginationState.limit,
    ...(search && search.trim().length > 0 ? { search } : {}),
    sortBy: 'updatedAt',
    sortOrder: 'desc',
  });

  if (isPending) {
    return <Loader className='size-10 mt-14' />;
  }

  if (isError) {
    return <div>Error loading users.</div>;
  }

  if (!data) {
    return <div>No users found.</div>;
  }

  return (
    <div>
      <DataTable columns={columns} data={data.users} paginationState={paginationState} hasMore={data.hasMore} />
    </div>
  );
}
