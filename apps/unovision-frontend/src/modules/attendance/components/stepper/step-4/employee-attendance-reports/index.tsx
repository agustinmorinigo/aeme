import { Accordion } from '@aeme/ui';
import EmployeeAttendanceInfo from '@/modules/attendance/components/stepper/step-4/employee-attendance-reports/employee-attendance-info';
import useAttendancesStore from '@/modules/attendance/stores/use-attendances-store';

// RENOMBRAR.
export default function EmployeeAttendanceReports() {
  const { modifiedAttendancesInfo } = useAttendancesStore();
  if (!modifiedAttendancesInfo) return null;

  return (
    <div className='w-full'>
      <Accordion type='multiple' className='w-full flex flex-col gap-4'>
        {Object.keys(modifiedAttendancesInfo).map((employeeDoc) => {
          return (
            <EmployeeAttendanceInfo key={employeeDoc} employeeAttendanceInfo={modifiedAttendancesInfo[employeeDoc]} />
          );
        })}
      </Accordion>
    </div>
  );
}
