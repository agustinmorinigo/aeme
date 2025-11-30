import { createUserSchema } from '@aeme/contracts';
import { RoleName } from '@aeme/supabase-client/entities';
import { z } from 'zod';

// TODO ESTO DEBE VENIR DE CONTRACTS DIRECTAMNTE. ARREGLARLO MÁS ADLEANTE.
export const handleUserFormSchema = createUserSchema
  .omit({
    roleIds: true,
  })
  .extend({
    roles: z
      .array(
        z.object({
          value: z.enum(RoleName),
          id: z.number(),
        }),
      )
      .min(1, 'Se requiere al menos un rol'),
  })
  .refine(
    (data) => {
      if (data.roles.some((role) => role.value === RoleName.Employee)) return !!data.employeeData;
      return true;
    },
    {
      message: 'Debes completar la información del empleado',
      path: ['employeeData'],
    },
  )
  .refine(
    (data) => {
      if (data.roles.some((role) => role.value === RoleName.Patient)) return !!data.patientData;
      return true;
    },
    {
      message: 'Debes completar la información del paciente',
      path: ['patientData'],
    },
  )
  .refine(
    (data) => {
      if (data.roles.some((role) => role.value === RoleName.Doctor)) return !!data.doctorData;
      return true;
    },
    {
      message: 'Debes completar la información del doctor',
      path: ['doctorData'],
    },
  );

export type HandleUserFormSchema = z.infer<typeof handleUserFormSchema>;
