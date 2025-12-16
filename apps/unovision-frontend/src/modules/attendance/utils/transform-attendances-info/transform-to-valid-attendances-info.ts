import type { FormattedAttendancesInfo } from '@/modules/attendance/types/employee-attendance';
import type { ReportEmployee } from '@/modules/attendance/types/report-employee';
import getEmployee from '@/modules/attendance/utils/employee/get-employee';
import { getValidAttendanceInfo } from '@/modules/attendance/utils/transform-attendances-info/get-valid-attendance-info';

const transformToValidAttendancesInfo = (
  attendancesInfoToTransform: FormattedAttendancesInfo,
  employees: ReportEmployee[],
): FormattedAttendancesInfo => {
  const validAttendancesInfo: FormattedAttendancesInfo = structuredClone(attendancesInfoToTransform);

  for (const dniValue in validAttendancesInfo) {
    const attendanceInfo = validAttendancesInfo[dniValue];
    const { attendancesInfo } = attendanceInfo;
    const employee = getEmployee(employees, dniValue);
    validAttendancesInfo[dniValue].attendancesInfo = getValidAttendanceInfo(attendancesInfo, employee);
  }

  return validAttendancesInfo;
};

export default transformToValidAttendancesInfo;
