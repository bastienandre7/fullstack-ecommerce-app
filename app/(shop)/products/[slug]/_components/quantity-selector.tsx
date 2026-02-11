"use client";

import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  setQuantity: (val: number) => void;
}

export function QuantitySelector({
  quantity,
  setQuantity,
}: QuantitySelectorProps) {
  return (
    <div className="flex items-center border border-gray-200 bg-white w-fit h-10 overflow-hidden">
      <button
        type="button"
        aria-label="Minus Quantity"
        onClick={() => setQuantity(Math.max(1, quantity - 1))}
        className={cn(
          "h-full px-3 flex items-center justify-center transition-colors hover:text-black",
          quantity <= 1
            ? "text-muted-foreground cursor-not-allowed"
            : "text-foreground",
        )}
      >
        <Minus className="h-3 w-3" strokeWidth={1.5} />
      </button>

      <span className="px-4 text-[11px] font-bold uppercase tracking-widest text-black min-w-[3rem] text-center select-none">
        {quantity}
      </span>

      <button
        type="button"
        aria-label="Plus Quantity"
        onClick={() => setQuantity(quantity + 1)}
        className="h-full px-3 flex items-center justify-center text-foreground transition-colors"
      >
        <Plus className="h-3 w-3" strokeWidth={1.5} />
      </button>
    </div>
  );
}
