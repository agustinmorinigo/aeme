import type { GetEmployeesParams } from '@aeme/contracts';
import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';

export default function useGetEmployeesQuery(params: GetEmployeesParams) {
  const query = useQuery({
    queryKey: ['get-employees', params], // TO DO: ADD QUERY KEYS FACTORY.
    queryFn: () => api.attendance.get(params),
    enabled: !!params.organizationId,
    select: (data) => data.data.employees,
  });

  return query;
}
