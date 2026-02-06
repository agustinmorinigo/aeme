import type { OrganizationEvent } from '@aeme/supabase-client/entities';
import { create } from 'zustand';

type State = {
  isOpen: boolean;
  type: 'creation' | 'edition';
  isCreation: boolean;
  isEdition: boolean;
  organizationEvent: OrganizationEvent | null;
};

type Actions = {
  open: ({ type, organizationEvent }: { type: State['type']; organizationEvent?: OrganizationEvent }) => void;
  close: () => void;
};

const initialState: State = {
  isOpen: false,
  type: 'creation',
  isCreation: true,
  isEdition: false,
  organizationEvent: null,
};

const useHandleOrganizationEventModalStore = create<State & Actions>((set) => ({
  ...initialState,
  open: ({ type, organizationEvent }) =>
    set({
      isOpen: true,
      type,
      organizationEvent: organizationEvent || null,
      isCreation: type === 'creation',
      isEdition: type === 'edition',
    }),
  close: () => set({ ...initialState }),
}));

export default useHandleOrganizationEventModalStore;
