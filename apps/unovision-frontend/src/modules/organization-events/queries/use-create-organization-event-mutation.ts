import { useMutation } from '@tanstack/react-query';
import api from '@/services/api';

export function useCreateOrganizationEventMutation() {
  const mutation = useMutation({
    mutationFn: api.organizationEvents.create,
  });

  return mutation;
}
