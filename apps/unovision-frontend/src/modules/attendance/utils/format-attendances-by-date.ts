import type { AttendancesInfo } from '@/modules/attendance/types/basic-report-info';
import type { AttendanceEntry, EmployeeInfo, FormattedAttendancesInfo } from '@/modules/attendance/types/employee-attendance';

/**
 * Transforms attendance data grouped by document to a structured format by date
 * @param attendancesInfo - Record where keys are document values and values are arrays of attendances
 * @returns Formatted attendance data grouped by employee and date
 *
 * @example
 * const input = {
 *   "43036170": [
 *     { timestamp: "2023-05-01T08:39:56-03:00", fullName: "Camila Leguizamon", type: "in", documentValue: "43036170" },
 *     { timestamp: "2023-05-01T17:32:42-03:00", fullName: "Camila Leguizamon", type: "out", documentValue: "43036170" }
 *   ]
 * };
 *
 * formatAttendancesByDate(input);
 * // Returns:
 * // {
 * //   "43036170": {
 * //     employee: { fullName: "Camila Leguizamon", documentValue: "43036170" },
 * //     attendancesInfo: {
 * //       "2023-05-01": [
 * //         { time: "08:39:56-03:00", type: "in" },
 * //         { time: "17:32:42-03:00", type: "out" }
 * //       ]
 * //     }
 * //   }
 * // }
 */
export function formatAttendancesByDate(attendancesInfo: AttendancesInfo): FormattedAttendancesInfo {
  const result: FormattedAttendancesInfo = {};

  Object.entries(attendancesInfo).forEach(([documentValue, attendances]) => {
    if (attendances.length === 0) return;

    const firstAttendance = attendances[0];
    const employee: EmployeeInfo = {
      fullName: firstAttendance.fullName,
      documentValue: firstAttendance.documentValue,
    };

    const attendancesByDate: Record<string, AttendanceEntry[]> = {};

    attendances.forEach((attendance) => {
      // Extract date from timestamp (format: "2023-05-01T08:39:56-03:00" -> "2023-05-01")
      const date = attendance.timestamp.split('T')[0];

      // Extract time from timestamp (format: "2023-05-01T08:39:56-03:00" -> "08:39:56-03:00")
      const time = attendance.timestamp.split('T')[1];

      if (!attendancesByDate[date]) {
        attendancesByDate[date] = [];
      }

      attendancesByDate[date].push({
        time,
        type: attendance.type,
        isOriginal: true
      });
    });

    result[documentValue] = {
      employee,
      attendancesInfo: attendancesByDate,
    };
  });

  return result;
}