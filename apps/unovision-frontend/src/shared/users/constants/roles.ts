import { type Role, RoleName } from '@/client/entities';
import type { OptionWithDescription } from '@/shared/types';

type RoleWithLabel = Role & {
  label: string;
};

export const roles: RoleWithLabel[] = [
  {
    id: 1,
    name: RoleName.Admin,
    label: 'Administrador',
    description: 'Administra los usuarios del sistema',
  },
  {
    id: 2,
    name: RoleName.Employee,
    label: 'Empleado',
    description: 'Cualquier empleado al que se le controla asistencia',
  },
  {
    id: 3,
    name: RoleName.Patient,
    label: 'Paciente',
    description: 'Usuario que recibe atención médica',
  },
  {
    id: 4,
    name: RoleName.Doctor,
    label: 'Doctor',
    description: 'Profesional médico que atiende consultas o cirujías. Aplica a residentes',
  },
  {
    id: 5,
    name: RoleName.Accountant,
    label: 'Contador',
    description: 'Maneja la gestión financiera, contable y asistencia',
  },
];

export const rolesAsOptions: OptionWithDescription<RoleName>[] = roles.map((role) => ({
  value: role.name,
  label: role.label,
  description: role.description || '',
}));
