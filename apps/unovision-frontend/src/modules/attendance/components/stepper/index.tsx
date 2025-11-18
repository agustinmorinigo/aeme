import StepperBody from '@/modules/attendance/components/stepper/stepper-body';
import StepperHeader from '@/modules/attendance/components/stepper/stepper-header';

export default function AttendanceReportStepper() {
  return (
    <div className="size-full flex flex-col gap-16 max-w-5xl mx-auto pt-12 pb-[100px]">
      <StepperHeader />
      <StepperBody />
    </div>
  );
}
