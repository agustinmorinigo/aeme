import { lazy, Suspense } from "react"
import { Navigate, type RouteObject } from "react-router"
import { RoleName } from "@/client/entities"
import RoleGuard from "@/guards/role-guard"
import getDefaultRouteByRole from "@/modules/roles/utils/get-default-route-by-role"

const AttendancePage = lazy(() => import("@/pages/attendance-page"))

const allowedRoles = [RoleName.Admin, RoleName.Accountant];

const attendanceRoutesConfig: RouteObject = {
  path: "attendance",
  element: <RoleGuard allowedRoles={allowedRoles} />,
  children: [
    {
      index: true,
      element: <Navigate to="report" replace />,
    },
    {
      path: "report",
      element: (
        <Suspense fallback={<div>Cargando...</div>}>
          <AttendancePage />
        </Suspense>
      ),
    },
    {
      path: "*",
      element: <Navigate to={getDefaultRouteByRole()} replace />,
    },
  ],
}

export default attendanceRoutesConfig
