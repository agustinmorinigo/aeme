import type { AttendanceType } from '@/modules/attendance/types/attendance';
import type { AttendanceEntry } from '@/modules/attendance/types/employee-attendance';

export const hasValidInOutDailyRecord = (attendanceType: AttendanceType, dailyRecords: AttendanceEntry[]): boolean => {
  if (attendanceType === 'in') {
    const hasCorrectEntry = dailyRecords[0]?.type === 'in';
    return hasCorrectEntry;
  } else {
    const hasCorrectExit = dailyRecords.length >= 2 && dailyRecords.at(-1)?.type === 'out';
    return hasCorrectExit;
  }
};
