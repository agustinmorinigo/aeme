import type { GetOrganizationEventByIdResponse } from '@aeme/contracts';
import { invokeSupabaseFunction } from '@/client';

export async function getById(organizationEventId: string) {
  return await invokeSupabaseFunction<GetOrganizationEventByIdResponse>(`organization-events/${organizationEventId}`, {
    method: 'GET',
  });
}
