import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@aeme/ui';
import { Controller, useFormContext } from 'react-hook-form';
import FormFieldLayout from '@/components/common/form-field-layout';
import type { HandleUserFormSchema } from '@/modules/user-management/schemas/handle-user-form-schema';
import documentTypes from '@/shared/users/constants/document-types';

export default function DocumentField({ required }: { required: boolean }) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<HandleUserFormSchema>();

  const error = errors.documentType || errors.documentValue;

  return (
    <FormFieldLayout label={'Documento'} required={required} id={'document'} error={error}>
      <div className='flex flex-row w-full'>
        <Controller
          name='documentType'
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={(value) => field.onChange(value)}>
              <SelectTrigger
                className='w-auto rounded-[8px_0_0_8px]'
                {...(errors.documentType ? { 'aria-invalid': true } : {})}
              >
                <SelectValue placeholder='Tipo' />
              </SelectTrigger>
              <SelectContent>
                {documentTypes.map((doc) => (
                  <SelectItem key={doc.value} value={doc.value}>
                    {doc.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

        <Input
          type='text'
          id='document'
          {...register('documentValue')}
          isError={!!errors.documentValue}
          autoComplete='off'
          className='rounded-[0_8px_8px_0]'
        />
      </div>
    </FormFieldLayout>
  );
}
