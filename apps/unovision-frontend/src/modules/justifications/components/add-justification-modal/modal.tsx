import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@aeme/ui';
import AddJustificationForm from '@/modules/justifications/components/add-justification-modal/add-justification-form';
import type { AddJustificationSchema } from '@/modules/justifications/schemas/add-justification-schema';
import useAddJustificationModalStore from '@/modules/justifications/stores/use-add-justification-modal-store';

export default function AddJustificationModal() {
  const { isOpen, close } = useAddJustificationModalStore();

  const handleOnSubmit = (data: AddJustificationSchema) => {
    console.log('Form data:', data);
    // TODO: Implementar la lógica de guardar la justificación
    close();
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className='h-auto max-h-[95%] w-auto min-w-[500px] max-w-[95%] overflow-hidden gap-6 flex flex-col'>
        <DialogHeader className='shrink-0 h-auto'>
          <DialogTitle>Nueva justificación</DialogTitle>
          <DialogDescription>
            Completa los datos para registrar una justificación o excepción de asistencia
          </DialogDescription>
        </DialogHeader>

        <div className='overflow-x-hidden overflow-y-auto h-full pr-2.5'>
          <AddJustificationForm onCancel={close} onSubmit={handleOnSubmit} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
