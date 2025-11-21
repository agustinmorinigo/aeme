import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from '@aeme/ui';
import { Check } from '@aeme/ui/icons';
import { attendanceReportSteps } from '@/modules/attendance/constants/attendance-report-steps';
import useAttendanceReportStepperStore from '@/modules/attendance/stores/use-attendance-report-stepper-store';

export default function StepperHeader() {
  const { currentStep } = useAttendanceReportStepperStore();
  const steps = attendanceReportSteps;

  return (
    <Stepper value={currentStep} className='w-full overflow-hidden shrink-0'>
      {steps.map(({ step, title, description, Icon }) => (
        <StepperItem key={step} step={step} className='relative flex-1 flex-col!'>
          <StepperTrigger className='flex-col gap-3 rounded pointer-events-none select-none'>
            <StepperIndicator asChild className='flex items-center justify-center size-[40px] overflow-hidden z-2'>
              {currentStep > step ? (
                <Check size={14} aria-hidden='true' className='size-full p-2' />
              ) : (
                <Icon size={14} aria-hidden='true' className='size-full p-2' />
              )}
            </StepperIndicator>
            <div className='space-y-0.5 px-2'>
              <StepperTitle>{title}</StepperTitle>
              <StepperDescription className='max-sm:hidden'>{description}</StepperDescription>
            </div>
          </StepperTrigger>
          {step < steps.length && (
            <StepperSeparator className='absolute inset-x-0 top-5 left-[calc(50%+0.75rem+0.125rem)] -order-1 m-0 -translate-y-1/2 group-data-[orientation=horizontal]/stepper:w-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:flex-none' />
          )}
        </StepperItem>
      ))}
    </Stepper>
  );
}
