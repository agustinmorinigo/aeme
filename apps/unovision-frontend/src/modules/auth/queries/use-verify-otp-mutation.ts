import { useMutation } from '@tanstack/react-query';
import api from '@/services/api';

export default function useVerifyOTPMutation() {
  const mutation = useMutation({
    mutationFn: api.auth.verifyOTP,
  });

  return mutation;
}
