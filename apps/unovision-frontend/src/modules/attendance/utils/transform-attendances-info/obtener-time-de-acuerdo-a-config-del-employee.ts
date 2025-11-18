import type { ReportEmployee } from '@/modules/attendance/types/report-employee';
import { getEmployeeBreakTimeDurationInMinsByDate } from '@/modules/attendance/utils/transform-attendances-info/get-employee-break-time-duration-in-mins-by-date';
import { getStartBreakTime } from '@/modules/attendance/utils/transform-attendances-info/get-start-break-time';
import timeZoneOffsets from '@/shared/date-time/constants/time-zone-offsets';
import { addMinutesToTime } from '@/shared/date-time/utils/add-minutes-to-time';
import { addOffsetToTime } from '@/shared/date-time/utils/add-offset-to-time';
import getISOWeekDay from '@/shared/date-time/utils/get-iso-week-day';

export const obtenerTimeDeAcuerdoAConfigDelEmployee = (
  date: string,
  employee: ReportEmployee,
  attendanceType: 'in' | 'break-in' | 'break-out' | 'out',
): string => {
  const weekDay = getISOWeekDay(date);
  const horarioConfigDelEmpleadoEnMismoWeekDay = employee.schedules.find((schedule) => schedule.weekday === weekDay);

  if (!horarioConfigDelEmpleadoEnMismoWeekDay) {
    throw new Error(`El empleado ${employee.profile.email} no tiene configuración de horario para el día ${weekDay}`);
  }

  const horaEntradaDelEmployeeEnMismoWeekDay = horarioConfigDelEmpleadoEnMismoWeekDay.startTime;
  const horaSalidaDelEmployeeEnMismoWeekDay = horarioConfigDelEmpleadoEnMismoWeekDay.endTime;
  const employeeBreakTimeInMins = getEmployeeBreakTimeDurationInMinsByDate(weekDay, employee.schedules);
  const breakInicioTime = getStartBreakTime(horarioConfigDelEmpleadoEnMismoWeekDay);

  if (attendanceType === 'in') {
    const startTime = addOffsetToTime(horaEntradaDelEmployeeEnMismoWeekDay, timeZoneOffsets.ar);
    return startTime;
  } else if (attendanceType === 'out') {
    const endTime = addOffsetToTime(horaSalidaDelEmployeeEnMismoWeekDay, timeZoneOffsets.ar);
    return endTime;
  } else if (attendanceType === 'break-in') {
    return breakInicioTime;
  } else if (attendanceType === 'break-out') {
    const breakFinTime = addMinutesToTime(breakInicioTime, employeeBreakTimeInMins);
    return breakFinTime;
  }

  return ''; // ESTO ESTÁ MAL.
};