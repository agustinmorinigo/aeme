import { Controller, useFormContext } from 'react-hook-form';
import FormRadioGroup from '@/components/common/form-radio-group';
import type { HandleUserFormSchema } from '@/modules/user-management/schemas/handle-user-form-schema';
import contractTypes from '@/shared/employees/constants/contract-types';

export default function ContractTypeEmployeeForm({ required }: { required: boolean }) {
  const {
    formState: { errors },
    control,
  } = useFormContext<HandleUserFormSchema>();

  return (
    <Controller
      name='employeeData.contractType'
      control={control}
      render={({ field }) => (
        <FormRadioGroup
          id='employeeData.contractType'
          label='Tipo de contrato'
          required={required}
          error={errors.employeeData?.contractType}
          options={contractTypes}
          value={field.value}
          onChange={field.onChange}
        />
      )}
    />
  );
}
