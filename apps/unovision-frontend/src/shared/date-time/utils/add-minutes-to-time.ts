import { addMinutes, format, parseISO } from 'date-fns';

/**
 * Adds minutes to a time string with offset
 * @param timeString - Time string with offset (e.g., "13:00:00-03:00")
 * @param minutes - Number of minutes to add (can be negative)
 * @returns Updated time string with offset
 *
 * @example
 * addMinutesToTime("13:00:00-03:00", 30) // "13:30:00-03:00"
 * addMinutesToTime("23:45:00-03:00", 30) // "00:15:00-03:00"
 * addMinutesToTime("14:00:00-03:00", -15) // "13:45:00-03:00"
 */
export function addMinutesToTime(timeString: string, minutes: number): string {
  const dateTime = parseISO(`2000-01-01T${timeString}`);
  const newDateTime = addMinutes(dateTime, minutes);
  return format(newDateTime, 'HH:mm:ssXXX');
}