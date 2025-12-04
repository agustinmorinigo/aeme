// import { useState } from 'react';
import Loader from '@/components/common/loader';
import { usePagination } from '@/hooks/use-pagination';
import { columns } from '@/modules/user-management/components/user-management-table/columns';
import UserManagementTable from '@/modules/user-management/components/user-management-table/table';
import useGetUsersQuery from '@/modules/user-management/queries/use-get-users-query';

export default function UserManagementTableContainer() {
  const paginationState = usePagination({ initialPageSize: 10 });
  // const [search, setSearch] = useState(''); // Agregar debounce. // TO DO: ADD THIS SEARCHER LATER.

  const { isPending, isError, data } = useGetUsersQuery({
    offset: paginationState.offset,
    limit: paginationState.limit,
    // search,
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
      <UserManagementTable
        columns={columns}
        data={data.users}
        paginationState={paginationState}
        hasMore={data.hasMore}
      />
    </div>
  );
}
