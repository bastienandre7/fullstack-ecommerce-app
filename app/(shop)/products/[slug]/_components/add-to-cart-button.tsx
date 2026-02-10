"use client";

import { QuantitySelector } from "@/app/(shop)/products/[slug]/_components/quantity-selector";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useCartDrawer } from "@/hooks/use-cart-drawer";
import { cn, formatPrice } from "@/lib/utils";
import { CartItem } from "@/types";
import { XCircle } from "lucide-react";
import { useState } from "react";

interface AddToCartButtonProps {
  item: Omit<CartItem, "quantity">;
  disabled?: boolean;
}

export function AddToCartButton({
  item,
  disabled = false,
}: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCart((state) => state.addItem);
  const openDrawer = useCartDrawer((state) => state.onOpen);

  const handleAdd = () => {
    if (disabled) return;

    addItem({ ...item, quantity });

    openDrawer();
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          Quantity
        </p>
        <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
      </div>

      <Button
        size="lg"
        disabled={disabled}
        onClick={handleAdd}
        className={cn(
          "w-full h-16 text-[11px] uppercase font-bold tracking-[0.3em] transition-all duration-500 rounded-none",
          disabled
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-black text-white hover:bg-gray-900",
        )}
      >
        {disabled ? (
          <span className="flex items-center gap-2">
            <XCircle className="h-4 w-4" /> Out of Stock
          </span>
        ) : (
          `Add to Bag — ${formatPrice(item.price * quantity)}`
        )}
      </Button>
    </div>
  );
}
