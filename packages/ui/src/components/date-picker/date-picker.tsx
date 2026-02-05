import { format } from 'date-fns';
import { useState } from 'react';
import { Calendar as CalendarIcon } from '../../icons';
import { cn } from '../../lib/utils';
import { Button } from '../button/button';
import { Calendar } from '../calendar/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../popover/popover';

function DatePicker({
  value,
  onChange,
  placeholder = 'Seleccionar fecha',
  disabled,
  className,
  isError = false,
  ...props
}: {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  isError?: boolean;
} & Omit<React.ComponentProps<typeof Calendar>, 'mode' | 'selected' | 'onSelect'>) {
  const [open, setOpen] = useState(false);

  const isButtonDisabled = typeof disabled === 'boolean' ? disabled : false;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          disabled={isButtonDisabled}
          className={cn(
            'w-full justify-start text-left font-normal',
            !value && 'text-muted-foreground',
            isError && 'border-destructive! focus-visible:border-destructive! focus-visible:ring-destructive/20!',
            className,
          )}
        >
          <CalendarIcon />
          {value ? format(value, 'dd/MM/yyyy') : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        <Calendar
          mode='single'
          selected={value}
          onSelect={(date) => {
            onChange?.(date);
            setOpen(false);
          }}
          disabled={disabled}
          initialFocus
          {...props}
        />
      </PopoverContent>
    </Popover>
  );
}

function DateRangePicker({
  value,
  onChange,
  placeholder = 'Seleccionar rango de fechas',
  disabled,
  className,
  isError = false,
  ...props
}: {
  value?: { from: Date | undefined; to?: Date | undefined };
  onChange?: (range: { from: Date | undefined; to?: Date | undefined } | undefined) => void;
  placeholder?: string;
  className?: string;
  isError?: boolean;
} & Omit<React.ComponentProps<typeof Calendar>, 'mode' | 'selected' | 'onSelect'>) {
  const [open, setOpen] = useState(false);

  const isButtonDisabled = typeof disabled === 'boolean' ? disabled : false;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          disabled={isButtonDisabled}
          className={cn(
            'w-full justify-start text-left font-normal',
            !value?.from && 'text-muted-foreground',
            isError && 'border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20',
            className,
          )}
        >
          <CalendarIcon />
          {value?.from ? (
            value.to ? (
              <>
                {format(value.from, 'dd/MM/yyyy')} - {format(value.to, 'dd/MM/yyyy')}
              </>
            ) : (
              format(value.from, 'dd/MM/yyyy')
            )
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        <Calendar
          mode='range'
          selected={value}
          onSelect={onChange}
          disabled={disabled}
          numberOfMonths={2}
          initialFocus
          {...props}
        />
      </PopoverContent>
    </Popover>
  );
}

export { DatePicker, DateRangePicker };
