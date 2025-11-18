import { z } from 'zod';
import { DocumentType, Gender, RoleName } from '@/client/entities';
import { doctorInfoSchema } from '@/modules/user-management/schemas/doctor-info-schema';
import { employeeInfoSchema } from '@/modules/user-management/schemas/employee-info-schema';
import { patientInfoSchema } from '@/modules/user-management/schemas/patient-info-schema';

export const handleUserFormSchema = z
  // Personal info.
  .object({
    name: z
      .string('Nombre es requerido')
      .trim()
      .min(2, 'Minímo 2 caracteres')
      .max(80, 'Máximo 80 caracteres')
      .regex(/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+$/, 'Solo letras'),
    lastName: z
      .string('Apellido es requerido')
      .trim()
      .min(2, 'Minímo 2 caracteres')
      .max(80, 'Máximo 80 caracteres')
      .regex(/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+$/, 'Solo letras'),
    documentType: z.enum(DocumentType, { error: 'Tipo de documento es requerido' }),
    documentValue: z
      .string('Número de documento es requerido')
      .trim()
      .min(6, 'Minímo 6 caracteres')
      .max(30, 'Máximo 30 caracteres')
      .regex(/^[0-9]+$/, 'Solo números'),
    gender: z.enum(Gender, { error: 'Género es requerido' }),
    email: z.email('Correo electrónico inválido').trim().max(150, 'Máximo 150 caracteres'),
    phone: z
      .string()
      .trim()
      .max(30, 'Máximo 30 caracteres')
      .regex(/^[0-9]+$/, 'Solo números')
      .optional(),
    address: z.string().trim().max(150, 'Máximo 150 caracteres').optional(),
    birthDate: z.iso.date('Fecha de nacimiento es requerida'),
    // Organizations.
    organizationIds: z.array(z.string()).min(1, 'Se requiere al menos una organización'),
    // Roles.
    roles: z.array(z.enum(RoleName)).min(1, 'Se requiere al menos un rol'),
    // Conditional subforms.
    employeeInfo: employeeInfoSchema.optional(),
    patientInfo: patientInfoSchema.optional(),
    doctorInfo: doctorInfoSchema.optional(),
  })
  .refine(
    (data) => {
      if (data.roles.includes(RoleName.Employee)) return !!data.employeeInfo;
      return true;
    },
    {
      message: 'Debes completar la información del empleado',
      path: ['employeeInfo'],
    },
  )
  .refine(
    (data) => {
      if (data.roles.includes(RoleName.Patient)) return !!data.patientInfo;
      return true;
    },
    {
      message: 'Debes completar la información del paciente',
      path: ['patientInfo'],
    },
  )
  .refine(
    (data) => {
      if (data.roles.includes(RoleName.Doctor)) return !!data.doctorInfo;
      return true;
    },
    {
      message: 'Debes completar la información del doctor',
      path: ['doctorInfo'],
    },
  );

export type HandleUserFormSchema = z.infer<typeof handleUserFormSchema>;
