import type { Attendance } from '@/modules/attendance/types/attendance';
import type { AttendancesInfo } from '@/modules/attendance/types/basic-report-info';

/**
 * Transforms an array of `Attendance` objects into an object (`AttendancesInfo`)
 * where each key is a `documentValue` and its value is an array of attendances
 * associated with that document.
 *
 * @param attendances - Array of `Attendance` objects to be grouped by `documentValue`.
 * @returns An object mapping each `documentValue` to an array of corresponding attendances.
 *
 * @example
 * ```typescript
 * const attendances: Attendance[] = [
 *   { timestamp: '2024-06-01T08:00:00', fullName: 'Alice Smith', type: 'in', documentValue: '123' },
 *   { timestamp: '2024-06-01T12:00:00', fullName: 'Alice Smith', type: 'break', documentValue: '123' },
 *   { timestamp: '2024-06-01T08:05:00', fullName: 'Bob Jones', type: 'in', documentValue: '456' }
 * ];
 *
 * const result = transformAttendancesToObject(attendances);
 * // result = {
 * //   '123': [
 * //     { timestamp: '2024-06-01T08:00:00', fullName: 'Alice Smith', type: 'in', documentValue: '123' },
 * //     { timestamp: '2024-06-01T12:00:00', fullName: 'Alice Smith', type: 'break', documentValue: '123' }
 * //   ],
 * //   '456': [
 * //     { timestamp: '2024-06-01T08:05:00', fullName: 'Bob Jones', type: 'in', documentValue: '456' }
 * //   ]
 * // }
 * ```
 */
export default function transformAttendancesToObject(attendances: Attendance[]): AttendancesInfo {
  const attendancesInfo: AttendancesInfo = {};

  attendances.forEach((attendance) => {
    const key = attendance.documentValue;

    if (!attendancesInfo[key]) {
      attendancesInfo[key] = [];
    }

    attendancesInfo[key].push(attendance);
  });

  return attendancesInfo;
}
