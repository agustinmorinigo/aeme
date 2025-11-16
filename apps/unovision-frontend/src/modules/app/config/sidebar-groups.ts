import { ChartNoAxesCombined, ListChecks, type LucideIcon, NotepadText, Receipt, UserRoundCog } from 'lucide-react';
import { RoleName } from '@/client/entities';

interface SidebarGroup {
  label: string;
  allowedRoles: RoleName[];
  items: {
    label: string;
    path: string;
    icon: LucideIcon;
  }[];
}

const sidebarGroups: SidebarGroup[] = [
  {
    label: 'Contabilidad',
    allowedRoles: [RoleName.Accountant],
    items: [
      {
        label: 'Gastos',
        path: '/accounting/expenses',
        icon: Receipt,
      },
      {
        label: 'Vencimientos',
        path: '/accounting/expirations',
        icon: NotepadText,
      },
      {
        label: 'Estadísticas',
        path: '/accounting/statistics',
        icon: ChartNoAxesCombined,
      },
    ],
  },
  {
    label: 'Gestión de usuarios',
    allowedRoles: [RoleName.Admin],
    items: [
      {
        label: 'Usuarios',
        path: '/user-management/dashboard',
        icon: UserRoundCog,
      },
    ],
  },
  {
    label: 'Asistencia',
    allowedRoles: [RoleName.Admin, RoleName.Accountant],
    items: [
      {
        label: 'Reporte',
        path: '/attendance/report',
        icon: ListChecks,
      },
    ],
  },
];

export const getSidebarGroupsByRole = (roleName: RoleName) => {
  return sidebarGroups.filter((group) => group.allowedRoles.includes(roleName));
};
