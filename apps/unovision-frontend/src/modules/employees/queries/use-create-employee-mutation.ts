import { useMutation } from '@tanstack/react-query';
import api from '@/services/api';

export default function useCreateEmployeeMutation() {
  const mutation = useMutation({ mutationFn: api.userManagement.create });
  return mutation;
}
