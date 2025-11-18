import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@aeme/ui';
import { toast } from '@aeme/ui/toast';
import { cn } from '@aeme/ui/utils';
import { useQueryClient } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import useDeleteUserMutation from '@/modules/user-management/queries/use-delete-user-mutation';
import useDeleteUserModalStore from '@/modules/user-management/stores/delete-user-modal-store';
import getFormattedUserRoles from '@/shared/users/utils/get-formatted-user-roles';

export default function DeleteUserModal() {
  const { isOpen, close, user } = useDeleteUserModalStore();
  const { isPending, mutateAsync: deleteUser } = useDeleteUserMutation();
  const queryClient = useQueryClient();

  const handleOnSubmit = async () => {
    if (isPending) return;

    if (!user) {
      toast.error('No se ha seleccionado ningún usuario');
      return;
    }

    try {
      await deleteUser({ userId: user.profile.id });
      queryClient.invalidateQueries({ queryKey: ['get-users'] });
      close();
      toast.success('Usuario eliminado con éxito');
    } catch {
      toast.error('Error al eliminar el usuario');
    }
  };

  const handleOnClose = () => {
    if (isPending) return;
    close();
  };

  return user ? (
    <Dialog open={isOpen} onOpenChange={handleOnClose}>
      <DialogContent className='h-auto max-h-[95%] w-auto min-w-[500px] max-w-[95%] overflow-hidden gap-12 flex flex-col'>
        <DialogHeader className='shrink-0 h-auto'>
          <DialogTitle>Eliminar usuario</DialogTitle>
          <DialogDescription>Estás a punto de eliminar un usuario</DialogDescription>
        </DialogHeader>

        <div
          className={cn(
            'overflow-x-hidden overflow-y-auto h-full pr-2.5',
            isPending && 'pointer-events-none select-none opacity-60',
          )}
        >
          <div className='space-y-2'>
            <p>
              ¿Estás seguro de que querés eliminar al usuario{' '}
              <strong>
                {user.profile.name} {user.profile.lastName}
              </strong>
              ?
            </p>
            <p>
              <span className='font-semibold'>Documento:</span> {user.profile.documentType} {user.profile.documentValue}
            </p>
            <p>
              <span className='font-semibold'>Email:</span> {user.profile.email}
            </p>
            <p>
              <span className='font-semibold'>Roles:</span>{' '}
              {user.roles.length > 0 ? getFormattedUserRoles(user.roles) : 'Sin roles'}
            </p>
          </div>
        </div>

        <DialogFooter className='shrink-0 h-auto'>
          <DialogClose asChild disabled={isPending}>
            <Button variant='outline'>Cancelar</Button>
          </DialogClose>
          <Button type='submit' onClick={handleOnSubmit} disabled={isPending}>
            {isPending && <Loader className='mr-2 animate-spin' />}
            {isPending ? 'Eliminando...' : 'Eliminar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ) : null;
}
