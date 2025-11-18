import type { AttendanceType } from '@/modules/attendance/types/attendance';
import type { AttendanceEntry } from '@/modules/attendance/types/employee-attendance';

export const hasValidInOutDailyRecord = (attendanceType: AttendanceType, dailyRecords: AttendanceEntry[]): boolean => {
  if (attendanceType === 'break') return false;

  if (attendanceType === 'in') {
    const tieneEntrada = dailyRecords[0]?.type === 'in';
    return tieneEntrada;
  } else {
    // es 'out'.
    const tieneSalida = dailyRecords.length >= 2 && dailyRecords.at(-1)?.type === 'out';
    return tieneSalida;
  }
};