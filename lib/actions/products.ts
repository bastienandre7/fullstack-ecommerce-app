"use server";

import prisma from "@/lib/prisma";

export async function getAllProducts() {
  return await prisma.product.findMany({
    include: {
      category: true,
      images: { orderBy: { order: "asc" } },
      variants: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getProductBySlug(slug: string) {
  return await prisma.product.findUnique({
    where: { slug },
    include: {
      images: true,
      category: true,
      variants: true,
    },
  });
}

export async function getRelatedProducts(
  categoryId: string,
  currentProductId: string,
) {
  return await prisma.product.findMany({
    where: {
      categoryId,
      id: { not: currentProductId },
    },
    take: 4,
    include: {
      category: true,
      images: { orderBy: { order: "asc" } },
      variants: true,
    },
  });
}

export async function searchProducts(query: string) {
  if (!query || query.length < 2) return [];

  try {
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
          { category: { name: { contains: query, mode: "insensitive" } } },
        ],
      },
      select: {
        id: true,
        name: true,
        slug: true,
        category: {
          select: { name: true },
        },
        images: {
          take: 1,
          select: { url: true },
        },
      },
      take: 8,
    });

    return products.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      category: p.category.name,
      imageUrl: p.images[0]?.url || "",
    }));
  } catch (error) {
    console.error("Search Action Error:", error);
    return [];
  }
}
