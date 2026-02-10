"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function checkAdminStatus() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });

  if (user?.role !== "ADMIN") redirect("/");
  return user;
}

export async function getDashboardStats() {
  await checkAdminStatus();

  const paidOrders = await prisma.order.findMany({
    where: { isPaid: true },
    include: { orderItems: true },
  });

  const revenueCents = paidOrders.reduce((total, order) => {
    return (
      total +
      order.orderItems.reduce(
        (sum, item) => sum + Number(item.price) * item.quantity,
        0,
      )
    );
  }, 0);

  const monthlyRevenue: { [key: string]: number } = {};
  for (const order of paidOrders) {
    const month = order.createdAt.toLocaleString("fr-FR", { month: "short" });
    const orderAmount = order.orderItems.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0,
    );
    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + orderAmount;
  }

  return {
    revenue: revenueCents / 100,
    totalOrders: paidOrders.length,
    totalUsers: await prisma.user.count(),
    graphData: Object.entries(monthlyRevenue).map(([name, total]) => ({
      name,
      total: total / 100,
    })),
  };
}
