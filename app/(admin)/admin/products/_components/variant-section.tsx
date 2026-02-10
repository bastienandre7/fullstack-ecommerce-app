"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ProductFormInput } from "@/lib/validators/product";
import { Box, Trash2 } from "lucide-react";
import {
  Control,
  UseFormRegister,
  UseFormSetValue,
  useFieldArray,
  useWatch,
} from "react-hook-form";

interface VariantSectionProps {
  control: Control<ProductFormInput>;
  register: UseFormRegister<ProductFormInput>;
  setValue: UseFormSetValue<ProductFormInput>;
  isSubmitting: boolean;
  variant?: "default" | "minimal";
}

export function VariantSection({
  control,
  register,
  setValue,
  isSubmitting,
  variant = "default",
}: VariantSectionProps) {
  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray({
    control,
    name: "variants",
  });

  const isFeatured = useWatch({
    control,
    name: "isFeatured",
  });

  const isMinimal = variant === "minimal";

  return (
    <div
      className={`${isMinimal ? "bg-[#fcfcfc]" : "bg-[#FAFAFA]"} p-${isMinimal ? "10" : "8"} border border-gray-100 sticky top-${isMinimal ? "12" : "8"} ${isMinimal ? "space-y-12" : ""}`}
    >
      <div className="flex justify-between items-center mb-8">
        <h2
          className={`text-[10px] font-${isMinimal ? "black" : "bold"} uppercase tracking-[0.3em] text-black ${isMinimal ? "italic" : ""} flex items-center gap-2`}
        >
          {!isMinimal && <Box size={14} />}{" "}
          {isMinimal ? "Logistics" : "Logistics / Variants"}
        </h2>
        <button
          type="button"
          onClick={() =>
            appendVariant({
              size: "",
              color: "",
              colorCode: "#000000",
              stock: 0,
            })
          }
          className={
            isMinimal
              ? "text-[10px] font-bold uppercase tracking-widest border-b border-black pb-0.5 hover:text-gray-400 hover:border-gray-400 transition-all"
              : "text-[9px] font-bold uppercase tracking-widest bg-black text-white px-3 py-1"
          }
        >
          {isMinimal ? "Add Variant" : "Add"}
        </button>
      </div>

      <div
        className={`space-y-${isMinimal ? "10" : "8"} ${isMinimal ? "max-h-[500px] overflow-y-auto pr-4 scrollbar-thin" : ""}`}
      >
        {variantFields.map((field, index) => (
          <div
            key={field.id}
            className={`relative pb-${isMinimal ? "10" : "8"} border-b border-gray-${isMinimal ? "100" : "200"} last:border-0 last:pb-0 group`}
          >
            <div
              className={`grid grid-cols-2 gap-${isMinimal ? "x-8 gap-y-6" : "4"}`}
            >
              <div className={`space-y-${isMinimal ? "2" : "1"}`}>
                <label className="text-[8px] font-bold uppercase text-muted-foreground tracking-widest">
                  Size
                </label>
                <Input
                  {...register(`variants.${index}.size`)}
                  className={`h-8 rounded-none border-gray-${isMinimal ? "100" : "200"} text-xs ${isMinimal ? "font-medium focus:border-black transition-colors" : ""}`}
                />
              </div>
              <div className={`space-y-${isMinimal ? "2" : "1"}`}>
                <label className="text-[8px] font-bold uppercase text-muted-foreground tracking-widest">
                  {isMinimal ? "In Stock" : "Initial Stock"}
                </label>
                <Input
                  type="number"
                  {...register(`variants.${index}.stock`)}
                  className={`h-8 rounded-none border-gray-${isMinimal ? "100" : "200"} text-xs font-mono ${isMinimal ? "focus:border-black transition-colors" : ""}`}
                />
              </div>
              <div className={`space-y-${isMinimal ? "2" : "1"}`}>
                <label className="text-[8px] font-bold uppercase text-muted-foreground tracking-widest">
                  Color Label
                </label>
                <Input
                  {...register(`variants.${index}.color`)}
                  className={`h-8 rounded-none border-gray-${isMinimal ? "100" : "200"} text-xs ${isMinimal ? "focus:border-black transition-colors" : ""}`}
                />
              </div>
              <div className={`space-y-${isMinimal ? "2" : "1"}`}>
                <label className="text-[8px] font-bold uppercase text-muted-foreground tracking-widest">
                  {isMinimal ? "HEX Code" : "Hex Code"}
                </label>
                <div className="flex gap-2">
                  {/* Input type COLOR */}
                  <Input
                    type="color"
                    {...register(`variants.${index}.colorCode`)}
                    // Force la mise à jour immédiate pour l'autre input
                    onChange={(e) => {
                      setValue(`variants.${index}.colorCode`, e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                    className={`w-8 h-8 ${isMinimal ? "p-0 border-none bg-transparent" : "p-0.5 border-gray-200"} cursor-pointer rounded-none`}
                  />

                  {/* Input type TEXT */}
                  <Input
                    {...register(`variants.${index}.colorCode`)}
                    // Force la mise à jour immédiate pour le sélecteur de couleur
                    onChange={(e) => {
                      setValue(`variants.${index}.colorCode`, e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                    placeholder="#000000"
                    className={`h-8 rounded-none border-gray-${isMinimal ? "100" : "200"} text-[10px] font-mono`}
                  />
                </div>
              </div>
            </div>
            {variantFields.length > 1 && (
              <button
                type="button"
                onClick={() => removeVariant(index)}
                className={`absolute -right-2 top-0 text-gray-${isMinimal ? "200" : "300"} ${isMinimal ? "hover:text-black" : "hover:text-red-500"} opacity-0 group-hover:opacity-100 transition-all`}
              >
                <Trash2 size={12} />
              </button>
            )}
          </div>
        ))}
      </div>

      <div
        className={`flex items-center justify-between p-${isMinimal ? "6" : "4"} bg-white border border-gray-100 ${isMinimal ? "mb-8 mt-0" : "mt-6 mb-6"}`}
      >
        <div className={`space-y-${isMinimal ? "1" : "0.5"}`}>
          <label
            className={`text-[10px] font-${isMinimal ? "black" : "bold"} uppercase tracking-widest text-black`}
          >
            {isMinimal ? "Featured Status" : "Featured Product"}
          </label>
          <p
            className={`text-[9px] text-muted-foreground uppercase ${isMinimal ? "italic" : ""}`}
          >
            {isMinimal
              ? "Promote on homepage showcase"
              : "Display on home page collection"}
          </p>
        </div>
        <Switch
          checked={!!isFeatured}
          onCheckedChange={(checked) => setValue("isFeatured", checked)}
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className={`w-full ${isMinimal ? "h-14 mt-0" : "py-6 mt-6"} bg-black text-white rounded-none uppercase text-[10px] font-bold tracking-[0.${isMinimal ? "3" : "2"}em] hover:bg-${isMinimal ? "zinc" : "gray"}-800 transition-all`}
      >
        {isSubmitting ? "Processing..." : "Commit to Archive"}
      </Button>
    </div>
  );
}
