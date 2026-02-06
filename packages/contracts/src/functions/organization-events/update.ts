import type { UpdateOrganizationEventSchema } from '../../schemas/organization-events/index.ts';

export type UpdateOrganizationEventBody = UpdateOrganizationEventSchema;

export interface UpdateOrganizationEventResponse {
  message: string;
  organizationEventId: string;
}
