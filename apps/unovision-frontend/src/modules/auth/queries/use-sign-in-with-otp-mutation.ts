import { useMutation } from '@tanstack/react-query';
import api from '@/services/api';

export default function useSignInWithOTPMutation() {
  const mutation = useMutation({
    // VER LA MUTATION KEY. CREO Q SUPABASE YA MANEJA ESTO...
    mutationFn: api.auth.signInWithOTP,
  });

  return mutation;
}
