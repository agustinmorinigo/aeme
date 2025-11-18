import type { AttendanceType } from '@/modules/attendance/types/attendance';

/**
 * Returns a human-readable label for a given attendance type.
 *
 * @param attendanceType - The type of attendance. Possible values are `'in'`, `'break'`, `'out'`.
 * @returns The corresponding label in Spanish:
 * - `'in'` returns `'Entrada'`
 * - `'break'` returns `'Break'`
 * - `'out'` returns `'Salida'`
 * - Any other value returns `'Desconocido'`
 *
 * @example
 * ```typescript
 * getAttendanceTypeLabel('in'); // Returns 'Entrada'
 * getAttendanceTypeLabel('break'); // Returns 'Break'
 * getAttendanceTypeLabel('out'); // Returns 'Salida'
 * getAttendanceTypeLabel('unknown'); // Returns 'Desconocido'
 * ```
 */
export default function getAttendanceTypeLabel(attendanceType: AttendanceType): string {
  switch (attendanceType) {
    case 'in':
      return 'Entrada';
    case 'break':
      return 'Break';
    case 'out':
      return 'Salida';
    default:
      return 'Desconocido';
  }
}
