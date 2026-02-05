import { DatePicker } from '@aeme/ui';
import type { Control, FieldError, FieldValues, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import FormFieldLayout from '@/components/common/form-field-layout';

interface DatePickerFormFieldProps<TFieldValues extends FieldValues> {
  id: string;
  label: string;
  required?: boolean;
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  error?: FieldError;
  placeholder?: string;
  datePickerProps?: Omit<
    React.ComponentProps<typeof DatePicker>,
    'value' | 'onChange' | 'placeholder' | 'className' | 'isError'
  >;
}

const currentYear = new Date().getFullYear();

/**
 * Converts a date string in YYYY-MM-DD format to a Date object in local timezone
 * This avoids timezone issues when parsing dates
 */
function parseLocalDate(dateString: string): Date {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}

/**
 * Converts a Date object to a string in YYYY-MM-DD format using local timezone
 * This avoids timezone issues when formatting dates
 */
function formatLocalDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function DatePickerFormField<TFieldValues extends FieldValues>({
  id,
  label,
  required,
  control,
  name,
  error,
  placeholder = 'Seleccionar fecha',
  datePickerProps,
}: DatePickerFormFieldProps<TFieldValues>) {
  return (
    <FormFieldLayout label={label} required={required} id={id} error={error}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker
            value={field.value ? parseLocalDate(field.value) : undefined}
            onChange={(date) => {
              field.onChange(date ? formatLocalDate(date) : undefined);
            }}
            placeholder={placeholder}
            isError={!!error}
            captionLayout='dropdown'
            fromYear={2020}
            toYear={currentYear + 5}
            {...datePickerProps}
          />
        )}
      />
    </FormFieldLayout>
  );
}
