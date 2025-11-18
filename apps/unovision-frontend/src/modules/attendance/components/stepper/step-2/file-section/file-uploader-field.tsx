import { SimpleFileUploader } from '@aeme/ui';
import { type FileWithPreview, formatBytes } from '@aeme/ui/hooks/use-file-upload';
import { useFormContext } from 'react-hook-form';
import { FormField } from '@/modules/attendance/components/stepper/form-field';
import {
  maxSizeInBytes,
  validFileExtensions,
} from '@/modules/attendance/constants/attendance-report-file-requirements';
import type { BasicReportInfoSchema } from '@/modules/attendance/schemas/basic-report-info-schema';
import useBasicReportInfoStore from '@/modules/attendance/stores/use-basic-report-info-store';
import validateAndTransformToJson from '@/modules/attendance/utils/file/validate-and-transform-to-json';
import transformAttendancesToObject from '@/modules/attendance/utils/transform-attendances-to-object';

interface FileUploaderFieldProps {
  localFile: FileWithPreview | undefined;
  setLocalFile: (file: FileWithPreview | undefined) => void;
  setShowAlert: (show: boolean) => void;
}

export default function FileUploaderField(props: FileUploaderFieldProps) {
  const { localFile, setLocalFile, setShowAlert } = props;

  const {
    formState: { errors },
    setValue,
    trigger,
    watch,
  } = useFormContext<BasicReportInfoSchema>();
  const canActiveFileUploader = !!watch('monthNumber') && !!watch('yearNumber') && !localFile;

  const { clearFileData, setFileData } = useBasicReportInfoStore();

  const description = `Arrastra el archivo o haz clic para buscar archivos Excel/CSV (${validFileExtensions.join(', ')}). (máx. ${formatBytes(
    maxSizeInBytes,
  )})`;

  const handleOnAddFile = async (addedFile: FileWithPreview) => {
    try {
      const file = addedFile.file as File;
      const selectedPeriod = { monthNumber: watch('monthNumber'), yearNumber: watch('yearNumber') };

      const attendances = await validateAndTransformToJson({ file, selectedPeriod });
      const attendancesInfo = transformAttendancesToObject(attendances);

      setFileData({ file, attendancesInfo, selectedPeriod });
      setLocalFile(addedFile);
      setValue('file', file);
      trigger('file');
      setShowAlert(false);
    } catch {
      handleOnRemoveFile();
      setShowAlert(true);
    }
  };

  const handleOnRemoveFile = () => {
    setLocalFile(undefined);
    setValue('file', undefined);
    clearFileData();
  };

  return (
    <FormField error={errors.file?.message}>
      <SimpleFileUploader
        maxSize={maxSizeInBytes}
        accept={validFileExtensions.join(',')}
        label='Sube el archivo Excel'
        description={description}
        file={localFile}
        disabled={!canActiveFileUploader}
        onFileAdded={handleOnAddFile}
        onRemoveFile={handleOnRemoveFile}
      />
    </FormField>
  );
}
