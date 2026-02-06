import { isBefore, parseISO } from 'date-fns';
import { z } from 'zod';

export const updateOrganizationEventSchema = z
  .object({
    organizationEventId: z.uuid({ message: 'El ID del evento es obligatorio y debe ser un UUID valido' }),
    type: z.enum(
      [
        'holiday',
        'workdayNoon',
        'earlyClosing',
        'powerOutage',
        'timeRecorderFailure',
        'nonWorkingWeek',
        'specialEvent',
        'climateIssues',
        'other',
      ],
      {
        message: 'El tipo de evento es obligatorio',
      },
    ),
    startDate: z.iso.date({ message: 'Fecha de inicio obligatoria' }),
    endDate: z.iso.date({ message: 'Fecha de fin obligatoria' }).optional(),
    description: z.string().max(200, { message: 'La descripcion no puede exceder 200 caracteres' }).optional(),
  })
  .refine((data) => !data.endDate || !isBefore(parseISO(data.endDate), parseISO(data.startDate)), {
    message: 'La fecha de fin debe ser posterior a la fecha de inicio',
    path: ['endDate'],
  });

export type UpdateOrganizationEventSchema = z.infer<typeof updateOrganizationEventSchema>;
