import { getAdminOrders } from "@/lib/actions/admin/orders";
import { format } from "date-fns";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { OrderStatusActions } from "./_components/order-status-actions";

export default async function AdminOrdersPage() {
  const orders = await getAdminOrders();

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      <div className="flex justify-between items-end border-b border-gray-100 pb-8">
        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground">
            Logistics & Archives
          </p>
          <h1 className="text-4xl font-medium uppercase tracking-tighter text-black">
            Inventory Orders
          </h1>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold uppercase tracking-widest text-black">
            {orders.length} Transactions
          </p>
          <p className="text-[9px] text-gray-400 uppercase tracking-widest">
            Studio Status: Operational
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="py-4 text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground text-center">
                Customer
              </th>
              <th className="py-4 text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground text-center">
                Date
              </th>
              <th className="py-4 text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground text-center">
                Management
              </th>
              <th className="py-4 text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground text-right">
                Amount
              </th>
              <th className="py-4 text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground text-right italic">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {orders.map((order) => {
              return (
                <tr
                  key={order.id}
                  className="group hover:bg-[#FAFAFA] transition-colors"
                >
                  <td className="py-8">
                    <div className="text-[11px] font-bold uppercase tracking-tight text-black">
                      {order.user.email || "Undefined Agent"}
                    </div>
                  </td>

                  <td className="py-8 text-center text-[10px] font-medium text-muted-foreground uppercase tracking-tighter">
                    {format(new Date(order.createdAt), "dd.MM.yyyy")}
                  </td>

                  <td className="py-8 text-center min-w-[150px]">
                    <OrderStatusActions
                      orderId={order.id}
                      currentStatus={order.status}
                      currentTracking={order.trackingNumber}
                    />
                  </td>

                  <td className="py-8 text-right">
                    <div className="text-[11px] font-bold tracking-tighter text-black">
                      ${order.totalPrice.toFixed(2)}
                    </div>
                    {order.shippingCost > 0 && (
                      <div className="text-[8px] text-gray-400 uppercase tracking-tighter">
                        Incl. ${order.shippingCost.toFixed(2)} shipping
                      </div>
                    )}
                  </td>

                  <td className="py-8 text-right">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-muted-foreground hover:text-black transition-colors"
                    >
                      Inspect <ArrowUpRight size={12} />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
