import { Badge } from '@aeme/ui';
import { pluralize } from '@/utils/pluralize';

interface ModifyAttendancesErrorCounterProps {
  modifiedErrorsCount: number;
}

export default function ModifyAttendancesErrorCounter({ modifiedErrorsCount }: ModifyAttendancesErrorCounterProps) {
  return (
    <div>
      {modifiedErrorsCount > 0 ? (
        <Badge variant='destructive'>
          <span>
            {pluralize({ count: modifiedErrorsCount, singular: 'Error', plural: 'Errores' })}: {modifiedErrorsCount}
          </span>
        </Badge>
      ) : (
        <Badge variant='default' className='bg-green-600'>
          <span>Sin errores</span>
        </Badge>
      )}
    </div>
  );
}
