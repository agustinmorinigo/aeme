import isoFormats from '@/shared/date-time/constants/iso-formats';
import timeZoneOffsets from '@/shared/date-time/constants/time-zone-offsets';

// Format used by the xlsx library for date cells that have a date and time, and the Argentina offset (-03:00).
// Example: 2023-10-05T14:30:00-03:00
// See more at: https://docs.sheetjs.com/docs/csf/features/dates#date-formats
const validLibDateTimeFormat = `${isoFormats.dates.fullDate}"T"${isoFormats.times.fullTime}"${timeZoneOffsets.ar}"`;
export default validLibDateTimeFormat;