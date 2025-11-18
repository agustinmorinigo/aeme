import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import api from '@/services/api';
import useOrganizationsStore from '@/shared/organizations/stores/use-organizations-store';

export default function useGetOrganizationsQuery() {
  const { setOrganizations } = useOrganizationsStore();

  const query = useQuery({
    queryKey: ['get-organizations'],
    queryFn: api.organizations.getAll,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  useEffect(() => {
    if (!query.data) return;
    setOrganizations(query.data);
  }, [query.data, setOrganizations]);

  return query;
}
