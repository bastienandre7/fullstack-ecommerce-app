"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useCartDrawer } from "@/hooks/use-cart-drawer";
import { cn, formatPrice } from "@/lib/utils";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function CartContent({
  isSideSheet = false,
}: {
  isSideSheet?: boolean;
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const cartDrawer = useCartDrawer();

  const [loading, setLoading] = useState(false);
  const { items, removeItem, addItem, totalPrice, decreaseQuantity } =
    useCart();

  const onCheckout = async () => {
    if (!session) {
      toast.info("Please login to proceed to checkout");
      if (isSideSheet) {
        cartDrawer.onClose();
      }
      router.push("/login?callbackUrl=/cart");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const data = await response.json();
      if (data.url) window.location.assign(data.url);
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-12 text-center">
        <ShoppingBag className="h-8 w-8 text-gray-200 mb-4" strokeWidth={1} />
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
          Your bag is empty
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col h-full",
        isSideSheet ? "p-0" : "container mx-auto pt-40 pb-32 px-6",
      )}
    >
      <div
        className={cn(
          "flex-1",
          isSideSheet ? "px-6 py-4" : "grid grid-cols-1 lg:grid-cols-12 gap-16",
        )}
      >
        <div
          className={cn(isSideSheet ? "space-y-6" : "lg:col-span-8 space-y-12")}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 pb-6 border-b border-gray-50 last:border-0"
            >
              <div className="relative h-24 w-20 bg-[#F9F9F9] flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain p-2"
                />
              </div>

              <div className="flex flex-col flex-1 justify-between py-1">
                <div className="flex justify-between items-start">
                  <h3 className="text-[10px] font-bold uppercase tracking-tight">
                    {item.name}
                  </h3>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-muted-foreground hover:text-black transition-colors"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>

                <div className="flex justify-between items-end">
                  <div className="flex items-center border border-gray-100 h-8">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="px-2 text-muted-foreground hover:text-black"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-6 text-center text-[10px] font-bold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => addItem({ ...item, quantity: 1 })}
                      className="px-2 text-muted-foreground hover:text-black"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <p className="text-[11px] font-medium">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className={cn(
            isSideSheet
              ? "sticky bottom-0 bg-white border-t border-gray-100 p-6 space-y-4"
              : "lg:col-span-4",
          )}
        >
          <div className="flex justify-between items-baseline">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Total
            </span>
            <span className="text-xl font-light">
              {formatPrice(totalPrice())}
            </span>
          </div>
          <Button
            onClick={onCheckout}
            disabled={loading}
            className="w-full h-14 bg-black text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-none group"
          >
            {loading ? (
              "Processing..."
            ) : (
              <span className="flex items-center gap-2">
                Checkout{" "}
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
