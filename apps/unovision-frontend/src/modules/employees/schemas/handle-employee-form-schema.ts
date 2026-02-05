import { createUserSchema } from '@aeme/contracts';
import type { z } from 'zod';

/**
 * Schema for creating/editing employees.
 * Similar to handleUserFormSchema but without roles field.
 * Employee role is always assigned automatically.
 */
export const handleEmployeeFormSchema = createUserSchema.omit({
  roleIds: true,
  patientData: true,
  doctorData: true,
});

export type HandleEmployeeFormSchema = z.infer<typeof handleEmployeeFormSchema>;
