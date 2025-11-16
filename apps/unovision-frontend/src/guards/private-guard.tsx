import { Navigate } from 'react-router';
import UserOrganizationsGuard from '@/guards/user-organizations-guard';
import useUserStore from '@/modules/auth/stores/use-user-store';

export default function PrivateGuard() {
  const { isAuthenticated, userId } = useUserStore();

  if (!isAuthenticated || !userId) {
    return <Navigate to="/login" replace />;
  }

  return <UserOrganizationsGuard userId={userId} />;
}
