import type { User } from '@aeme/contracts';
import { create } from 'zustand';

type State = {
  isOpen: boolean;
  type: 'creation' | 'edition' | 'details';
  isDisabled: boolean;
  isCreation: boolean;
  isEdition: boolean;
  isDetails: boolean;
  user: User | null;
};

type Actions = {
  open: ({ type, user }: { type: State['type']; user?: User }) => void;
  close: () => void;
};

const initialState: State = {
  isOpen: false,
  type: 'creation',
  isDisabled: false,
  isCreation: true,
  isEdition: false,
  isDetails: false,
  user: null,
};

const useHandleUserModalStore = create<State & Actions>((set) => ({
  ...initialState,
  open: ({ type, user }) => set({
    isOpen: true,
    type,
    user: user || null,
    isDisabled: type === 'details',
    isCreation: type === 'creation',
    isEdition: type === 'edition',
    isDetails: type === 'details',
  }),
  close: () => set({ ...initialState }),
}));

export default useHandleUserModalStore;
