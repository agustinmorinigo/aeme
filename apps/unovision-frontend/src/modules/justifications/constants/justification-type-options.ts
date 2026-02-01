import type { JustificationType } from '@aeme/supabase-client/entities';

type JustificationTypeOption = {
  value: JustificationType;
  label: string;
};

export const justificationTypeOptions: JustificationTypeOption[] = [
  { value: 'vacation', label: 'Vacaciones' },
  { value: 'medical', label: 'Turno/Consulta médica' },
  { value: 'illness', label: 'Enfermedad' },
  { value: 'procedure', label: 'Trámite' },
  { value: 'education', label: 'Estudio/exámen académico' },
  { value: 'training', label: 'Capacitación/Cursos' },
  { value: 'workAccident', label: 'Accidente laboral' },
  { value: 'bloodDonation', label: 'Donación de sangre' },
  { value: 'personal', label: 'Motivo personal' },
  { value: 'other', label: 'Otro' },
];
