import { z } from 'zod';
import { createUserSchema } from './create/index.ts';

export const updateUserSchema = createUserSchema.extend({
  userId: z.uuid({ error: 'User id is required and must be a valid UUID' }),
});

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
