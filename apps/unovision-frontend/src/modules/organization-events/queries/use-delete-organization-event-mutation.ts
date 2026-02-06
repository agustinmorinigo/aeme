import { useMutation } from '@tanstack/react-query';
import api from '@/services/api';

export default function useDeleteOrganizationEventMutation() {
  const mutation = useMutation({ mutationFn: api.organizationEvents.delete });
  return mutation;
}
