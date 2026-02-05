import type { JustificationType } from '@aeme/supabase-client/entities';
import { justificationTypeOptions } from '@/modules/justifications/constants/justification-type-options';

export default function getJustificationTypeLabel(justificationType: JustificationType): string {
  return justificationTypeOptions.find((option) => option.value === justificationType)?.label ?? 'Desconocido';
}
