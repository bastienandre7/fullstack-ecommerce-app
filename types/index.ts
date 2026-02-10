// types/index.ts
export interface CartItem {
  id: string; // ID unique (ex: productId-variantId)
  productId: string;
  variantId: string; // Crucial pour Stripe et les stocks
  name: string; // Nom formaté (ex: "T-shirt - Noir / L")
  price: number;
  image: string;
  quantity: number;
}

export interface ProductVariant {
  id?: string;
  size: string | null;
  color: string | null;
  colorCode: string | null;
  price: number | null;
  stock: number;
}
export interface ProductWithExtras {
  id: string;
  name: string;
  slug: string;
  price: number;
  images: { url: string }[];
  category: { name: string } | string;
  variants?: { size: string }[]; // Optionnel pour extraire les tailles
}
