import type { OrganizationEvent } from '@aeme/supabase-client/entities';
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@aeme/ui';
import { EllipsisVertical } from '@aeme/ui/icons';
import useDeleteOrganizationEventModalStore from '@/modules/organization-events/stores/use-delete-organization-event-modal-store';
import useHandleOrganizationEventModalStore from '@/modules/organization-events/stores/use-handle-organization-event-modal-store';

interface TableActionsProps {
  organizationEvent: OrganizationEvent;
}

export default function TableActions({ organizationEvent }: TableActionsProps) {
  const { open: openDeleteOrganizationEventModal } = useDeleteOrganizationEventModalStore();
  const { open: openHandleOrganizationEventModal } = useHandleOrganizationEventModalStore();

  const handleOnEdit = () => {
    openHandleOrganizationEventModal({ type: 'edition', organizationEvent });
  };

  const handleOnDelete = () => {
    openDeleteOrganizationEventModal(organizationEvent);
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
