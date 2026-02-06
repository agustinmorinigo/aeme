import type { UpdateOrganizationEventBody, UpdateOrganizationEventResponse } from '@aeme/contracts';
import { invokeSupabaseFunction } from '@/client';

export async function update(body: UpdateOrganizationEventBody) {
  return await invokeSupabaseFunction<UpdateOrganizationEventResponse>(
    `organization-events/${body.organizationEventId}`,
    {
      method: 'PUT',
      body,
    },
  );
}
