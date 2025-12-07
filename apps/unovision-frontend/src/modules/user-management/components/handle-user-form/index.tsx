import type {
  CreateUserBody,
  CreateUserResponse,
  GetUserByIdResponse,
  UpdateUserBody,
  UpdateUserResponse,
} from '@aeme/contracts';
import { DocumentType } from '@aeme/supabase-client/entities';
import { toast } from '@aeme/ui/toast';
import { cn } from '@aeme/ui/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { type UseMutateAsyncFunction, useQueryClient } from '@tanstack/react-query';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import OrganizationsFormSection from '@/modules/user-management/components/handle-user-form/organizations-info/organizations-form-section';
import PersonalInfoFormSection from '@/modules/user-management/components/handle-user-form/personal-info/personal-info-form-section';
import RolesFormSection from '@/modules/user-management/components/handle-user-form/roles-info/roles-form-section';
import {
  type HandleUserFormSchema,
  handleUserFormSchema,
} from '@/modules/user-management/schemas/handle-user-form-schema';
import useHandleUserModalStore from '@/modules/user-management/stores/handle-user-modal-store';
import parseFormValuesToCreateUserBody from '@/modules/user-management/utils/parse-form-values-to-create-user-body';
import parseFormValuesToUpdateUserBody from '@/modules/user-management/utils/parse-form-values-to-update-user-body';
import transformUserDataToFormSchema from '@/modules/user-management/utils/transform-user-data-to-form-schema';

interface CreateUserFormRef {
  submit: () => void;
}

// TODO: Replace this with form-id
interface CreateUserFormProps {
  createUserAsync: UseMutateAsyncFunction<CreateUserResponse | null, Error, CreateUserBody, unknown>;
  updateUserAsync: UseMutateAsyncFunction<UpdateUserResponse | null, Error, UpdateUserBody, unknown>;
  userData: GetUserByIdResponse | undefined | null;
}

const CreateUserForm = forwardRef<CreateUserFormRef, CreateUserFormProps>((props, ref) => {
  const { createUserAsync, userData, updateUserAsync } = props;
  const { isCreation, isDisabled, close } = useHandleUserModalStore();
  const queryClient = useQueryClient();

  const methods = useForm({
    resolver: zodResolver(handleUserFormSchema),
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
        documentType: DocumentType.dni,
      },
      roles: [],
      organizationIds: [],
      patientData: undefined,
      doctorData: {
        isResident: false,
      },
      employeeData: undefined,
    },
    shouldFocusError: false,
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (userData) {
      reset(transformUserDataToFormSchema(userData));
    }
  }, [userData, reset]);

  const onSubmit = async (formValues: HandleUserFormSchema) => {
    if (isCreation) {
      await createUser(formValues);
    } else {
      await updateUser(formValues);
    }
  };

  const createUser = async (formValues: HandleUserFormSchema) => {
    try {
      const body = parseFormValuesToCreateUserBody(formValues);
      await createUserAsync(body);
      toast.success('Usuario creado correctamente');
      queryClient.invalidateQueries({ queryKey: ['get-users'] });
      reset();
      close();
    } catch (error) {
      toast.error('Error al crear usuario', { description: error instanceof Error ? error.message : undefined });
    }
  };

  const updateUser = async (formValues: HandleUserFormSchema) => {
    if (!userData?.profile.id) {
      toast.error('Error al actualizar usuario: ID de usuario no disponible');
      return;
    }
    try {
      const body = parseFormValuesToUpdateUserBody(userData?.profile.id, formValues);
      await updateUserAsync(body);
      toast.success('Usuario actualizado correctamente');
      queryClient.invalidateQueries({ queryKey: ['get-users'] });
      close();
    } catch (error) {
      toast.error('Error al actualizar usuario', { description: error instanceof Error ? error.message : undefined });
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
        <RolesFormSection />
      </form>
    </FormProvider>
  );
});

export default CreateUserForm;
