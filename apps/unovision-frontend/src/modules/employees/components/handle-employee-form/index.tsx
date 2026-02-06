import type {
  CreateUserBody,
  CreateUserResponse,
  GetUserByIdResponse,
  UpdateUserBody,
  UpdateUserResponse,
} from '@aeme/contracts';
import { toast } from '@aeme/ui/toast';
import { cn } from '@aeme/ui/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { type UseMutateAsyncFunction, useQueryClient } from '@tanstack/react-query';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import EmployeeFormSection from '@/modules/employees/components/handle-employee-form/employee-info/employee-form-section';
import OrganizationsFormSection from '@/modules/employees/components/handle-employee-form/organizations-info/organizations-form-section';
import PersonalInfoFormSection from '@/modules/employees/components/handle-employee-form/personal-info/personal-info-form-section';
import { initialEmployeeInfo } from '@/modules/employees/constants/employee-info';
import {
  type HandleEmployeeFormSchema,
  handleEmployeeFormSchema,
} from '@/modules/employees/schemas/handle-employee-form-schema';
import useHandleEmployeeModalStore from '@/modules/employees/stores/handle-employee-modal-store';
import parseFormValuesToCreateEmployeeBody from '@/modules/employees/utils/parse-form-values-to-create-employee-body';
import parseFormValuesToUpdateEmployeeBody from '@/modules/employees/utils/parse-form-values-to-update-employee-body';
import transformEmployeeDataToFormSchema from '@/modules/employees/utils/transform-employee-data-to-form-schema';

interface HandleEmployeeFormRef {
  submit: () => void;
}

interface HandleEmployeeFormProps {
  createEmployeeAsync: UseMutateAsyncFunction<CreateUserResponse | null, Error, CreateUserBody, unknown>;
  updateEmployeeAsync: UseMutateAsyncFunction<UpdateUserResponse | null, Error, UpdateUserBody, unknown>;
  employeeData: GetUserByIdResponse | undefined | null;
}

const HandleEmployeeForm = forwardRef<HandleEmployeeFormRef, HandleEmployeeFormProps>((props, ref) => {
  const { createEmployeeAsync, employeeData, updateEmployeeAsync } = props;
  const { isCreation, isDisabled, close } = useHandleEmployeeModalStore();
  const queryClient = useQueryClient();

  const methods = useForm({
    resolver: zodResolver(handleEmployeeFormSchema),
    defaultValues: {
      profile: {
        name: undefined,
        lastName: undefined,
        email: undefined,
        phone: undefined,
        address: undefined,
        birthDate: undefined,
        documentValue: undefined,
        gender: undefined,
        documentType: 'dni',
      },
      organizationIds: [],
      employeeData: initialEmployeeInfo,
    },
    shouldFocusError: false,
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (employeeData) {
      reset(transformEmployeeDataToFormSchema(employeeData));
    }
  }, [employeeData, reset]);

  const onSubmit = async (formValues: HandleEmployeeFormSchema) => {
    if (isCreation) {
      await createEmployee(formValues);
    } else {
      await updateEmployee(formValues);
    }
  };

  const createEmployee = async (formValues: HandleEmployeeFormSchema) => {
    try {
      const body = parseFormValuesToCreateEmployeeBody(formValues);
      await createEmployeeAsync(body);
      toast.success('Empleado creado correctamente');
      queryClient.invalidateQueries({ queryKey: ['get-users'] });
      queryClient.invalidateQueries({ queryKey: ['get-employees'] });
      reset();
      close();
    } catch (error) {
      toast.error('Error al crear empleado', { description: error instanceof Error ? error.message : undefined });
    }
  };

  const updateEmployee = async (formValues: HandleEmployeeFormSchema) => {
    if (!employeeData?.profile.id) {
      toast.error('Error al actualizar empleado: ID de empleado no disponible');
      return;
    }
    try {
      const body = parseFormValuesToUpdateEmployeeBody(employeeData?.profile.id, formValues);
      await updateEmployeeAsync(body);
      toast.success('Empleado actualizado correctamente');
      queryClient.invalidateQueries({ queryKey: ['get-users'] });
      queryClient.invalidateQueries({ queryKey: ['get-employees'] });
      close();
    } catch (error) {
      toast.error('Error al actualizar empleado', { description: error instanceof Error ? error.message : undefined });
    }
  };

  useImperativeHandle(ref, () => ({
    submit: handleSubmit(onSubmit),
  }));

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn('w-full overflow-hidden flex flex-col gap-10', isDisabled && 'pointer-events-none select-none')}
      >
        <PersonalInfoFormSection />
        <OrganizationsFormSection />
        <EmployeeFormSection />
      </form>
    </FormProvider>
  );
});

export default HandleEmployeeForm;
