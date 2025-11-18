import { format, parseISO } from 'date-fns';

/**
 * Formats a date string to "EEE dd/MM" format (e.g., "mar 01/07")
 * @param dateString - Date in ISO format "YYYY-MM-DD"
 * @returns Formatted date string
 *
 * @example
 * formatShortDate("2025-07-01") // "mar 01/07"
 * formatShortDate("2025-12-25") // "jue 25/12"
 */
export function formatShortDate(dateString: string): string {
  const formatted = format(parseISO(dateString), 'EEE dd/MM');
  return formatted;
}