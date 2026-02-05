import { useMutation } from '@tanstack/react-query';
import api from '@/services/api';

export default function useDeleteJustificationMutation() {
  const mutation = useMutation({ mutationFn: api.attendance.justifications.delete });
  return mutation;
}
