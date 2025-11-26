import { z } from 'zod';

export const employeeScheduleSchema = z
  .object({
    weekday: z.number().min(1, 'Día de la semana inválido').max(7, 'Día de la semana inválido'),
    startTime: z.iso.time({ precision: -1, error: 'Hora de inicio es requerida' }),
    endTime: z.iso.time({ precision: -1, error: 'Hora de fin es requerida' }),
    isRemote: z.boolean(),
    isActive: z.boolean().default(true), // mmmm este no va creo, pq es solo para el frontend.
  })
  .refine((data) => data.endTime > data.startTime, {
    message: 'La hora de fin debe ser mayor que la hora de inicio',
    path: ['endTime'],
  });
