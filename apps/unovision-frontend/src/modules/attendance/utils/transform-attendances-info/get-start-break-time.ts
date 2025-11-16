import type { EmployeeSchedule } from '@/client/entities';
import timeZoneOffsets from '@/shared/date-time/constants/time-zone-offsets';
import { addOffsetToTime } from '@/shared/date-time/utils/add-offset-to-time';

// ESTO TAMBIÉN DEPENDE DEL HORARIO LABORAL DE ESE DÍA, DEL EMPLEADO.
export const getStartBreakTime = (_: EmployeeSchedule): string => {
  // const isPartTime = false; // HORA DIARIA PARA ESE DÍA ES <= 4HS. VALIDAR ESTO CON LUZ.
  // const trabaja8o9HS = true;
  // const trabaja10HSoMas = false;
  return addOffsetToTime('13:00:00', timeZoneOffsets.ar); // ESTO VA EN BASE A LA CONFIGURACIÓN DEL EMPLEADO.
};