import { useMutation } from '@tanstack/react-query';
import api from '@/services/api';

export default function useUpdateUserMutation() {
  const mutation = useMutation({ mutationFn: api.userManagement.update });
  return mutation;
}
