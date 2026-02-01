import type { ReportEmployee } from '@/modules/attendance/types/report-employee';
import getEmployeeScheduleByWeekDay from '@/modules/attendance/utils/employee/get-employee-schedule-by-week-day';
import getISOWeekDay from '@/shared/date-time/utils/get-iso-week-day';

export const obtenerTimeDeAcuerdoAConfigDelEmployee = (
  date: string,
  employee: ReportEmployee,
  attendanceType: 'in' | 'out',
): string => {
  const weekDay = getISOWeekDay(date);
  const { startTime, endTime } = getEmployeeScheduleByWeekDay(employee, weekDay);
  return attendanceType === 'in' ? startTime : endTime;
};
