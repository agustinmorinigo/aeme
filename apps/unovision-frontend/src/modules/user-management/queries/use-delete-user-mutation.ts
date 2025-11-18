import { useMutation } from '@tanstack/react-query';
import api from '@/services/api';

export default function useDeleteUserMutation() {
  const mutation = useMutation({ mutationFn: api.user.delete });
  return mutation;
}
