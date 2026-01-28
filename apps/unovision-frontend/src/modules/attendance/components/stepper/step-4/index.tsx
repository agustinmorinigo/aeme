import { CheckCircle2 } from '@aeme/ui/icons';
import { useEffect } from 'react';
import EmployeeAttendanceReports from '@/modules/attendance/components/stepper/step-4/employee-attendance-reports';
import HeaderInstructions from '@/modules/attendance/components/stepper/step-4/header-instructions';
import ModifyAttendancesSection from '@/modules/attendance/components/stepper/step-4/modify-attendances-section';
import { StepperLayout } from '@/modules/attendance/components/stepper/stepper-layout';
import useAttendanceReportStepperStore from '@/modules/attendance/stores/use-attendance-report-stepper-store';
import useAttendancesStore from '@/modules/attendance/stores/use-attendances-store';
import useBasicReportInfoStore from '@/modules/attendance/stores/use-basic-report-info-store';
import { formatAttendancesByDate } from '@/modules/attendance/utils/transform-attendances-info/format-attendances-by-date';
import { getErrorsCount } from '@/modules/attendance/utils/transform-attendances-info/get-errors-count';

export default function Step4() {
  const { goToNextStep, goToPrevStep } = useAttendanceReportStepperStore();
  const { attendancesInfo } = useBasicReportInfoStore();
  const { setOriginalAttendancesInfo, originalAttendancesInfo, modifiedAttendancesInfo } = useAttendancesStore();

  useEffect(() => {
    if (!attendancesInfo) return;
    const formattedAttendances = formatAttendancesByDate(attendancesInfo);
    setOriginalAttendancesInfo(formattedAttendances);
  }, [attendancesInfo, setOriginalAttendancesInfo]);

  if (!originalAttendancesInfo || !modifiedAttendancesInfo) {
    return null;
  }

  const originalErrorsCount = getErrorsCount(originalAttendancesInfo);
  const modifiedErrorsCount = getErrorsCount(modifiedAttendancesInfo);

  return (
    <StepperLayout.Root>
      <div className='w-full flex flex-col gap-5'>
        <HeaderInstructions />
        {originalErrorsCount > 0 ? (
          <ModifyAttendancesSection modifiedErrorsCount={modifiedErrorsCount} />
        ) : (
          <div className='rounded-lg border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-950/30 p-4'>
            <div className='flex items-start gap-3'>
              <CheckCircle2 className='h-5 w-5 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0' />
              <div className='flex-1'>
                <h3 className='text-sm font-semibold text-emerald-900 dark:text-emerald-100'>Validación exitosa</h3>
                <p className='text-sm text-emerald-700 dark:text-emerald-300 mt-1'>
                  Todos los empleados del archivo adjuntado tienen datos de asistencias correctos. Puedes continuar.
                </p>
              </div>
            </div>
          </div>
        )}
        <EmployeeAttendanceReports />
      </div>

      <StepperLayout.Footer>
        <StepperLayout.Button onClick={goToPrevStep}>Volver</StepperLayout.Button>
        <StepperLayout.Button onClick={goToNextStep} disabled={modifiedErrorsCount > 0}>
          Siguiente
        </StepperLayout.Button>
      </StepperLayout.Footer>
    </StepperLayout.Root>
  );
}
