import { z } from 'zod';

export const patientInfoSchema = z.object({
  healthInsuranceName: z
    .string('Nombre de la obra social es requerido')
    .trim()
    .min(1, 'Minímo 1 carácter')
    .max(60, 'Máximo 60 caracteres'),
});
