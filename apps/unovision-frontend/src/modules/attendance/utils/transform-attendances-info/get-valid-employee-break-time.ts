import type { ReportEmployee } from '@/modules/attendance/types/report-employee';
import getISOWeekDay from '@/shared/date-time/utils/get-iso-week-day';


interface BreakTimeConfig {
  breakInTime: string; // HH:mm
  breakOutTime: string; // HH:mm
}

// En base a la config del employee y el date que pasen, se calcula su break time. si no existe config para ese día, lanzar un error.
// Acá es muy importante ser consciente de cuándo debería tomarse el break. Si hace partime en X hora, si hace full en otra hora y así...
// Se calcula por día configurado porque capaz el lunes trabaja 6hs y solo tendrá 20 min de break, pero el martes trabaja 8hs y tendrá 30 min de break, etc, etc.
export default function getValidEmployeeBreakTimeConfig(employee: ReportEmployee, date: string): BreakTimeConfig {
  const weekDay = getISOWeekDay(date);
  
  const employeeScheduleByWeekDay = employee.schedules.find((schedule) => schedule.weekday === weekDay);

  if (!employeeScheduleByWeekDay) {
    throw new Error(`El empleado ${employee.profile.email} no tiene configuración de horario para el día ${weekDay}`);
  }

  // const minDeBreakCorrespondientesAlEmployeeEnBaseAlSchedule = crear func para esto. Ya existe!!!!
  
  return {
    breakInTime: '12:00',
    breakOutTime: '12:30',
  };
}
