import { isAuthApiError } from '@aeme/supabase-client';
import { Button, Input, Label } from '@aeme/ui';
import { toast } from '@aeme/ui/toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import useSignInWithOTPMutation from '@/modules/auth/queries/use-sign-in-with-otp-mutation';
import { type LoginFormSchema, loginFormSchema } from '@/modules/auth/schemas/login-form-schema';

interface EmailFormProps {
  goToNextStep: () => void;
  setEmail: (email: string) => void;
}

export default function EmailForm({ goToNextStep, setEmail }: EmailFormProps) {
  const { isPending, mutateAsync } = useSignInWithOTPMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = async (formValues: LoginFormSchema): Promise<void> => {
    try {
      const { email } = formValues;
      await mutateAsync(email);
      setEmail(email);
      goToNextStep();
    } catch (error) {
      if (isAuthApiError(error)) {
        const message =
          error.code === 'otp_disabled'
            ? 'No existe un usuario con ese correo electrónico'
            : error.code === 'over_email_send_rate_limit'
              ? 'Por motivos de seguridad, podrá solicitar un nuevo código en un minuto o menos'
              : error.message;
        toast.error(`Error: ${message}`);
      } else {
        toast.error('Error al iniciar sesión');
      }
    }
  };

  return (
    <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-9'>
        <Label htmlFor='email' className='mb-3'>
          Correo Electrónico
        </Label>
        <div>
          <Input
            {...register('email')}
            placeholder='juan.perez@email.com'
            id='email'
            isError={!!errors.email}
            disabled={isPending}
          />
          <p className='text-destructive text-sm'>{errors.email?.message}</p>
        </div>
      </div>

      <Button type='submit' className='w-full' disabled={isPending}>
        {isPending ? 'Enviando...' : 'Continuar'}
      </Button>
    </form>
  );
}
