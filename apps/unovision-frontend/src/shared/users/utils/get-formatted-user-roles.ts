import type { Role } from '@/client/entities';
import getRoleLabelById from '@/shared/users/utils/get-role-label-by-id';

export default function getFormattedUserRoles(roles: Role[]): string {
  if (roles.length === 0) {
    return '-';
  }

  return roles.map((role) => getRoleLabelById(role.id)).join(', ');
}
