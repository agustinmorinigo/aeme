import { useState } from 'react';
import Loader from '@/components/common/loader';
import { columns } from '@/modules/user-management/components/user-management-table/columns';
import UserManagementTable from '@/modules/user-management/components/user-management-table/table';
import useGetUsersQuery from '@/modules/user-management/queries/use-get-users-query';

export default function UserManagementTableContainer() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const offset = pagination.pageIndex * pagination.pageSize;
  
  const { isPending, isError, data } = useGetUsersQuery({
    offset,
    limit: pagination.pageSize,
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
        data={data.data}
        pagination={pagination}
        setPagination={setPagination}
        hasMore={data.hasMore}
        hasPrevious={pagination.pageIndex > 0}
      />
    </div>
  );
}
