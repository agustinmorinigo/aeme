import { z } from 'zod';

export const doctorInfoSchema = z.object({
  isResident: z.boolean('Indica si el doctor es residente o no'),
});
