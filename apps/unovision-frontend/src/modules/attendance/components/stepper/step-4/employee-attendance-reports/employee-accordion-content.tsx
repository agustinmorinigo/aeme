import { AccordionContent } from '@aeme/ui';
import EmployeeAccordionContentTableBody from '@/modules/attendance/components/stepper/step-4/employee-attendance-reports/employee-accordion-content-table-body';
import EmployeeAccordionContentTableHeader from '@/modules/attendance/components/stepper/step-4/employee-attendance-reports/employee-accordion-content-table-header';
import type { EmployeeAttendanceInfo as EmployeeAttendanceInfoType } from '@/modules/attendance/types/employee-attendance';

interface EmployeeAccordionContentProps {
  employeeAttendanceInfo: EmployeeAttendanceInfoType;
}

// RENOMBRAR.
export default function EmployeeAccordionContent(props: EmployeeAccordionContentProps) {
  const { employeeAttendanceInfo } = props;

  return (
    <AccordionContent>
      <div className='px-4 pb-4'>
        <EmployeeAccordionContentTableHeader />
        <EmployeeAccordionContentTableBody employeeAttendanceInfo={employeeAttendanceInfo} />
      </div>
    </AccordionContent>
  );
}
