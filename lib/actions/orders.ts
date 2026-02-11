"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function getUserOrders() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("You must be logged in to view your orders.");
  }

  return await prisma.order.findMany({
    where: {
      userId: session.user.id,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
          variant: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
