import type { ColumnDef } from '@tanstack/react-table';
import TableActions from '@/modules/user-management/components/user-management-table/actions';
import type { User } from '@/shared/users/types';
import getFormattedUserDocument from '@/shared/users/utils/get-formatted-user-document';
import getFormattedUserFullName from '@/shared/users/utils/get-formatted-user-full-name';
import getFormattedUserPhone from '@/shared/users/utils/get-formatted-user-phone';
import getFormattedUserRoles from '@/shared/users/utils/get-formatted-user-roles';

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'document',
    header: () => <p className="text-center">Doc</p>,
    cell: ({ row }) => <p className="uppercase text-center">{getFormattedUserDocument(row.original.profile)}</p>,
  },
  {
    accessorKey: 'fullName',
    header: () => <p className="text-center">Nombre y Apellido</p>,
    cell: ({ row }) => <p className="capitalize text-center">{getFormattedUserFullName(row.original.profile)}</p>,
  },
  {
    accessorKey: 'email',
    header: () => <p className="text-center">Email</p>,
    cell: ({ row }) => <p className="text-center">{row.original.profile.email}</p>,
  },
  {
    accessorKey: 'phone',
    header: () => <p className="text-center">Teléfono</p>,
    cell: ({ row }) => <p className="text-center">{getFormattedUserPhone(row.original.profile)}</p>,
  },
  {
    accessorKey: 'roles',
    header: () => <p className="text-center">Roles</p>,
    cell: ({ row }) => <p className="capitalize text-center">{getFormattedUserRoles(row.original.roles)}</p>,
  },
  {
    id: 'actions',
    header: () => <p className="text-center">Acciones</p>,
    cell: ({ row }) => <TableActions user={row.original} />,
  },
];
