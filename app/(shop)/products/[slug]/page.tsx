import { ProductGallery } from "@/app/(shop)/products/[slug]/_components/product-gallery";
import { RelatedProducts } from "@/app/(shop)/products/[slug]/_components/related-products";
import { VariantSelector } from "@/app/(shop)/products/[slug]/_components/variant-selector";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { getProductBySlug } from "@/lib/actions/products";
import { formatPrice } from "@/lib/utils";
import { ProductVariant } from "@/types";
import { ArrowLeft, RefreshCw, ShieldCheck, Truck } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) return { title: "Product Not Found" };

  return {
    title: product.name,
    description: product.description.slice(0, 160),
    openGraph: {
      title: `${product.name} | PRISM`,
      description: product.description,
      type: "article",
      images: [
        {
          url: product.images[0]?.url || "/placeholder.png",
          width: 1200,
          height: 1500,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductDetailsPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const serializedVariants: ProductVariant[] = product.variants.map((v) => ({
    id: v.id,
    size: v.size,
    color: v.color,
    colorCode: v.colorCode,
    price: v.price ? Number(v.price) : null,
    stock: v.stock,
  }));

  const serializedProduct = {
    id: product.id,
    name: product.name,
    description: product.description,
    price: Number(product.price),
    images: product.images.map((img) => ({ url: img.url })),
    category: product.category,
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto pt-40 pb-32 px-6">
        {/* Breadcrumb minimaliste */}
        <Link
          href="/#collection"
          className="group inline-flex items-center text-[10px] font-bold uppercase tracking-[0.3em] mb-12 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 h-3 w-3 transition-transform group-hover:-translate-x-1" />
          Back to collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 items-start">
          {/* Galerie Image (Prend 7 colonnes) */}
          <div className="lg:col-span-7">
            <ProductGallery
              images={serializedProduct.images}
              name={serializedProduct.name}
            />
          </div>

          {/* Infos Produit (Prend 5 colonnes) */}
          <div className="lg:col-span-5 flex flex-col lg:sticky lg:top-28">
            <div className="space-y-8 mb-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground">
                {serializedProduct.category.name}
              </p>
              <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-foreground leading-[1]">
                {serializedProduct.name}
              </h1>

              <p className="inline-block border-b border-black pb-2 text-2xl font-light">
                {formatPrice(product.price)}
              </p>
            </div>

            <Separator className="mb-10" />

            {/* Variant Selector & CTA */}
            <div className="mb-12">
              <VariantSelector
                variants={serializedVariants}
                product={serializedProduct}
              />
            </div>

            {/* Accordion ou Simple section Description */}
            <div className="border-t border-gray-200 mt-10">
              <Accordion type="single" collapsible className="w-full">
                {/* SECTION DESCRIPTION */}
                <AccordionItem
                  value="description"
                  className="border-b border-gray-100"
                >
                  <AccordionTrigger className="hover:no-underline py-6">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
                      Description
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {serializedProduct.description}
                    </p>
                  </AccordionContent>
                </AccordionItem>

                {/* SECTION SHIPPING & DETAILS */}
                <AccordionItem
                  value="shipping"
                  className="border-b border-gray-100"
                >
                  <AccordionTrigger className="hover:no-underline py-6">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
                      Shipping & Returns
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-6 pb-6 pt-2">
                      {/* Global Express Shipping */}
                      <div className="flex items-center gap-4 group">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-100 group-hover:bg-black group-hover:text-white transition-colors">
                          <Truck className="h-3 w-3" strokeWidth={1.5} />
                        </div>
                        <div>
                          <p className="text-[9px] font-bold uppercase tracking-widest">
                            Global Express Shipping
                          </p>
                          <p className="text-[9px] text-muted-foreground uppercase tracking-widest">
                            2-4 Business Days
                          </p>
                        </div>
                      </div>

                      {/* Returns */}
                      <div className="flex items-center gap-4 group">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-100 group-hover:bg-black group-hover:text-white transition-colors">
                          <RefreshCw className="h-3 w-3" strokeWidth={1.5} />
                        </div>
                        <div>
                          <p className="text-[9px] font-bold uppercase tracking-widest">
                            Returns & Exchanges
                          </p>
                          <p className="text-[9px] text-muted-foreground uppercase tracking-widest">
                            Complimentary within 14 days
                          </p>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* SECTION AUTHENTICITY */}
                <AccordionItem value="authenticity" className="border-none">
                  <AccordionTrigger className="hover:no-underline py-6">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
                      Authenticity
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex items-center gap-4 group pb-6 pt-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-100 group-hover:bg-black group-hover:text-white transition-colors">
                        <ShieldCheck className="h-3 w-3" strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-widest">
                          Authenticity Guaranteed
                        </p>
                        <p className="text-[9px] text-muted-foreground uppercase tracking-widest">
                          Certified Studio Piece
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
      <RelatedProducts
        categoryId={product.categoryId}
        currentProductId={product.id}
      />
    </div>
  );
}
