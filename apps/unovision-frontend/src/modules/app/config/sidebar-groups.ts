import type { RoleName } from '@aeme/supabase-client/entities';
import { ChartNoAxesCombined, ListChecks, type LucideIcon, NotepadText, Receipt, UserRoundCog } from '@aeme/ui/icons';

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
    allowedRoles: ['accountant'],
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
        label: 'Estad\u00edsticas',
        path: '/accounting/statistics',
        icon: ChartNoAxesCombined,
      },
    ],
  },
  {
    label: 'Gesti\u00f3n de usuarios',
    allowedRoles: ['admin'],
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
    allowedRoles: ['admin', 'accountant'],
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
