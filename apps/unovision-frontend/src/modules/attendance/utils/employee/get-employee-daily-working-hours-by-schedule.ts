import type { EmployeeSchedule } from '@aeme/supabase-client/entities';
import getTimeDifferenceInHours from '@/shared/date-time/utils/get-time-difference-in-hours';

const getEmployeeDailyWorkingHoursBySchedule = (employeeSchedule: EmployeeSchedule): number => {
  const { startTime, endTime } = employeeSchedule;
  const dailyWorkingHours = getTimeDifferenceInHours(startTime, endTime);
  return dailyWorkingHours;
};

export default getEmployeeDailyWorkingHoursBySchedule;
