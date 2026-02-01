import { isBefore, parseISO } from 'date-fns';
import { z } from 'zod';

// Schema for updating a justification. Trtar de unificar lo que más se pueda con el create!!!!!!!!!!!!
// No podemos usar .omit() sobre createJustificationSchema porque tiene refinements
export const updateJustificationSchema = z
  .object({
    justificationId: z.uuid({ message: 'El ID de la justificación es obligatorio y debe ser un UUID válido' }),
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
  .refine((data) => !data.endDate || !isBefore(parseISO(data.endDate), parseISO(data.startDate)), {
    message: 'La fecha de fin debe ser posterior a la fecha de inicio',
    path: ['endDate'],
  });

export type UpdateJustificationSchema = z.infer<typeof updateJustificationSchema>;
