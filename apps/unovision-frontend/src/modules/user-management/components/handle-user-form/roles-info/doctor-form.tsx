import { Checkbox } from '@aeme/ui';
import { Controller, useFormContext } from 'react-hook-form';
import FormSectionLayout from '@/modules/user-management/components/handle-user-form/form-section-layout';
import type { HandleUserFormSchema } from '@/modules/user-management/schemas/handle-user-form-schema';
import useHandleUserModalStore from '@/modules/user-management/stores/handle-user-modal-store';

export default function DoctorForm() {
  const { isDetails } = useHandleUserModalStore();

  const {
    control,
    formState: { errors },
  } = useFormContext<HandleUserFormSchema>();

  return (
    <FormSectionLayout
      title='Información del doctor'
      description={isDetails ? '' : 'Proporcione la información específica del doctor'}
      hasErrors={!!errors.doctorData}
    >
      <div className='flex flex-col gap-1 items-start'>
        <label htmlFor='doctorData.isResident' className='text-sm inline-block cursor-pointer select-none'>
          ¿Es residente?
        </label>
        <Controller
          name='doctorData.isResident'
          control={control}
          render={({ field }) => <Checkbox id={field.name} checked={field.value} onCheckedChange={field.onChange} />}
        />
      </div>
    </FormSectionLayout>
  );
}
