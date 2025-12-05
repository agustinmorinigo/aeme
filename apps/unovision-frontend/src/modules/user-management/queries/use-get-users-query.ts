import type { GetUsersParams } from '@aeme/contracts';
import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';

export default function useGetUsersQuery(params: GetUsersParams) {
  const query = useQuery({
    queryKey: ['get-users', params], // TODO: Add query factories.
    queryFn: () => api.userManagement.get(params),
    select: (data) => data.data,
  });

  return query;
}
