import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import FileSection from '@/modules/attendance/components/stepper/step-2/file-section';
import OrganizationSection from '@/modules/attendance/components/stepper/step-2/organization-section';
import ReportPeriodSection from '@/modules/attendance/components/stepper/step-2/report-period-section';
import { StepperLayout } from '@/modules/attendance/components/stepper/stepper-layout'
import { type BasicReportInfoSchema, basicReportInfoSchema } from '@/modules/attendance/schemas/basic-report-info-schema';
import useAttendanceReportStepperStore from '@/modules/attendance/stores/use-attendance-report-stepper-store';
import useBasicReportInfoStore from '@/modules/attendance/stores/use-basic-report-info-store';
import { MonthName } from '@/shared/date-time/types/months';
import getISOMonthNumber from '@/shared/date-time/utils/get-iso-month-number';
import isMonth from '@/shared/date-time/utils/is-month';

const today = new Date();
const currentYear = today.getFullYear();
const prevYear = currentYear - 1;
const isJanuary = isMonth(today, MonthName.January);

const defaultMonth = isJanuary ? getISOMonthNumber(MonthName.December) : (getISOMonthNumber('current') - 1);
const defaultYear = isJanuary ? prevYear : currentYear;

export default function Step2() {
  const { goToPrevStep, goToNextStep } = useAttendanceReportStepperStore();
  const { monthNumber, yearNumber, fileMetadata } = useBasicReportInfoStore();

  const methods = useForm({
    resolver: zodResolver(basicReportInfoSchema),
    defaultValues: {
      monthNumber: monthNumber || defaultMonth,
      yearNumber: yearNumber || defaultYear,
      organizationId: '',
    }
  });

  const { handleSubmit } = methods;

  const onSubmit = (formValues: BasicReportInfoSchema) => {

    const userHasChangedPeriodWithoutChangedFile = formValues.monthNumber !== fileMetadata?.validatedFilePeriod.monthNumber || formValues.yearNumber !== fileMetadata?.validatedFilePeriod.yearNumber;

    if (userHasChangedPeriodWithoutChangedFile) {
      methods.setError("file", {
        type: "manual",
        message: "El periodo seleccionado no coincide con el periodo del archivo. Por favor, corrige el periodo o el archivo."
      });
      return;
    }

    goToNextStep();
  }

  return (
    <StepperLayout.Root>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='w-full flex flex-col gap-8'
        >
          <div className='w-full overflow-hidden flex flex-col gap-5'>
            <div className='w-full flex items-center flex-col gap-2'>
              <h5 className='text-lg'>Completa los datos básicos</h5>
              <p className='text-base text-muted-foreground'>Completa los datos para el cual deseas generar el reporte de asistencia</p>
            </div>

            <div className='w-full flex flex-col gap-6'>
              <div className='w-full flex items-start gap-6'>
                <ReportPeriodSection />
                <OrganizationSection />
              </div>

              <div className='w-full'>
                <FileSection />
              </div>
            </div>
          </div>

          <StepperLayout.Footer>
            <StepperLayout.Button onClick={goToPrevStep}>
              Volver
            </StepperLayout.Button>

            <StepperLayout.Button type='submit'>
              Siguiente
            </StepperLayout.Button>
          </StepperLayout.Footer>
        </form>
      </FormProvider>
    </StepperLayout.Root>
  )
}
