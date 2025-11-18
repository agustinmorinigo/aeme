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
    !!errors.name ||
    !!errors.lastName ||
    !!errors.birthDate ||
    !!errors.documentType ||
    !!errors.documentValue ||
    !!errors.gender ||
    !!errors.email;

  return (
    <FormSectionLayout
      title="Información personal"
      description={isDetails ? "" : "Completá los datos básicos del usuario"}
      hasErrors={hasErrors}
    >
      <div className="w-full flex items-start justify-between gap-4">
        <FormField id="name" label="Nombre" required={required} register={register('name')} error={errors.name} />
        <FormField id="lastName" label="Apellido" required={required} register={register('lastName')} error={errors.lastName} />
      </div>

      <div className="w-full flex items-start justify-between gap-4">
        <FormField
          id="birthDate"
          label="Fecha de nacimiento"
          type="date"
          required={required}
          register={register('birthDate')}
          error={errors.birthDate}
        />

        <FormField
          id="email"
          label="Correo electrónico"
          type="email"
          required={required}
          register={register('email')}
          error={errors.email}
        />
      </div>

      <DocumentField required={required} />

      <div className="w-full flex items-start justify-between gap-4">
        <FormField id="phone" label="Teléfono" type="text" register={register('phone')} error={errors.phone} />
        <FormField id="address" label="Dirección" type="text" register={register('address')} error={errors.address} />
      </div>

      <GenderField required={required} />
    </FormSectionLayout>
  );
}
