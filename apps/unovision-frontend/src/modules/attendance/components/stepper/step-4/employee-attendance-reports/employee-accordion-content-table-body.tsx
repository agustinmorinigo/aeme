import { Badge, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@aeme/ui';
import { AlertCircle, Calendar, CheckCircle2, Clock, Info } from '@aeme/ui/icons';
import useAttendancesStore from '@/modules/attendance/stores/use-attendances-store';
import type { EmployeeAttendanceInfo as EmployeeAttendanceInfoType } from '@/modules/attendance/types/employee-attendance';
import getAttendanceTypeLabel from '@/modules/attendance/utils/attendance/get-attendance-type-label';
import hasValidDailyRecords from '@/modules/attendance/utils/attendance/has-valid-daily-records';
import { formatShortDate } from '@/shared/date-time/utils/format-short-date';
import { formatTime } from '@/shared/date-time/utils/format-time';
import { pluralize } from '@/utils/pluralize';

interface EmployeeAccordionContentTableBodyProps {
  employeeAttendanceInfo: EmployeeAttendanceInfoType;
}

// SACAR DE ACÁ.
function getValidationBadge(isValid: boolean) {
  if (isValid) {
    return (
      <Badge className='bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'>
        <CheckCircle2 className='w-3 h-3 mr-1' />
        VÁLIDO
      </Badge>
    );
  }

  return (
    <Badge className='bg-red-500/10 text-red-700 dark:bg-red-500/20 dark:text-red-400 border-red-500/20 hover:bg-red-500/20'>
      <AlertCircle className='w-3 h-3 mr-1' />
      INVÁLIDO
    </Badge>
  );
}

// Segmentar en componentes más pequeños.
export default function EmployeeAccordionContentTableBody(props: EmployeeAccordionContentTableBodyProps) {
  const { employeeAttendanceInfo } = props;
  const { attendancesInfo } = employeeAttendanceInfo;
  const attendances = Object.entries(attendancesInfo);
  const { hasModified } = useAttendancesStore();

  return (
    <div className='w-full flex flex-col'>
      {attendances.map(([key, value]) => {
        const attendanceDate = key;
        const attendanceRecords = value;

        return (
          <div
            key={crypto.randomUUID()}
            className='grid grid-cols-[200px_200px_120px] gap-4 p-0.5 border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors items-center'
          >
            {/* Date column */}
            <div className='flex items-center gap-2'>
              <Calendar className='w-4 h-4 text-zinc-400 dark:text-zinc-500' />
              <span className='text-sm font-medium text-zinc-900 dark:text-zinc-100 capitalize'>
                {formatShortDate(attendanceDate)}
              </span>
            </div>

            {/* Record count column */}
            <div className='text-sm text-zinc-700 dark:text-zinc-300 flex items-center gap-2'>
              <span className='inline-block min-w-[71px]'>
                {pluralize({
                  count: attendanceRecords.length,
                  singular: 'registro',
                  plural: 'registros',
                  showCount: true,
                })}
              </span>

              {attendanceRecords.length > 0 && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type='button'
                        className='p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors'
                      >
                        <Info className='w-4 h-4 text-zinc-600 dark:text-zinc-400' />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side='right' className='max-w-sm'>
                      <div className='space-y-3'>
                        <p className='text-xs font-semibold mb-2'>Detalles:</p>
                        <div>
                          {attendanceRecords.map((record) => (
                            <div key={crypto.randomUUID()} className='flex items-center gap-2 text-xs'>
                              <Clock className='w-3 h-3' />
                              <span className='font-medium min-w-[45px]'>{getAttendanceTypeLabel(record.type)}</span>
                              <span className='text-zinc-400'>-</span>
                              <span className='inline-flex items-center gap-2'>
                                <span>{formatTime(record.time)}</span>

                                {hasModified && <span>{record.isOriginal ? '(original)' : '(modificado)'}</span>}
                              </span>
                            </div>
                          ))}
                        </div>
                        {!hasValidDailyRecords(attendanceRecords) && (
                          <div className='border-t border-t-zinc-100 dark:border-t-zinc-800 flex flex-col'>
                            <span className='mt-2 text-[11px]'>Se esperan 4 registros en orden cronológico:</span>
                            <span className='text-[11px]'>Entrada - Break - Break - Salida</span>
                          </div>
                        )}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>

            {/* Status badge column */}
            <div>{getValidationBadge(hasValidDailyRecords(attendanceRecords))}</div>
          </div>
        );
      })}
    </div>
  );
}
