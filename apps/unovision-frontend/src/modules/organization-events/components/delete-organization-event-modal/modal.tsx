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
import { Loader } from '@aeme/ui/icons';
import { toast } from '@aeme/ui/toast';
import { cn } from '@aeme/ui/utils';
import { useQueryClient } from '@tanstack/react-query';
import useDeleteOrganizationEventMutation from '@/modules/organization-events/queries/use-delete-organization-event-mutation';
import useDeleteOrganizationEventModalStore from '@/modules/organization-events/stores/use-delete-organization-event-modal-store';
import getOrganizationEventTypeLabel from '@/modules/organization-events/utils/get-organization-event-type-label';
import formatDateRange from '@/utils/date/format-date-range';

export default function DeleteOrganizationEventModal() {
  const { isOpen, close, organizationEvent } = useDeleteOrganizationEventModalStore();
  const { isPending, mutateAsync: deleteOrganizationEvent } = useDeleteOrganizationEventMutation();
  const queryClient = useQueryClient();

  const handleOnSubmit = async () => {
    if (isPending) return;

    if (!organizationEvent) {
      toast.error('No se ha seleccionado ningún evento');
      return;
    }

    try {
      // Delete organization event from database
      await deleteOrganizationEvent(organizationEvent.id);

      // Invalidate queries and close modal
      queryClient.invalidateQueries({ queryKey: ['get-organization-events'] });
      close();
      toast.success('Evento eliminado con éxito');
    } catch {
      toast.error('Error al eliminar el evento');
    }
  };

  const handleOnClose = () => {
    if (isPending) return;
    close();
  };

  return organizationEvent ? (
    <Dialog open={isOpen} onOpenChange={handleOnClose}>
      <DialogContent className='h-auto max-h-[95%] w-auto min-w-[500px] max-w-[95%] overflow-hidden gap-12 flex flex-col'>
        <DialogHeader className='shrink-0 h-auto'>
          <DialogTitle>Eliminar evento organizacional</DialogTitle>
          <DialogDescription>Estás a punto de eliminar un evento organizacional</DialogDescription>
        </DialogHeader>

        <div
          className={cn(
            'overflow-x-hidden overflow-y-auto h-full pr-2.5',
            isPending && 'pointer-events-none select-none opacity-60',
          )}
        >
          <div className='space-y-2'>
            <p>¿Estás seguro de que querés eliminar este evento organizacional?</p>
            <p>
              <span className='font-semibold'>Tipo:</span> {getOrganizationEventTypeLabel(organizationEvent.type)}
            </p>
            <p>
              <span className='font-semibold'>Fechas:</span>{' '}
              {formatDateRange(organizationEvent.startDate, organizationEvent.endDate)}
            </p>
            {organizationEvent.description && (
              <p>
                <span className='font-semibold'>Descripción:</span> {organizationEvent.description}
              </p>
            )}
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
