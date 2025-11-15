import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components';
import { cn } from '@/lib/utils';

const alertVariants = cva(
  'relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current',
  {
    variants: {
      variant: {
        default: 'bg-card text-card-foreground',
        destructive:
          'text-destructive bg-card [&>svg]:text-current [&>button]:text-current [&>button:hover]:text-current *:data-[slot=alert-description]:text-destructive/90 border-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

interface AlertProps extends React.ComponentProps<'div'>, VariantProps<typeof alertVariants> {
  canClose?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function Alert({ className, variant, canClose = false, open, onOpenChange, ...props }: AlertProps) {
  const [internalVisible, setInternalVisible] = useState(true);

  const isVisible = open !== undefined ? open : internalVisible;

  const handleClose = () => {
    if (onOpenChange) {
      onOpenChange(false);
    } else {
      setInternalVisible(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div data-slot='alert' role='alert' className={cn(alertVariants({ variant }), className, 'pr-12')} {...props}>
      {props.children}

      {canClose && (
        <Button
          type='button'
          variant='ghost'
          size='icon'
          onClick={handleClose}
          className='absolute right-2 top-2 text-muted-foreground'
        >
          <X className='h-4 w-4' />
        </Button>
      )}
    </div>
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='alert-title'
      className={cn('col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight', className)}
      {...props}
    />
  );
}

function AlertDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='alert-description'
      className={cn(
        'text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed',
        className,
      )}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription };
