import { z } from 'zod';
import { onlyLettersRegex } from '../../../utils/regexs/only-letters-regex';
import { onlyNumbersRegex } from '../../../utils/regexs/only-numbers-regex';

export const userProfileSchema = z.object({
  name: z
    .string('Nombre es requerido')
    .trim()
    .min(1, 'Minímo 1 carácter')
    .max(80, 'Máximo 80 caracteres')
    .regex(onlyLettersRegex, 'Solo letras'),
  lastName: z
    .string('Apellido es requerido')
    .trim()
    .min(1, 'Minímo 1 carácter')
    .max(80, 'Máximo 80 caracteres')
    .regex(onlyLettersRegex, 'Solo letras'),
  // documentType: z.enum(DocumentType, { error: 'Tipo de documento es requerido' }),
  documentType: z.string('Tipo de documento es requerido'),
  documentValue: z
    .string('Número de documento es requerido')
    .trim()
    .min(6, 'Minímo 6 caracteres')
    .max(30, 'Máximo 30 caracteres')
    .regex(onlyNumbersRegex, 'Solo números'),
  // gender: z.enum(Gender, { error: 'Género es requerido' }),
  gender: z.string('Género es requerido'),
  email: z.email('Correo electrónico inválido').trim().max(150, 'Máximo 150 caracteres'),
  phone: z
    .string()
    .trim()
    .min(1, 'Minímo 1 carácter')
    .max(30, 'Máximo 30 caracteres')
    .regex(onlyNumbersRegex, 'Solo números'), // TO DO: CAMBIAR EN LA DB, PONERLO OBLIGATORIO!!!!!!! HOY EN DÍA ES OPCIONAL.
  address: z.string().trim().max(150, 'Máximo 150 caracteres').optional(),
  birthDate: z.iso.date('Fecha de nacimiento es requerida'),
});
