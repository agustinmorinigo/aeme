import type { GetJustificationByIdResponse } from '@aeme/contracts';
import {
  Checkbox,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SimpleFileUploader,
  Textarea,
} from '@aeme/ui';
import type { FileWithPreview } from '@aeme/ui/hooks/use-file-upload';
import { formatBytes } from '@aeme/ui/hooks/use-file-upload';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { DatePickerFormField } from '@/components/common/date-picker-form-field';
import FormFieldLayout from '@/components/common/form-field-layout';
import Loader from '@/components/common/loader';
import useGetEmployeesQuery from '@/modules/attendance/queries/use-get-employees-query';
import useBasicReportInfoStore from '@/modules/attendance/stores/use-basic-report-info-store';
import {
  getFileExtensions,
  getFileTypeLabels,
  maxFileSize,
} from '@/modules/justifications/constants/create-justification-file';
import { justificationTypeOptions } from '@/modules/justifications/constants/justification-type-options';
import {
  type HandleJustificationSchema,
  handleJustificationSchema,
} from '@/modules/justifications/schemas/handle-justification-schema';
import { formatDoc } from '@/shared/documents/utils/format-doc';
import getFormattedUserFullName from '@/shared/users/utils/get-formatted-user-full-name';

interface HandleJustificationFormProps {
  onSubmit: (data: HandleJustificationSchema) => void;
  justificationData?: GetJustificationByIdResponse;
}

export default function HandleJustificationForm({ onSubmit, justificationData }: HandleJustificationFormProps) {
  const [localFile, setLocalFile] = useState<FileWithPreview | undefined>(undefined);
  const { organization, monthNumber, yearNumber } = useBasicReportInfoStore();
  const isEdition = !!justificationData;

  const {
    data: employeesData,
    isPending: isEmployeesPending,
    isError: isEmployeesError,
  } = useGetEmployeesQuery({
    organizationId: organization?.id ?? '',
  });

  const employees = employeesData ?? [];

  const sortedEmployees = [...employees].sort((a, b) =>
    getFormattedUserFullName(a.profile).localeCompare(getFormattedUserFullName(b.profile)),
  );

  // Determine if it's a multi-day justification based on endDate
  const isMultiDayInitial = !!justificationData?.endDate;

  const methods = useForm<HandleJustificationSchema>({
    resolver: zodResolver(handleJustificationSchema),
    defaultValues: isEdition
      ? {
          justificationId: justificationData.id,
          employeeId: justificationData.employeeId,
          organizationId: justificationData.organizationId,
          startDate: justificationData.startDate,
          endDate: justificationData.endDate ?? undefined,
          type: justificationData.type,
          description: justificationData.description ?? '',
          isMultiDay: isMultiDayInitial,
        }
      : {
          organizationId: organization?.id ?? '',
          isMultiDay: false,
        },
  });

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = methods;

  const isMultiDay = watch('isMultiDay');

  // Calculate the default month for the DatePicker based on the store values
  const defaultMonth = useMemo(() => {
    // monthNumber is 1-indexed (1 = January), but Date constructor expects 0-indexed months
    const monthIndex = (monthNumber ?? 1) - 1;
    const year = yearNumber ?? new Date().getFullYear();
    return new Date(year, monthIndex, 1);
  }, [monthNumber, yearNumber]);

  useEffect(() => {
    if (!isMultiDay) {
      setValue('endDate', undefined);
    }
  }, [isMultiDay, setValue]);

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

  const organizations = organization ? [organization] : [];

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleFormSubmit}
        className='w-full flex overflow-hidden flex-col gap-5'
        id='handle-justification-form'
      >
        <div className='w-full grid grid-cols-2 gap-6'>
          {/* Organization Select (always disabled) */}
          <FormFieldLayout label='Organización' required id='organizationId'>
            <Select value={organization?.id ?? ''} disabled>
              <SelectTrigger className='w-full min-w-0' title={organization?.businessName}>
                <SelectValue placeholder={organization?.businessName ?? 'Sin organización'} />
              </SelectTrigger>
              <SelectContent>
                {organizations.map((organization) => (
                  <SelectItem key={organization.id} value={organization.id}>
                    {organization.businessName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormFieldLayout>

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
                render={({ field }) => {
                  const selectedEmployee = sortedEmployees.find((emp) => emp.id === field.value);
                  const employeeDisplayName = selectedEmployee
                    ? `${getFormattedUserFullName(selectedEmployee.profile)}, DNI ${formatDoc(selectedEmployee.profile.documentValue)}`
                    : '';

                  return (
                    <Select value={field.value} onValueChange={field.onChange} disabled={isEdition}>
                      <SelectTrigger
                        className='w-full min-w-0'
                        title={employeeDisplayName}
                        {...(errors.employeeId ? { 'aria-invalid': true } : {})}
                      >
                        <SelectValue placeholder='Selecciona un empleado' />
                      </SelectTrigger>
                      <SelectContent>
                        {sortedEmployees.map((employee) => (
                          <SelectItem key={employee.id} value={employee.id}>
                            {getFormattedUserFullName(employee.profile)}, DNI{' '}
                            {formatDoc(employee.profile.documentValue)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  );
                }}
              />
            )}
          </FormFieldLayout>
        </div>

        {/* Dates */}
        <div className='grid gap-4 grid-cols-2'>
          <DatePickerFormField
            id='startDate'
            label='Fecha de inicio'
            required
            control={control}
            name='startDate'
            error={errors.startDate}
            placeholder='Seleccionar fecha'
            datePickerProps={{
              defaultMonth,
            }}
          />
          {isMultiDay && (
            <DatePickerFormField
              id='endDate'
              label='Fecha de fin'
              required
              control={control}
              name='endDate'
              error={errors.endDate}
              placeholder='Seleccionar fecha'
              datePickerProps={{
                defaultMonth,
              }}
            />
          )}
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
                  {justificationTypeOptions.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </FormFieldLayout>

        {/* File Uploader */}
        <FormFieldLayout label='Documentación' id='documentFile' error={errors.documentFile}>
          <SimpleFileUploader
            maxSize={maxFileSize}
            accept={getFileExtensions().join(',')}
            label='Seleccionar archivo'
            description={`Formatos aceptados: ${getFileTypeLabels()} (máx. ${formatBytes(maxFileSize)})`}
            file={localFile}
            onFileAdded={handleOnAddFile}
            onRemoveFile={handleOnRemoveFile}
          />
          {isEdition && justificationData?.documentLink && !localFile && (
            <p className='text-sm text-muted-foreground mt-2'>
              Archivo actual:{' '}
              <a
                href={justificationData.documentLink}
                target='_blank'
                rel='noopener noreferrer'
                className='text-primary hover:underline'
              >
                Ver documento
              </a>
            </p>
          )}
        </FormFieldLayout>

        {/* Description Textarea */}
        <FormFieldLayout label='Detalles' id='description' error={errors.description}>
          <Textarea
            id='description'
            {...register('description')}
            placeholder='Agrega información adicional sobre la justificación...'
            isError={!!errors.description}
          />
        </FormFieldLayout>
      </form>
    </FormProvider>
  );
}
