import { Checkbox, Label } from '@aeme/ui';
import FormFieldLayout from '@/components/common/form-field-layout';

interface CheckboxOption<T extends string | number = string> {
  value: T;
  label: string;
  disabled?: boolean;
}

interface FormCheckboxGroupProps<T extends string | number = string> {
  id: string;
  label?: string;
  required?: boolean;
  error?: string;
  options: CheckboxOption<T>[];
  value?: T[];
  onChange?: (values: T[]) => void;
}

export default function FormCheckboxGroup<T extends string | number = string>({
  id,
  label,
  required,
  error = '',
  options,
  value = [],
  onChange,
}: FormCheckboxGroupProps<T>) {
  const handleCheckboxChange = (optionValue: T, checked: boolean) => {
    if (!onChange) return;

    if (checked) {
      onChange([...value, optionValue]);
    } else {
      onChange(value.filter((v) => v !== optionValue));
    }
  };

  return (
    <FormFieldLayout label={label} required={required} id={id} error={error}>
      {options.map((option) => (
        <div key={option.value.toString()} className='flex items-center space-x-2'>
          <Checkbox
            id={`${id}-${option.value}`}
            checked={value.includes(option.value)}
            onCheckedChange={(checked) => handleCheckboxChange(option.value, checked as boolean)}
            disabled={option.disabled}
          />
          <Label
            htmlFor={`${id}-${option.value}`}
            className={option.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          >
            {option.label}
          </Label>
        </div>
      ))}
    </FormFieldLayout>
  );
}
