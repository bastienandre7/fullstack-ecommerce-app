"use server";

import { checkAdminStatus } from "@/lib/actions/admin";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getCategories() {
  await checkAdminStatus();

  return await prisma.category.findMany({
    orderBy: { name: "asc" },
  });
}

export async function adminCreateCategory(name: string) {
  await checkAdminStatus();

  try {
    const category = await prisma.category.create({
      data: { name },
    });
    return { success: true, category };
  } catch (err) {
    console.error(err);
    return { error: "Category already exists or something went wrong" };
  }
}

export async function adminDeleteCategory(id: string) {
  await checkAdminStatus();

  try {
    const productsCount = await prisma.product.count({
      where: { categoryId: id },
    });

    if (productsCount > 0) {
      return {
        error: `Cannot delete : ${productsCount} product(s) are still linked to this category.`,
      };
    }

    await prisma.category.delete({
      where: { id },
    });

    revalidatePath("/admin/categories");
    revalidatePath("/shop");

    return { success: true };
  } catch (err) {
    console.error("[DELETE_CATEGORY_ERROR]", err);
    return { error: "Error deleting category" };
  }
}
