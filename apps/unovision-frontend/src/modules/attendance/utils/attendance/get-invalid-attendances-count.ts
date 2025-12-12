
/**
 * Calculates the number of invalid attendances by subtracting the valid attendances from the total days processed.
 *
 * Throws an error if the number of valid attendances is greater than the number of days processed.
 *
 * @param daysProcessedCount - The total number of days that have been processed.
 * @param validAttendancesCount - The number of valid attendances recorded.
 * @returns The number of invalid attendances.
 *
 * @throws {Error} If `validAttendancesCount` is greater than `daysProcessedCount`.
 *
 * @example
 * // Returns 2 because there are 5 days processed and 3 valid attendances
 * getInvalidAttendancesCount(5, 3);
 *
 * @example
 * // Throws an error because valid attendances exceed days processed
 * getInvalidAttendancesCount(2, 3); // Error: El número de asistencias válidas no puede ser mayor que el número de días procesados.
 */
export default function getInvalidAttendancesCount(daysProcessedCount: number, validAttendancesCount: number): number {
  if (daysProcessedCount < validAttendancesCount) {
    throw new Error('El número de asistencias válidas no puede ser mayor que el número de días procesados.');
  }

  return daysProcessedCount - validAttendancesCount;
}