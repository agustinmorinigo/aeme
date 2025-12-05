import { toast } from '@aeme/ui/toast';
import { useMutation } from '@tanstack/react-query';
import api from '@/services/api';

export default function useSignOutMutation() {
  const mutation = useMutation({
    mutationFn: api.auth.signOut,
    onError: (error) => {
      toast.error(`Error al cerrar sesión: ${error.message}`);
    },
  });

  return mutation;
}
