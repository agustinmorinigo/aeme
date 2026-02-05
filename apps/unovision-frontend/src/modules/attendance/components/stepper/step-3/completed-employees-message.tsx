import type { User } from '@aeme/contracts';
import { Badge, Button, Tooltip, TooltipContent, TooltipTrigger } from '@aeme/ui';
import { ArrowRight, CheckCircle2, Clock, Pencil, UserCheck, Users } from '@aeme/ui/icons';
import useBasicReportInfoStore from '@/modules/attendance/stores/use-basic-report-info-store';
import type { ReportEmployee } from '@/modules/attendance/types/report-employee';
import useHandleEmployeeModalStore from '@/modules/employees/stores/handle-employee-modal-store';
import isoWeekDays from '@/shared/date-time/constants/iso-week-days';
import { formatDoc } from '@/shared/documents/utils/format-doc';
import { pluralize } from '@/utils/pluralize';

/**
 * Formats a number as Argentine Peso currency
 */
function formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Gets the short name for a weekday number (1-7, ISO format)
 */
function getWeekdayShortName(weekday: number): string {
  const day = isoWeekDays.find((d) => d.value === weekday);
  return day?.label.slice(0, 3) || '';
}

/**
 * Formats a time string to HH:MM format (removes seconds if present)
 */
function formatTime(time: string): string {
  const parts = time.split(':');
  return `${parts[0]}:${parts[1]}`;
}

interface EmployeeCardProps {
  employee: ReportEmployee;
  onEdit: (employee: ReportEmployee) => void;
}

function EmployeeCard({ employee, onEdit }: EmployeeCardProps) {
  const fullName = `${employee.profile.name} ${employee.profile.lastName}`;

  return (
    <div className='group flex items-start gap-4 p-4 rounded-lg border border-border/50 bg-card hover:bg-accent/50 hover:border-accent transition-all duration-200'>
      <div className='flex-shrink-0 p-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-900/50 transition-colors'>
        <UserCheck className='h-5 w-5 text-emerald-600 dark:text-emerald-400' />
      </div>

      <div className='flex-1 min-w-0 space-y-1.5'>
        <p className='font-semibold text-foreground truncate capitalize'>{fullName}</p>
        <p className='text-sm text-muted-foreground'>DNI: {formatDoc(employee.profile.documentValue)}</p>
        <p className='text-sm text-muted-foreground'>Salario neto: {formatCurrency(employee.netSalary)}</p>

        {employee.schedules.length > 0 && (
          <div className='flex flex-wrap gap-1.5 pt-1'>
            {employee.schedules.map((schedule) => (
              <Tooltip key={schedule.id}>
                <TooltipTrigger asChild className='flex items-start'>
                  <Badge variant='outline' className='text-xs gap-1 cursor-default'>
                    <span>{getWeekdayShortName(schedule.weekday)}</span>
                    <Clock className='h-3 w-3 ml-0.5 mt-0.5' />
                    <span className='inline-flex items-center flex-col gap-0'>
                      <span>
                        {formatTime(schedule.startTime)}-{formatTime(schedule.endTime)}
                      </span>
                      <span className='text-[9px]'>({schedule.isRemote ? 'Remoto' : 'Presencial'})</span>
                    </span>
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{schedule.isRemote ? 'Remoto' : 'Presencial'}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        )}
      </div>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant='ghost'
            size='icon'
            className='flex-shrink-0 h-8 w-8 text-muted-foreground hover:text-foreground'
            onClick={() => onEdit(employee)}
          >
            <Pencil className='h-4 w-4' />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Editar empleado</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

export default function CompletedEmployeesMessage() {
  const { attendancesInfo, employees } = useBasicReportInfoStore();
  const { open } = useHandleEmployeeModalStore();

  if (!attendancesInfo) return null;

  const employeeDocValues = Object.keys(attendancesInfo);
  const completedEmployees = employees.filter((employee) => employeeDocValues.includes(employee.profile.documentValue));

  const handleEditEmployee = (employee: ReportEmployee) => {
    const user = { profile: { id: employee.profile.id }, roles: [] } as unknown as User;
    open({ type: 'edition', user });
  };

  return (
    <div className='w-full max-w-4xl mx-auto space-y-6 p-6'>
      <div className='rounded-lg border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-950/30 p-4'>
        <div className='flex items-start gap-3'>
          <CheckCircle2 className='h-5 w-5 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0' />
          <div className='flex-1'>
            <h3 className='text-sm font-semibold text-emerald-900 dark:text-emerald-100'>Validacion exitosa</h3>
            <p className='text-sm text-emerald-700 dark:text-emerald-300 mt-1'>
              Todos los empleados han sido verificados correctamente
            </p>
          </div>
        </div>
      </div>

      <div className='rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden'>
        <div className='bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/30 p-8 text-center border-b border-emerald-100 dark:border-emerald-900/30'>
          <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/50 mb-4'>
            <CheckCircle2 className='h-8 w-8 text-emerald-600 dark:text-emerald-400' />
          </div>
          <h2 className='text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2'>Validacion completada</h2>
          <p className='text-zinc-600 dark:text-zinc-400 text-base'>
            Todos los empleados del archivo existen en el sistema
          </p>
        </div>

        <div className='p-6 space-y-6'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className='p-2 rounded-lg bg-muted'>
                <Users className='h-6 w-6 text-muted-foreground' />
              </div>
              <div>
                <h3 className='text-lg font-semibold text-foreground'>Empleados verificados</h3>
                <p className='text-sm text-muted-foreground'>Revisa la informacion de cada empleado si es necesario</p>
              </div>
            </div>

            <Badge variant='secondary' className='text-base px-4 py-2'>
              {pluralize({
                count: completedEmployees.length,
                singular: 'empleado',
                plural: 'empleados',
                showCount: true,
              })}
            </Badge>
          </div>

          <div className='min-h-[400px] max-h-[1200px] overflow-y-auto overflow-x-hidden'>
            <div className='space-y-3'>
              {completedEmployees.map((employee) => (
                <EmployeeCard key={employee.id} employee={employee} onEdit={handleEditEmployee} />
              ))}
            </div>
          </div>

          <div className='flex items-center justify-center gap-2 p-4 rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/20 border border-emerald-200 dark:border-emerald-800'>
            <ArrowRight className='h-4 w-4 text-emerald-600 dark:text-emerald-400' />
            <p className='text-sm font-medium text-emerald-700 dark:text-emerald-300'>
              Haz clic en "Siguiente" para continuar con la validacion de datos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
