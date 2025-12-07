import { Badge } from '@aeme/ui';
import useAttendancesStore from '@/modules/attendance/stores/use-attendances-store';
import { getErrorsCount } from '@/modules/attendance/utils/transform-attendances-info/get-errors-count';
import { pluralize } from '@/utils/pluralize';

export default function ModifyAttendancesErrorCounter() {
  const { modifiedAttendancesInfo } = useAttendancesStore();

  if (!modifiedAttendancesInfo) {
    return null;
  }

  const modifiedErrorsCount = getErrorsCount(modifiedAttendancesInfo);

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
