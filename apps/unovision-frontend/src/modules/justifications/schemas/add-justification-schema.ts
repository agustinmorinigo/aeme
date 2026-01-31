import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];

// TO DO: CAMBIAR COSAS DE ESTO A ZOD V4 Y MOVERLO A /CONTRACTS.
export const addJustificationSchema = z
  .object({
    employeeId: z.string().uuid({ message: 'Debe seleccionar un empleado' }),
    startDate: z.string().min(1, { message: 'La fecha de inicio es requerida' }),
    endDate: z.string().min(1, { message: 'La fecha de fin es requerida' }),
    isMultiDay: z.boolean(),
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
      ],
      {
        message: 'Debe seleccionar un tipo de justificación',
      },
    ),
    description: z.string().optional(),
    documentFile: z
      .instanceof(File)
      .optional()
      .refine(
        (file) => {
          if (!file) return true;
          return file.size <= MAX_FILE_SIZE;
        },
        { message: 'El archivo no debe superar los 5MB' },
      )
      .refine(
        (file) => {
          if (!file) return true;
          return ACCEPTED_FILE_TYPES.includes(file.type);
        },
        { message: 'Solo se aceptan archivos PDF, JPG o PNG' },
      ),
  })
  .refine(
    (data) => {
      const start = new Date(data.startDate);
      const end = new Date(data.endDate);
      return start <= end;
    },
    {
      message: 'La fecha de fin debe ser igual o posterior a la fecha de inicio',
      path: ['endDate'],
    },
  );

export type AddJustificationSchema = z.infer<typeof addJustificationSchema>;
