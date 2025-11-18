import { Navigate, Outlet } from 'react-router';
import useUserStore from '@/modules/auth/stores/use-user-store';
import getDefaultRouteByRole from '@/modules/roles/utils/get-default-route-by-role';

export default function PublicGuard() {
  const { isAuthenticated } = useUserStore();

  if (isAuthenticated) {
    return <Navigate to={getDefaultRouteByRole()} replace />;
  }

  return <Outlet />;
}
