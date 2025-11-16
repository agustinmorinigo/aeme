import { Badge } from '@aeme/ui';
import { formatBytes } from '@aeme/ui/hooks/use-file-upload';
import { SquareCheckBig } from 'lucide-react';
import {
  attendanceFileHeaders,
  maxSizeInBytes,
  validFileExtensions,
} from '@/modules/attendance/constants/attendance-report-file-requirements';

function RequirementItem({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-full flex items-center gap-1 text-sm'>
      <SquareCheckBig className='shrink-0 size-5 text-green-400' />
      <div className='w-full flex items-center gap-2 flex-wrap'>{children}</div>
    </div>
  );
}

export default function FileRequirements() {
  return (
    <div className='w-full flex flex-col gap-4 my-4'>
      <div>
        <p className='text-sm'>Requisitos del archivo</p>
        <p className='text-sm text-muted-foreground'>
          Para que puedas subir el archivo de asistencia, asegúrate de que cumpla con los siguientes requisitos:
        </p>
      </div>

      <div className='flex flex-col gap-2'>
        <RequirementItem>
          <span>Formato:</span>
          {validFileExtensions.map((ext) => (
            <Badge key={ext}>{ext}</Badge>
          ))}
        </RequirementItem>

        <RequirementItem>
          <span>Columnas obligatorias:</span>
          {attendanceFileHeaders.map((header) => (
            <Badge key={header}>{header}</Badge>
          ))}
        </RequirementItem>

        <RequirementItem>
          <p>Sin filas vacías en columnas obligatorias.</p>
        </RequirementItem>

        <RequirementItem>
          <p>
            Dos <Badge>Nombre</Badge> distintos con mismo <Badge>Usuario Nro.</Badge> es inválido.
          </p>
        </RequirementItem>

        <RequirementItem>
          <p>
            Todas las fechas deben seguir el formato <Badge>DD/MM/AAAA HH:MM</Badge> (por ejemplo,{' '}
            <Badge>10/01/2024 07:56</Badge> <Badge>7/01/2024 07:56</Badge>).
          </p>
        </RequirementItem>

        <RequirementItem>
          <p>
            Cada <Badge>Fecha/Hora</Badge> debe estar en el mes y año seleccionado arriba.
          </p>
        </RequirementItem>

        <RequirementItem>
          <p>
            El archivo no debe exceder los <Badge>{formatBytes(maxSizeInBytes)}</Badge> de tamaño.
          </p>
        </RequirementItem>

        <RequirementItem>
          <p>Los empleados del archivo deben existir en el sistema, bajo el rol empleado.</p>
        </RequirementItem>

        <RequirementItem>
          <p>
            Cada <Badge>Usuario Nro.</Badge> debe ser solo numérico. No comas, puntos ni letras.
          </p>
        </RequirementItem>
      </div>
    </div>
  );
}
