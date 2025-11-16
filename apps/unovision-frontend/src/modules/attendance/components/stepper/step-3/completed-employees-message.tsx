import { ArrowRight, CheckCircle2, Users } from 'lucide-react';

export default function CompletedEmployeesMessage() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6 rounded-lg border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-950/30 p-4">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">Validación exitosa</h3>
            <p className="text-sm text-emerald-700 dark:text-emerald-300 mt-1">
              Todos los empleados han sido verificados correctamente
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/30 p-8 text-center border-b border-emerald-100 dark:border-emerald-900/30">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/50 mb-4">
            <CheckCircle2 className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">¡Validación completada!</h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-base">
            Todos los empleados del archivo existen en el sistema
          </p>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700">
            <Users className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Todos los registros fueron validados exitosamente
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 p-4 rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/20 border border-emerald-200 dark:border-emerald-800">
            <ArrowRight className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
              Haz clic en "Siguiente" para continuar con la validación de datos
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
