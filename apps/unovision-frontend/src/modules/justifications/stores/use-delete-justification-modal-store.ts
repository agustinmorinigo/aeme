import type { Justification } from '@aeme/contracts';
import { create } from 'zustand';

type State = {
  isOpen: boolean;
  justification: Justification | null;
};

type Actions = {
  open: ({ justification }: { justification: Justification }) => void;
  close: () => void;
};

const initialState: State = {
  isOpen: false,
  justification: null,
};

const useDeleteJustificationModalStore = create<State & Actions>((set) => ({
  ...initialState,
  open: ({ justification }) =>
    set({
      isOpen: true,
      justification: justification,
    }),
  close: () => set({ ...initialState }),
}));

export default useDeleteJustificationModalStore;
