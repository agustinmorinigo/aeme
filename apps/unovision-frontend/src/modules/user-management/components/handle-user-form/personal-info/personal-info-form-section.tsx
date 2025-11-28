import { useFormContext } from 'react-hook-form';
import { FormField } from '@/components/common/form-field';
import FormSectionLayout from '@/modules/user-management/components/handle-user-form/form-section-layout';
import DocumentField from '@/modules/user-management/components/handle-user-form/personal-info/document-field';
import GenderField from '@/modules/user-management/components/handle-user-form/personal-info/gender-field';
import type { HandleUserFormSchema } from '@/modules/user-management/schemas/handle-user-form-schema';
import useHandleUserModalStore from '@/modules/user-management/stores/handle-user-modal-store';

export default function PersonalInfoFormSection() {
  const { isDetails } = useHandleUserModalStore();
  const required = !isDetails;

  const {
    register,
    formState: { errors },
  } = useFormContext<HandleUserFormSchema>();

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
      title='Información personal'
      description={isDetails ? '' : 'Completá los datos básicos del usuario'}
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
          label='Correo electrónico'
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
          label='Teléfono'
          type='text'
          register={register('profile.phone')}
          error={errors.profile?.phone}
        />
        <FormField
          id='address'
          label='Dirección'
          type='text'
          register={register('profile.address')}
          error={errors.profile?.address}
        />
      </div>

      <GenderField required={required} />
    </FormSectionLayout>
  );
}
