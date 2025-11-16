import { Input } from '@aeme/ui';
import { cn } from '@aeme/ui/utils';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import FormFieldLayout from '@/components/common/form-field-layout';

interface FormFieldProps {
  id: string;
  label: string;
  type?: 'text' | 'email' | 'tel' | 'date' | 'password' | 'number';
  required?: boolean;
  register: UseFormRegisterReturn;
  error?: FieldError;
  placeholder?: string;
}

export function FormField({ id, label, type = 'text', required, register, error, placeholder }: FormFieldProps) {
  const baseClass = cn(
    'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
    'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
    'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
    error && 'border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20',
  );

  return (
    <FormFieldLayout label={label} required={required} id={id} error={error}>
      {type === 'date' || type === 'number' ? (
        <input type={type} id={id} {...register} placeholder={placeholder} className={baseClass} />
      ) : (
        <Input type={type} id={id} {...register} isError={!!error} placeholder={placeholder} autoComplete='off' />
      )}
    </FormFieldLayout>
  );
}
