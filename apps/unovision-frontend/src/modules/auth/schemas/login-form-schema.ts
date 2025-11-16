import { z } from 'zod';

export const loginFormSchema = z.object({ email: z.email('Correo electrónico inválido') });

export type LoginFormSchema = z.infer<typeof loginFormSchema>;
