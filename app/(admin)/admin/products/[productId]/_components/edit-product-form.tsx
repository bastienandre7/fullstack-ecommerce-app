"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, useWatch, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import { getCategories } from "@/lib/actions/admin/categories";
import { adminUpdateProduct } from "@/lib/actions/admin/products";
import { ProductFormInput, ProductSchema } from "@/lib/validators/product";

import { CategoryDialog } from "@/app/(admin)/admin/products/_components/category-dialog";
import { ImageSection } from "@/app/(admin)/admin/products/_components/image-section";
import { VariantSection } from "@/app/(admin)/admin/products/_components/variant-section";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Category, Product } from "@/types";

export function EditProductForm({ product }: { product: Product }) {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => toast.error("Error loading categories"));
  }, []);

  const form = useForm<ProductFormInput>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: product.name,
      description: product.description,
      price: product.price,
      isFeatured: product.isFeatured,
      categoryId: product.categoryId,
      images: product.images,
      variants: product.variants.map((v) => ({
        ...v,
        size: v.size ?? "",
        color: v.color ?? "",
        colorCode: v.colorCode ?? "#000000",
      })),
    },
  });

  const categoryId = useWatch({ control: form.control, name: "categoryId" });

  const onSubmit: SubmitHandler<ProductFormInput> = async (data) => {
    const toastId = toast.loading("Product update...");

    const formattedData = {
      ...data,
      price: Math.round(Number(data.price) * 100),
    };

    const result = ProductSchema.safeParse(formattedData);

    if (!result.success) {
      toast.error("Invalid data", { id: toastId });
      return;
    }

    const res = await adminUpdateProduct(product.id, result.data);

    if (res.error) {
      toast.error(res.error, { id: toastId });
    } else {
      toast.success("Updated product !", { id: toastId });
      router.push("/admin/products");
      router.refresh();
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12 animate-in fade-in duration-1000">
      <header className="flex justify-between items-end border-b border-gray-100 pb-10 mb-16">
        <div className="space-y-4">
          <Link
            href="/admin/products"
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-black transition-colors"
          >
            <ArrowLeft size={12} /> Return to Archive
          </Link>
          <h1 className="text-5xl font-light tracking-tighter uppercase">
            Edit Product
          </h1>
        </div>
      </header>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-12 gap-20"
      >
        <div className="lg:col-span-7 space-y-20">
          <section className="space-y-8">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
              01. Identity
            </h2>
            <div className="space-y-10">
              <Input
                {...form.register("name")}
                placeholder="Product Title"
                className="text-3xl font-light border-none pl-2 focus-visible:ring-0 placeholder:text-gray-200 tracking-tight"
              />

              <div className="grid grid-cols-2 gap-12 pt-4">
                <div className="space-y-3">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                    Unit Price ($)
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    {...form.register("price")}
                    className="rounded-none border-x-0 border-t-0 border-b-gray-100 pl-2 focus-visible:ring-0 font-mono"
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                      Category
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsDialogOpen(true)}
                      className="text-[9px] font-bold uppercase text-muted-foreground hover:text-black underline underline-offset-4"
                    >
                      New Category +
                    </button>
                  </div>
                  <Select
                    onValueChange={(v) => form.setValue("categoryId", v)}
                    value={categoryId}
                  >
                    <SelectTrigger className="rounded-none border-x-0 border-t-0 border-b-gray-100 px-2 focus-visible:ring-0 uppercase text-[11px] tracking-widest font-medium">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem
                          key={cat.id}
                          value={cat.id}
                          className="text-[11px] uppercase tracking-widest font-medium"
                        >
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                  Narrative
                </label>
                <Textarea
                  {...form.register("description")}
                  rows={8}
                  className="rounded-none border-gray-100 focus-visible:ring-0 resize-none p-4 text-sm leading-relaxed italic text-gray-600"
                  placeholder="The story behind this piece..."
                />
              </div>
            </div>
          </section>

          <ImageSection
            control={form.control}
            register={form.register}
            variant="minimal"
          />
        </div>

        <div className="lg:col-span-5">
          <VariantSection
            control={form.control}
            register={form.register}
            setValue={form.setValue}
            isSubmitting={form.formState.isSubmitting}
            variant="minimal"
          />
        </div>
      </form>

      <CategoryDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onCategoryCreated={(categoryId) =>
          form.setValue("categoryId", categoryId)
        }
        onCategoriesUpdate={setCategories}
      />
    </div>
  );
}
