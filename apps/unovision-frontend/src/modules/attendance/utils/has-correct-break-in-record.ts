import type { AttendanceEntry } from '@/modules/attendance/types/employee-attendance';

export default function hasCorrectBreakInRecord(dailyRecords: AttendanceEntry[]): boolean {
  return dailyRecords[1] && dailyRecords[1].type === 'break';
}
