import supabase from '@/client';

export default async function signInWithOTP(email: string): Promise<void> {
  const { error } = await supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: false } });
  if (error) {
    throw error;
  }
}
