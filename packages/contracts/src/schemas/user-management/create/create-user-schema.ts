import { z } from 'zod';
// import { RoleName } from '../../../entities.ts';
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
// .refine(
//   (data) => {
//     if (data.roles.includes(RoleName.Employee)) return !!data.employeeData;
//     return true;
//   },
//   {
//     message: 'Debes completar la información del empleado',
//     path: ['employeeData'],
//   },
// )
// .refine(
//   (data) => {
//     if (data.roles.includes(RoleName.Patient)) return !!data.patientData;
//     return true;
//   },
//   {
//     message: 'Debes completar la información del paciente',
//     path: ['patientData'],
//   },
// )
// .refine(
//   (data) => {
//     if (data.roles.includes(RoleName.Doctor)) return !!data.doctorData;
//     return true;
//   },
//   {
//     message: 'Debes completar la información del doctor',
//     path: ['doctorData'],
//   },
// );

export type CreateUserSchema = z.infer<typeof createUserSchema>;
