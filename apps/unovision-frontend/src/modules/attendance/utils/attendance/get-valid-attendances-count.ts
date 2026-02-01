import type { AttendancesInfo2 } from '@/modules/attendance/types/basic-report-info';
import hasValidDailyRecords from '@/modules/attendance/utils/attendance/has-valid-daily-records';

/**
 * Counts the number of valid daily attendance records in the provided attendance information.
 *
 * Each entry in `attendancesInfo` represents an employee's daily attendance records.
 * A daily attendance is considered valid if it passes the `hasValidDailyRecords` check, which requires:
 * - Exactly 4 records per day.
 * - The records must be in the following order: `'in'`, `'break'`, `'break'`, `'out'`.
 * - The timestamps of the records must be in chronological order.
 *
 * @param attendancesInfo - An object where each key is an employee identifier and the value is an array of `AttendanceEntry` objects for that employee.
 * @returns The count of valid daily attendances across all employees.
 *
 * @example
 * ```typescript
 * const attendancesInfo = {
 *   '42101815': [
 *     { time: '2024-06-01T08:00:00', type: 'in', isOriginal: true },
 *     { time: '2024-06-01T12:00:00', type: 'break', isOriginal: true },
 *     { time: '2024-06-01T12:30:00', type: 'break', isOriginal: true },
 *     { time: '2024-06-01T17:00:00', type: 'out', isOriginal: true }
 *   ],
 *   '42101816': [
 *     { time: '2024-06-01T09:00:00', type: 'in', isOriginal: true },
 *     { time: '2024-06-01T13:00:00', type: 'break', isOriginal: true },
 *     { time: '2024-06-01T13:30:00', type: 'break', isOriginal: true },
 *     { time: '2024-06-01T18:00:00', type: 'out', isOriginal: true }
 *   ],
 *   '42101817': [
 *     { time: '2024-06-01T08:00:00', type: 'in', isOriginal: true },
 *     { time: '2024-06-01T12:00:00', type: 'break', isOriginal: true }
 *     // Missing records, so this is not valid
 *   ]
 * };
 *
 * const count = getValidAttendancesCount(attendancesInfo);
 * // count === 2
 * ```
 */
export default function getValidAttendancesCount(attendancesInfo: AttendancesInfo2): number {
  let validAttendancesCount = 0;

  Object.values(attendancesInfo).forEach((dailyRecords) => {
    const isValidDailyAttendance = hasValidDailyRecords(dailyRecords);
    if (isValidDailyAttendance) validAttendancesCount++;
  });

  return validAttendancesCount;
}
