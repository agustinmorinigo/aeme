import CreateUserButton from '@/modules/user-management/components/create-user-button';
import DeleteUserModal from '@/modules/user-management/components/delete-user-modal/modal';
import HandleUserModal from '@/modules/user-management/components/handle-user-modal/modal';
import UserManagementTableContainer from '@/modules/user-management/components/user-management-table/container';

export default function UserManagementLayout() {
  return (
    <div className="w-full flex flex-col gap-8 max-w-[1250px] overflow-hidden mx-auto mt-24">
      <div className="w-full flex items-center justify-end">
        <CreateUserButton />
      </div>
      <UserManagementTableContainer />
      <HandleUserModal />
      <DeleteUserModal />
    </div>
  );
}
