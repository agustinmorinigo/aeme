import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@aeme/ui';
import { Loader } from '@aeme/ui/icons';
import { cn } from '@aeme/ui/utils';
import { useRef } from 'react';
import HandleUserForm from '@/modules/user-management/components/handle-user-form';
import HandleUserModalFooter from '@/modules/user-management/components/handle-user-modal/modal-footer';
import useCreateUserMutation from '@/modules/user-management/queries/use-create-user-mutation';
import useGetUserQuery from '@/modules/user-management/queries/use-get-user-query';
import useUpdateUserMutation from '@/modules/user-management/queries/use-update-user-mutation';
import useHandleUserModalStore from '@/modules/user-management/stores/handle-user-modal-store';

interface HandleUserFormRef {
  submit: () => void;
}

const getTitle = (type: 'creation' | 'edition' | 'details'): string => {
  if (type === 'creation') return 'Crear usuario';
  if (type === 'edition') return 'Editar usuario';
  if (type === 'details') return 'Detalles del usuario';
  return '';
};

export default function HandleUserModal() {
  const { isOpen, close, type, isCreation, user } = useHandleUserModalStore();
  const { isPending: isCreateUserPending, mutateAsync: createUserAsync } = useCreateUserMutation();
  const { isPending: isEditUserPending, mutateAsync: updateUserAsync } = useUpdateUserMutation();
  const formRef = useRef<HandleUserFormRef>(null);
  const userId = user?.profile.id || '';
  const { data: userData, isPending: isGetUserPending, isError: isGetUserError } = useGetUserQuery(userId);
  const isSomethingPending = isCreateUserPending || isEditUserPending;

  const handleOnSubmit = () => {
    if (isSomethingPending) return;
    formRef.current?.submit();
  };

  const handleOnClose = () => {
    if (isSomethingPending) return;
    close();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOnClose}>
      <DialogContent className='h-auto max-h-[95%] w-auto min-w-[500px] max-w-[95%] overflow-hidden gap-12 flex flex-col'>
        <DialogHeader className='shrink-0 h-auto'>
          <DialogTitle>{getTitle(type)}</DialogTitle>

          {isCreation && <DialogDescription>Complete los pasos para crear un nuevo usuario</DialogDescription>}
        </DialogHeader>

        <div
          className={cn(
            'overflow-x-hidden overflow-y-auto h-full pr-2.5',
            isSomethingPending && 'pointer-events-none select-none opacity-60',
          )}
        >
          {!isCreation && isGetUserPending ? (
            <Loader className='mx-auto my-20 animate-spin' />
          ) : !isCreation && isGetUserError ? (
            <p className='text-center my-20'>Error al cargar los datos del usuario.</p>
          ) : (
            <HandleUserForm
              ref={formRef}
              createUserAsync={createUserAsync}
              updateUserAsync={updateUserAsync}
              userData={userData}
            />
          )}
        </div>

        <HandleUserModalFooter isSomethingPending={isSomethingPending} handleOnSubmit={handleOnSubmit} />
      </DialogContent>
    </Dialog>
  );
}
