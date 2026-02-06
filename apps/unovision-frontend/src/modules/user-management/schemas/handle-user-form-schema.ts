import { createUserSchema } from '@aeme/contracts';
import { roleNameValues } from '@aeme/supabase-client/entities';
import { z } from 'zod';

export const handleUserFormSchema = createUserSchema
  .omit({
    roleIds: true,
  })
  .extend({
    roles: z
      .array(
        z.object({
          value: z.enum(roleNameValues),
          id: z.number(),
        }),
      )
      .min(1, 'Se requiere al menos un rol'),
  })
  .refine(
    (data) => {
      if (data.roles.some((role) => role.value === 'employee')) return !!data.employeeData;
      return true;
    },
    {
      message: 'Debes completar la informaci\u00f3n del empleado',
      path: ['employeeData'],
    },
  )
  .refine(
    (data) => {
      if (data.roles.some((role) => role.value === 'patient')) return !!data.patientData;
      return true;
    },
    {
      message: 'Debes completar la informaci\u00f3n del paciente',
      path: ['patientData'],
    },
  )
  .refine(
    (data) => {
      if (data.roles.some((role) => role.value === 'doctor')) return !!data.doctorData;
      return true;
    },
    {
      message: 'Debes completar la informaci\u00f3n del doctor',
      path: ['doctorData'],
    },
  );

export type HandleUserFormSchema = z.infer<typeof handleUserFormSchema>;
