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
    case 'admin':
      return '/user-management/dashboard';
    case 'employee':
      return '/employee';
    case 'patient':
      return '/patient';
    case 'doctor':
      return '/doctor';
    case 'accountant':
      return '/accounting/expenses';
    default:
      return '/login';
  }
}
