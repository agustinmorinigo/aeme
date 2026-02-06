import { Button, Card, CardDescription, CardHeader, CardTitle, Input } from '@aeme/ui';
import { useDebounce } from '@uidotdev/usehooks';
import { useState } from 'react';
import { StepperLayout } from '@/modules/attendance/components/stepper/stepper-layout';
import useAttendanceReportStepperStore from '@/modules/attendance/stores/use-attendance-report-stepper-store';
import useBasicReportInfoStore from '@/modules/attendance/stores/use-basic-report-info-store';
import DeleteJustificationModal from '@/modules/justifications/components/delete-justification-modal/modal';
import HandleJustificationModal from '@/modules/justifications/components/handle-justification-modal/modal';
import JustificationsTable from '@/modules/justifications/components/justifications-table/table';
import useHandleJustificationModalStore from '@/modules/justifications/stores/use-handle-justification-modal-store';
import getIsoMonthLabel from '@/shared/date-time/utils/get-iso-month-label';

export default function Step5() {
  const { goToNextStep, goToPrevStep } = useAttendanceReportStepperStore();
  const { monthNumber, yearNumber, organization } = useBasicReportInfoStore();
  const { open: openHandleJustificationModal } = useHandleJustificationModalStore();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

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
            <CardTitle>Cargar justificaciones y excepciones</CardTitle>
            <CardDescription className='w-full flex flex-col gap-2'>
              <p>
                En esta sección debes registrar todas las <b>justificaciones y excepciones</b> que ocurrieron durante el
                mes seleccionado para la institución seleccionada.
              </p>
              <p>
                Cuando un empleado no cumple su jornada laboral normalmente por un motivo válido (enfermedad, estudio,
                otro, se retiro temprano, se retiró tarde, salió, etc.) y cuenta con justificación (o no), debes
                cargarla aquí para que quede correctamente reflejada en el reporte final y su inasistencia cuente como
                justificada.
              </p>
              <p>
                Cualquier día que aparezca aquí abajo para el empleado, se dará como día "válido" o "correcto" en el
                reporte final, y no afectará negativamente su asistencia mensual.
              </p>
            </CardDescription>
          </CardHeader>
        </Card>
        {/* Meter esto en component */}

        {/* Meter esto en component */}
        <Card className='w-full flex flex-col gap-6'>
          <div className='w-full flex items-center justify-between'>
            <div>
              <p className='text-xl font-bold'>Justificaciones de empleados</p>
              <p>
                {getIsoMonthLabel(monthNumber)} {yearNumber} ({organization.businessName})
              </p>
            </div>

            <Button onClick={() => openHandleJustificationModal({ type: 'creation' })}>Agregar</Button>
          </div>

          <div className='w-full'>
            <Input
              placeholder='Buscar por nombre, apellido o N° documento'
              className='w-auto min-w-[330px]'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className='w-full'>
            <JustificationsTable
              search={debouncedSearch}
              organizationId={organization.id}
              monthNumber={monthNumber}
              yearNumber={yearNumber}
            />
          </div>
        </Card>
        {/* Meter esto en component */}
      </div>

      <HandleJustificationModal />
      <DeleteJustificationModal />

      <StepperLayout.Footer>
        <StepperLayout.Button onClick={goToPrevStep}>Volver</StepperLayout.Button>
        <StepperLayout.Button onClick={goToNextStep}>Siguiente</StepperLayout.Button>
      </StepperLayout.Footer>
    </StepperLayout.Root>
  );
}
