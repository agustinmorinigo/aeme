import { Controller, useFormContext } from 'react-hook-form';
import FormRadioGroup from '@/components/common/form-radio-group';
import type { HandleUserFormSchema } from '@/modules/user-management/schemas/handle-user-form-schema';
import genders from '@/shared/users/constants/genders';

export default function GenderField({ required }: { required: boolean }) {
  const {
    control,
    formState: { errors },
  } = useFormContext<HandleUserFormSchema>();

  return (
    <Controller
      name="gender"
      control={control}
      render={({ field }) => (
        <FormRadioGroup
          id="gender"
          label="Género"
          required={required}
          error={errors.gender}
          options={genders}
          value={field.value}
          onChange={field.onChange}
        />
      )}
    />
  );
}
