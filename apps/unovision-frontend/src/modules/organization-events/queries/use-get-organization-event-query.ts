import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';

export default function useGetOrganizationEventQuery(organizationEventId: string) {
  const query = useQuery({
    queryKey: ['get-organization-event', organizationEventId],
    queryFn: () => api.organizationEvents.getById(organizationEventId),
    enabled: !!organizationEventId,
    select: (data) => data.data,
  });

  return query;
}
