import { createBrowserRouter, Navigate } from 'react-router';
import PrivateGuard from '@/guards/private-guard';
import PublicGuard from '@/guards/public-guard';
import privateRoutes from '@/routes/private';
import publicRoutes from '@/routes/public';

const router = createBrowserRouter([
  {
    element: <PublicGuard />,
    children: publicRoutes,
  },
  {
    element: <PrivateGuard />,
    children: privateRoutes,
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
]);

export default router;
