import { persist } from 'zustand/middleware';
import type { Organization, Profile, Role } from '@/client/entities';
import create from '@/config/store';

interface State {
  userId: string | null;
  organizations: Organization[];
  roles: Role[];
  selectedRole: Role | null;
  profile: Profile | null;
  isAuthenticated: boolean;
}

interface Actions {
  setUserId: (userId: string | null) => void;
  setOrganizations: (organizations: Organization[]) => void;
  setRoles: (roles: Role[]) => void;
  setSelectedRole: (role: Role | null) => void;
  setProfile: (profile: Profile | null) => void;
}

const useUserStore = create<State & Actions>()(
  persist(
    (set) => ({
      userId: null,
      organizations: [],
      roles: [],
      selectedRole: null,
      profile: null,
      isAuthenticated: false,
      setUserId: (userId) => set({ userId, isAuthenticated: !!userId }),
      setOrganizations: (organizations) => set({ organizations }),
      setRoles: (roles) => set({ roles }),
      setSelectedRole: (selectedRole) => set({ selectedRole }),
      setProfile: (profile) => set({ profile }),
    }),
    {
      name: 'user-store',
      partialize: (state) => ({
        userId: state.userId,
        organizations: state.organizations,
        roles: state.roles,
        selectedRole: state.selectedRole,
        profile: state.profile,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

export default useUserStore;
