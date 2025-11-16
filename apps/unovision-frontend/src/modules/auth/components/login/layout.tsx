import { Card, CardContent, CardHeader, CardTitle } from '@aeme/ui';
import { useState } from 'react';
import { useStep } from 'usehooks-ts';
import EmailForm from '@/modules/auth/components/login/email-form';
import VerificationCodeForm from '@/modules/auth/components/login/verification-code-form';

export default function LoginLayout() {
  const [currentStep, helpers] = useStep(2);
  const [email, setEmail] = useState('');
  const { goToNextStep, goToPrevStep } = helpers;

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900'>
      <Card className='w-full max-w-md'>
        <CardHeader className='space-y-1 text-center'>
          <CardTitle className='text-2xl font-bold'>
            {currentStep === 1 ? 'Iniciar Sesión' : 'Verificar código'}
          </CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col gap-7'>
          {currentStep === 1 ? (
            <EmailForm goToNextStep={goToNextStep} setEmail={setEmail} />
          ) : (
            <VerificationCodeForm goToPrevStep={goToPrevStep} email={email} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
