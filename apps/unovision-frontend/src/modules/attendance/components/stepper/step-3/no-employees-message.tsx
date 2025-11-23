import { Card } from '@aeme/ui';
import { AlertCircle, ArrowLeft, Database, Users } from '@aeme/ui/icons';

export default function NoEmployeesMessage() {
  return (
    <div className='w-full max-w-4xl mx-auto px-4 py-8 pt-0'>
      <div className='flex items-start gap-4 mb-8 p-6 rounded-lg bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20'>
        <div className='flex-shrink-0 mt-1'>
          <div className='w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center'>
            <AlertCircle className='w-6 h-6 text-amber-600 dark:text-amber-400' />
          </div>
        </div>
        <div className='flex-1'>
          <h2 className='text-xl font-semibold text-amber-900 dark:text-amber-100 mb-2'>
            No hay empleados cargados en el sistema
          </h2>
          <p className='text-amber-800 dark:text-amber-200/80 text-sm leading-relaxed'>
            No se encontraron empleados registrados para la organización seleccionada en el paso anterior.
          </p>
        </div>
      </div>

      <Card className='bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 backdrop-blur-sm'>
        <div className='p-12 flex flex-col items-center justify-center text-center'>
          <div className='relative mb-6'>
            <div className='w-24 h-24 rounded-full bg-zinc-100 dark:bg-zinc-800/50 flex items-center justify-center'>
              <Database className='w-12 h-12 text-zinc-400 dark:text-zinc-600' />
            </div>
            <div className='absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 flex items-center justify-center'>
              <Users className='w-4 h-4 text-zinc-500' />
            </div>
          </div>

          <h3 className='text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3'>Base de datos vacía</h3>
          <p className='text-zinc-600 dark:text-zinc-400 text-base max-w-md mb-6 leading-relaxed'>
            La organización seleccionada no tiene empleados registrados en el sistema actualmente.
          </p>

          <div className='w-full max-w-lg bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-200 dark:border-zinc-700/50 rounded-lg p-6 mb-6'>
            <h4 className='text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3 flex items-center gap-2'>
              <AlertCircle className='w-4 h-4 text-blue-500 dark:text-blue-400' />
              ¿Qué significa esto?
            </h4>
            <ul className='text-sm text-zinc-600 dark:text-zinc-400 space-y-2 text-left'>
              <li className='flex items-start gap-2'>
                <span className='text-blue-500 dark:text-blue-400 mt-1'>•</span>
                <span>No hay registros de empleados para esta organización</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-blue-500 dark:text-blue-400 mt-1'>•</span>
                <span>Es necesario cargar empleados antes de continuar con la validación</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-blue-500 dark:text-blue-400 mt-1'>•</span>
                <span>Verifica que hayas seleccionado la organización correcta</span>
              </li>
            </ul>
          </div>

          <div className='flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-500'>
            <ArrowLeft className='w-4 h-4' />
            <span>Regresa al paso anterior para seleccionar otra organización</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
