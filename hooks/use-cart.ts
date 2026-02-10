import { CartItem } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartStore {
  items: CartItem[];
  addItem: (product: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
  decreaseQuantity: (id: string) => void;
}

export const useCart = create<CartStore>()(
  persist(
    // 'persist' sauvegarde le panier dans le localStorage automatiquement
    (set, get) => ({
      items: [],

      // lib/store/use-cart.ts
      addItem: (product) => {
        const currentItems = get().items;
        // L'ID ici est déjà "productId-variantId" venant de ton VariantSelector
        const existingItem = currentItems.find(
          (item) => item.id === product.id,
        );

        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + (product.quantity || 1) }
                : item,
            ),
          });
        } else {
          // On s'assure que quantity est au moins 1 si elle n'est pas définie
          set({
            items: [
              ...currentItems,
              { ...product, quantity: product.quantity || 1 },
            ],
          });
        }
      },

      decreaseQuantity: (id) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === id);

        if (existingItem && existingItem.quantity > 1) {
          // Si quantité > 1, on réduit de 1
          set({
            items: currentItems.map((item) =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
            ),
          });
        } else {
          // Si quantité = 1, on supprime l'article
          set({ items: currentItems.filter((item) => item.id !== id) });
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },

      clearCart: () => set({ items: [] }),

      totalItems: () =>
        get().items.reduce((acc, item) => acc + item.quantity, 0),

      totalPrice: () =>
        get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    }),
    { name: "cart-storage" }, // Nom de la clé dans le localStorage
  ),
);
