import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';

export default function useGetEmployeeQuery(employeeId: string) {
  const query = useQuery({
    queryKey: ['get-employee', employeeId],
    queryFn: () => api.userManagement.getById(employeeId),
    enabled: !!employeeId,
    select: (data) => data.data,
  });

  return query;
}
