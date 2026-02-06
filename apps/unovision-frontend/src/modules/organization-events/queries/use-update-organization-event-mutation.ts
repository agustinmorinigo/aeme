import { useMutation } from '@tanstack/react-query';
import api from '@/services/api';

export function useUpdateOrganizationEventMutation() {
  const mutation = useMutation({
    mutationFn: api.organizationEvents.update,
  });

  return mutation;
}
