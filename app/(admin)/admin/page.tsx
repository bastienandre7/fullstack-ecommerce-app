import { OverviewChart } from "@/app/(admin)/admin/_components/overview-chart";
import { getDashboardStats } from "@/lib/actions/admin";
import { Package, TrendingUp, Users, Wallet } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  trend: string;
  icon: React.ReactNode;
}

export default async function AdminPage() {
  const { revenue, totalOrders, totalUsers, graphData } =
    await getDashboardStats();

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      <div className="flex justify-between items-end border-b border-gray-100 pb-8">
        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground">
            Executive
          </p>
          <h1 className="text-4xl font-medium uppercase tracking-tighter text-black">
            Overview
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 border border-gray-100 bg-gray-100 gap-px">
        <StatCard
          label="Gross Revenue"
          value={`$${revenue.toLocaleString()}`}
          trend="+12.5%"
          icon={<Wallet size={16} />}
        />
        <StatCard
          label="Order Volume"
          value={totalOrders}
          trend="+5.2%"
          icon={<Package size={16} />}
        />
        <StatCard
          label="Active Users"
          value={totalUsers}
          trend="+2.1%"
          icon={<Users size={16} />}
        />
      </div>

      <div className="space-y-6">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
          Revenue Analytics
        </h2>
        <div className="bg-white border border-gray-100 p-8">
          <div className="h-[400px] w-full">
            <OverviewChart data={graphData} />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, trend, icon }: StatCardProps) {
  return (
    <div className="bg-white p-10 space-y-6 group hover:bg-gray-50 transition-colors">
      <div className="flex justify-between items-start">
        <div className="p-2 border border-gray-100 rounded-sm text-gray-400 group-hover:text-black group-hover:border-black transition-all">
          {icon}
        </div>
        <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1">
          {trend} <TrendingUp size={10} />
        </span>
      </div>
      <div>
        <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-1">
          {label}
        </p>
        <p className="text-4xl font-light tracking-tighter italic text-black">
          {value}
        </p>
      </div>
    </div>
  );
}
