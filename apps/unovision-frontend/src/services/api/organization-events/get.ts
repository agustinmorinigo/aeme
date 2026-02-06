import type { GetOrganizationEventsParams, GetOrganizationEventsResponse } from '@aeme/contracts';
import { invokeSupabaseFunction } from '@/client';

export async function get(params: GetOrganizationEventsParams) {
  return invokeSupabaseFunction<GetOrganizationEventsResponse>('organization-events', {
    method: 'GET',
    params,
  });
}
