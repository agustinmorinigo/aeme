import type { FieldError } from 'react-hook-form';

interface FormFieldLayoutProps {
  children: React.ReactNode;
  label?: string;
  required?: boolean;
  id: string;
  error?: FieldError | string;
}

export default function FormFieldLayout(props: FormFieldLayoutProps) {
  const { children, label, required, id, error } = props;

  return (
    <div className="w-full flex flex-col gap-1">
      {
        label && (
          <label htmlFor={id} className="text-sm">
            {label}
            {required && '*'}
          </label>
        )
      }
      <div className="flex flex-col gap-1">
        {children}
      </div>
      {error && <span className="text-destructive text-xs block">{typeof error === 'string' ? error : error.message}</span>}
    </div>
  );
}
