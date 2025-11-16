import signInWithOTP from '@/services/api/auth/sign-in-with-otp';
import signOut from '@/services/api/auth/sign-out';
import verifyOTP from '@/services/api/auth/verify-otp';

export const auth = {
  signInWithOTP,
  signOut,
  verifyOTP,
};
