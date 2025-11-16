import type { ComponentType } from 'react';

import Step1 from '@/modules/attendance/components/stepper/step-1';
import Step2 from '@/modules/attendance/components/stepper/step-2';
import Step3 from '@/modules/attendance/components/stepper/step-3';
import Step4 from '@/modules/attendance/components/stepper/step-4';
import Step5 from '@/modules/attendance/components/stepper/step-5';
import Step6 from '@/modules/attendance/components/stepper/step-6';
import Step7 from '@/modules/attendance/components/stepper/step-7';
import useAttendanceReportStepperStore from '@/modules/attendance/stores/use-attendance-report-stepper-store';

const steps: Record<number, ComponentType> = {
  1: Step1,
  2: Step2,
  3: Step3,
  4: Step4,
  5: Step5,
  6: Step6,
  7: Step7,
};

export default function StepperBody() {
  const { currentStep } = useAttendanceReportStepperStore();
  const StepComponent = steps[currentStep];
  return <div className="size-full overflow-x-hidden overflow-y-auto">{StepComponent ? <StepComponent /> : null}</div>;
}
