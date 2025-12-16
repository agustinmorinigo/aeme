import type { ReportEmployee } from '@/modules/attendance/types/report-employee';

const getEmployeeScheduleByWeekDay = (employee: ReportEmployee, weekDay: number) => {
  const employeeSchedule = employee.schedules.find((schedule) => schedule.weekday === weekDay);
  
  if (!employeeSchedule) {
    throw new Error(`El empleado ${employee.profile.email} no tiene configuración de horario para el día ${weekDay}`);
  }
  return employeeSchedule;
}

export default getEmployeeScheduleByWeekDay;