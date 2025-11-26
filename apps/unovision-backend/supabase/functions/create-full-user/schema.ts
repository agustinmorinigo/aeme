import { z } from 'https://deno.land/x/zod@v3.25/mod.ts';

export const createFullUserSchema = z.object({
  profile: z.object({
    name: z.string().min(1, 'Nombre requerido').max(80, 'Nombre muy largo'),
    lastName: z.string().min(1, 'Apellido requerido').max(80, 'Apellido muy largo'),
    documentType: z.string().min(1, 'Tipo de documento requerido'), // TO DO: Esto es un enum. Viene de common.
    documentValue: z.string().min(1, 'Número de documento requerido').max(30, 'Número de documento muy largo'),
    gender: z.string().min(1, 'Género requerido'), // TO DO: Esto es un enum. Viene de common.
    email: z.string().email('Email inválido'),
    phone: z.string().min(1, 'Teléfono requerido').max(30, 'Teléfono muy largo').optional(),
    address: z.string().min(1, 'Dirección requerida').max(150, 'Dirección muy larga').optional(),
    birthDate: z.string().date(), // The z.string().date() method validates strings in the format YYYY-MM-DD
  }),
  organizationIds: z.array(z.string().uuid()).min(1, 'Debe pertenecer al menos a una organización'),
  roleIds: z.array(z.number()).optional(),
  employeeData: z
    .object({
      startDate: z.string().date(),
      endDate: z.string().date().optional(),
      cuil: z.string().min(1, 'CUIL requerido').max(30, 'CUIL muy largo'),
      contractType: z.string().min(1, 'Tipo de contrato requerido'), // TO DO: Esto es un enum. Viene de common.
      netSalary: z
        .number()
        .positive('Salario neto debe ser positivo')
        .min(1, 'Salario neto debe ser positivo')
        .max(999_999_999_999, 'Salario neto muy alto')
        .refine((val) => Number.isFinite(val) && /^\d+(\.\d{1,2})?$/.test(val.toString()), {
          message: 'Salario neto debe tener hasta 2 decimales',
        }),
      schedules: z.array(
        z
          .object({
            // employeeId: z.string().uuid(),
            weekday: z.number().min(1).max(7),
            startTime: z.string().time({ precision: 0 }), // TODO: REVISAR Q ESTO ES HH:MM
            endTime: z.string().time({ precision: 0 }), // TODO: REVISAR Q ESTO ES HH:MM
            isRemote: z.boolean(),
            // CONSTRAINT "checkTimeOrder" CHECK (("endTime" > "startTime")),
          })
          .refine((data) => data.endTime > data.startTime, {
            // ESTO NO ANDA, PQ COMPARA STRING CON STRING. DEBEN SER HORAS.
            message: 'endTime debe ser mayor que startTime',
          }),
      ),
    })
    .optional(),
  patientData: z
    .object({
      healthInsuranceName: z
        .string()
        .min(1, 'Nombre de obra social requerido')
        .max(60, 'Nombre de obra social muy largo'),
    })
    .optional(),
  doctorData: z
    .object({
      isResident: z.boolean(),
    })
    .optional(),
});

export type CreateFullUserInput = z.infer<typeof createFullUserSchema>;
