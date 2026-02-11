import { ProductCard } from "@/components/ui/product-card";
import { getAllProducts } from "@/lib/actions/products";

export async function AllProducts() {
  const products = await getAllProducts();

  if (products.length === 0) return null;

  return (
    <section id="collection" className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="space-y-4 mb-16">
          <h2 className="text-4xl md:text-6xl font-medium uppercase tracking-tight leading-none text-black">
            The <span className="text-gray-400">Collection</span>
          </h2>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">
            Browse our essential pieces
          </p>
          <div className="h-[1px] w-full bg-gray-100 mt-8" />{" "}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
