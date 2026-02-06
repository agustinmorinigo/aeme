import type { JustificationType } from '@aeme/supabase-client/entities';

type JustificationTypeOption = {
  value: JustificationType;
  label: string;
  emoji: string;
};

export const justificationTypeOptions: JustificationTypeOption[] = [
  { value: 'vacation', label: 'Vacaciones', emoji: '🏖️' },
  { value: 'medical', label: 'Turno/Consulta médica', emoji: '🏥' },
  { value: 'illness', label: 'Enfermedad', emoji: '🤒' },
  { value: 'procedure', label: 'Trámite', emoji: '📋' },
  { value: 'education', label: 'Estudio/exámen académico', emoji: '📚' },
  { value: 'training', label: 'Capacitación/Cursos', emoji: '🎓' },
  { value: 'workAccident', label: 'Accidente laboral', emoji: '🚑' },
  { value: 'bloodDonation', label: 'Donación de sangre', emoji: '🩸' },
  { value: 'personal', label: 'Motivo personal', emoji: '👤' },
  { value: 'other', label: 'Otro', emoji: '📝' },
];
