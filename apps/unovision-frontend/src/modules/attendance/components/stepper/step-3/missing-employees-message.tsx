import {
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@aeme/ui';
import { AlertTriangle, Info, Users, UserX } from '@aeme/ui/icons';
import { useNavigate } from 'react-router';
import useBasicReportInfoStore from '@/modules/attendance/stores/use-basic-report-info-store';
import type { ReportEmployee } from '@/modules/attendance/types/report-employee';
import isEmployee from '@/modules/attendance/utils/is-employee';
import { formatDoc } from '@/shared/documents/utils/format-doc';
import { pluralize } from '@/utils/pluralize';
import { pluralizeWithCount } from '@/utils/pluralize-with-count';

interface MissingEmployeesMessageProps {
  employees: ReportEmployee[];
}

export default function MissingEmployeesMessage({ employees }: MissingEmployeesMessageProps) {
  const navigate = useNavigate();
  const { attendancesInfo } = useBasicReportInfoStore();
  if (!attendancesInfo) return null;

  const employeeDocValues = Object.keys(attendancesInfo);
  const missingEmployeeDocValues = employeeDocValues.filter((docValue) => !isEmployee(employees, docValue));

  const missingEmployees = missingEmployeeDocValues
    .map((docValue) => {
      const missingEmployeeAttendances = attendancesInfo[docValue];
      if (!missingEmployeeAttendances) return null;

      return {
        fullName: missingEmployeeAttendances[0].fullName,
        documentValue: missingEmployeeAttendances[0].documentValue,
      };
    })
    .filter((employee) => !!employee);

  const goToUserManagement = () => {
    navigate('/user-management/dashboard');
  };

  return (
    <div className='w-full max-w-4xl mx-auto space-y-6 p-6'>
      <Alert variant='destructive' className='border-destructive/50 bg-destructive/10'>
        <AlertTriangle className='h-5 w-5' />
        <AlertTitle className='text-lg font-semibold'>Empleados no registrados detectados</AlertTitle>
        <AlertDescription className='mt-2 text-sm'>
          {pluralize(missingEmployees.length, 'Se encontró', 'Se encontraron')}{' '}
          {pluralizeWithCount(missingEmployees.length, 'empleado')} que no{' '}
          {pluralize(missingEmployees.length, 'está registrado', 'están registrados')} en el sistema. Estos empleados
          deben ser agregados antes de continuar con el proceso de generación del reporte.
        </AlertDescription>
      </Alert>

      <Card className='border-border/50'>
        <CardHeader className='space-y-3'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className='p-2 rounded-lg bg-muted'>
                <Users className='h-6 w-6 text-muted-foreground' />
              </div>
              <div>
                <CardTitle className='text-2xl'>Lista de empleados faltantes</CardTitle>
                <CardDescription className='mt-1'>
                  Revisa la información de cada empleado y agrégalos al sistema
                </CardDescription>
              </div>
            </div>
            <Badge variant='secondary' className='text-base px-4 py-2'>
              {pluralizeWithCount(missingEmployees.length, 'empleado')}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className='mb-6 p-4 rounded-lg bg-muted/50 border border-border/50 flex items-start gap-3'>
            <Info className='h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0' />
            <div className='text-sm text-muted-foreground'>
              <p className='font-medium text-foreground mb-1'>¿Qué significa esto?</p>
              <p>
                Los empleados listados a continuación aparecen en el Excel adjunto pero no están registrados en el
                sistema. Deberás agregarlos para continuar.
                <br /> <br />
                <p className='font-bold'>Esto se debe a uno de estos motivos:</p>
                <ul className='list-disc list-inside mt-2 space-y-1'>
                  <li>No están dados de alta en el sistema.</li>
                  <li>
                    Están dados de alta pero no con rol de <Badge>empleado</Badge>.
                  </li>
                  <li>
                    Están dados de alta, tienen el rol <Badge>empleado</Badge> pero no pertenecen a la organización
                    seleccionada previamente.
                  </li>
                </ul>
              </p>
            </div>
          </div>

          <div className='h-[400px] overflow-y-auto overflow-x-hidden'>
            <div className='space-y-3'>
              {missingEmployees.map((employee) => (
                <div
                  key={`${employee.documentValue}`}
                  className='group flex items-center gap-4 p-4 rounded-lg border border-border/50 bg-card hover:bg-accent/50 hover:border-accent transition-all duration-200'
                >
                  <div className='flex-shrink-0 p-2 rounded-full bg-destructive/10 group-hover:bg-destructive/20 transition-colors'>
                    <UserX className='h-5 w-5 text-destructive' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='font-semibold text-foreground truncate capitalize'>{employee.fullName}</p>
                    <p className='text-sm text-muted-foreground mt-0.5'>DNI: {formatDoc(employee.documentValue)} </p>
                  </div>
                  <Badge variant='outline' className='flex-shrink-0'>
                    No registrado
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          <div className='mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20 flex flex-col gap-6'>
            <div className='w-full'>
              <p className='text-sm text-foreground'>
                <span className='font-semibold underline'>Próximo paso:</span> Dirígete a la sección{' '}
                <Badge>Gestión de usuarios</Badge> para registrar o editar a estos usuarios antes de continuar con la
                validación del reporte. Por favor recuerda asignarles el rol <Badge>empleado</Badge> y completar su
                información básica.
              </p>

              <p className='text-sm text-foreground'>
                No te preocupes, una vez que hayas agregado a estos empleados, podrás regresar a este proceso y
                continuar con la generación del reporte sin perder la información que ya has ingresado.
              </p>
            </div>

            <Button className='w-fit' onClick={goToUserManagement}>
              Ir a Gestión de usuarios
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
