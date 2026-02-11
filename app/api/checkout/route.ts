import { auth } from "@/auth";
import {
  ALLOWED_SHIPPING_COUNTRIES,
  EXPRESS_SHIPPING_COST,
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_DELIVERY_ESTIMATES,
  STANDARD_SHIPPING_COST,
} from "@/lib/constants/shipping";
import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { CartItem } from "@/types";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  try {
    const { items }: { items: CartItem[] } = await req.json();
    const sessionAuth = await auth();

    if (!sessionAuth?.user?.id || !sessionAuth?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { id: sessionAuth.user.id },
    });

    if (!dbUser) {
      return new NextResponse("User not found in database", { status: 403 });
    }

    const variantIds = items.map((item) => item.variantId).filter(Boolean);
    const dbVariants = await prisma.variant.findMany({
      where: { id: { in: variantIds } },
      include: { product: { include: { images: true } } },
    });

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    const orderItemsData = [];

    let subtotalCents = 0;

    for (const item of items) {
      const variant = dbVariants.find((v) => v.id === item.variantId);
      if (!variant) continue;

      if (variant.stock < item.quantity) {
        return new NextResponse(
          `Insufficient stock for ${variant.product.name}`,
          { status: 400 },
        );
      }

      const unitAmountCents = variant.price
        ? Number(variant.price)
        : Number(variant.product.price);

      subtotalCents += unitAmountCents * item.quantity;

      line_items.push({
        quantity: item.quantity,
        price_data: {
          currency: "usd",
          product_data: {
            name: `${variant.product.name} ${variant.size || ""} ${variant.color || ""}`.trim(),
            images: variant.product.images[0]?.url
              ? [variant.product.images[0].url]
              : [],
          },
          unit_amount: unitAmountCents,
        },
      });

      orderItemsData.push({
        productId: variant.productId,
        variantId: variant.id,
        quantity: item.quantity,
        price: unitAmountCents / 100,
      });
    }

    const isFreeShipping = subtotalCents >= FREE_SHIPPING_THRESHOLD;

    const order = await prisma.order.create({
      data: {
        userId: dbUser.id,
        isPaid: false,
        orderItems: {
          create: orderItemsData,
        },
      },
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      customer_email: sessionAuth.user.email ?? undefined,
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: isFreeShipping ? 0 : STANDARD_SHIPPING_COST,
              currency: "usd",
            },
            display_name: isFreeShipping
              ? "Free Standard Shipping"
              : "Standard Studio Delivery",
            delivery_estimate: SHIPPING_DELIVERY_ESTIMATES.standard,
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: EXPRESS_SHIPPING_COST,
              currency: "usd",
            },
            display_name: "Express / International",
            delivery_estimate: SHIPPING_DELIVERY_ESTIMATES.express,
          },
        },
      ],
      shipping_address_collection: {
        allowed_countries: ALLOWED_SHIPPING_COUNTRIES,
      },
      phone_number_collection: { enabled: true },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/?canceled=1`,
      metadata: {
        orderId: order.id,
      },
    });

    await prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: session.id },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    console.error("[STRIPE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
