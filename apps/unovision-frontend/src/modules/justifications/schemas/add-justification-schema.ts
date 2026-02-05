import { createJustificationSchema } from '@aeme/contracts';
import { formatBytes } from '@aeme/ui/hooks/use-file-upload';
import { isAfter, parseISO } from 'date-fns';
import { z } from 'zod';
import {
  getFileMimeTypes,
  getFileTypeLabels,
  maxFileSize,
} from '@/modules/justifications/constants/create-justification-file';

export const addJustificationSchema = createJustificationSchema
  .omit({ documentLink: true })
  .extend({
    isMultiDay: z.boolean(),
    documentFile: z
      .instanceof(File)
      .optional()
      .refine(
        (file) => {
          if (!file) return true;
          return file.size <= maxFileSize;
        },
        { message: `El archivo no debe superar los ${formatBytes(maxFileSize)}` },
      )
      .refine(
        (file) => {
          if (!file) return true;
          return (getFileMimeTypes() as readonly string[]).includes(file.type);
        },
        { message: `Solo se aceptan archivos ${getFileTypeLabels()}` },
      ),
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
      message: 'La fecha de fin es obligatoria cuando la justificación abarca más de un día',
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

export type AddJustificationSchema = z.infer<typeof addJustificationSchema>;
