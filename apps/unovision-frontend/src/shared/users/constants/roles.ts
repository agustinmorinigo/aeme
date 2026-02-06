import type { Role, RoleName } from '@aeme/supabase-client/entities';
import type { OptionWithDescription } from '@/shared/types';

type RoleWithLabel = Role & {
  label: string;
};

export const roles: RoleWithLabel[] = [
  {
    id: 1,
    name: 'admin',
    label: 'Administrador',
    description: 'Administra los usuarios del sistema',
  },
  {
    id: 2,
    name: 'employee',
    label: 'Empleado',
    description: 'Cualquier empleado al que se le controla asistencia',
  },
  {
    id: 3,
    name: 'patient',
    label: 'Paciente',
    description: 'Usuario que recibe atenci\u00f3n m\u00e9dica',
  },
  {
    id: 4,
    name: 'doctor',
    label: 'Doctor',
    description: 'Profesional m\u00e9dico que atiende consultas o ciruj\u00edas. Aplica a residentes',
  },
  {
    id: 5,
    name: 'accountant',
    label: 'Contador',
    description: 'Maneja la gesti\u00f3n financiera, contable y asistencia',
  },
];

export const rolesAsOptions: OptionWithDescription<RoleName>[] = roles.map((role) => ({
  id: role.id,
  value: role.name,
  label: role.label,
  description: role.description || '',
}));
