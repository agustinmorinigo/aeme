import ModifyAttendancesButton from '@/modules/attendance/components/stepper/step-4/modify-attendances-section/modify-attendances-button';
import ModifyAttendancesErrorCounter from '@/modules/attendance/components/stepper/step-4/modify-attendances-section/modify-attendances-error-counter';
import ModifyAttendancesTooltip from '@/modules/attendance/components/stepper/step-4/modify-attendances-section/modify-attendances-tooltip';
import useAttendancesStore from '@/modules/attendance/stores/use-attendances-store';
import { getErrorsCount } from '@/modules/attendance/utils/transform-attendances-info/get-errors-count';

export default function ModifyAttendancesSection() {
  const {
    originalAttendancesInfo,
    modifiedAttendancesInfo,
  } = useAttendancesStore();

  if (!originalAttendancesInfo || !modifiedAttendancesInfo) {
    return null;
  }
  
  const originalErrorsCount = getErrorsCount(originalAttendancesInfo);

  if (originalErrorsCount === 0) {
    return null;
  }
  
  return (
    <div className="flex items-center justify-between">
      <div className='w-auto shrink-0 flex items-center gap-3'>
        <ModifyAttendancesButton />
        <ModifyAttendancesTooltip />
      </div>
      <ModifyAttendancesErrorCounter />
    </div>
  )
}
