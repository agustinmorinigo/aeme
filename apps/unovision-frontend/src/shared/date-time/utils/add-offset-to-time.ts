import type { TimeZoneOffset } from '@/shared/date-time/constants/time-zone-offsets';

/**
 * Adds timezone offset to a time string if it doesn't already have one
 * @param timeString - Time string (e.g., "09:00:00" or "09:00:00-03:00")
 * @param timeZoneOffset - Timezone offset string (e.g., "-03:00")
 * @returns Time string with offset, or original string if invalid
 *
 * @example
 * addOffsetToTime("09:00:00", "-03:00") // "09:00:00-03:00"
 * addOffsetToTime("09:00:00-03:00", "-03:00") // "09:00:00-03:00"
 * addOffsetToTime("invalid", "-03:00") // "invalid" (sin cambios)
 */
export function addOffsetToTime(timeString: string, timeZoneOffset: TimeZoneOffset): string {
  if (!timeString || typeof timeString !== 'string') {
    return timeString;
  }

  // Verificar si ya tiene offset (formato ±HH:MM al final)
  const hasOffset = /[+-]\d{2}:\d{2}$/.test(timeString);

  if (hasOffset) {
    return timeString;
  }

  // Validar que sea un formato de tiempo válido antes de agregar offset
  const isValidTimeFormat = /^\d{2}:\d{2}:\d{2}$/.test(timeString);

  if (!isValidTimeFormat) {
    return timeString; // Retornar sin modificar si no es válido
  }

  return `${timeString}${timeZoneOffset}`;
}
