import type { Justification } from '@aeme/contracts';
import { Badge, Tooltip, TooltipContent, TooltipTrigger } from '@aeme/ui';
import { FileQuestionMark, SquareArrowOutUpRight } from '@aeme/ui/icons';
import type { ColumnDef } from '@tanstack/react-table';
import TableActions from '@/modules/justifications/components/justifications-table/actions';
import getJustificationTypeLabel from '@/modules/justifications/utils/get-justification-type-label';
import getFormattedUserDocument from '@/shared/users/utils/get-formatted-user-document';
import getFormattedUserFullName from '@/shared/users/utils/get-formatted-user-full-name';
import formatDateRange from '@/utils/date/format-date-range';

export const columns: ColumnDef<Justification>[] = [
  {
    accessorKey: 'employee',
    header: () => <p className='text-center'>Empleado</p>,
    cell: ({ row }) => (
      <p className='capitalize text-center'>{getFormattedUserFullName(row.original.employee.profile)}</p>
    ),
  },
  {
    accessorKey: 'document',
    header: () => <p className='text-center'>Documento</p>,
    cell: ({ row }) => (
      <p className='uppercase text-center'>{getFormattedUserDocument(row.original.employee.profile)}</p>
    ),
  },
  {
    accessorKey: 'days',
    header: () => <p className='text-center'>Días</p>,
    cell: ({ row }) => <p className='text-center'>{formatDateRange(row.original.startDate, row.original.endDate)}</p>,
  },
  {
    accessorKey: 'type',
    header: () => <p className='text-center'>Tipo</p>,
    cell: ({ row }) => (
      <div className='text-center'>
        <Badge>{getJustificationTypeLabel(row.original.type)}</Badge>
      </div>
    ),
  },
  {
    accessorKey: 'documentLink',
    header: () => <p className='text-center'>Documentación</p>,
    cell: ({ row }) => (
      <div className='text-center'>
        {row.original.documentLink ? (
          <a
            className='text-blue-600 underline inline-flex items-center gap-1 justify-center mx-auto'
            href={row.original.documentLink}
            target='_blank'
            rel='noopener noreferrer'
          >
            <span>Ver</span>
            <SquareArrowOutUpRight className='size-4!' />
          </a>
        ) : (
          '-'
        )}
      </div>
    ),
  },
  {
    accessorKey: 'description',
    header: () => <p className='text-center'>Detalles</p>,
    cell: ({ row }) => (
      <div className='flex justify-center'>
        {row.original.description ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <FileQuestionMark className='size-5' />
            </TooltipTrigger>
            <TooltipContent>
              <p className='max-w-xs p-1'>{row.original.description}</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          '-'
        )}
      </div>
    ),
  },
  {
    id: 'actions',
    header: () => <p className='text-center'>Acciones</p>,
    cell: ({ row }) => <TableActions justification={row.original} />,
  },
];
