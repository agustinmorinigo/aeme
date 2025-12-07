import { z } from 'zod';
import { ContractType } from '../../../entities.ts';
import { onlyNumbersRegex } from '../../../utils/regexs/only-numbers-regex.ts';
import { employeeScheduleSchema } from './employee-schedule-schema.ts';

export const employeeInfoSchema = z.object({
  startDate: z.iso.date('Fecha de ingreso es requerida'),
  endDate: z.iso.date().optional(),
  cuil: z
    .string('CUIL es requerido')
    .trim()
    .min(6, 'Minímo 6 caracteres')
    .max(30, 'Máximo 30 caracteres')
    .regex(onlyNumbersRegex, 'Solo números'),
  contractType: z.enum(ContractType, {
    error: 'Tipo de contrato es requerido',
  }),
  netSalary: z
    .number('Salario neto es requerido')
    .min(0, 'El salario neto debe ser 0 o más')
    .max(999_999_999_999, 'El salario neto es demasiado alto')
    .refine((val) => Number.isFinite(val) && /^\d+(\.\d{1,2})?$/.test(val.toString()), {
      message: 'Salario neto debe tener hasta 2 decimales',
    }),
  schedules: z.array(employeeScheduleSchema).superRefine((schedules, ctx) => {
    // TODO: Remove this. This is useful for frontend only.
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
