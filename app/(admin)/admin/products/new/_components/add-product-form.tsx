"use client";

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
import { getCategories } from "@/lib/actions/admin/categories";
import { adminCreateProduct } from "@/lib/actions/admin/products";
import { ProductFormInput, ProductSchema } from "@/lib/validators/product";
import { Category } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, useWatch, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

export function AddProductForm() {
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
      name: "",
      description: "",
      price: 0,
      isFeatured: false,
      categoryId: "",
      images: [{ url: "" }],
      variants: [{ size: "", color: "", colorCode: "#000000", stock: 0 }],
    },
  });

  const categoryId = useWatch({ control: form.control, name: "categoryId" });

  const onSubmit: SubmitHandler<ProductFormInput> = async (values) => {
    const formattedData = {
      ...values,
      price: Math.round(Number(values.price) * 100),
    };
    const result = ProductSchema.safeParse(formattedData);

    if (!result.success) {
      toast.error("Invalid form data");
      return;
    }

    const res = await adminCreateProduct(result.data);

    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("Product created!");
      router.push("/admin/products");
      router.refresh();
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex justify-between items-end border-b border-gray-100 pb-8 mb-12">
        <div className="space-y-4">
          <Link
            href="/admin/products"
            className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-black flex items-center gap-2"
          >
            <ArrowLeft size={12} /> Catalog
          </Link>
          <h1 className="text-4xl font-medium uppercase tracking-tighter">
            New Entry
          </h1>
        </div>
      </div>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-12 gap-16"
      >
        <div className="lg:col-span-7 space-y-12">
          <section className="space-y-6">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
              Essential Details
            </h2>
            <div className="space-y-4">
              <Input
                {...form.register("name")}
                placeholder="PRODUCT NAME"
                className="text-2xl font-light tracking-tight border-none px-0 focus-visible:ring-0 placeholder:text-muted-foreground pl-2"
              />
              <div className="grid grid-cols-2 gap-8 pt-4">
                <div className="space-y-2">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                    Unit Price ($)
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    {...form.register("price")}
                    className="rounded-none border-gray-100 font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                      Category
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsDialogOpen(true)}
                      className="text-[9px] font-bold uppercase text-muted-foreground hover:text-black transition-colors underline underline-offset-4"
                    >
                      New Category +
                    </button>
                  </div>
                  <Select
                    onValueChange={(v) => form.setValue("categoryId", v)}
                    value={categoryId}
                  >
                    <SelectTrigger className="rounded-none border-gray-100">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem
                          key={cat.id}
                          value={cat.id}
                          className="text-xs uppercase tracking-widest"
                        >
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2 pt-4">
                <label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                  Description
                </label>
                <Textarea
                  {...form.register("description")}
                  rows={6}
                  className="rounded-none border-gray-100 resize-none placeholder:italic"
                  placeholder="Narrative for the product..."
                />
              </div>
            </div>
          </section>

          <ImageSection control={form.control} register={form.register} />
        </div>

        <div className="lg:col-span-5">
          <VariantSection
            control={form.control}
            register={form.register}
            setValue={form.setValue}
            isSubmitting={form.formState.isSubmitting}
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
