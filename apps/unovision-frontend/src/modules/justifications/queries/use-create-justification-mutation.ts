import { useMutation } from '@tanstack/react-query';
import api from '@/services/api';

export function useCreateJustificationMutation() {
  const mutation = useMutation({
    mutationFn: api.attendance.justifications.create,
  });

  return mutation;
}
