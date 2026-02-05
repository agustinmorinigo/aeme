import type { Justification } from '@aeme/contracts';
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@aeme/ui';
import { EllipsisVertical } from '@aeme/ui/icons';
import useDeleteJustificationModalStore from '@/modules/justifications/stores/use-delete-justification-modal-store';
import useHandleJustificationModalStore from '@/modules/justifications/stores/use-handle-justification-modal-store';

interface TableActionsProps {
  justification: Justification;
}

export default function TableActions({ justification }: TableActionsProps) {
  const { open: openDeleteJustificationModal } = useDeleteJustificationModalStore();
  const { open: openHandleJustificationModal } = useHandleJustificationModalStore();

  const handleOnEdit = () => {
    openHandleJustificationModal({ type: 'edition', justification });
  };

  const handleOnDelete = () => {
    openDeleteJustificationModal({ justification });
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
          <DropdownMenuItem onClick={handleOnEdit}>Editar</DropdownMenuItem>
          <DropdownMenuItem onClick={handleOnDelete}>Eliminar</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
