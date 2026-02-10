// app/api/checkout/route.ts
import { auth } from "@/auth";
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

    // 1. Validation de l'utilisateur en DB
    const dbUser = await prisma.user.findUnique({
      where: { id: sessionAuth.user.id },
    });

    if (!dbUser) {
      return new NextResponse("User not found in database", { status: 403 });
    }

    // 2. Récupération des variantes (Source de vérité)
    const variantIds = items.map((item) => item.variantId).filter(Boolean);
    const dbVariants = await prisma.variant.findMany({
      where: { id: { in: variantIds } },
      include: { product: { include: { images: true } } },
    });

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    const orderItemsData = [];

    // --- CALCUL DU SOUS-TOTAL POUR LA LIVRAISON ---
    let subtotalCents = 0;

    for (const item of items) {
      const variant = dbVariants.find((v) => v.id === item.variantId);
      if (!variant) continue;

      // Vérification Stock
      if (variant.stock < item.quantity) {
        return new NextResponse(
          `Stock insuffisant pour ${variant.product.name}`,
          { status: 400 },
        );
      }

      // Le prix est déjà un Int (centimes) en DB
      const unitAmountCents = variant.price
        ? Number(variant.price)
        : Number(variant.product.price);

      subtotalCents += unitAmountCents * item.quantity;

      // Stripe Line Items
      line_items.push({
        quantity: item.quantity,
        price_data: {
          currency: "usd", // Changé en EUR pour la cohérence
          product_data: {
            name: `${variant.product.name} ${variant.size || ""} ${variant.color || ""}`.trim(),
            images: variant.product.images[0]?.url
              ? [variant.product.images[0].url]
              : [],
          },
          unit_amount: unitAmountCents,
        },
      });

      // Prisma Order Items
      orderItemsData.push({
        productId: variant.productId,
        variantId: variant.id,
        quantity: item.quantity,
        price: unitAmountCents / 100, // On stocke en décimal dans OrderItem pour l'admin
      });
    }

    // --- LOGIQUE DE LIVRAISON GRATUITE ---
    const FREE_SHIPPING_THRESHOLD = 8000; // 80€
    const isFreeShipping = subtotalCents >= FREE_SHIPPING_THRESHOLD;

    // 3. Création de la commande
    const order = await prisma.order.create({
      data: {
        userId: dbUser.id,
        isPaid: false,
        orderItems: {
          create: orderItemsData,
        },
      },
    });

    // 4. Session Stripe
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      customer_email: sessionAuth.user.email ?? undefined,
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: isFreeShipping ? 0 : 500,
              currency: "usd",
            },
            display_name: isFreeShipping
              ? "Free Standard Shipping"
              : "Standard Studio Delivery",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 3 },
              maximum: { unit: "business_day", value: 5 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 1500,
              currency: "usd",
            },
            display_name: "Express / International",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 1 },
              maximum: { unit: "business_day", value: 2 },
            },
          },
        },
      ],
      shipping_address_collection: {
        allowed_countries: ["FR", "BE", "CH", "CA", "US", "GB"],
      },
      phone_number_collection: { enabled: true },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/shop?canceled=1`,
      metadata: {
        orderId: order.id,
      },
    });

    // 5. Update Order avec Stripe ID
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
