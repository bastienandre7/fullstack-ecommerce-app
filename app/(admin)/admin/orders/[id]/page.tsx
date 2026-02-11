import { getAdminOrderById } from "@/lib/actions/admin/orders";
import { format } from "date-fns";
import { ArrowLeft, Hash, MapPin, Package, User } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getAdminOrderById(id);

  if (!order) notFound();

  const total = order.orderItems.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0,
  );

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 border-b border-gray-100 pb-10">
        <div className="space-y-4">
          <Link
            href="/admin/orders"
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-black transition-colors"
          >
            <ArrowLeft size={12} /> Back to Registry
          </Link>
          <div className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground">
              Transaction ID
            </p>
            <h1 className="text-3xl font-medium uppercase tracking-tighter flex items-center gap-3">
              #{order.id.slice(-8)}
              <span
                className={`text-[10px] px-3 py-1 border ${
                  order.isPaid
                    ? "border-black text-black"
                    : "border-gray-200 text-muted-foreground"
                }`}
              >
                {order.isPaid ? "FULFILLED" : "PENDING"}
              </span>
            </h1>
          </div>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-[10px] font-bold uppercase tracking-widest">
            Acquisition Date
          </p>
          <p className="text-sm font-medium">
            {format(new Date(order.createdAt), "MMMM dd, yyyy")}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
        <div className="lg:col-span-8 space-y-10">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-2">
            <Package size={14} /> Manifest Items
          </h2>

          <div className="divide-y divide-gray-100 border-t border-b border-gray-100">
            {order.orderItems.map((item) => (
              <div
                key={item.id}
                className="py-8 flex justify-between items-center group"
              >
                <div className="space-y-2">
                  <p className="text-xl font-light italic tracking-tight group-hover:translate-x-1 transition-transform">
                    {item.product.name}
                  </p>
                  <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground italic">
                    <span>Size: {item.variant?.size || "OS"}</span>
                    <span>Color: {item.variant?.color || "Neutral"}</span>
                    <span>Qty: {item.quantity}</span>
                  </div>
                </div>
                <p className="text-sm font-bold tracking-tighter">
                  ${(Number(item.price) * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4">
            <div className="w-full sm:w-64 space-y-3">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                <span>Shipping & Handling</span>
                <span>
                  {order.shippingCost > 0
                    ? `$${order.shippingCost.toFixed(2)}`
                    : "FREE"}
                </span>
              </div>

              <div className="flex justify-between text-xl font-medium pt-4 border-t border-gray-100 text-black">
                <span className="uppercase tracking-tighter italic">Total</span>
                <span>${order.totalPrice.toFixed(2)}</span>
              </div>

              <p className="text-[8px] font-bold uppercase tracking-tighter text-muted-foreground text-right">
                Amount Captured via Stripe
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-12">
          <section className="space-y-6">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2">
              <User size={14} /> Identity
            </h3>
            <div className="p-6 bg-[#FAFAFA] space-y-1">
              <p className="text-xs font-bold uppercase tracking-widest">
                {order.user.name}
              </p>
              <p className="text-[11px] text-muted-foreground">
                {order.user.email}
              </p>
              <p className="text-[9px] text-muted-foreground pt-2 tracking-tighter font-mono">
                UID: {order.user.id}
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2">
              <MapPin size={14} /> Shipping Registry
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
                  Destination
                </p>
                <p className="text-sm italic leading-relaxed text-gray-600">
                  {order.address || "Pending Address Verification"}
                </p>
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
                  Contact Signal
                </p>
                <p className="text-sm font-medium">
                  {order.phone || "No registry found"}
                </p>
              </div>
            </div>
          </section>

          <section className="pt-8 border-t border-gray-100">
            <div className="flex items-center gap-2 text-muted-foreground italic text-[10px] tracking-widest uppercase">
              <Hash size={12} /> Digital Receipt Verified
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
