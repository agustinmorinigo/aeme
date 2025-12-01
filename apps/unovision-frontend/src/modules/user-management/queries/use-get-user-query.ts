import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';

export default function useGetUserQuery(userId: string) {
  const query = useQuery({
    queryKey: ['get-user', userId],
    queryFn: () => api.userManagement.getById(userId),
    enabled: !!userId,
    select: (data) => data.data,
  });

  return query;
}
