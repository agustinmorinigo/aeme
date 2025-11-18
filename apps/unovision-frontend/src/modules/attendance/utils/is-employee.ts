import type { ReportEmployee } from '@/modules/attendance/types/report-employee';

/**
 * Determines if a given document value belongs to any employee in the provided list.
 *
 * @param employees - Array of `ReportEmployee` objects to search through.
 * @param docValue - The document value to match against employees' profile document values.
 * @returns `true` if an employee with the specified document value exists, otherwise `false`.
 *
 * @example
 * const employees = [
 *   { profile: { documentValue: '12345' } },
 *   { profile: { documentValue: '67890' } }
 * ];
 * 
 * isEmployee(employees, '12345'); // returns true
 * isEmployee(employees, '00000'); // returns false
 */
export default function isEmployee(employees: ReportEmployee[], docValue: string): boolean {
  return employees.some((employee) => employee.profile.documentValue === docValue);
}
