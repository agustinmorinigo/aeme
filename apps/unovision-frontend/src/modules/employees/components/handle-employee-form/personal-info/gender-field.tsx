import { Controller, useFormContext } from 'react-hook-form';
import FormRadioGroup from '@/components/common/form-radio-group';
import type { HandleEmployeeFormSchema } from '@/modules/employees/schemas/handle-employee-form-schema';
import genders from '@/shared/users/constants/genders';

export default function GenderField({ required }: { required: boolean }) {
  const {
    control,
    formState: { errors },
  } = useFormContext<HandleEmployeeFormSchema>();

  return (
    <Controller
      name='profile.gender'
      control={control}
      render={({ field }) => (
        <FormRadioGroup
          id='gender'
          label='Genero'
          required={required}
          error={errors.profile?.gender}
          options={genders}
          value={field.value}
          onChange={field.onChange}
        />
      )}
    />
  );
}
