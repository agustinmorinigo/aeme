import type { CreateOrganizationEventBody, CreateOrganizationEventResponse } from '@aeme/contracts';
import { invokeSupabaseFunction } from '@/client';

export async function create(body: CreateOrganizationEventBody) {
  return await invokeSupabaseFunction<CreateOrganizationEventResponse>('organization-events', {
    method: 'POST',
    body,
  });
}
