import { RoleName } from '@/client/entities';
import useUserStore from '@/modules/auth/stores/use-user-store';

export default function getDefaultRouteByRole(): string {
  const { isAuthenticated, selectedRole } = useUserStore.getState();

  if (!isAuthenticated) {
    return '/login';
  }

  if (!selectedRole) {
    return '/validation';
  }

  switch (selectedRole?.name) {
    case RoleName.Admin:
      return '/user-management/dashboard';
    case RoleName.Employee:
      return '/employee';
    case RoleName.Patient:
      return '/patient';
    case RoleName.Doctor:
      return '/doctor';
    case RoleName.Accountant:
      return '/accounting/expenses';
    default:
      return '/login';
  }
}
