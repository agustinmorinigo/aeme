import { useMutation } from '@tanstack/react-query';
import api from '@/services/api';

export function useUpdateJustificationMutation() {
  const mutation = useMutation({
    mutationFn: api.attendance.justifications.update,
  });

  return mutation;
}
