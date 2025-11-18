import { persist } from 'zustand/middleware';
import type { Organization } from '@/client/entities';
import create from '@/config/store';

interface State {
  organizations: Organization[];
}

interface Actions {
  setOrganizations: (organizations: Organization[]) => void;
}

const useOrganizationsStore = create<State & Actions>()(
  persist(
    (set) => ({
      organizations: [],
      setOrganizations: (organizations) => set({ organizations }),
    }),
    {
      name: 'organizations',
      partialize: (state) => ({
        organizations: state.organizations,
      }),
    },
  ),
);

export default useOrganizationsStore;
