import type { CreateJustificationBody, UpdateJustificationBody } from '@aeme/contracts';
import { Button, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, toast } from '@aeme/ui';
import { Loader } from '@aeme/ui/icons';
import { cn } from '@aeme/ui/utils';
import { useQueryClient } from '@tanstack/react-query';
import HandleJustificationForm from '@/modules/justifications/components/handle-justification-form/handle-justification-form';
import { useCreateJustificationMutation } from '@/modules/justifications/queries/use-create-justification-mutation';
import useGetJustificationQuery from '@/modules/justifications/queries/use-get-justification-query';
import { useUpdateJustificationDocumentMutation } from '@/modules/justifications/queries/use-update-justification-document-mutation';
import { useUpdateJustificationMutation } from '@/modules/justifications/queries/use-update-justification-mutation';
import { useUploadJustificationDocumentMutation } from '@/modules/justifications/queries/use-upload-justification-document-mutation';
import type { HandleJustificationSchema } from '@/modules/justifications/schemas/handle-justification-schema';
import useHandleJustificationModalStore from '@/modules/justifications/stores/use-handle-justification-modal-store';

const getTitle = (type: 'creation' | 'edition'): string => {
  if (type === 'creation') return 'Nueva justificación';
  if (type === 'edition') return 'Editar justificación';
  return '';
};

const getDescription = (type: 'creation' | 'edition'): string => {
  if (type === 'creation') return 'Completa los datos para registrar una justificación o excepción de asistencia';
  if (type === 'edition') return 'Actualiza los datos de la justificación';
  return '';
};

export default function HandleJustificationModal() {
  const { isOpen, close, type, isCreation, justification } = useHandleJustificationModalStore();
  const { isPending: isCreatePending, mutateAsync: createJustificationAsync } = useCreateJustificationMutation();
  const { isPending: isUpdatePending, mutateAsync: updateJustificationAsync } = useUpdateJustificationMutation();
  const { isPending: isUploadPending, mutateAsync: uploadDocument } = useUploadJustificationDocumentMutation();
  const { isPending: isUpdateDocumentPending, mutateAsync: updateDocument } = useUpdateJustificationDocumentMutation();
  const queryClient = useQueryClient();
  const justificationId = justification?.id || '';

  const {
    data: justificationData,
    isPending: isGetJustificationPending,
    isError: isGetJustificationError,
  } = useGetJustificationQuery(justificationId);

  const isSomethingPending = isCreatePending || isUpdatePending || isUploadPending || isUpdateDocumentPending;

  // METER EN FUNCIONES SEPARADAS!!!
  const handleOnSubmit = async (data: HandleJustificationSchema) => {
    try {
      let documentLink = '';

      if (isCreation) {
        // 1a. Upload file if provided
        if (data.documentFile) {
          documentLink = await uploadDocument({ file: data.documentFile, employeeId: data.employeeId });
        }

        // 2a. Build API body for creation (exclude isMultiDay, documentFile, and justificationId)
        const apiBody: CreateJustificationBody = {
          employeeId: data.employeeId,
          organizationId: data.organizationId,
          startDate: data.startDate,
          endDate: data.endDate,
          type: data.type,
          ...(data.description && { description: data.description }),
          ...(documentLink && { documentLink }),
        };

        // 3a. Call create mutation
        await createJustificationAsync(apiBody);

        // 4a. Show success toast
        toast.success('Justificación creada', {
          description: 'La justificación se ha guardado correctamente',
        });
      } else {
        // 1b. Handle document update/deletion
        const existingDocumentLink = justificationData?.documentLink;

        if (data.documentFile && existingDocumentLink) {
          // Replace existing document with new one
          documentLink = await updateDocument({
            oldPublicUrl: existingDocumentLink,
            newFile: data.documentFile,
            employeeId: data.employeeId,
          });
        } else if (data.documentFile && !existingDocumentLink) {
          // Upload new document (no previous document)
          documentLink = await uploadDocument({ file: data.documentFile, employeeId: data.employeeId });
        } else if (!data.documentFile && existingDocumentLink) {
          // Keep existing document
          documentLink = existingDocumentLink;
        }

        // 2b. Build API body for update (exclude isMultiDay, documentFile, employeeId, and organizationId)
        // // @ts-expect-error
        const apiBody: UpdateJustificationBody = {
          justificationId: data.justificationId!,
          startDate: data.startDate,
          endDate: data.endDate,
          type: data.type,
          ...(data.description && { description: data.description }),
          ...(documentLink && { documentLink }),
        };

        // 3b. Call update mutation
        await updateJustificationAsync(apiBody);

        // 4b. Show success toast
        toast.success('Justificación actualizada', {
          description: 'Los cambios se han guardado correctamente',
        });
      }

      // 5. Invalidate justifications queries
      await queryClient.invalidateQueries({ queryKey: ['get-justifications'] });
      await queryClient.invalidateQueries({ queryKey: ['get-justification', justificationId] }); // ESTE NO DEBERÍA SER NECESARIO DE REALIZAR. CORROBORAR AL FINAL DE TODO.

      // 6. Close modal
      close();
    } catch (error) {
      toast.error(isCreation ? 'Error al crear justificación' : 'Error al actualizar justificación', {
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
          {!isCreation && isGetJustificationPending ? (
            <Loader className='mx-auto my-20 animate-spin' />
          ) : !isCreation && isGetJustificationError ? (
            <p className='text-center my-20'>Error al cargar los datos de la justificación.</p>
          ) : (
            <HandleJustificationForm onSubmit={handleOnSubmit} justificationData={justificationData} />
          )}
        </div>

        <div className='flex justify-end gap-3 pt-4'>
          <Button type='button' variant='outline' onClick={handleClose} disabled={isSomethingPending}>
            Cancelar
          </Button>
          <Button type='submit' disabled={isSomethingPending} form='handle-justification-form'>
            {isSomethingPending ? 'Guardando...' : isCreation ? 'Guardar justificación' : 'Actualizar justificación'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
