import type { FormattedAttendancesInfo } from '@/modules/attendance/types/employee-attendance';
import type { ReportEmployee } from '@/modules/attendance/types/report-employee';
import { getValidAttendanceInfo } from '@/modules/attendance/utils/transform-attendances-info/get-valid-attendance-info';

// TO DO: Cuando esté todo ok esta parte, agregarle un BUEN JSDoc.
const transformToValidAttendancesInfo = (
  attendancesInfoToTransform: FormattedAttendancesInfo,
  employees: ReportEmployee[],
): FormattedAttendancesInfo => {
  const validAttendancesInfo: FormattedAttendancesInfo = structuredClone(attendancesInfoToTransform);

  for (const dniValue in validAttendancesInfo) {
    const attendanceInfo = validAttendancesInfo[dniValue];
    const { attendancesInfo } = attendanceInfo;

    const employee = employees.find(
      (emp) => emp.profile.documentType === 'dni' && emp.profile.documentValue === dniValue,
    );

    if (!employee) {
      throw new Error(`Empleado con DNI ${dniValue} no encontrado en la base de datos.`);
    };

    validAttendancesInfo[dniValue].attendancesInfo = getValidAttendanceInfo(attendancesInfo, employee);
  }

  return validAttendancesInfo;
};

export default transformToValidAttendancesInfo;