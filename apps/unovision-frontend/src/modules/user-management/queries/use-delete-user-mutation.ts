import { useMutation } from '@tanstack/react-query';
import api from '@/services/api';

export default function useDeleteUserMutation() {
  const mutation = useMutation({ mutationFn: api.userManagement.delete });
  return mutation;
}
