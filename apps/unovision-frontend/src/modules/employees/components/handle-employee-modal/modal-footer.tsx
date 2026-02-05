import { Button, DialogClose, DialogFooter } from '@aeme/ui';
import { Loader } from '@aeme/ui/icons';
import useHandleEmployeeModalStore from '@/modules/employees/stores/handle-employee-modal-store';

interface HandleEmployeeModalFooterProps {
  isSomethingPending: boolean;
  handleOnSubmit: () => void;
}

export default function HandleEmployeeModalFooter(props: HandleEmployeeModalFooterProps) {
  const { isSomethingPending, handleOnSubmit } = props;
  const { isEdition, isDetails } = useHandleEmployeeModalStore();

  return isDetails ? (
    <DialogFooter className='shrink-0 h-auto'>
      <DialogClose asChild disabled={isSomethingPending}>
        <Button>Cerrar</Button>
      </DialogClose>
    </DialogFooter>
  ) : isEdition ? (
    <DialogFooter className='shrink-0 h-auto'>
      <DialogClose asChild disabled={isSomethingPending}>
        <Button variant='outline'>Cancelar</Button>
      </DialogClose>
      <Button type='submit' onClick={handleOnSubmit} disabled={isSomethingPending}>
        {isSomethingPending && <Loader className='mr-2 animate-spin' />}
        {isSomethingPending ? 'Editando...' : 'Editar'}
      </Button>
    </DialogFooter>
  ) : (
    <DialogFooter className='shrink-0 h-auto'>
      <DialogClose asChild disabled={isSomethingPending}>
        <Button variant='outline'>Cancelar</Button>
      </DialogClose>
      <Button type='submit' onClick={handleOnSubmit} disabled={isSomethingPending}>
        {isSomethingPending && <Loader className='mr-2 animate-spin' />}
        {isSomethingPending ? 'Creando...' : 'Crear'}
      </Button>
    </DialogFooter>
  );
}
