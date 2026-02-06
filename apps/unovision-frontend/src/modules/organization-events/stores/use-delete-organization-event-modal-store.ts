import type { OrganizationEvent } from '@aeme/supabase-client/entities';
import { create } from 'zustand';

type State = {
  isOpen: boolean;
  organizationEvent: OrganizationEvent | null;
};

type Actions = {
  open: (organizationEvent: OrganizationEvent) => void;
  close: () => void;
};

const initialState: State = {
  isOpen: false,
  organizationEvent: null,
};

const useDeleteOrganizationEventModalStore = create<State & Actions>((set) => ({
  ...initialState,
  open: (organizationEvent) => set({ isOpen: true, organizationEvent }),
  close: () => set({ ...initialState }),
}));

export default useDeleteOrganizationEventModalStore;
