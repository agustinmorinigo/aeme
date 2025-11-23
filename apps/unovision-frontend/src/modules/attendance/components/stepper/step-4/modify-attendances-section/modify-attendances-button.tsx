import { Button } from '@aeme/ui';
import { CheckCheck, Undo2 } from '@aeme/ui/icons';
import useAttendancesStore from '@/modules/attendance/stores/use-attendances-store';
import useBasicReportInfoStore from '@/modules/attendance/stores/use-basic-report-info-store';
import transformToValidAttendancesInfo from '@/modules/attendance/utils/transform-attendances-info/transform-to-valid-attendances-info';

export default function ModifyAttendancesButton() {
  const {
    hasModified,
    originalAttendancesInfo,
    modifiedAttendancesInfo,
    setModifiedAttendancesInfo,
    toggleHasModified,
  } = useAttendancesStore();

  const { employees } = useBasicReportInfoStore();

  if (!originalAttendancesInfo || !modifiedAttendancesInfo) {
    return null;
  }

  const handleOnClickButton = () => {
    toggleHasModified();

    if (hasModified) {
      // Revert changes.
      setModifiedAttendancesInfo(originalAttendancesInfo);
    } else {
      // Mark all as valid.
      const newModifiedAttendancesInfo = transformToValidAttendancesInfo(modifiedAttendancesInfo, employees);
      setModifiedAttendancesInfo(newModifiedAttendancesInfo);
    }
  };

  return (
    <Button
      onClick={handleOnClickButton}
      variant={hasModified ? 'outline' : 'default'}
      className={
        hasModified
          ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700'
          : 'bg-emerald-600 hover:bg-emerald-700 text-white'
      }
    >
      {hasModified ? (
        <>
          <Undo2 className='w-4 h-4 mr-2' />
          Deshacer cambios
        </>
      ) : (
        <>
          <CheckCheck className='w-4 h-4 mr-2' />
          Marcar todo como válido
        </>
      )}
    </Button>
  );
}
