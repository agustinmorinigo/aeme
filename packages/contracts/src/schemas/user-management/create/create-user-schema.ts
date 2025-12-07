import { z } from 'zod';
import { doctorInfoSchema } from './doctor-info-schema.ts';
import { employeeInfoSchema } from './employee-info-schema.ts';
import { patientInfoSchema } from './patient-info-schema.ts';
import { userProfileSchema } from './user-profile-schema.ts';

export const createUserSchema = z.object({
  profile: userProfileSchema,
  organizationIds: z.array(z.uuid()).min(1, 'Se requiere al menos una organización'),
  roleIds: z.array(z.union([z.literal(1), z.literal(5)])).optional(),
  employeeData: employeeInfoSchema.optional(),
  patientData: patientInfoSchema.optional(),
  doctorData: doctorInfoSchema.optional(),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
