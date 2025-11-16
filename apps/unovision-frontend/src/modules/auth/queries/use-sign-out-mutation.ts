import { toast } from '@aeme/ui/toast';
import { useMutation } from '@tanstack/react-query';
import api from '@/services/api';

export default function useSignOutMutation() {
  const mutation = useMutation({
    // VER LA MUTATION KEY. CREO Q SUPABASE YA MANEJA ESTO...
    mutationFn: api.auth.signOut,
    onError: (error) => {
      toast.error(`Error al cerrar sesión: ${error.message}`);
    },
  });

  return mutation;
}
