import { create } from "zustand";

type TNewGenreModal = {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewGenreModal = create<TNewGenreModal>((set) => ({
  open: false,
  onOpen: () => set({ open: true }),
  onClose: () => set({ open: false }),
}));
