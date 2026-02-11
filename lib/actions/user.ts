"use server";

import { auth, signOut } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getUserInfos() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        createdAt: true,
      },
    });

    return user;
  } catch (error) {
    console.error("[GET_USER_INFOS_ERROR]", error);
    return null;
  }
}

export async function updateProfile(values: { name?: string; email?: string }) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Non autorisé" };

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: values.name,
        email: values.email,
      },
    });

    revalidatePath("/account");
    return { success: "Updated profile" };
  } catch (error) {
    console.error("[UPDATE_PROFILE_ERROR]", error);
    return { error: "Error updating profile" };
  }
}

export async function deleteAccount() {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  try {
    await prisma.user.delete({
      where: { id: session.user.id },
    });

    await signOut({ redirectTo: "/" });

    return { success: true };
  } catch (error) {
    console.error("[DELETE_ACCOUNT_ERROR]", error);
    return { error: "Error deleting account" };
  }
}
