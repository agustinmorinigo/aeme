import type { User } from '@aeme/contracts';
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@aeme/ui';
import { EllipsisVertical } from '@aeme/ui/icons';
import useDeleteUserModalStore from '@/modules/user-management/stores/delete-user-modal-store';
import useHandleUserModalStore from '@/modules/user-management/stores/handle-user-modal-store';

interface TableActionsProps {
  user: User;
}

export default function TableActions({ user }: TableActionsProps) {
  const { open: openHandleUserModal } = useHandleUserModalStore();
  const { open: openDeleteUserModal } = useDeleteUserModalStore();

  const handleOnSeeDetails = () => {
    openHandleUserModal({ type: 'details', user });
  };

  const handleOnEdit = () => {
    openHandleUserModal({ type: 'edition', user });
  };

  const handleOnDelete = () => {
    openDeleteUserModal({ user });
  };

  return (
    <div className='w-full flex items-center justify-center'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' title='Menú'>
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem onClick={handleOnSeeDetails}>Ver detalles</DropdownMenuItem>
          <DropdownMenuItem onClick={handleOnEdit}>Editar</DropdownMenuItem>
          <DropdownMenuItem onClick={handleOnDelete}>Eliminar</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
