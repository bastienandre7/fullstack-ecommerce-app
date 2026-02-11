"use client";

import { AddToCartButton } from "@/app/(shop)/products/[slug]/_components/add-to-cart-button";
import { cn } from "@/lib/utils";
import { CartItem, ProductVariant } from "@/types";
import { useMemo, useState } from "react";

interface VariantSelectorProps {
  variants: ProductVariant[];
  product: {
    id: string;
    name: string;
    price: number;
    images: { url: string }[];
  };
}

export function VariantSelector({ variants, product }: VariantSelectorProps) {
  const hasSizes = useMemo(() => {
    return variants.some((v) => v.size && v.size.trim() !== "");
  }, [variants]);

  const defaultVariant = useMemo(() => {
    return variants.find((v) => (v.stock ?? 0) > 0) || null;
  }, [variants]);

  const [selectedColor, setSelectedColor] = useState<string | null>(
    defaultVariant?.color ?? null,
  );
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    defaultVariant,
  );

  const uniqueColors = useMemo(() => {
    const colors = variants.filter((v) => v.color && v.colorCode);
    return Array.from(
      new Map(colors.map((v) => [v.color as string, v])).values(),
    );
  }, [variants]);

  const allSizes = useMemo(() => {
    return Array.from(new Set(variants.map((v) => v.size))).filter(
      (s): s is string => !!s && s.trim() !== "",
    );
  }, [variants]);

  const isColorInStock = (color: string) => {
    if (hasSizes) return true;
    const variant = variants.find((v) => v.color === color);
    return variant && (variant.stock ?? 0) > 0;
  };

  const findVariant = (size: string) => {
    if (!selectedColor) return null;
    return (
      variants.find((v) => v.color === selectedColor && v.size === size) || null
    );
  };

  const isOutOfStock = !selectedVariant || (selectedVariant.stock ?? 0) <= 0;
  const isReady = !!selectedVariant && !isOutOfStock;

  const cartItem: Omit<CartItem, "quantity"> = {
    id: selectedVariant ? `${product.id}-${selectedVariant.id}` : product.id,
    productId: product.id,
    variantId: selectedVariant?.id || "",
    name: selectedVariant
      ? `${product.name} - ${selectedVariant.color || ""} ${selectedVariant.size || ""}`.trim()
      : product.name,
    price: product.price,
    image: product.images[0]?.url || "",
  };

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.2em]">
          <span className="text-gray-500">Color</span>
          <span className="text-black">{selectedColor || "Select Color"}</span>
        </div>
        <div className="flex flex-wrap gap-4">
          {uniqueColors.map((v) => {
            const color = v.color as string;
            const colorInStock = isColorInStock(color);

            return (
              <button
                key={v.id}
                type="button"
                aria-label="Color Select"
                disabled={!hasSizes && !colorInStock}
                onClick={() => {
                  setSelectedColor(color);
                  if (!hasSizes) {
                    const variant = variants.find(
                      (varnt) => varnt.color === color,
                    );
                    setSelectedVariant(variant || null);
                  } else {
                    const firstSizeInColor = variants.find(
                      (varnt) =>
                        varnt.color === color && (varnt.stock ?? 0) > 0,
                    );
                    if (firstSizeInColor) setSelectedVariant(firstSizeInColor);
                  }
                }}
                className={cn(
                  "relative h-9 w-9 rounded-full border p-1 transition-all duration-300 ease-in-out",
                  selectedColor === color
                    ? "border-black scale-110 shadow-sm"
                    : "border-gray-200 hover:border-gray-400",
                  !hasSizes && !colorInStock && "opacity-60 cursor-not-allowed",
                )}
              >
                <div
                  className="h-full w-full rounded-full ring-1 ring-inset ring-black/5"
                  style={{ backgroundColor: v.colorCode || "transparent" }}
                />

                {!hasSizes && !colorInStock && (
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <svg
                      className="h-full w-full stroke-gray-400"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                    >
                      <line x1="15" y1="15" x2="85" y2="85" strokeWidth="2" />
                      <line x1="85" y1="15" x2="15" y2="85" strokeWidth="2" />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {hasSizes && (
        <div className="space-y-4">
          <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.2em]">
            <span className="text-muted-foreground">Size</span>
            <button className="text-foreground underline underline-offset-4 hover:text-gray-500 transition-colors">
              Size Guide
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {allSizes.map((size) => {
              const variantForSize = findVariant(size);
              const isAvailable =
                !!variantForSize && (variantForSize.stock ?? 0) > 0;
              const isSelected = selectedVariant?.size === size;

              return (
                <button
                  key={size}
                  type="button"
                  disabled={!isAvailable}
                  onClick={() => setSelectedVariant(variantForSize)}
                  className={cn(
                    "relative h-12 border text-[11px] font-bold uppercase tracking-widest transition-all duration-300 overflow-hidden",
                    isSelected
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-gray-200 hover:border-black",
                    !isAvailable &&
                      "opacity-60 cursor-not-allowed bg-gray-50 text-gray-400 border-gray-200",
                  )}
                >
                  <span
                    className={cn(
                      "relative z-10",
                      !isAvailable && "text-gray-500",
                    )}
                  >
                    {size}
                  </span>

                  {!isAvailable && (
                    <div className="absolute inset-0 z-0 pointer-events-none">
                      <svg
                        className="absolute inset-0 h-full w-full stroke-gray-400"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                      >
                        <line
                          x1="0"
                          y1="0"
                          x2="100"
                          y2="100"
                          strokeWidth="1.5"
                        />
                        <line
                          x1="100"
                          y1="0"
                          x2="0"
                          y2="100"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="pt-6">
        <AddToCartButton item={cartItem} disabled={!isReady} />
        {!isReady && (
          <p className="mt-4 text-center text-[9px] font-bold uppercase tracking-[0.2em] text-red-500/80">
            {!hasSizes && isOutOfStock
              ? "Out of stock"
              : "Select a valid combination to proceed"}
          </p>
        )}
      </div>
    </div>
  );
}
