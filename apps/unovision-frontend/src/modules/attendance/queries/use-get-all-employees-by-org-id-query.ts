import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import type { ReportEmployee } from '@/modules/attendance/types/report-employee';
import api from '@/services/api';

export default function useGetAllEmployeesByOrgId(orgId: string): UseQueryResult<ReportEmployee[], Error> {
  const query = useQuery({
    queryKey: ['get-employees', orgId],
    queryFn: () => api.employees.getAllByOrgId(orgId),
    enabled: !!orgId,
    select(data) {
      return data.map((employee) => ({
        id: employee.id,
        netSalary: employee.netSalary,
        schedules: employee.employeeSchedules,
        profile: {
          id: employee.profileId,
          documentType: employee.profile.documentType,
          documentValue: employee.profile.documentValue,
          name: employee.profile.name,
          lastName: employee.profile.lastName,
          email: employee.profile.email,
        },
      }));
    },
  });

  return query;
}
