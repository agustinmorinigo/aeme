import { AccordionTrigger } from '@aeme/ui';
import { User } from '@aeme/ui/icons';
import type { EmployeeAttendanceInfo as EmployeeAttendanceInfoType } from '@/modules/attendance/types/employee-attendance';
import getInvalidAttendancesCount from '@/modules/attendance/utils/get-invalid-attendances-count';
import getValidAttendancesCount from '@/modules/attendance/utils/get-valid-attendances-count';
import { formatDoc } from '@/shared/documents/utils/format-doc';

interface EmployeeAccordionTriggerProps {
  employeeAttendanceInfo: EmployeeAttendanceInfoType;
}

// Renombrar esto después.
export default function EmployeeAccordionTrigger(props: EmployeeAccordionTriggerProps) {
  const { employeeAttendanceInfo } = props;
  const { employee, attendancesInfo } = employeeAttendanceInfo;

  const daysProcessedCount = Object.keys(attendancesInfo).length;
  const validAttendancesCount = getValidAttendancesCount(attendancesInfo);
  const invalidAttendancesCount = getInvalidAttendancesCount(daysProcessedCount, validAttendancesCount);

  return (
    <AccordionTrigger className='hover:no-underline px-4 py-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'>
      <div className='flex items-center justify-between w-full pr-4'>
        <div className='flex items-center gap-3'>
          <div className='p-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg'>
            <User className='w-5 h-5 text-zinc-700 dark:text-zinc-300' />
          </div>
          <div className='text-left'>
            <h3 className='text-lg font-semibold text-zinc-900 dark:text-zinc-100 capitalize'>{employee.fullName}</h3>
            <p className='text-sm text-zinc-600 dark:text-zinc-400'>DNI {formatDoc(employee.documentValue)}</p>
          </div>
        </div>
        <div className='flex items-center gap-4'>
          <div className='text-right'>
            <p className='text-sm text-zinc-600 dark:text-zinc-400'>Días registrados</p>
            <p className='text-lg font-semibold text-zinc-900 dark:text-zinc-100'>{daysProcessedCount}</p>
          </div>
          <div className='text-right'>
            <p className='text-sm text-emerald-600 dark:text-emerald-400'>Válidos: {validAttendancesCount}</p>
            <p className='text-sm text-red-600 dark:text-red-400'>Errores: {invalidAttendancesCount}</p>
          </div>
        </div>
      </div>
    </AccordionTrigger>
  );
}
