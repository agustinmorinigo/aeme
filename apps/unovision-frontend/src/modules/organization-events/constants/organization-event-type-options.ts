import type { OrganizationEventType } from '@aeme/supabase-client/entities';

type OrganizationEventTypeOption = {
  value: OrganizationEventType;
  label: string;
  emoji: string;
};

export const organizationEventTypeOptions: OrganizationEventTypeOption[] = [
  { value: 'holiday', label: 'Feriado', emoji: '🎉' },
  { value: 'workdayNoon', label: 'Medio día laboral', emoji: '⏱️' },
  { value: 'earlyClosing', label: 'Cierre temprano', emoji: '⏰' },
  { value: 'powerOutage', label: 'Corte de luz', emoji: '⚡' },
  { value: 'timeRecorderFailure', label: 'Falla del fichador', emoji: '🔧' },
  { value: 'nonWorkingWeek', label: 'Semana no laborable', emoji: '📅' },
  { value: 'specialEvent', label: 'Evento especial', emoji: '🎊' },
  { value: 'climateIssues', label: 'Problemas climáticos', emoji: '🌧️' },
  { value: 'other', label: 'Otro', emoji: '🔖' },
];
