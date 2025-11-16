import type { Attendance } from '@/modules/attendance/types/attendance';
import type { SelectedPeriod } from '@/modules/attendance/types/selected-period';
import validateAndTransformFileRows from '@/modules/attendance/utils/file/validate-and-transform-file-rows';
import parseExcel from '@/shared/files/csv/utils/parse-excel';

interface Params {
  file: File;
  selectedPeriod: SelectedPeriod;
}

// TO DO: Add testing and JSDoc.
export default async function validateAndTransformToJson({file, selectedPeriod}: Params): Promise<Attendance[]> {
  try {
    const [fileRows] = await parseExcel(file);
    const transformedRows = validateAndTransformFileRows({ fileRows, selectedPeriod });
    return transformedRows;
  } catch {
    throw new Error;
  }
}