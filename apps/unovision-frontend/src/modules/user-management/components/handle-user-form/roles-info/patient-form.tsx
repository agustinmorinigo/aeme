import { useFormContext } from 'react-hook-form';
import { FormField } from '@/components/common/form-field';
import FormSectionLayout from '@/modules/user-management/components/handle-user-form/form-section-layout';
import type { HandleUserFormSchema } from '@/modules/user-management/schemas/handle-user-form-schema';
import useHandleUserModalStore from '@/modules/user-management/stores/handle-user-modal-store';

export default function PatientForm() {
  const { isDetails } = useHandleUserModalStore();
  const required = !isDetails;
  
  const {
    register,
    formState: { errors },
  } = useFormContext<HandleUserFormSchema>();

  return (
    <FormSectionLayout
      title="Información del paciente"
      description={isDetails ? "" : "Proporcione la información específica del paciente"}
      hasErrors={!!errors.patientInfo}
    >
      <FormField
        id="patientInfo.healthInsuranceName"
        label="Nombre de la obra social"
        required={required}
        register={register('patientInfo.healthInsuranceName')}
        error={errors.patientInfo?.healthInsuranceName}
      />
    </FormSectionLayout>
  );
}
