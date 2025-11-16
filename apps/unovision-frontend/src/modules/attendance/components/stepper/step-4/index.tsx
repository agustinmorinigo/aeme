import { useEffect } from 'react';
import EmployeeAttendanceReports from '@/modules/attendance/components/stepper/step-4/employee-attendance-reports';
import HeaderInstructions from '@/modules/attendance/components/stepper/step-4/header-instructions';
import ModifyAttendancesSection from '@/modules/attendance/components/stepper/step-4/modify-attendances-section';
import { StepperLayout } from '@/modules/attendance/components/stepper/stepper-layout';
import useAttendanceReportStepperStore from '@/modules/attendance/stores/use-attendance-report-stepper-store';
import useAttendancesStore from '@/modules/attendance/stores/use-attendances-store';
import useBasicReportInfoStore from '@/modules/attendance/stores/use-basic-report-info-store';
import { formatAttendancesByDate } from '@/modules/attendance/utils/format-attendances-by-date';

export default function Step4() {
  const { goToNextStep, goToPrevStep } = useAttendanceReportStepperStore();
  const { attendancesInfo } = useBasicReportInfoStore();
  const { setOriginalAttendancesInfo, originalAttendancesInfo } = useAttendancesStore();

  useEffect(() => {
    if(!attendancesInfo) return;
    const formattedAttendances = formatAttendancesByDate(attendancesInfo)
    setOriginalAttendancesInfo(formattedAttendances);
  }, [attendancesInfo, setOriginalAttendancesInfo]);

  if (!originalAttendancesInfo) {
    return null;
  }

  // ACÁ ME FALTA UN CONDICIONAL PARA MOSTRAR UNA COSA U OTRA DEPENDIENDO SI HAY EMPLEADOS CON ERRORES O NO!
  // Si hay errores, muestro lo de abajo. Si NO hay errores, TENGO que mostar el resumen Pero SIN el botón de arreglar asistencias.
  return (
    <StepperLayout.Root>
      <div className="w-full flex flex-col gap-5">
        <HeaderInstructions />
        <ModifyAttendancesSection />
        <EmployeeAttendanceReports />
      </div>

      <StepperLayout.Footer>
        <StepperLayout.Button onClick={goToPrevStep}>Volver</StepperLayout.Button>
        <StepperLayout.Button onClick={goToNextStep} disabled={true}>Siguiente</StepperLayout.Button>
      </StepperLayout.Footer>
    </StepperLayout.Root>
  )
}