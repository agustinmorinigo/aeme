import type { CreateOrganizationEventBody, UpdateOrganizationEventBody } from '@aeme/contracts';
import { Button, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, toast } from '@aeme/ui';
import { Loader } from '@aeme/ui/icons';
import { cn } from '@aeme/ui/utils';
import { useQueryClient } from '@tanstack/react-query';
import HandleOrganizationEventForm from '@/modules/organization-events/components/handle-organization-event-form/handle-organization-event-form';
import { useCreateOrganizationEventMutation } from '@/modules/organization-events/queries/use-create-organization-event-mutation';
import useGetOrganizationEventQuery from '@/modules/organization-events/queries/use-get-organization-event-query';
import { useUpdateOrganizationEventMutation } from '@/modules/organization-events/queries/use-update-organization-event-mutation';
import type { HandleOrganizationEventSchema } from '@/modules/organization-events/schemas/handle-organization-event-schema';
import useHandleOrganizationEventModalStore from '@/modules/organization-events/stores/use-handle-organization-event-modal-store';

const getTitle = (type: 'creation' | 'edition'): string => {
  if (type === 'creation') return 'Nuevo evento organizacional';
  if (type === 'edition') return 'Editar evento organizacional';
  return '';
};

const getDescription = (type: 'creation' | 'edition'): string => {
  if (type === 'creation') return 'Completa los datos para registrar un evento de la organización';
  if (type === 'edition') return 'Actualiza los datos del evento organizacional';
  return '';
};

export default function HandleOrganizationEventModal() {
  const { isOpen, close, type, isCreation, organizationEvent } = useHandleOrganizationEventModalStore();
  const { isPending: isCreatePending, mutateAsync: createOrganizationEventAsync } =
    useCreateOrganizationEventMutation();
  const { isPending: isUpdatePending, mutateAsync: updateOrganizationEventAsync } =
    useUpdateOrganizationEventMutation();
  const queryClient = useQueryClient();
  const organizationEventId = organizationEvent?.id || '';

  const {
    data: organizationEventData,
    isPending: isGetOrganizationEventPending,
    isError: isGetOrganizationEventError,
  } = useGetOrganizationEventQuery(organizationEventId);

  const isSomethingPending = isCreatePending || isUpdatePending;

  const handleOnSubmit = async (data: HandleOrganizationEventSchema) => {
    try {
      if (isCreation) {
        // Build API body for creation (exclude organizationEventId)
        const apiBody: CreateOrganizationEventBody = {
          organizationId: data.organizationId,
          type: data.type,
          startDate: data.startDate,
          endDate: data.endDate,
          ...(data.description && { description: data.description }),
        };

        // Call create mutation
        await createOrganizationEventAsync(apiBody);

        // Show success toast
        toast.success('Evento creado', {
          description: 'El evento organizacional se ha guardado correctamente',
        });
      } else {
        // Build API body for update (exclude organizationId)
        const apiBody: UpdateOrganizationEventBody = {
          organizationEventId: data.organizationEventId!,
          type: data.type,
          startDate: data.startDate,
          endDate: data.endDate,
          ...(data.description && { description: data.description }),
        };

        // Call update mutation
        await updateOrganizationEventAsync(apiBody);

        // Show success toast
        toast.success('Evento actualizado', {
          description: 'Los cambios se han guardado correctamente',
        });
      }

      // Invalidate organization-events queries
      await queryClient.invalidateQueries({ queryKey: ['get-organization-events'] });
      await queryClient.invalidateQueries({ queryKey: ['get-organization-event', organizationEventId] });

      // Close modal
      close();
    } catch (error) {
      toast.error(isCreation ? 'Error al crear evento' : 'Error al actualizar evento', {
        description: error instanceof Error ? error.message : 'Ha ocurrido un error inesperado',
      });
    }
  };

  const handleClose = () => {
    if (isSomethingPending) return;
    close();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className='h-auto max-h-[95%] w-auto min-w-[500px] max-w-[95%] overflow-hidden gap-6 flex flex-col'>
        <DialogHeader className='shrink-0 h-auto'>
          <DialogTitle>{getTitle(type)}</DialogTitle>
          <DialogDescription>{getDescription(type)}</DialogDescription>
        </DialogHeader>

        <div
          className={cn(
            'w-full overflow-x-hidden overflow-y-auto h-full pr-2.5',
            isSomethingPending && 'pointer-events-none select-none opacity-60',
          )}
        >
          {!isCreation && isGetOrganizationEventPending ? (
            <Loader className='mx-auto my-20 animate-spin' />
          ) : !isCreation && isGetOrganizationEventError ? (
            <p className='text-center my-20'>Error al cargar los datos del evento.</p>
          ) : (
            <HandleOrganizationEventForm onSubmit={handleOnSubmit} organizationEventData={organizationEventData} />
          )}
        </div>

        <div className='flex justify-end gap-3 pt-4'>
          <Button type='button' variant='outline' onClick={handleClose} disabled={isSomethingPending}>
            Cancelar
          </Button>
          <Button type='submit' disabled={isSomethingPending} form='handle-organization-event-form'>
            {isSomethingPending ? 'Guardando...' : isCreation ? 'Guardar evento' : 'Actualizar evento'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
