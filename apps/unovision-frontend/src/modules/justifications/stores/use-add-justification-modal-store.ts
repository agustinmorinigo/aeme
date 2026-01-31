import { create } from 'zustand';

type State = {
  isOpen: boolean;
};

type Actions = {
  open: () => void;
  close: () => void;
};

const initialState: State = {
  isOpen: false,
};

const useAddJustificationModalStore = create<State & Actions>((set) => ({
  ...initialState,
  open: () => set({ isOpen: true }),
  close: () => set({ ...initialState }),
}));

export default useAddJustificationModalStore;
