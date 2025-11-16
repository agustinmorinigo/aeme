import { Navigate, type RouteObject } from 'react-router';
import getDefaultRouteByRole from '@/modules/roles/utils/get-default-route-by-role';
import ValidationPage from '@/pages/validation-page';
import accountingRoutesConfig from '@/routes/private/accounting';
import attendanceRoutesConfig from '@/routes/private/attendance';
import userManagementRoutesConfig from '@/routes/private/user-management';

const privateRoutes: RouteObject[] = [
  accountingRoutesConfig,
  userManagementRoutesConfig,
  attendanceRoutesConfig,
  {
    path: 'validation',
    element: <ValidationPage />,
  },
  {
    path: '*',
    element: <Navigate to={getDefaultRouteByRole()} replace />,
  },
];

export default privateRoutes;
