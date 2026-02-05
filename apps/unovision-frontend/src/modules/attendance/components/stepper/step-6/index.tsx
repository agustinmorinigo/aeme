import { StepperLayout } from '@/modules/attendance/components/stepper/stepper-layout';
import useAttendanceReportStepperStore from '@/modules/attendance/stores/use-attendance-report-stepper-store';

export default function Step6() {
  const { goToNextStep, goToPrevStep } = useAttendanceReportStepperStore();
  
  return (
    <StepperLayout.Root>
      <div className='w-full flex flex-col gap-5'>
        <p>STEP 6</p>
      </div>

      <StepperLayout.Footer>
        <StepperLayout.Button onClick={goToPrevStep}>Volver</StepperLayout.Button>
        <StepperLayout.Button onClick={goToNextStep}>
          Siguiente
        </StepperLayout.Button>
      </StepperLayout.Footer>
    </StepperLayout.Root>
  );
}
