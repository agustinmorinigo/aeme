import type { AttendanceType } from '@/modules/attendance/types/attendance';
import type { AttendanceEntry } from '@/modules/attendance/types/employee-attendance';
import type { ReportEmployee } from '@/modules/attendance/types/report-employee';
// import hasCorrectBreakInRecord from '@/modules/attendance/utils/has-correct-break-in-record';
// import hasCorrectBreakOutRecord from '@/modules/attendance/utils/has-correct-break-out-record';
import hasValidDailyRecords from '@/modules/attendance/utils/has-valid-daily-records';
import getValidEmployeeBreakTimeConfig from '@/modules/attendance/utils/transform-attendances-info/get-valid-employee-break-time';
import { hasValidInOutDailyRecord } from '@/modules/attendance/utils/transform-attendances-info/has-valid-in-out-daily-record';
import { obtenerTimeConOffsetDe } from '@/modules/attendance/utils/transform-attendances-info/obtener-time-con-offset-de';
import { obtenerTimeDeAcuerdoAConfigDelEmployee } from '@/modules/attendance/utils/transform-attendances-info/obtener-time-de-acuerdo-a-config-del-employee';

// NEXT TODO A LA NOCHE: REFACTORIZAR ESTO. SEGMENTARLO, PONER MEJORES NOMBRES, ETC, ETC, ETC.
// ESTO "Record<string, AttendanceEntry[]" SE REPITE MUCHO. METERLO EN UN ÚNICO LUGAR...
export const getValidAttendanceInfo = (
  attendancesInfo: Record<string, AttendanceEntry[]>,
  employee: ReportEmployee,
): Record<string, AttendanceEntry[]> => {
  Object.entries(attendancesInfo).forEach(([date, dailyRecords]) => {
    const isValidDailyRecord = hasValidDailyRecords(dailyRecords);
    if (isValidDailyRecord) return;

    const validAttendanceTypes: AttendanceType[] = ['in', 'break', 'break', 'out'];

    attendancesInfo[date] = validAttendanceTypes.map((attendanceType, index) => {

      // Si es break, que se pise y chau. Sino, hubieran registrado correctamente ese día y listo. Hay casos que el sistema NO puede contemplar.
      if(attendanceType === 'break') {
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
          time: obtenerTimeConOffsetDe(attendanceType, dailyRecords),
          type: attendanceType,
          isOriginal: true,
        };
      } else {
        // const isBreak = attendanceType === 'break';
        const isBreak = false;
        const attType = isBreak ? (index === 1 ? 'break-in' : 'break-out') : attendanceType;

        return {
          time: obtenerTimeDeAcuerdoAConfigDelEmployee(date, employee, attType),
          type: attendanceType,
          isOriginal: false,
        };
      }
    });
  });

  return attendancesInfo;
};