import { cn } from '@aeme/ui/utils';

interface FormSectionLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  hasErrors?: boolean;
}

export default function FormSectionLayout(props: FormSectionLayoutProps) {
  const { title, description, children, hasErrors } = props;

  return (
    <div
      className={cn(
        'w-full overflow-hidden p-4 border rounded-lg shadow-sm flex flex-col gap-5',
        hasErrors && 'border-destructive',
      )}
    >
      <div className='flex flex-col'>
        <h5 className='font-bold text-sm'>{title}</h5>
        <p className='text-gray-500 text-sm'>{description}</p>
      </div>

      <div className='w-full flex flex-col gap-5'>{children}</div>
    </div>
  );
}
