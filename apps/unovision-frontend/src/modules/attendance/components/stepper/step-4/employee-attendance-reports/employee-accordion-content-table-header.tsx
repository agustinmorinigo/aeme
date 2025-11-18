export default function EmployeeAccordionContentTableHeader() {
  return (
    <div className="grid grid-cols-[200px_200px_120px] gap-4 py-2 px-3 border-b border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
      <div>Fecha</div>
      <div>Registros</div>
      <div>Estado</div>
      {/* <div>Detalles</div> */}
    </div>
  )
}
