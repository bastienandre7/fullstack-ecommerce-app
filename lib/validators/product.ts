import { z } from "zod";

export const VariantSchema = z.object({
  id: z.string().optional(),
  size: z.string().optional().nullable(),
  color: z.string().optional().nullable(),
  colorCode: z.string().optional().nullable(),
  price: z.coerce.number().optional().nullable(),
  isFeatured: z.boolean().default(false),
  stock: z.coerce.number().int().min(0).default(0),
});

export const ProductSchema = z.object({
  name: z.string().min(1, "Requis"),
  description: z.string().min(1, "Requis"),
  price: z.coerce.number().min(0),
  isFeatured: z.boolean().default(false),
  categoryId: z.string().min(1, "Requis"),
  images: z.array(z.object({ url: z.string().url() })).min(1),
  variants: z.array(VariantSchema).default([]),
});

export type ProductFormInput = z.input<typeof ProductSchema>;
export type ProductFormValues = z.output<typeof ProductSchema>;
