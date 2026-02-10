"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductFormInput } from "@/lib/validators/product";
import { ImageIcon, Plus, Trash2 } from "lucide-react";
import { Control, UseFormRegister, useFieldArray } from "react-hook-form";

interface ImageSectionProps {
  control: Control<ProductFormInput>;
  register: UseFormRegister<ProductFormInput>;
  variant?: "default" | "minimal";
}

export function ImageSection({
  control,
  register,
  variant = "default",
}: ImageSectionProps) {
  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control,
    name: "images",
  });

  const isMinimal = variant === "minimal";

  return (
    <section
      className={
        isMinimal
          ? "space-y-8 pt-10 border-t border-gray-50"
          : "space-y-6 pt-6 border-t border-gray-50"
      }
    >
      <div className="flex justify-between items-center">
        <h2
          className={`text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2`}
        >
          {isMinimal ? (
            "02. Assets"
          ) : (
            <>
              <ImageIcon size={14} /> Asset Gallery
            </>
          )}
        </h2>
        <Button
          type="button"
          variant={isMinimal ? "ghost" : "ghost"}
          onClick={() => appendImage({ url: "" })}
          className={
            isMinimal
              ? "text-[10px] font-bold uppercase text-black hover:opacity-50 transition-opacity flex items-center gap-2 hover:bg-transparent"
              : "text-[9px] font-bold uppercase tracking-widest"
          }
        >
          {isMinimal ? (
            <>
              <Plus size={14} /> Add Asset
            </>
          ) : (
            "+ Add URL"
          )}
        </Button>
      </div>
      <div className={`grid grid-cols-1 ${isMinimal ? "gap-4" : "gap-3"}`}>
        {imageFields.map((field, index) => (
          <div
            key={field.id}
            className={`flex gap-2 group ${isMinimal ? "items-center gap-4" : ""}`}
          >
            {isMinimal && (
              <span className="text-[9px] font-mono text-gray-300">
                [{index + 1}]
              </span>
            )}
            <Input
              {...register(`images.${index}.url`)}
              placeholder={isMinimal ? "URL" : "https://..."}
              className={
                isMinimal
                  ? "rounded-none border-x-0 border-t-0 border-b-gray-100 px-0 focus-visible:ring-0 font-mono text-[11px]"
                  : "rounded-none border-gray-100 font-mono text-[11px]"
              }
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeImage(index)}
              className={`text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all ${isMinimal ? "hover:text-black hover:bg-transparent" : ""}`}
            >
              <Trash2 size={14} />
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
