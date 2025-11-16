import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@aeme/ui';
import { Info } from 'lucide-react';
import useAttendancesStore from '@/modules/attendance/stores/use-attendances-store';

export default function ModifyAttendancesTooltip() {
  const { hasModified } = useAttendancesStore();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button type='button' className='p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors'>
            <Info className='w-4 h-4 text-zinc-600 dark:text-zinc-400' />
          </button>
        </TooltipTrigger>
        <TooltipContent className='max-w-xs'>
          <p className='text-sm'>
            {hasModified
              ? 'Revertir todos los registros a su estado original.'
              : 'Si el registro es inválido, se PISA con la configuración que tenga el usuario, o el break que le corresponda de acuerdo a la cantidad de horas diarias que realiza. Si el registro es válido, no se harán cambios. Es válido cuando está en la posición correcta y tiene un horario lógico.'}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
