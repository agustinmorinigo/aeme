import { Info } from '@aeme/ui/icons';

export default function HeaderAlert() {
  return (
    <div className='bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-6'>
      <div className='flex items-start gap-4'>
        <div className='p-3 bg-blue-500/10 dark:bg-blue-500/20 rounded-lg'>
          <Info className='w-6 h-6 text-blue-600 dark:text-blue-400' />
        </div>
        <div className='flex-1'>
          <h2 className='text-xl font-semibold text-blue-900 dark:text-blue-100 mb-2'>Validación de datos</h2>
          {/* Mejorar todo este texto con IA. */}
          <p className='text-sm text-blue-700 dark:text-blue-300 leading-relaxed'>
            Para generar correctamente el reporte es necesario que para cada día registrado en el Excel, cada empleado
            tenga 4 registros en este orden:
            <br />
            <br />- Una entrada (in).
            <br />- Un break inicio (break).
            <br />- Un break fin (break).
            <br />- Una salida (out).
            <br />
            <br />
            <span>Los horarios deben estar en orden cronológico: {'Entrada < Break inicio < Break fin < Salida.'}</span>
            Cualquier otro orden o cantidad de registros es considerado inválido. <br />A continuación verás un resumen
            de los registros de cada empleado.
            <br />
            Para que se habilite el botón de "Siguiente", es necesario que todos los empleados tengan registros
            completos y en el orden correcto.
            <br />
            Para lograr esto puedes o bien editar el archivo Excel original y volver a subirlo en el paso 2, o bien
            clickear en "Rellenar todo como válido". Al lado del botón podrás ver el ícono "?" que te explica qué hace
            esta función.
          </p>

          <div>
            IMPORTANTE: Para que se habilite el botón de "Siguiente", es necesario que NO existan errores en CADA
            empleado
          </div>

          <div>Según horas diarias: ≤6hs = 20min | 7-8hs = 30min | 9hs = 40min | ≥10hs = 1hora</div>
        </div>
      </div>
    </div>
  );
}
