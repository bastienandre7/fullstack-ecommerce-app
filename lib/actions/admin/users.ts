"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { checkAdminStatus } from "./index";

export async function getAdminUsers() {
  await checkAdminStatus();
  return await prisma.user.findMany({
    include: { orders: { where: { isPaid: true }, select: { id: true } } },
    orderBy: { createdAt: "desc" },
  });
}

export async function getAdminUserById(id: string) {
  await checkAdminStatus();
  return await prisma.user.findUnique({
    where: { id },
    include: { orders: { orderBy: { createdAt: "desc" } } },
  });
}

export async function updateAdminUser(
  id: string,
  data: { role: "USER" | "ADMIN"; name?: string },
) {
  await checkAdminStatus();
  try {
    await prisma.user.update({ where: { id }, data });
    revalidatePath(`/admin/users/${id}`);
    return { success: true };
  } catch (error) {
    console.error("[UPDATE_ADMIN_USER_ERROR]", error);
    return { error: "Failed to update user" };
  }
}
