import { cn } from '@aeme/ui/utils';
import { Loader2 } from 'lucide-react';

interface LoaderProps {
  className?: string;
  label?: string;
}

export default function Loader({ className, label }: LoaderProps) {
  return (
    <div className='flex items-center justify-center gap-2'>
      <Loader2 className={cn('h-5 w-5 animate-spin text-muted-foreground', className)} />
      {label && <span className='text-sm text-muted-foreground'>{label}</span>}
    </div>
  );
}
