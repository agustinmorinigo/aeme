import { attendanceFileHeaders } from '@/modules/attendance/constants/attendance-report-file-requirements';
import validateHeadersFile from '@/shared/files/csv/utils/validate-headers-file';

export default function hasValidHeaders(fileHeaders: string[]): boolean {
  const { isValid } = validateHeadersFile(fileHeaders, attendanceFileHeaders);
  return isValid;
}
