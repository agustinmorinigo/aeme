import supabase from '@/client';

interface Params {
  email: string;
  token: string;
}

export default async function verifyOTP({ email, token }: Params): Promise<void> {
  const { error } = await supabase.auth.verifyOtp({ email, token, type: 'email' });
  if (error) {
    throw error;
  }
}
