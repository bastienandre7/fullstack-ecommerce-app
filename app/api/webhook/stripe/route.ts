import { mailer } from "@/lib/mails";
import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const headerList = await headers();
  const signature = headerList.get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (error) {
    console.error("⚠️  Webhook signature verification failed.", error);
    return new NextResponse(`Webhook Error`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    const orderId = session.metadata?.orderId;
    const paymentIntentId = session.payment_intent as string;

    let receiptUrl = null;
    if (paymentIntentId) {
      const paymentIntent =
        await stripe.paymentIntents.retrieve(paymentIntentId);
      const chargeId = paymentIntent.latest_charge as string;
      if (chargeId) {
        const charge = await stripe.charges.retrieve(chargeId);
        receiptUrl = charge.receipt_url;
      }
    }

    const totalFinal = session.amount_total ? session.amount_total / 100 : 0;
    const shipping = session.shipping_cost?.amount_total
      ? session.shipping_cost.amount_total / 100
      : 0;

    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        isPaid: true,
        status: "PREPARING",
        shippingCost: shipping,
        totalPrice: totalFinal,
        stripeSessionId: session.id,
        receiptUrl: receiptUrl,
        address: [
          session.customer_details?.address?.line1,
          session.customer_details?.address?.line2,
          session.customer_details?.address?.postal_code,
          session.customer_details?.address?.city,
          session.customer_details?.address?.country,
        ]
          .filter(Boolean)
          .join(", "),
        phone: session.customer_details?.phone || "",
      },
      include: {
        orderItems: true,
        user: true,
      },
    });

    const updateStockPromises = order.orderItems.map(async (item) => {
      if (item.variantId) {
        const updatedVariant = await prisma.variant.update({
          where: { id: item.variantId },
          data: {
            stock: { decrement: item.quantity },
          },
          include: {
            product: true,
          },
        });

        const LOW_STOCK_THRESHOLD = 10;

        if (updatedVariant.stock <= LOW_STOCK_THRESHOLD) {
          try {
            const variantLabel =
              `${updatedVariant.color || ""} ${updatedVariant.size || ""}`.trim() ||
              "Default";

            await mailer.sendLowStockAlert(
              updatedVariant.product.name,
              variantLabel,
              updatedVariant.stock,
            );

            console.log(
              `Inventory alert sent for ${updatedVariant.product.name}`,
            );
          } catch (error) {
            console.error("Failed to send stock alert email:", error);
          }
        }

        return updatedVariant;
      }
    });

    await Promise.all(updateStockPromises);

    if (order.user.email) {
      try {
        await mailer.sendOrderConfirmation(
          order.user.email,
          order.id,
          totalFinal,
        );

        await mailer.sendAdminAlert(order.id, totalFinal);
      } catch (mailError) {
        console.error("📧 Mail delivery failed:", mailError);
      }
    }
  }

  return new NextResponse(null, { status: 200 });
}
