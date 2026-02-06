import type { OrganizationEvent } from '@aeme/supabase-client/entities';
import { Badge, Tooltip, TooltipContent, TooltipTrigger } from '@aeme/ui';
import { CircleQuestionMark } from '@aeme/ui/icons';
import type { ColumnDef } from '@tanstack/react-table';
import TableActions from '@/modules/organization-events/components/organization-events-table/actions';
import getOrganizationEventTypeLabel from '@/modules/organization-events/utils/get-organization-event-type-label';
import formatDateRange from '@/utils/date/format-date-range';

export const columns: ColumnDef<OrganizationEvent>[] = [
  {
    accessorKey: 'type',
    header: () => <p className='text-center'>Tipo</p>,
    cell: ({ row }) => (
      <div className='text-center'>
        <Badge>{getOrganizationEventTypeLabel(row.original.type)}</Badge>
      </div>
    ),
  },
  {
    accessorKey: 'dates',
    header: () => <p className='text-center'>Fechas</p>,
    cell: ({ row }) => <p className='text-center'>{formatDateRange(row.original.startDate, row.original.endDate)}</p>,
  },
  {
    accessorKey: 'description',
    header: () => <p className='text-center'>Detalles</p>,
    cell: ({ row }) => (
      <div className='flex justify-center'>
        {row.original.description ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <CircleQuestionMark className='size-5' />
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
    cell: ({ row }) => <TableActions organizationEvent={row.original} />,
  },
];
