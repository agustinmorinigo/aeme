import type { AttendanceType } from '@/modules/attendance/types/attendance';
import type { AttendancesInfo2 } from '@/modules/attendance/types/basic-report-info';
import type { ReportEmployee } from '@/modules/attendance/types/report-employee';
import hasValidDailyRecords from '@/modules/attendance/utils/attendance/has-valid-daily-records';
import getValidEmployeeBreakTimeConfig from '@/modules/attendance/utils/employee/get-valid-employee-break-time';
import { hasValidInOutDailyRecord } from '@/modules/attendance/utils/transform-attendances-info/has-valid-in-out-daily-record';
import { obtenerTimeDeAcuerdoAConfigDelEmployee } from '@/modules/attendance/utils/transform-attendances-info/obtener-time-de-acuerdo-a-config-del-employee';

export const getValidAttendanceInfo = (
  attendancesInfo: AttendancesInfo2,
  employee: ReportEmployee,
): AttendancesInfo2 => {
  Object.entries(attendancesInfo).forEach(([date, dailyRecords]) => {
    const isValidDailyRecord = hasValidDailyRecords(dailyRecords);
    if (isValidDailyRecord) return;

    const validAttendanceTypes: AttendanceType[] = ['in', 'break', 'break', 'out'];

    attendancesInfo[date] = validAttendanceTypes.map((attendanceType, index) => {
      // Break records are overwritten by design. Proper registration is expected for other attendance types. Some edge cases are beyond the system's scope.
      if (attendanceType === 'break') {
        const isBreakIn = index === 1;

        const { breakInTime, breakOutTime } = getValidEmployeeBreakTimeConfig(employee, date);

        return {
          time: isBreakIn ? breakInTime : breakOutTime,
          type: attendanceType,
          isOriginal: false,
        };
      }

      if (hasValidInOutDailyRecord(attendanceType, dailyRecords)) {
        return {
          time: attendanceType === 'in' ? dailyRecords[0].time : dailyRecords.at(-1)!.time,
          type: attendanceType,
          isOriginal: true,
        };
      } else {
        return {
          time: obtenerTimeDeAcuerdoAConfigDelEmployee(date, employee, attendanceType),
          type: attendanceType,
          isOriginal: false,
        };
      }
    });
  });

  return attendancesInfo;
};
