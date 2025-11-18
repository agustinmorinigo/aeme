import { Badge } from '@aeme/ui';

interface MetricItemProps {
  badge: string;
  description: React.ReactNode;
}

export default function MetricItem({ badge, description }: MetricItemProps) {
  return (
    <div className='w-full p-4 rounded-lg bg-muted'>
      <div className='flex flex-col gap-3'>
        <Badge variant='default'>{badge}</Badge>
        <div>{description}</div>
      </div>
    </div>
  );
}
