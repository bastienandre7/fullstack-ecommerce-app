import { DeleteProductButton } from "@/app/(admin)/admin/products/_components/delete-product-button";
import { getAdminProducts } from "@/lib/actions/admin/products";
import { formatPrice } from "@/lib/utils";
import { Layers, Pencil, Plus } from "lucide-react";
import Link from "next/link";

export default async function AdminProductsPage() {
  const products = await getAdminProducts();

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      <div className="flex justify-between items-end border-b border-gray-100 pb-8">
        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground">
            Catalogue
          </p>
          <h1 className="text-4xl font-medium uppercase tracking-tighter text-black">
            Inventory
          </h1>
        </div>
        <Link
          href="/admin/products/new"
          className="bg-black text-white px-6 py-3 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-gray-900 transition-all"
        >
          <Plus size={14} /> Add Product
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="py-4 text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                Reference
              </th>
              <th className="py-4 text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground text-center">
                Category
              </th>
              <th className="py-4 text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground text-center">
                Variants
              </th>
              <th className="py-4 text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground text-center">
                Availability
              </th>
              <th className="py-4 text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground text-right">
                Base Price
              </th>
              <th className="py-4 text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products.map((product) => {
              const totalStock = product.variants.reduce(
                (acc, v) => acc + v.stock,
                0,
              );
              const variantCount = product.variants.length;

              return (
                <tr
                  key={product.id}
                  className="group hover:bg-[#FAFAFA] transition-colors"
                >
                  <td className="py-6">
                    <p className="text-[11px] font-bold uppercase tracking-tight text-black">
                      {product.name}
                    </p>
                    <p className="text-[9px] text-gray-400 font-mono">
                      ID: {product.id.slice(-6)}
                    </p>
                  </td>
                  <td className="py-6 text-center">
                    <span className="text-[10px] font-medium uppercase tracking-tighter text-gray-500 border border-gray-100 px-2 py-0.5">
                      {product.category.name}
                    </span>
                  </td>
                  <td className="py-6 text-center text-gray-400">
                    <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold">
                      <Layers size={12} /> {variantCount}
                    </div>
                  </td>
                  <td className="py-6 text-center">
                    <StockBadge stock={totalStock} />
                  </td>
                  <td className="py-6 text-right text-[11px] font-bold tracking-tighter text-black">
                    {formatPrice(product.price)}
                  </td>
                  <td className="py-6 text-right">
                    <div className="flex justify-end items-center gap-4">
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="text-muted-foreground hover:text-black transition-colors"
                      >
                        <Pencil size={14} />
                      </Link>
                      <DeleteProductButton id={product.id} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StockBadge({ stock }: { stock: number }) {
  if (stock === 0) {
    return (
      <span className="text-[8px] font-bold uppercase tracking-tighter text-red-500 border border-red-100 px-2 py-0.5 bg-red-50">
        Sold Out
      </span>
    );
  }
  if (stock < 10) {
    return (
      <span className="text-[8px] font-bold uppercase tracking-tighter text-orange-500 border border-orange-100 px-2 py-0.5">
        Low Stock ({stock})
      </span>
    );
  }
  return (
    <span className="text-[8px] font-bold uppercase tracking-tighter text-gray-400 border border-gray-100 px-2 py-0.5 italic">
      In Reserve ({stock})
    </span>
  );
}
