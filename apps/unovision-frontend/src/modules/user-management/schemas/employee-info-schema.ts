import { z } from 'zod';
import { ContractType } from '@/client/entities';

export const scheduleSchema = z
  .object({
    weekday: z.number().min(1, 'Día de la semana inválido').max(7, 'Día de la semana inválido'),
    startTime: z.iso.time({ precision: -1, error: 'Hora de inicio es requerida' }),
    endTime: z.iso.time({ precision: -1, error: 'Hora de fin es requerida' }),
    isRemote: z.boolean(),
    isActive: z.boolean().default(true),
  })
  .refine((data) => data.endTime > data.startTime, {
    message: 'La hora de fin debe ser mayor que la hora de inicio',
    path: ['endTime'],
  });

export const employeeInfoSchema = z.object({
  startDate: z.iso.date('Fecha de ingreso es requerida'),
  cuil: z
    .string('CUIL es requerido')
    .trim()
    .min(6, 'Minímo 6 caracteres')
    .max(30, 'Máximo 30 caracteres')
    .regex(/^[0-9]+$/, 'Solo números'),
  contractType: z.enum(ContractType, {
    error: 'Tipo de contrato es requerido',
  }),
  netSalary: z
    .number('Salario neto es requerido')
    .min(0, 'El salario neto debe ser 0 o más')
    .max(999_999_999_999, 'El salario neto es demasiado alto'),
  schedules: z.array(scheduleSchema).superRefine((schedules, ctx) => {
    const activeCount = schedules.filter((s) => s.isActive).length;
    if (activeCount < 5) {
      ctx.addIssue({
        code: 'custom',
        message: 'Se requieren al menos 5 horarios activos',
        path: [],
      });
    }
  }),
});
