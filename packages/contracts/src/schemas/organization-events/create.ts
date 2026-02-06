import { isAfter, parseISO } from 'date-fns';
import { z } from 'zod';

export const createOrganizationEventSchema = z
  .object({
    organizationId: z.uuid({ message: 'Debe seleccionar una organizacion' }),
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
  .refine((data) => !data.endDate || isAfter(parseISO(data.endDate), parseISO(data.startDate)), {
    message: 'La fecha de fin debe ser posterior a la fecha de inicio',
    path: ['endDate'],
  });

export type CreateOrganizationEventSchema = z.infer<typeof createOrganizationEventSchema>;
