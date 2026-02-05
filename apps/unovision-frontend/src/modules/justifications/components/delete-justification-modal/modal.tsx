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
import { useDeleteJustificationDocumentMutation } from '@/modules/justifications/queries/use-delete-justification-document-mutation';
import useDeleteJustificationMutation from '@/modules/justifications/queries/use-delete-justification-mutation';
import useDeleteJustificationModalStore from '@/modules/justifications/stores/use-delete-justification-modal-store';
import getJustificationTypeLabel from '@/modules/justifications/utils/get-justification-type-label';
import getFormattedUserDocument from '@/shared/users/utils/get-formatted-user-document';
import formatDateRange from '@/utils/date/format-date-range';

export default function DeleteJustificationModal() {
  const { isOpen, close, justification } = useDeleteJustificationModalStore();
  const { isPending: isDeletePending, mutateAsync: deleteJustification } = useDeleteJustificationMutation();
  const { isPending: isDeleteDocumentPending, mutateAsync: deleteDocument } = useDeleteJustificationDocumentMutation();
  const queryClient = useQueryClient();

  const isPending = isDeletePending || isDeleteDocumentPending;

  const handleOnSubmit = async () => {
    if (isPending) return;

    if (!justification) {
      toast.error('No se ha seleccionado ninguna justificación');
      return;
    }

    try {
      // 1. Delete document from storage if exists
      if (justification.documentLink) {
        await deleteDocument({ publicUrl: justification.documentLink });
      }

      // 2. Delete justification from database
      await deleteJustification(justification.id);

      // 3. Invalidate queries and close modal
      queryClient.invalidateQueries({ queryKey: ['get-justifications'] });
      close();
      toast.success('Justificación eliminada con éxito');
    } catch {
      toast.error('Error al eliminar la justificación');
    }
  };

  const handleOnClose = () => {
    if (isPending) return;
    close();
  };

  return justification ? (
    <Dialog open={isOpen} onOpenChange={handleOnClose}>
      <DialogContent className='h-auto max-h-[95%] w-auto min-w-[500px] max-w-[95%] overflow-hidden gap-12 flex flex-col'>
        <DialogHeader className='shrink-0 h-auto'>
          <DialogTitle>Eliminar justificación</DialogTitle>
          <DialogDescription>Estás a punto de eliminar una justificación</DialogDescription>
        </DialogHeader>

        <div
          className={cn(
            'overflow-x-hidden overflow-y-auto h-full pr-2.5',
            isPending && 'pointer-events-none select-none opacity-60',
          )}
        >
          <div className='space-y-2'>
            <p>
              ¿Estás seguro de que querés eliminar la justificación de{' '}
              <strong>
                {justification.employee.profile.name} {justification.employee.profile.lastName}
              </strong>
              ?
            </p>
            <p>
              <span className='font-semibold'>Documento:</span>{' '}
              {getFormattedUserDocument(justification.employee.profile)}
            </p>
            <p>
              <span className='font-semibold'>Tipo:</span> {getJustificationTypeLabel(justification.type)}
            </p>
            <p>
              <span className='font-semibold'>Días:</span>{' '}
              {formatDateRange(justification.startDate, justification.endDate)}
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
