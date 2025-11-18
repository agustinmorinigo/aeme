import type { SelectedPeriod } from '@/modules/attendance/types/selected-period';
import hasValidHeaders from '@/modules/attendance/utils/file/has-valid-headers';
import isValidDate from '@/modules/attendance/utils/file/is-valid-date';
import isValidField from '@/modules/attendance/utils/file/is-valid-field';
import isValidId from '@/modules/attendance/utils/file/is-valid-id';
import type { FileRow } from '@/shared/files/csv/types';

// TO DO: Add testing and JSDoc.
export default function isValidFileRow(fileRow: FileRow, selectedPeriod: SelectedPeriod): boolean {
  const hasAllRequiredKeys = hasValidHeaders(Object.keys(fileRow));
  if (!hasAllRequiredKeys) return false;

  const allFieldsAreValid = Object.values(fileRow).every(isValidField);
  if (!allFieldsAreValid) return false;

  const hasValidDate = isValidDate(fileRow['Fecha/Hora'], selectedPeriod);
  if (!hasValidDate) return false;

  const hasValidId = isValidId(fileRow['Usuario Nro.']);
  if (!hasValidId) return false;

  return true;
}