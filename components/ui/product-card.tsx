// components/store/product-card.tsx
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  price: number; // En centimes (ex: 5000)
  category:
    | {
        name: string;
      }
    | string; // Gère l'objet Prisma ou une string simple
  images: { url: string }[];
  variants?: {
    id: string;
    size: string | null;
    stock: number;
  }[];
}

export function ProductCard({
  name,
  slug,
  price,
  images,
  category,
  variants = [],
}: ProductCardProps) {
  const mainImageUrl = images[0]?.url;
  const hoverImageUrl = images.length > 1 ? images[1]?.url : null;

  // Extraction du nom de la catégorie (objet ou string)
  const categoryName =
    typeof category === "string" ? category : category?.name || "Collection";

  // On filtre les tailles disponibles (stock > 0)
  const availableVariants = variants.filter((v) => v.stock > 0 && v.size);

  return (
    <div className="group relative flex flex-col bg-white transition-all">
      <Link
        href={`/products/${slug}`}
        className="relative aspect-[3/4] overflow-hidden bg-gray-100"
      >
        {mainImageUrl && (
          <Image
            src={mainImageUrl}
            alt={name}
            fill
            // Ajout du prop sizes
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover p-10 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${
              hoverImageUrl
                ? "group-hover:opacity-0 group-hover:scale-105"
                : "group-hover:scale-110"
            }`}
          />
        )}

        {hoverImageUrl && (
          <Image
            src={hoverImageUrl}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover opacity-0 group-hover:opacity-100 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] scale-110 group-hover:scale-100"
          />
        )}

        {/* SECTION TAILLES */}
        {availableVariants.length > 0 && (
          <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-20">
            <div className="flex flex-wrap justify-center gap-2">
              {availableVariants.map((v) => (
                <span
                  key={v.id}
                  className="bg-white/90 backdrop-blur-md text-[10px] font-bold py-2 px-3 min-w-[35px] text-center shadow-sm hover:bg-black hover:text-white transition-colors cursor-default"
                >
                  {v.size}
                </span>
              ))}
            </div>
          </div>
        )}
      </Link>

      <div className="flex flex-col pt-5 space-y-2">
        <div className="flex justify-between items-start">
          <div className="space-y-0.5">
            <p className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground font-medium">
              {categoryName}
            </p>
            <h3 className="text-sm font-medium text-black uppercase tracking-tight hover:text-gray-500 transition-colors">
              <Link href={`/products/${slug}`}>{name}</Link>
            </h3>
          </div>
          <span className="text-sm font-medium text-black tracking-tight">
            {formatPrice(price)}
          </span>
        </div>
      </div>
    </div>
  );
}
