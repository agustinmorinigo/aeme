import { roles } from '@/shared/users/constants/roles';

export default function getRoleLabelById(roleId: number): string {
  const role = roles.find((role) => role.id === roleId);
  return role ? role.label : '-';
}
