"use client";

import { CartContent } from "@/components/cart/cart-content";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/hooks/use-cart";
import { useCartDrawer } from "@/hooks/use-cart-drawer";
import { ShoppingBag } from "lucide-react";
import { useSyncExternalStore } from "react";

const useIsClient = () => {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
};

export function CartButton() {
  const isClient = useIsClient();
  const { totalItems } = useCart();
  const { isOpen, onOpen, onClose } = useCartDrawer();

  const count = isClient ? totalItems() : 0;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => (open ? onOpen() : onClose())}>
      <button
        onClick={onOpen}
        className="relative group p-2 outline-none"
        aria-label="Open cart"
      >
        <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />

        {count > 0 && (
          <span className="absolute -top-1 -right-1 bg-black text-white text-[8px] h-4 w-4 rounded-full flex items-center justify-center font-bold animate-in fade-in zoom-in duration-300">
            {count}
          </span>
        )}
      </button>

      <SheetContent className="w-full sm:max-w-md p-0 flex flex-col border-l border-black/5 shadow-2xl">
        <SheetHeader className="p-6 border-b border-black/5">
          <SheetTitle className="text-[10px] font-black uppercase tracking-[0.3em]">
            Shopping Bag {isClient && count > 0 ? `(${count})` : ""}
          </SheetTitle>
          <SheetDescription className="sr-only">
            Your shopping cart items and checkout preview.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto">
          <CartContent isSideSheet />
        </div>
      </SheetContent>
    </Sheet>
  );
}
