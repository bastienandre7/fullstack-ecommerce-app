import { ProductCard } from "@/components/ui/product-card";
import { getRelatedProducts } from "@/lib/actions/products";

export async function RelatedProducts({
  categoryId,
  currentProductId,
}: {
  categoryId: string;
  currentProductId: string;
}) {
  const products = await getRelatedProducts(categoryId, currentProductId);

  if (products.length === 0) return null;

  return (
    <section className="border-t border-gray-100 pt-24 pb-16">
      <div className="container mx-auto px-6">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-12 text-center">
          You might also like
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
