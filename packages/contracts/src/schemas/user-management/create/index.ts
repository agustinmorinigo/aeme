import { z } from 'zod';
import { doctorInfoSchema } from './doctor-info-schema';
import { employeeInfoSchema } from './employee-info-schema';
import { patientInfoSchema } from './patient-info-schema';
import { userProfileSchema } from './user-profile-schema';

export const createUserSchema = z.object({
  profile: userProfileSchema,
  organizationIds: z.array(z.uuid()).min(1, 'Se requiere al menos una organización'),
  roleIds: z.array(z.number()).optional(), // VALIDAR Q SOLO PUEDAN ENVIAR 1 O 5, PQ LOS OTROS ROLES SE LOS AGREGA LA DB FUNC. TiENE Q SER ENUM. NOSE SI ES ROLE ID O ROLES, VER ESO...
  employeeData: employeeInfoSchema.optional(),
  patientData: patientInfoSchema.optional(),
  doctorData: doctorInfoSchema.optional(),
});
// .refine(
//   (data) => {
//     if (data.roles.includes(RoleName.Employee)) return !!data.employeeInfo;
//     return true;
//   },
//   {
//     message: 'Debes completar la información del empleado',
//     path: ['employeeInfo'],
//   },
// )
// .refine(
//   (data) => {
//     if (data.roles.includes(RoleName.Patient)) return !!data.patientInfo;
//     return true;
//   },
//   {
//     message: 'Debes completar la información del paciente',
//     path: ['patientInfo'],
//   },
// )
// .refine(
//   (data) => {
//     if (data.roles.includes(RoleName.Doctor)) return !!data.doctorInfo;
//     return true;
//   },
//   {
//     message: 'Debes completar la información del doctor',
//     path: ['doctorInfo'],
//   },
// );

export type CreateUserSchema = z.infer<typeof createUserSchema>;
