import {
  Button,
  Checkbox,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SimpleFileUploader,
} from '@aeme/ui';
import type { FileWithPreview } from '@aeme/ui/hooks/use-file-upload';
import { formatBytes } from '@aeme/ui/hooks/use-file-upload';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { FormField } from '@/components/common/form-field';
import FormFieldLayout from '@/components/common/form-field-layout';
import Loader from '@/components/common/loader';
import useGetEmployeesQuery from '@/modules/attendance/queries/use-get-employees-query';
import useBasicReportInfoStore from '@/modules/attendance/stores/use-basic-report-info-store';
import {
  type AddJustificationSchema,
  addJustificationSchema,
} from '@/modules/justifications/schemas/add-justification-schema';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ['.pdf', '.jpg', '.jpeg', '.png'];

const justificationTypes = [
  { value: 'medical', label: 'Turno/Consulta médica' },
  { value: 'illness', label: 'Enfermedad' },
  { value: 'procedure', label: 'Trámite' },
  { value: 'education', label: 'Estudio/exámen académico' },
  { value: 'training', label: 'Capacitación/Cursos' },
  { value: 'workAccident', label: 'Accidente laboral' },
  { value: 'bloodDonation', label: 'Donación de sangre' },
  { value: 'personal', label: 'Motivo personal' },
  { value: 'other', label: 'Otro' },
] as const;

interface AddJustificationFormProps {
  onCancel: () => void;
  onSubmit: (data: AddJustificationSchema) => void;
}

export default function AddJustificationForm({ onCancel, onSubmit }: AddJustificationFormProps) {
  const [localFile, setLocalFile] = useState<FileWithPreview | undefined>(undefined);
  const { organization } = useBasicReportInfoStore();
  const {
    data: employeesData,
    isPending: isEmployeesPending,
    isError: isEmployeesError,
  } = useGetEmployeesQuery({
    organizationId: organization?.id ?? '',
  });
  const employees = employeesData ?? [];

  const methods = useForm<AddJustificationSchema>({
    resolver: zodResolver(addJustificationSchema),
    defaultValues: {
      employeeId: '',
      startDate: '',
      endDate: '',
      isMultiDay: false,
      type: undefined,
      description: '',
      documentFile: undefined,
    },
  });

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = methods;

  const handleFormSubmit = handleSubmit((data) => {
    onSubmit(data);
  });

  const handleOnAddFile = (addedFile: FileWithPreview) => {
    setLocalFile(addedFile);
    setValue('documentFile', addedFile.file as File);
  };

  const handleOnRemoveFile = () => {
    setLocalFile(undefined);
    setValue('documentFile', undefined);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleFormSubmit} className='flex flex-col gap-5'>
        {/* Employee Select */}
        <FormFieldLayout label='Empleado' required id='employeeId' error={errors.employeeId}>
          {isEmployeesPending ? (
            <Loader />
          ) : isEmployeesError ? (
            <p className='text-sm text-red-600'>Error al cargar los empleados</p>
          ) : (
            <Controller
              name='employeeId'
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className='w-full' {...(errors.employeeId ? { 'aria-invalid': true } : {})}>
                    <SelectValue placeholder='Selecciona un empleado' />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map((employee) => (
                      <SelectItem key={employee.id} value={employee.id}>
                        {employee.profile.name} {employee.profile.lastName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          )}
        </FormFieldLayout>

        {/* Dates */}
        <div className='grid grid-cols-2 gap-4'>
          <FormField
            id='startDate'
            label='Fecha de inicio'
            type='date'
            required
            register={register('startDate')}
            error={errors.startDate}
            placeholder='dd/mm/aaaa'
          />
          <FormField
            id='endDate'
            label='Fecha de fin'
            type='date'
            required
            register={register('endDate')}
            error={errors.endDate}
            placeholder='dd/mm/aaaa'
          />
        </div>

        {/* Multi-day Checkbox */}
        <div className='flex items-center space-x-2'>
          <Controller
            name='isMultiDay'
            control={control}
            render={({ field }) => <Checkbox id='isMultiDay' checked={field.value} onCheckedChange={field.onChange} />}
          />
          <Label htmlFor='isMultiDay' className='text-sm font-normal cursor-pointer'>
            La justificación abarca más de un día
          </Label>
        </div>

        {/* Justification Type Select */}
        <FormFieldLayout label='Tipo de justificación' required id='type' error={errors.type}>
          <Controller
            name='type'
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className='w-full' {...(errors.type ? { 'aria-invalid': true } : {})}>
                  <SelectValue placeholder='Selecciona el tipo' />
                </SelectTrigger>
                <SelectContent>
                  {justificationTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </FormFieldLayout>

        {/* Description Textarea */}
        <FormFieldLayout label='Detalles' id='description' error={errors.description}>
          <textarea
            id='description'
            {...register('description')}
            placeholder='Agrega información adicional sobre la justificación...'
            className='file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex min-h-24 w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] resize-none'
          />
        </FormFieldLayout>

        {/* File Uploader */}
        <FormFieldLayout label='Documentación adjunta' id='documentFile' error={errors.documentFile}>
          <SimpleFileUploader
            maxSize={MAX_FILE_SIZE}
            accept={ACCEPTED_FILE_TYPES.join(',')}
            label='Seleccionar archivo'
            description={`Formatos aceptados: PDF, JPG, PNG (máx. ${formatBytes(MAX_FILE_SIZE)})`}
            file={localFile}
            onFileAdded={handleOnAddFile}
            onRemoveFile={handleOnRemoveFile}
          />
        </FormFieldLayout>

        {/* Footer Buttons */}
        <div className='flex justify-end gap-3 pt-4'>
          <Button type='button' variant='outline' onClick={onCancel}>
            Cancelar
          </Button>
          <Button type='submit'>Guardar justificación</Button>
        </div>
      </form>
    </FormProvider>
  );
}
