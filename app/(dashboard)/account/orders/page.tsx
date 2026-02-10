import { getUserOrders } from "@/lib/actions/orders";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ExternalLink, Package } from "lucide-react";
import Link from "next/link";

// Helper pour mapper les labels de statut
const STATUS_LABELS = {
  UNPAID: "Payment Pending",
  PREPARING: "In Studio",
  SHIPPED: "Dispatched",
  DELIVERED: "Acquired",
  ARCHIVED: "Archived",
  CANCELLED: "Cancelled",
};

export default async function OrdersPage() {
  const orders = await getUserOrders();

  return (
    <div className="space-y-16">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-medium uppercase tracking-tighter text-black">
          Order History
        </h1>
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
          Trace your acquisitions and shipments
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="py-24 border-t border-b border-gray-100 flex flex-col items-center justify-center space-y-6">
          <Package className="h-8 w-8 text-gray-400" strokeWidth={1} />
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
            No orders found in your archive
          </p>
          <Link
            href="/#collection"
            className="text-[10px] font-bold uppercase tracking-[0.2em] underline underline-offset-8 text-black"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {orders.map((order) => (
            <div key={order.id} className="py-12 group">
              {/* Meta Info & Status Tracker */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-10">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-black">
                      ID: {order.id.slice(-8).toUpperCase()}
                    </span>
                    <span className="text-[10px] text-gray-500 font-medium uppercase tracking-widest">
                      — {format(new Date(order.createdAt), "dd MMMM yyyy")}
                    </span>
                  </div>

                  {/* Minimalist Status Tracker */}
                  <div className="flex items-center gap-6">
                    {["PREPARING", "SHIPPED", "DELIVERED"].map(
                      (step, idx, arr) => {
                        const isCurrent = order.status === step;
                        // Logique pour savoir si l'étape est passée
                        const statusOrder = [
                          "UNPAID",
                          "PREPARING",
                          "SHIPPED",
                          "DELIVERED",
                          "ARCHIVED",
                        ];
                        const isPast =
                          statusOrder.indexOf(order.status) >
                          statusOrder.indexOf(step);

                        return (
                          <div key={step} className="flex items-center gap-4">
                            <span
                              className={cn(
                                "text-[9px] font-bold uppercase tracking-[0.2em] transition-colors",
                                isCurrent || isPast
                                  ? "text-black underline"
                                  : "text-muted-foreground",
                              )}
                            >
                              {
                                STATUS_LABELS[
                                  step as keyof typeof STATUS_LABELS
                                ]
                              }
                            </span>
                            {idx < arr.length - 1 && (
                              <div
                                className={cn(
                                  "w-4 h-[1px]",
                                  isPast ? "bg-black" : "bg-gray-200",
                                )}
                              />
                            )}
                          </div>
                        );
                      },
                    )}
                  </div>
                </div>

                <div className="text-left md:text-right space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">
                    Summary
                  </p>

                  {/* Détail Shipping si existant */}
                  {order.shippingCost > 0 && (
                    <p className="text-[10px] font-medium uppercase text-muted-foreground">
                      Shipping: €{order.shippingCost.toFixed(2)}
                    </p>
                  )}

                  {/* Montant Total Final */}
                  <p className="text-2xl font-light italic tracking-tight text-black">
                    €{order.totalPrice.toFixed(2)}
                  </p>

                  <p className="text-[8px] font-bold uppercase tracking-tighter text-muted-foreground">
                    Total Acquisition
                  </p>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-4">
                {order.orderItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0"
                  >
                    <div className="flex items-center gap-6">
                      <span className="text-[10px] font-mono text-gray-500">
                        0{item.quantity}
                      </span>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-black">
                          {item.product.name}
                        </p>
                        {(item.variant?.color || item.variant?.size) && (
                          <p className="text-[9px] text-gray-500 uppercase tracking-widest mt-0.5">
                            {item.variant.color} / {item.variant.size}
                          </p>
                        )}
                      </div>
                    </div>
                    <p className="text-[10px] font-medium text-gray-500">
                      €{Number(item.price).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Footer: Tracking & Address */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="flex gap-4">
                  {order.address && (
                    <div className="p-6 bg-[#F9F9F9] flex-1">
                      <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-gray-500 mb-2">
                        Shipping Address
                      </p>
                      <p className="text-[10px] uppercase leading-relaxed text-gray-600 tracking-wide">
                        {order.address}
                      </p>
                    </div>
                  )}
                  {order.trackingNumber && (
                    <div className="p-6 bg-black text-white flex-1">
                      <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-2">
                        Tracking Number
                      </p>
                      <p className="text-[10px] font-mono tracking-widest uppercase">
                        {order.trackingNumber}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex md:justify-end self-end">
                  {order.isPaid && order.receiptUrl ? (
                    <a
                      href={order.receiptUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-black hover:text-gray-600 transition-colors border-b border-black pb-0.5"
                    >
                      Download Receipt <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest italic">
                      {order.isPaid
                        ? "Processing Document..."
                        : "Awaiting Payment"}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
