import type { GetJustificationsParams } from '@aeme/contracts';
import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';

export default function useGetJustificationsQuery(params: GetJustificationsParams) {
  const query = useQuery({
    queryKey: ['get-justifications', params], // TODO: Add query factories.
    queryFn: () => api.attendance.justifications.get(params),
    select: (data) => data.data,
  });

  return query;
}
