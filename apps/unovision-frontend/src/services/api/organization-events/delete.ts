import type { DeleteOrganizationEventResponse } from '@aeme/contracts';
import { invokeSupabaseFunction } from '@/client';

export async function deleteOrganizationEvent(organizationEventId: string) {
  return await invokeSupabaseFunction<DeleteOrganizationEventResponse>(`organization-events/${organizationEventId}`, {
    method: 'DELETE',
  });
}
