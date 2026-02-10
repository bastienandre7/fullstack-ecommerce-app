// hooks/use-cart-drawer.ts
import { create } from "zustand";

interface UseCartDrawerStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useCartDrawer = create<UseCartDrawerStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
