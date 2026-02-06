import type { OrganizationEventType } from '@aeme/supabase-client/entities';
import { organizationEventTypeOptions } from '@/modules/organization-events/constants/organization-event-type-options';

export default function getOrganizationEventTypeLabel(organizationEventType: OrganizationEventType): string {
  return organizationEventTypeOptions.find((option) => option.value === organizationEventType)?.label ?? 'Desconocido';
}
