import { AccordionItem } from '@aeme/ui';
import EmployeeAccordionContent from '@/modules/attendance/components/stepper/step-4/employee-attendance-reports/employee-accordion-content';
import EmployeeAccordionTrigger from '@/modules/attendance/components/stepper/step-4/employee-attendance-reports/employee-accordion-trigger';
import type { EmployeeAttendanceInfo as EmployeeAttendanceInfoType } from '@/modules/attendance/types/employee-attendance';

interface EmployeeAttendanceInfoProps {
  employeeAttendanceInfo: EmployeeAttendanceInfoType;
}

// RENOMBRAR.
export default function EmployeeAttendanceInfo(props: EmployeeAttendanceInfoProps) {
  const { employeeAttendanceInfo } = props;
  const { employee } = employeeAttendanceInfo;

  return (
    <AccordionItem
      key={employee.documentValue}
      value={employee.documentValue}
      className='bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden'
    >
      <EmployeeAccordionTrigger employeeAttendanceInfo={employeeAttendanceInfo} />
      <EmployeeAccordionContent employeeAttendanceInfo={employeeAttendanceInfo} />
    </AccordionItem>
  );
}
