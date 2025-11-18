import { Navigate } from 'react-router';
import useUserStore from '@/modules/auth/stores/use-user-store';
import getDefaultRouteByRole from '@/modules/roles/utils/get-default-route-by-role';

export default function ValidationPage() {
  const { selectedRole } = useUserStore();

  if (selectedRole) {
    return <Navigate to={getDefaultRouteByRole()} replace />;
  }

  return <p>Validando...</p>;
}
