import type { User } from '@aeme/contracts';
import { create } from 'zustand';

type State = {
  isOpen: boolean;
  user: User | null;
};

type Actions = {
  open: ({ user }: { user: User }) => void;
  close: () => void;
};

const initialState: State = {
  isOpen: false,
  user: null,
};

const useDeleteUserModalStore = create<State & Actions>((set) => ({
  ...initialState,
  open: ({ user }) =>
    set({
      isOpen: true,
      user: user,
    }),
  close: () => set({ ...initialState }),
}));

export default useDeleteUserModalStore;
