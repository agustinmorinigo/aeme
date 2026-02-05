import { addMinutes, format, parse } from 'date-fns';
import type { ReportEmployee } from '@/modules/attendance/types/report-employee';
import getEmployeeBreakTimeDurationInMinsByDailyHours from '@/modules/attendance/utils/employee/get-employee-break-time-duration-in-mins-by-daily-hours';
import getEmployeeDailyWorkingHoursBySchedule from '@/modules/attendance/utils/employee/get-employee-daily-working-hours-by-schedule';
import getEmployeeScheduleByWeekDay from '@/modules/attendance/utils/employee/get-employee-schedule-by-week-day';
import isoFormats from '@/shared/date-time/constants/iso-formats';
import getISOWeekDay from '@/shared/date-time/utils/get-iso-week-day';

interface BreakTimeConfig {
  breakInTime: string;
  breakOutTime: string;
}

export default function getValidEmployeeBreakTimeConfig(employee: ReportEmployee, date: string): BreakTimeConfig {
  const weekDay = getISOWeekDay(date);
  const employeeSchedule = getEmployeeScheduleByWeekDay(employee, weekDay);
  const dailyWorkingHours = getEmployeeDailyWorkingHoursBySchedule(employeeSchedule);
  const employeeBreakTimeInMins = getEmployeeBreakTimeDurationInMinsByDailyHours(dailyWorkingHours);

  const breakInTime = dailyWorkingHours > 4 ? '12:00:00' : '11:00:00';
  const breakInDate = parse(breakInTime, isoFormats.times.fullTime, new Date());
  const breakOutDate = addMinutes(breakInDate, employeeBreakTimeInMins);
  const breakOutTime = format(breakOutDate, isoFormats.times.fullTime);

  return {
    breakInTime,
    breakOutTime,
  };
}
