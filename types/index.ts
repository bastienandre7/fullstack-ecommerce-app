export interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface ProductWithExtras {
  id: string;
  name: string;
  slug: string;
  price: number;
  images: { url: string }[];
  category: { name: string } | string;
  variants?: { size: string }[];
}

export interface ProductVariant {
  id?: string;
  size: string | null;
  color: string | null;
  colorCode: string | null;
  price: number | null;
  stock: number;
}

export interface ProductImage {
  id?: string;
  url: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  categoryId: string;
  category?: Category;
  images: ProductImage[];
  isFeatured: boolean;
  variants: ProductVariant[];
  createdAt: Date;
}
