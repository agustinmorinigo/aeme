import { isAfter, parseISO } from 'date-fns';
import { z } from 'zod';

export const createJustificationSchema = z
  .object({
    employeeId: z.uuid({ message: 'Debe seleccionar un empleado' }),
    organizationId: z.uuid({ message: 'Debe seleccionar una organización' }),
    startDate: z.iso.date({ message: 'Fecha de inicio obligatoria' }),
    endDate: z.iso.date({ message: 'Fecha de fin obligatoria' }).optional(),
    type: z.enum(
      [
        'medical',
        'illness',
        'procedure',
        'education',
        'training',
        'workAccident',
        'bloodDonation',
        'personal',
        'other',
        'vacation',
      ],
      {
        message: 'El tipo de justificación es obligatorio',
      },
    ),
    description: z.string().max(200, { message: 'La descripción no puede exceder 200 caracteres' }).optional(),
    documentLink: z.url({ message: 'El link del documento debe ser una URL válida' }).optional(),
  })
  .refine((data) => !data.endDate || isAfter(parseISO(data.endDate), parseISO(data.startDate)), {
    message: 'La fecha de fin debe ser posterior a la fecha de inicio',
    path: ['endDate'],
  });

export type CreateJustificationSchema = z.infer<typeof createJustificationSchema>;
