import type { JustificationItem } from '@aeme/contracts';
import type { ColumnDef } from '@tanstack/react-table';
import getFormattedUserDocument from '@/shared/users/utils/get-formatted-user-document';

export const columns: ColumnDef<JustificationItem>[] = [
  {
    accessorKey: 'name',
    header: () => <p className='text-center'>Nombre</p>,
    cell: ({ row }) => <p className='capitalize text-center'>{row.original.employee.profile.name}</p>,
  },
  {
    accessorKey: 'lastName',
    header: () => <p className='text-center'>Apellido</p>,
    cell: ({ row }) => <p className='text-center'>{row.original.employee.profile.lastName}</p>,
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
    header: () => <p className='text-center'>Días de la justificación</p>,
    cell: ({ row }) => <p className='text-center'>{row.original.days.join(', ')}</p>, // TO REVIEW.
  },
  {
    accessorKey: 'type',
    header: () => <p className='text-center'>Tipo de justificación</p>,
    cell: ({ row }) => <p className='text-center capitalize'>{row.original.type}</p>,
  },
  {
    accessorKey: 'documentLink',
    header: () => <p className='text-center'>Documentación</p>,
    cell: ({ row }) => (
      <a
        className='text-center text-blue-600 underline'
        href={row.original.documentLink}
        target='_blank'
        rel='noopener noreferrer'
      >
        Ver documento
      </a>
    ),
  },
  {
    accessorKey: 'description',
    header: () => <p className='text-center'>Detalles</p>,
    cell: ({ row }) => <p className='text-center'>{row.original.description}</p>,
  },
  {
    id: 'actions',
    header: () => <p className='text-center'>Acciones</p>,
    // cell: ({ row }) => <TableActions user={row.original} />,
    cell: () => <p>Actions</p>,
  },
];
