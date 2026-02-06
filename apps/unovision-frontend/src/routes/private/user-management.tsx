import type { RoleName } from '@aeme/supabase-client/entities';
import { Navigate, type RouteObject } from 'react-router';
import RoleGuard from '@/guards/role-guard';
import getDefaultRouteByRole from '@/modules/roles/utils/get-default-route-by-role';
import { UserManagementPage } from '@/pages/user-management-page';

const allowedRoles: RoleName[] = ['admin'];

const userManagementRoutesConfig: RouteObject = {
  path: 'user-management',
  element: <RoleGuard allowedRoles={allowedRoles} />,
  children: [
    {
      index: true,
      element: <Navigate to='dashboard' replace />,
    },
    {
      path: 'dashboard',
      element: <UserManagementPage />,
    },
    {
      path: '*',
      element: <Navigate to={getDefaultRouteByRole()} replace />,
    },
  ],
};

export default userManagementRoutesConfig;
