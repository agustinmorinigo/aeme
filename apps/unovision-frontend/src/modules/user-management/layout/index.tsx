import { Input } from '@aeme/ui';
import { useDebounce } from '@uidotdev/usehooks';
import { useState } from 'react';
import CreateUserButton from '@/modules/user-management/components/create-user-button';
import DeleteUserModal from '@/modules/user-management/components/delete-user-modal/modal';
import HandleUserModal from '@/modules/user-management/components/handle-user-modal/modal';
import UserManagementTable from '@/modules/user-management/components/user-management-table/table';

export default function UserManagementLayout() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  return (
    <div className='w-full flex flex-col gap-8 max-w-[1250px] mx-auto mt-24'>
      <div className='w-full flex items-center justify-between'>
        <Input
          placeholder='Buscar por nombre, apellido, email o documento'
          className='w-auto min-w-[330px]'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <CreateUserButton />
      </div>
      <UserManagementTable search={debouncedSearch} />
      <HandleUserModal />
      <DeleteUserModal />
    </div>
  );
}
