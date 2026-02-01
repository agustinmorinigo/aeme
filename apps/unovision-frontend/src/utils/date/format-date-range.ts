import { differenceInDays, format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

/**
 * Formats a date range for display
 * @param startDate - ISO date string (YYYY-MM-DD)
 * @param endDate - ISO date string (YYYY-MM-DD) or null for single-day
 * @returns Formatted date range string:
 *   - 1 day: "Lun 15/01"
 *   - 2 days: "Lun 15/01 y Mar 16/01"
 *   - 3+ days: "Lun 15/01 a Vie 19/01"
 */
export default function formatDateRange(startDate: string, endDate: string | null): string {
  const formatDate = (dateString: string) => {
    const date = parseISO(dateString);
    const formatted = format(date, 'EEE dd/MM', { locale: es });
    // Capitalize first letter of day name
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  };

  if (!endDate) {
    // Single day
    return formatDate(startDate);
  }

  // Calculate difference in days
  const start = parseISO(startDate);
  const end = parseISO(endDate);
  const daysDifference = differenceInDays(end, start);

  if (daysDifference === 1) {
    // Two consecutive days: show "day1 y day2"
    return `${formatDate(startDate)} y ${formatDate(endDate)}`;
  }

  // 3 or more days: show "day1 a dayN"
  return `${formatDate(startDate)} a ${formatDate(endDate)}`;
}
