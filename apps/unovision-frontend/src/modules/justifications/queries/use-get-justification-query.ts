import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';

export default function useGetJustificationQuery(justificationId: string) {
  const query = useQuery({
    queryKey: ['get-justification', justificationId],
    queryFn: () => api.attendance.justifications.getById(justificationId),
    enabled: !!justificationId,
    select: (data) => data.data,
  });

  return query;
}
