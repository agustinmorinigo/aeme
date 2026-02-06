import { createOrganizationEventSchema } from '@aeme/contracts';
import { isAfter, parseISO } from 'date-fns';
import { z } from 'zod';

export const handleOrganizationEventSchema = createOrganizationEventSchema
  .safeExtend({
    organizationEventId: z.uuid().optional(), // Optional for creation, required for edition
    isMultiDay: z.boolean(),
  })
  .refine(
    (data) => {
      // Si es multi-día, endDate es obligatorio
      if (data.isMultiDay) {
        return !!data.endDate;
      }
      return true;
    },
    {
      message: 'La fecha de fin es obligatoria cuando el evento abarca más de un día',
      path: ['endDate'],
    },
  )
  .refine(
    (data) => {
      // Si endDate existe, debe ser ESTRICTAMENTE mayor que startDate
      if (data.endDate && data.startDate) {
        return isAfter(parseISO(data.endDate), parseISO(data.startDate));
      }
      return true;
    },
    {
      message: 'La fecha de fin debe ser posterior a la fecha de inicio',
      path: ['endDate'],
    },
  );

export type HandleOrganizationEventSchema = z.infer<typeof handleOrganizationEventSchema>;
