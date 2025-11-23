import { Alert, AlertDescription, AlertTitle, Card } from '@aeme/ui';
import type { FileWithPreview } from '@aeme/ui/hooks/use-file-upload';
import { TriangleAlert } from '@aeme/ui/icons';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import FileRequirements from '@/modules/attendance/components/stepper/step-2/file-section/file-requirements';
import FileUploaderField from '@/modules/attendance/components/stepper/step-2/file-section/file-uploader-field';
import type { BasicReportInfoSchema } from '@/modules/attendance/schemas/basic-report-info-schema';
import useBasicReportInfoStore from '@/modules/attendance/stores/use-basic-report-info-store';
import { getFakeFileForDisplay } from '@/modules/attendance/utils/file/get-fake-file-for-display';

export default function FileSection() {
  const [localFile, setLocalFile] = useState<FileWithPreview | undefined>();
  const [showAlert, setShowAlert] = useState(false);

  const { setValue } = useFormContext<BasicReportInfoSchema>();
  const { fileMetadata, attendancesInfo } = useBasicReportInfoStore();

  // Restore "file" from store on mount if it exists.
  useEffect(() => {
    const canCreateFakeFile = fileMetadata && attendancesInfo && !localFile;
    if (!canCreateFakeFile) return;

    const fakeFile = getFakeFileForDisplay(fileMetadata);
    if (!fakeFile) return;

    const fileWithPreview: FileWithPreview = {
      file: fakeFile,
      id: crypto.randomUUID(),
    };

    setLocalFile(fileWithPreview);
    setValue('file', fakeFile);
  }, [fileMetadata, attendancesInfo, localFile, setValue]);

  const canShowSuccessAlert = localFile && attendancesInfo;

  return (
    <Card className='w-full flex flex-col gap-4'>
      <div className='w-full flex flex-col gap-1'>
        <p>Archivo de asistencia</p>
        <p className='text-sm text-muted-foreground'>
          Selecciona el archivo que corresponde al reporte de asistencia que deseas generar.
        </p>
      </div>

      <FileRequirements />

      {canShowSuccessAlert && (
        <Alert variant='default' className='my-5 border-green-400 text-green-400'>
          <AlertTitle className='mb-1 font-bold'>El archivo es válido</AlertTitle>
          <AlertDescription className='text-green-400'>
            El archivo cumple correctamente con todos los requisitos.
          </AlertDescription>
        </Alert>
      )}

      <Alert variant='destructive' canClose open={showAlert} onOpenChange={setShowAlert} className='my-5'>
        <TriangleAlert />
        <AlertTitle className='mb-1'>El archivo es inválido</AlertTitle>
        <AlertDescription>
          El archivo que has subido no cumple con los requisitos necesarios. Por favor, revisa los requisitos de arriba
          y vuelve a intentarlo.
        </AlertDescription>
      </Alert>

      <FileUploaderField localFile={localFile} setLocalFile={setLocalFile} setShowAlert={setShowAlert} />
    </Card>
  );
}
