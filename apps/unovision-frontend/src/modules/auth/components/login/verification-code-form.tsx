import { isAuthApiError } from '@aeme/supabase-client';
import { Button, Input } from '@aeme/ui';
import { toast } from '@aeme/ui/toast';
import { useMemo, useState } from 'react';
import useSignInWithOTPMutation from '@/modules/auth/queries/use-sign-in-with-otp-mutation';
import useVerifyOTPMutation from '@/modules/auth/queries/use-verify-otp-mutation';

interface VerificationCodeFormProps {
  goToPrevStep: () => void;
  email: string;
}

export default function VerificationCodeForm({ goToPrevStep, email }: VerificationCodeFormProps) {
  const { isPending: isSignInWithOTPLoading, mutateAsync: signInWithOTP } = useSignInWithOTPMutation();
  const { isPending: isVerifyOTPLoading, mutateAsync: verifyOTP } = useVerifyOTPMutation();
  const isSomethingLoading = isSignInWithOTPLoading || isVerifyOTPLoading;
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleOnResendCode = async () => {
    if (!email || email.trim() === '') {
      toast.error('El correo electrónico no es válido');
      return;
    }

    if (isSomethingLoading) return;

    try {
      await signInWithOTP(email);
      toast.success('Código reenviado correctamente');
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

  const handleOnVerifyCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await verifyOTP({ email, token: otp.join('') });
    } catch (error) {
      console.log({ error });
      if (isAuthApiError(error)) {
        const message = error.code === 'otp_expired' ? 'El código expiró o es inválido' : error.message;
        toast.error(message);
      } else {
        toast.error('Error al verificar el código');
      }
    }
  };

  const inputIds = useMemo(() => Array.from({ length: otp.length }, () => crypto.randomUUID()), [otp.length]);

  const handleOTPChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-input-${inputIds[index + 1]}`);
      (nextInput as HTMLInputElement | null)?.focus();
    }
  };

  const handleOTPKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${inputIds[index - 1]}`);
      (prevInput as HTMLInputElement | null)?.focus();
    }
  };

  return (
    <form className='w-full flex flex-col gap-7 overflow-hidden' onSubmit={handleOnVerifyCode}>
      <div className='text-sm flex flex-col gap-3'>
        <p>Código enviado a {email}</p>
        <p>Por favor, ingresalo a continuación:</p>
      </div>

      <div className='w-full flex items-center justify-evenly'>
        {otp.map((digit, index) => (
          <Input
            key={inputIds[index]}
            id={`otp-input-${inputIds[index]}`}
            type='text'
            inputMode='numeric'
            pattern='[0-9]*'
            maxLength={1}
            value={digit}
            onChange={(e) => handleOTPChange(index, e.target.value)}
            onKeyDown={(e) => handleOTPKeyDown(index, e)}
            className='w-12 h-12 text-center text-lg font-mono'
            disabled={isSomethingLoading}
          />
        ))}
      </div>

      <Button
        type='submit'
        className='w-full'
        disabled={isSomethingLoading || otp.some((digit) => digit.trim() === '')}
      >
        {isSomethingLoading ? 'Verificando...' : 'Verificar código'}
      </Button>

      <div className='w-full overflow-hidden flex flex-col gap-4'>
        <p className='text-center text-sm'>¿No recibiste el código?</p>

        <div className='w-full flex items-center justify-center gap-4 overflow-hidden'>
          <Button type='button' variant='link' disabled={isSomethingLoading} onClick={handleOnResendCode}>
            Reenviar código
          </Button>
          <Button type='button' variant='secondary' disabled={isSomethingLoading} onClick={goToPrevStep}>
            Cambiar correo
          </Button>
        </div>
      </div>
    </form>
  );
}
