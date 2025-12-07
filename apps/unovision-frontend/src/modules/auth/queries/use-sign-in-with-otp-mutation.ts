import { useMutation } from '@tanstack/react-query';
import api from '@/services/api';

export default function useSignInWithOTPMutation() {
  const mutation = useMutation({
    mutationFn: api.auth.signInWithOTP,
  });

  return mutation;
}
