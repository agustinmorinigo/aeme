import { Button } from '@aeme/ui';

function Root({ children }: { children: React.ReactNode }) {
  return <div className='w-full overflow-hidden flex flex-col gap-8'>{children}</div>;
}

function Content({ children }: { children: React.ReactNode }) {
  return <div className='w-full flex flex-col gap-8'>{children}</div>;
}

function Footer({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex items-center justify-center gap-4 w-full shrink-0 overflow-hidden select-none'>{children}</div>
  );
}

interface StepperButtonProps {
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

function StepperButton({ type = 'button', onClick, disabled, children }: StepperButtonProps) {
  return (
    <Button variant='outline' className='w-32' type={type} onClick={onClick} disabled={disabled}>
      {children}
    </Button>
  );
}

export const StepperLayout = { Root, Content, Footer, Button: StepperButton };
