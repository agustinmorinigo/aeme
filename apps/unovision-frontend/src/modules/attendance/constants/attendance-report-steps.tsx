import {
  CalendarDays,
  ChartNoAxesCombined,
  FileInput,
  FileSliders,
  LibraryBig,
  NotebookPen,
  Users,
} from 'lucide-react';

export const attendanceReportSteps = [
  {
    step: 1,
    title: 'Instructivo',
    description: '¿Cómo funciona?',
    Icon: LibraryBig,
  },
  {
    step: 2,
    title: 'Datos básicos',
    description: 'Para generar el reporte',
    Icon: FileInput,
  },
  {
    step: 3,
    title: 'Validación usuarios',
    description: 'Verificar empleados en el sistema',
    Icon: Users,
  },
  {
    step: 4,
    title: 'Validación datos',
    description: 'Correción datos incorrectos',
    Icon: FileSliders,
  },
  {
    step: 5,
    title: 'Justificaciones',
    description: 'Justificar inasistencias',
    Icon: NotebookPen,
  },
  {
    step: 6,
    title: 'Días especiales',
    description: 'Feriados, eventos, etc.',
    Icon: CalendarDays,
  },
  {
    step: 7,
    title: 'Reporte final',
    description: 'Generación del informe final',
    Icon: ChartNoAxesCombined,
  },
];
