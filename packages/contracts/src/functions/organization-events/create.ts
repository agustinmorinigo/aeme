import type { CreateOrganizationEventSchema } from '../../schemas/organization-events/index.ts';

export type CreateOrganizationEventBody = CreateOrganizationEventSchema;

export interface CreateOrganizationEventResponse {
  message: string;
  organizationEventId: string;
}
