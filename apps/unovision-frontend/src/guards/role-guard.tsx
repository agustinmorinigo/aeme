import { Navigate, Outlet } from 'react-router';
import type { RoleName } from '@/client/entities';
import useUserStore from '@/modules/auth/stores/use-user-store';
import getDefaultRouteByRole from '@/modules/roles/utils/get-default-route-by-role';

interface RoleGuardProps {
  allowedRoles: RoleName[];
}

export default function RoleGuard(props: RoleGuardProps) {
  const { allowedRoles } = props;
  const { selectedRole } = useUserStore();

  if (!selectedRole) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(selectedRole.name)) {
    return <Navigate to={getDefaultRouteByRole()} replace />;
  }

  return <Outlet />;
}
