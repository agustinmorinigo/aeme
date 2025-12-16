import type { ReportEmployee } from '@/modules/attendance/types/report-employee';

export default function getEmployee(employees: ReportEmployee[], docValue: string) {
  const employee = employees.find((employee) => employee.profile.documentValue === docValue);

  if (!employee) {
    throw new Error(`Empleado con DNI ${docValue} no encontrado en la base de datos.`);
  }
  
  return employee;
}
