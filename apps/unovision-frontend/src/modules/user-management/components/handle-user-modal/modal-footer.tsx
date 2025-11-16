import { Button, DialogClose, DialogFooter } from '@aeme/ui';
import { Loader } from 'lucide-react';
import useHandleUserModalStore from '@/modules/user-management/stores/handle-user-modal-store';

interface HandleUserModalFooterProps {
  isSomethingPending: boolean;
  handleOnSubmit: () => void;
}

export default function HandleUserModalFooter(props: HandleUserModalFooterProps) {
  const { isSomethingPending, handleOnSubmit } = props;
  const { isEdition, isDetails } = useHandleUserModalStore();

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
