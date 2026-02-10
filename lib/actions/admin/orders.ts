"use server";

import { OrderStatus } from "@/app/generated/prisma/enums";
import { checkAdminStatus } from "@/lib/actions/admin";
import { mailer } from "@/lib/mails";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getAdminOrders() {
  await checkAdminStatus();
  return await prisma.order.findMany({
    include: { user: true, orderItems: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus,
  trackingNumber?: string,
) {
  const updatedOrder = await prisma.order.update({
    where: { id: orderId },
    data: {
      status,
      trackingNumber: trackingNumber ?? undefined,
    },
    include: { user: true },
  });

  if (status === "SHIPPED" && updatedOrder.user.email) {
    await mailer.sendShippingNotification(updatedOrder.user.email, orderId);
  }

  revalidatePath("/admin/orders");
}

export async function getAdminOrderById(id: string) {
  await checkAdminStatus();
  return await prisma.order.findUnique({
    where: { id },
    include: {
      user: true,
      orderItems: { include: { product: true, variant: true } },
    },
  });
}
