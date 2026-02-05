import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@aeme/ui';
import { Loader } from '@aeme/ui/icons';
import { cn } from '@aeme/ui/utils';
import { useRef } from 'react';
import HandleEmployeeForm from '@/modules/employees/components/handle-employee-form';
import HandleEmployeeModalFooter from '@/modules/employees/components/handle-employee-modal/modal-footer';
import useCreateEmployeeMutation from '@/modules/employees/queries/use-create-employee-mutation';
import useGetEmployeeQuery from '@/modules/employees/queries/use-get-employee-query';
import useUpdateEmployeeMutation from '@/modules/employees/queries/use-update-employee-mutation';
import useHandleEmployeeModalStore from '@/modules/employees/stores/handle-employee-modal-store';

interface HandleEmployeeFormRef {
  submit: () => void;
}

const getTitle = (type: 'creation' | 'edition' | 'details'): string => {
  if (type === 'creation') return 'Crear empleado';
  if (type === 'edition') return 'Editar empleado';
  if (type === 'details') return 'Detalles del empleado';
  return '';
};

export default function HandleEmployeeModal() {
  const { isOpen, close, type, isCreation, user } = useHandleEmployeeModalStore();
  const { isPending: isCreateEmployeePending, mutateAsync: createEmployeeAsync } = useCreateEmployeeMutation();
  const { isPending: isEditEmployeePending, mutateAsync: updateEmployeeAsync } = useUpdateEmployeeMutation();
  const formRef = useRef<HandleEmployeeFormRef>(null);
  const userId = user?.profile.id || '';
  const {
    data: employeeData,
    isPending: isGetEmployeePending,
    isError: isGetEmployeeError,
  } = useGetEmployeeQuery(userId);
  const isSomethingPending = isCreateEmployeePending || isEditEmployeePending;

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

          {isCreation && <DialogDescription>Complete los pasos para crear un nuevo empleado</DialogDescription>}
        </DialogHeader>

        <div
          className={cn(
            'overflow-x-hidden overflow-y-auto h-full pr-2.5',
            isSomethingPending && 'pointer-events-none select-none opacity-60',
          )}
        >
          {!isCreation && isGetEmployeePending ? (
            <Loader className='mx-auto my-20 animate-spin' />
          ) : !isCreation && isGetEmployeeError ? (
            <p className='text-center my-20'>Error al cargar los datos del empleado.</p>
          ) : (
            <HandleEmployeeForm
              ref={formRef}
              // @ts-expect-error This will be removed when implementing form-id
              createEmployeeAsync={createEmployeeAsync}
              // @ts-expect-error This will be removed when implementing form-id.
              updateEmployeeAsync={updateEmployeeAsync}
              employeeData={employeeData}
            />
          )}
        </div>

        <HandleEmployeeModalFooter isSomethingPending={isSomethingPending} handleOnSubmit={handleOnSubmit} />
      </DialogContent>
    </Dialog>
  );
}
