import { format, isValid, parseISO } from 'date-fns';

/**
 * Formats a time string to HH:mm format (24-hour)
 * @param timeString - Time string with offset or ISO datetime string
 * @returns Formatted time string (e.g., "08:26")
 * @throws Error if the input is invalid
 *
 * @example
 * formatTime("08:26:53-03:00") // "08:26"
 * formatTime("2000-01-01T08:26:53-03:00") // "08:26"
 * formatTime("invalid") // throws Error
 */
export function formatTime(timeString: string): string {
  if (!timeString || typeof timeString !== 'string') {
    throw new Error('Invalid time string: input must be a non-empty string');
  }

  const dateTimeToParse = timeString.includes('T') ? timeString : `2000-01-01T${timeString}`;

  const parsedDate = parseISO(dateTimeToParse);

  if (!isValid(parsedDate)) {
    throw new Error(`Invalid time string: "${timeString}" could not be parsed`);
  }

  return format(parsedDate, 'HH:mm');
}