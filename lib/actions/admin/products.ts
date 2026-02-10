"use server";

import { checkAdminStatus } from "@/lib/actions/admin";
import prisma from "@/lib/prisma";
import { ProductFormValues, ProductSchema } from "@/lib/validators/product";
import { revalidatePath } from "next/cache";
import slugify from "slugify";

export async function getAdminProducts() {
  await checkAdminStatus();
  return await prisma.product.findMany({
    include: { category: true, variants: true, images: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getAdminProductById(id: string) {
  await checkAdminStatus();
  const product = await prisma.product.findUnique({
    where: { id },
    include: { images: true, variants: true },
  });

  if (!product) return null;

  return {
    ...product,
    price: product.price / 100,
    images: product.images.map((img) => ({ id: img.id, url: img.url })),
    variants: product.variants.map((v) => ({
      ...v,
      price: v.price ? v.price / 100 : null,
    })),
  };
}

export async function adminCreateProduct(values: ProductFormValues) {
  await checkAdminStatus();
  const validatedFields = ProductSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Données invalides" };

  const { name, description, price, isFeatured, categoryId, images, variants } =
    validatedFields.data;

  try {
    const slug = slugify(name, { lower: true, strict: true });

    await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price: price,
        isFeatured: isFeatured,
        categoryId,
        images: {
          create: images.map((img, index) => ({
            url: img.url,
            order: index,
          })),
        },
        variants: {
          create: variants.map((v) => ({
            size: v.size || null,
            color: v.color || null,
            colorCode: v.colorCode || null,
            price: v.price ? v.price : null,
            stock: v.stock || 0,
          })),
        },
      },
    });

    revalidatePath("/admin/products");
    return { success: "Produit créé avec succès" };
  } catch (error) {
    console.error("[PRODUCT_CREATE_ERROR]:", error);
    return { error: "Une erreur est survenue lors de la création" };
  }
}

export async function adminUpdateProduct(
  id: string,
  values: ProductFormValues,
) {
  await checkAdminStatus();
  const validatedFields = ProductSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Champs invalides" };

  const { name, description, price, isFeatured, categoryId, images, variants } =
    validatedFields.data;

  try {
    const slug = slugify(name, { lower: true, strict: true });

    await prisma.product.update({
      where: { id },
      data: {
        name,
        slug,
        description,
        price: price,
        isFeatured: isFeatured,
        categoryId,
        images: {
          deleteMany: {},
          create: images.map((img, index) => ({
            url: img.url,
            order: index,
          })),
        },
        variants: {
          deleteMany: {},
          create: variants.map((v) => ({
            size: v.size || null,
            color: v.color || null,
            colorCode: v.colorCode || null,
            price: v.price ? v.price : null,
            stock: v.stock,
          })),
        },
      },
    });

    revalidatePath("/admin/products");
    revalidatePath(`/product/${slug}`);

    return { success: true };
  } catch (error) {
    console.error("[UPDATE_PRODUCT_ERROR]", error);
    return { error: "Erreur lors de la mise à jour" };
  }
}

export async function adminDeleteProduct(id: string) {
  await checkAdminStatus();
  try {
    await prisma.product.delete({
      where: { id },
    });

    revalidatePath("/admin/products");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Erreur lors de la suppression" };
  }
}
