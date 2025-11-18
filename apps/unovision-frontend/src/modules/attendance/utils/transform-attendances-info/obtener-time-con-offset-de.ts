import type { AttendanceType } from '@/modules/attendance/types/attendance';
import type { AttendanceEntry } from '@/modules/attendance/types/employee-attendance';
import timeZoneOffsets from '@/shared/date-time/constants/time-zone-offsets';
import { addOffsetToTime } from '@/shared/date-time/utils/add-offset-to-time';

export const obtenerTimeConOffsetDe = (attendanceType: AttendanceType, dailyRecords: AttendanceEntry[]): string => {
  if (attendanceType === 'in') {
    return addOffsetToTime(dailyRecords[0].time, timeZoneOffsets.ar);
  } else {
    // es 'out'.
    const tieneSalida = dailyRecords.length >= 2 && dailyRecords.at(-1)?.type === 'out';
    if (!tieneSalida || !dailyRecords.at(-1)) throw new Error('No hay registro de salida para obtener el time.');
    return addOffsetToTime(dailyRecords.at(-1)!.time, timeZoneOffsets.ar);
  }
};