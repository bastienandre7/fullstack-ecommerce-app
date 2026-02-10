import { EditProductForm } from "@/app/(admin)/admin/products/[productId]/_components/edit-product-form";
import { getAdminProductById } from "@/lib/actions/admin/products";
import { notFound } from "next/navigation";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const product = await getAdminProductById(productId);

  if (!product) {
    notFound();
  }

  return (
    <div className="animate-in fade-in duration-700">
      <EditProductForm product={product} />
    </div>
  );
}
