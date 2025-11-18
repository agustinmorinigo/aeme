import type { AttendanceEntry } from '@/modules/attendance/types/employee-attendance';

export default function hasCorrectBreakOutRecord(dailyRecords: AttendanceEntry[]): boolean {
  return dailyRecords[2] && dailyRecords[2].type === 'break';
}
