import { useFormContext } from 'react-hook-form';
import { FormField } from '@/components/common/form-field';
import FormSectionLayout from '@/modules/employees/components/handle-employee-form/form-section-layout';
import DocumentField from '@/modules/employees/components/handle-employee-form/personal-info/document-field';
import GenderField from '@/modules/employees/components/handle-employee-form/personal-info/gender-field';
import type { HandleEmployeeFormSchema } from '@/modules/employees/schemas/handle-employee-form-schema';
import useHandleEmployeeModalStore from '@/modules/employees/stores/handle-employee-modal-store';

export default function PersonalInfoFormSection() {
  const { isDetails } = useHandleEmployeeModalStore();
  const required = !isDetails;

  const {
    register,
    formState: { errors },
  } = useFormContext<HandleEmployeeFormSchema>();

  const hasErrors =
    !!errors.profile?.name ||
    !!errors.profile?.lastName ||
    !!errors.profile?.birthDate ||
    !!errors.profile?.documentType ||
    !!errors.profile?.documentValue ||
    !!errors.profile?.gender ||
    !!errors.profile?.email;

  return (
    <FormSectionLayout
      title='Informacion personal'
      description={isDetails ? '' : 'Completa los datos basicos del empleado'}
      hasErrors={hasErrors}
    >
      <div className='w-full flex items-start justify-between gap-4'>
        <FormField
          id='name'
          label='Nombre'
          required={required}
          register={register('profile.name')}
          error={errors.profile?.name}
        />
        <FormField
          id='lastName'
          label='Apellido'
          required={required}
          register={register('profile.lastName')}
          error={errors.profile?.lastName}
        />
      </div>

      <div className='w-full flex items-start justify-between gap-4'>
        <FormField
          id='birthDate'
          label='Fecha de nacimiento'
          type='date'
          required={required}
          register={register('profile.birthDate')}
          error={errors.profile?.birthDate}
        />

        <FormField
          id='email'
          label='Correo electronico'
          type='email'
          required={required}
          register={register('profile.email')}
          error={errors.profile?.email}
        />
      </div>

      <DocumentField required={required} />

      <div className='w-full flex items-start justify-between gap-4'>
        <FormField
          id='phone'
          label='Telefono'
          type='text'
          register={register('profile.phone')}
          error={errors.profile?.phone}
        />
        <FormField
          id='address'
          label='Direccion'
          type='text'
          register={register('profile.address')}
          error={errors.profile?.address}
        />
      </div>

      <GenderField required={required} />
    </FormSectionLayout>
  );
}
