import { useEffect, useState } from 'react';
import Loader from '@/components/common/loader';
import CompletedEmployeesMessage from '@/modules/attendance/components/stepper/step-3/completed-employees-message';
import MissingEmployeesMessage from '@/modules/attendance/components/stepper/step-3/missing-employees-message';
import NoEmployeesMessage from '@/modules/attendance/components/stepper/step-3/no-employees-message';
import { StepperLayout } from '@/modules/attendance/components/stepper/stepper-layout';
import useGetEmployeesQuery from '@/modules/attendance/queries/use-get-employees-query';
import useAttendanceReportStepperStore from '@/modules/attendance/stores/use-attendance-report-stepper-store';
import useBasicReportInfoStore from '@/modules/attendance/stores/use-basic-report-info-store';
import isEmployee from '@/modules/attendance/utils/employee/is-employee';

export default function Step3() {
  const [allUsersExist, setAllUsersExist] = useState(false);
  const { goToNextStep, goToPrevStep } = useAttendanceReportStepperStore();
  const { organization, attendancesInfo, setEmployees } = useBasicReportInfoStore();
  const { isLoading, isError, error, data } = useGetEmployeesQuery({
    organizationId: organization?.id || '',
  });
  const employees = data || [];

  useEffect(() => {
    if (employees.length === 0 || !attendancesInfo) return;
    setEmployees(employees);
    const attendancesInfoDocValues = Object.keys(attendancesInfo);
    const allUsersExist = attendancesInfoDocValues.every((docValue) => isEmployee(employees, docValue));
    setAllUsersExist(allUsersExist);
  }, [employees, attendancesInfo, setEmployees]);

  if (isLoading) {
    return (
      <div className='w-full min-h-48'>
        <Loader className='size-12' />
      </div>
    );
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <StepperLayout.Root>
      <div className='w-full'>
        {employees.length === 0 ? (
          <NoEmployeesMessage />
        ) : allUsersExist ? (
          <CompletedEmployeesMessage />
        ) : (
          <MissingEmployeesMessage employees={employees} />
        )}
      </div>

      <StepperLayout.Footer>
        <StepperLayout.Button onClick={goToPrevStep}>Volver</StepperLayout.Button>
        <StepperLayout.Button onClick={goToNextStep} disabled={!allUsersExist}>
          Siguiente
        </StepperLayout.Button>
      </StepperLayout.Footer>
    </StepperLayout.Root>
  );
}
