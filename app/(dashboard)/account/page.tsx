import { getUserOrders } from "@/lib/actions/orders";
import { getUserInfos } from "@/lib/actions/user";
import { format } from "date-fns";
import { ArrowUpRight, MapPin } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardOverview() {
  const [user, orders] = await Promise.all([getUserInfos(), getUserOrders()]);

  if (!user) redirect("/auth/signin");

  const totalSpent = orders
    .filter((order) => order.isPaid)
    .reduce(
      (acc, order) =>
        acc +
        order.orderItems.reduce(
          (sum, item) => sum + Number(item.price) * item.quantity,
          0,
        ),
      0,
    );

  const lastOrder = orders[0];
  const displayYear = format(new Date(user.createdAt), "yyyy");

  return (
    <div className="space-y-16 animate-in fade-in duration-700">
      <div className="space-y-2">
        <h1 className="text-4xl font-medium uppercase tracking-tighter text-black">
          Welcome, {user?.name?.split(" ")[0] || user?.email}
        </h1>
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground">
          Member since {displayYear}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-100 border border-gray-100">
        <div className="bg-white p-8 space-y-4">
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
            Orders placed
          </p>
          <p className="text-3xl font-light italic">{orders.length}</p>
        </div>
        <div className="bg-white p-8 space-y-4">
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
            Total Acquisitions
          </p>
          <p className="text-3xl font-light italic">€{totalSpent.toFixed(2)}</p>
        </div>
        <div className="bg-white p-8 space-y-4">
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
            Membership
          </p>
          <p className="text-3xl font-light italic uppercase tracking-tighter">
            Premium
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em]">
              Recent Activity
            </h3>
            <Link
              href="/account/orders"
              className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground hover:text-black transition-colors"
            >
              View All
            </Link>
          </div>

          {lastOrder ? (
            <div className="group block p-6 border border-gray-100 hover:border-black transition-all duration-500">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest">
                    Order #{lastOrder.id.slice(-8).toUpperCase()}
                  </p>
                  <p className="text-[9px] text-muted-foreground uppercase tracking-widest">
                    {format(new Date(lastOrder.createdAt), "dd MMM yyyy")}
                  </p>
                </div>
                <span
                  className={`text-[8px] px-2 py-0.5 border font-bold uppercase tracking-tighter ${lastOrder.isPaid ? "border-black" : "border-gray-200 text-gray-400"}`}
                >
                  {lastOrder.isPaid ? "Processed" : "Pending"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium uppercase tracking-tighter">
                  {lastOrder.orderItems[0]?.product.name || "Product"}
                  {lastOrder.orderItems.length > 1 &&
                    ` +${lastOrder.orderItems.length - 1} items`}
                </p>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
            </div>
          ) : (
            <p className="text-[10px] text-gray-400 uppercase tracking-widest italic py-10">
              No recent orders found.
            </p>
          )}
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em]">
              Account Settings
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <Link
              href="/account/profile"
              className="flex items-center justify-between p-6 border border-gray-50 bg-[#FBFBFB] hover:bg-white hover:border-gray-200 transition-all group"
            >
              <div className="flex items-center gap-4">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  Shipping Addresses
                </span>
              </div>
              <span className="text-[9px] text-muted-foreground group-hover:text-black transition-colors uppercase font-bold tracking-widest">
                Edit
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
