import { Button, Card, CardDescription, CardHeader, CardTitle } from '@aeme/ui';
import { StepperLayout } from '@/modules/attendance/components/stepper/stepper-layout';
import useAttendanceReportStepperStore from '@/modules/attendance/stores/use-attendance-report-stepper-store';
import useBasicReportInfoStore from '@/modules/attendance/stores/use-basic-report-info-store';
import DeleteOrganizationEventModal from '@/modules/organization-events/components/delete-organization-event-modal/modal';
import HandleOrganizationEventModal from '@/modules/organization-events/components/handle-organization-event-modal/modal';
import OrganizationEventsTable from '@/modules/organization-events/components/organization-events-table/table';
import useHandleOrganizationEventModalStore from '@/modules/organization-events/stores/use-handle-organization-event-modal-store';
import getIsoMonthLabel from '@/shared/date-time/utils/get-iso-month-label';

export default function Step6() {
  const { goToNextStep, goToPrevStep } = useAttendanceReportStepperStore();
  const { monthNumber, yearNumber, organization } = useBasicReportInfoStore();
  const { open: openHandleOrganizationEventModal } = useHandleOrganizationEventModalStore();

  // SI ENTRA EN ESTE IF, HABRÍA QUE MANDARLO AL STEP 1.
  if (!monthNumber || !yearNumber || !organization) {
    return (
      <Button onClick={goToPrevStep} className='mt-4'>
        Volver
      </Button>
    );
  }

  return (
    <StepperLayout.Root>
      <div className='w-full flex flex-col gap-5'>
        {/* Meter esto en component */}
        <Card>
          <CardHeader>
            <CardTitle>Registrar eventos organizacionales</CardTitle>
            <CardDescription className='w-full flex flex-col gap-2'>
              <p>
                En esta sección debes registrar todos los <b>eventos organizacionales</b> que ocurrieron durante el mes
                seleccionado para la institución seleccionada.
              </p>
              <p>
                Los eventos organizacionales son situaciones que afectan a toda la organización o a un grupo de
                empleados (feriados, cortes de luz, fallas del reloj fichador, cierres anticipados, semanas no
                laborables, etc.) y que deben quedar registradas para el reporte final.
              </p>
              <p>
                Cualquier día que aparezca aquí abajo se considerará como un evento especial en el reporte final, y será
                tenido en cuenta en el cálculo de asistencia mensual de todos los empleados de la organización.
              </p>
            </CardDescription>
          </CardHeader>
        </Card>
        {/* Meter esto en component */}

        {/* Meter esto en component */}
        <Card className='w-full flex flex-col gap-6'>
          <div className='w-full flex items-center justify-between'>
            <div>
              <p className='text-xl font-bold'>Eventos organizacionales</p>
              <p>
                {getIsoMonthLabel(monthNumber)} {yearNumber} ({organization.businessName})
              </p>
            </div>

            <Button onClick={() => openHandleOrganizationEventModal({ type: 'creation' })}>Agregar</Button>
          </div>

          <div className='w-full'>
            <OrganizationEventsTable
              organizationId={organization.id}
              monthNumber={monthNumber}
              yearNumber={yearNumber}
            />
          </div>
        </Card>
        {/* Meter esto en component */}
      </div>

      <HandleOrganizationEventModal />
      <DeleteOrganizationEventModal />

      <StepperLayout.Footer>
        <StepperLayout.Button onClick={goToPrevStep}>Volver</StepperLayout.Button>
        <StepperLayout.Button onClick={goToNextStep}>Siguiente</StepperLayout.Button>
      </StepperLayout.Footer>
    </StepperLayout.Root>
  );
}
