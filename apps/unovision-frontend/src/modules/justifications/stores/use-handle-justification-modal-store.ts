import type { Justification } from '@aeme/contracts';
import { create } from 'zustand';

type State = {
  isOpen: boolean;
  type: 'creation' | 'edition';
  isCreation: boolean;
  isEdition: boolean;
  justification: Justification | null;
};

type Actions = {
  open: ({ type, justification }: { type: State['type']; justification?: Justification }) => void;
  close: () => void;
};

const initialState: State = {
  isOpen: false,
  type: 'creation',
  isCreation: true,
  isEdition: false,
  justification: null,
};

const useHandleJustificationModalStore = create<State & Actions>((set) => ({
  ...initialState,
  open: ({ type, justification }) =>
    set({
      isOpen: true,
      type,
      justification: justification || null,
      isCreation: type === 'creation',
      isEdition: type === 'edition',
    }),
  close: () => set({ ...initialState }),
}));

export default useHandleJustificationModalStore;
