import type { GetUsersParams } from '@aeme/contracts';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import api from '@/services/api';

export default function useGetUsersQuery(params: GetUsersParams) {
  const query = useQuery({
    queryKey: ['get-users', params], // TODO: Add query factories.
    queryFn: () => api.userManagement.get(params),
    select: (data) => data.data,
    placeholderData: keepPreviousData,
  });

  return query;
}
