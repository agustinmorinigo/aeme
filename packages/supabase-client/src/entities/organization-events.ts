export type OrganizationEventType =
  | 'holiday' // Feriado
  | 'workdayNoon' // Jornada laboral mediodía
  | 'earlyClosing' // Cierre anticipado
  | 'powerOutage' // Corte de luz
  | 'timeRecorderFailure' // Falla del reloj fichador
  | 'nonWorkingWeek' // Semana no laborable
  | 'specialEvent' // Evento especial
  | 'climateIssues' // Problemas climáticos
  | 'other'; // Otro

export interface OrganizationEvent {
  id: string;
  organizationId: string;
  type: OrganizationEventType;
  startDate: string; // ISO date string (YYYY-MM-DD)
  endDate: string | null; // ISO date string (YYYY-MM-DD)
  description: string | null;
  createdAt: string;
  updatedAt: string;
}
