import { Card, CardContent, CardHeader, CardTitle } from '@aeme/ui';
import {
  Calendar1,
  ChartNoAxesCombined,
  CircleCheck,
  CircleQuestionMark,
  Clock,
  File,
  Footprints,
  Info,
  Users,
} from 'lucide-react';
import MetricItem from '@/modules/attendance/components/stepper/step-1/metric-item';
import RequirementItem from '@/modules/attendance/components/stepper/step-1/requirement-item';
import { StepperLayout } from '@/modules/attendance/components/stepper/stepper-layout';
import useAttendanceReportStepperStore from '@/modules/attendance/stores/use-attendance-report-stepper-store';

const steps = [
  {
    title: 'Cargar datos',
    description: 'Mes/año, organización y archivo Excel',
  },
  {
    title: 'Validar Usuarios',
    description: 'Validar que los empleados existan en el sistema',
  },
  {
    title: 'Validar Datos',
    description: 'Revisar y corregir errores en los datos del Excel',
  },
  {
    title: 'Justificar',
    description: 'Cargar inasistencias justificadas y excepciones',
  },
  {
    title: 'Eventos',
    description: 'Marcar días especiales (feriados, cortes, etc.)',
  },
  {
    title: 'Reporte',
    description: 'Ver el reporte final con todas las métricas',
  },
];

export default function Step1() {
  const { goToNextStep } = useAttendanceReportStepperStore();

  return (
    <StepperLayout.Root>
      <div className='w-full flex flex-col gap-7'>
        <Card>
          <CardHeader className='flex items-center gap-3'>
            <Info />
            <CardTitle>Gestión de asistencia</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-sm'>Sistema de generación de reportes de asistencia para empleados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex items-center gap-3'>
            <CircleQuestionMark />
            <CardTitle>¿Cómo funciona el sistema?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-sm'>
              Este sistema te ayuda a generar reportes de asistencia precisos para calcular correctamente la liquidación
              de empleados.
            </p>
            <p className='text-sm'>
              Sigue los 6 pasos para cargar, validar y procesar los datos de fichaje de tu organización.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex items-center gap-3'>
            <CircleCheck className='text-green-400' />
            <CardTitle>Requisitos importantes</CardTitle>
          </CardHeader>
          <CardContent className='w-full flex flex-col gap-10'>
            <div className='w-full flex items-center justify-between gap-10'>
              <RequirementItem
                icon={Users}
                iconClassName='text-blue-400'
                title='Empleados en el sistema'
                description='Todos los empleados del Excel deben estar registrados con rol "empleado" y configuración laboral completa.'
              />
              <RequirementItem
                icon={Clock}
                iconClassName='text-amber-400'
                title='Registros ideales'
                description='4 registros por día: "Entrada", "Salida Break", "Entrada Break", "Salida" en orden cronológico.'
              />
            </div>

            <div className='w-full flex items-center justify-between gap-10'>
              <RequirementItem
                icon={File}
                iconClassName='text-green-400'
                title='Archivo excel'
                description='Sin celdas vacías, fichaje completo de un solo mes (del 1 al último día).'
              />
              <RequirementItem
                icon={Calendar1}
                iconClassName='text-red-400'
                title='Un solo mes'
                description='No mezcles datos de diferentes meses en el mismo archivo.'
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex items-center gap-3'>
            <ChartNoAxesCombined />
            <CardTitle>Cómo se calculan las métricas</CardTitle>
          </CardHeader>
          <CardContent className='w-full flex flex-col gap-4'>
            <MetricItem
              badge='Inasistencias'
              description={
                <>
                  <p className='text-sm'>
                    <b>Justificadas:</b> Sin fichaje pero con justificación cargada (no se descuenta).
                  </p>
                  <p className='text-sm'>
                    <b>Injustificadas:</b> Sin fichaje y sin justificación (se descuenta el día).
                  </p>
                </>
              }
            />
            <MetricItem
              badge='Llegadas tarde'
              description={
                <p className='text-sm'>
                  Se cuenta cada día que llegó después de su horario configurado. A partir del 4to día tarde, los
                  minutos acumulados se descuentan de horas extras.
                </p>
              }
            />
            <MetricItem
              badge='Horas extras'
              description={
                <p className='text-sm'>
                  Se calculan comparando horarios reales vs configurados. Cada 40 minutos = 1 hora extra. Los excesos de
                  break se descuentan aquí.
                </p>
              }
            />
            <MetricItem
              badge='Tiempo de break'
              description={
                <p className='text-sm'>
                  Según horas diarias: ≤6hs = 20min | 7-8hs = 30min | 9hs = 40min | ≥10hs = 1hora
                </p>
              }
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex items-center gap-3'>
            <Footprints />
            <CardTitle>Proceso paso a paso</CardTitle>
          </CardHeader>
          <CardContent className='w-full flex flex-col gap-4'>
            {steps.map(({ title, description }, i) => (
              <div
                key={crypto.randomUUID()}
                className='w-full flex items-start gap-4 p-4 rounded-lg bg-muted-foreground/6'
              >
                <span className='size-[35px] flex items-center justify-center p-2 shrink-0 rounded-full bg-blue-900'>
                  {i + 1}
                </span>
                <div className='flex flex-col w-full'>
                  <span className='text-sm font-semibold'>{title}</span>
                  <span className='text-sm'>{description}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <StepperLayout.Footer>
        <StepperLayout.Button disabled>Volver</StepperLayout.Button>

        <StepperLayout.Button onClick={goToNextStep}>Siguiente</StepperLayout.Button>
      </StepperLayout.Footer>
    </StepperLayout.Root>
  );
}
