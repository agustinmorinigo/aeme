import type { EmployeeSchedule } from '@aeme/supabase-client/entities';
import getEmployeeBreakTimeDurationInMinsByDailyHours from '@/modules/attendance/utils/transform-attendances-info/get-employee-break-time-duration-in-mins-by-daily-hours';
import getTimeDifferenceInHours from '@/shared/date-time/utils/get-time-difference-in-hours';

const getEmployeeDailyWorkingHoursBySchedule = (employeeSchedule: EmployeeSchedule): number => {
  const { startTime, endTime } = employeeSchedule;
  const dailyWorkingHours = getTimeDifferenceInHours(startTime, endTime);
  return dailyWorkingHours;
};

// Acá le tendría que pasar el schedule directamente, no buscarlo.
export const getEmployeeBreakTimeDurationInMinsByDate = (weekDay: number, employeeSchedules: EmployeeSchedule[]) => {
  const correctEmployeeSchedule = employeeSchedules.find((schedule) => schedule.weekday === weekDay); // ESTO SE REPITE MUCHO.
  if (!correctEmployeeSchedule) return 0;

  const dailyWorkingHours = getEmployeeDailyWorkingHoursBySchedule(correctEmployeeSchedule);
  const employeeBreakTimeInMins = getEmployeeBreakTimeDurationInMinsByDailyHours(dailyWorkingHours);
  return employeeBreakTimeInMins;
};
