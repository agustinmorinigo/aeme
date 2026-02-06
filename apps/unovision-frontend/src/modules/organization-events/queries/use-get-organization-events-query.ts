import type { GetOrganizationEventsParams } from '@aeme/contracts';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import api from '@/services/api';

export default function useGetOrganizationEventsQuery(params: GetOrganizationEventsParams) {
  const query = useQuery({
    queryKey: ['get-organization-events', params],
    queryFn: () => api.organizationEvents.get(params),
    select: (data) => data.data,
    placeholderData: keepPreviousData,
  });

  return query;
}
