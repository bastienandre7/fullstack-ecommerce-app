import { checkAdminStatus } from "@/lib/actions/admin";
import {
  ArrowLeft,
  LayoutDashboard,
  ShoppingCart,
  Tag,
  Users,
} from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { AdminNavLink } from "./_components/admin-nav-link"; // Ajuste le chemin selon ton projet

export const metadata: Metadata = {
  title: {
    default: "Admin Console",
    template: "%s | PRISM Admin",
  },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await checkAdminStatus();

  return (
    <div className="flex min-h-[calc(100vh-116px)] bg-white pt-[116px]">
      {/* High-End Sidebar */}
      <aside className="w-72 border-r border-gray-100 hidden md:flex flex-col sticky top-[116px] h-[calc(100vh-116px)] z-20">
        {/* Brand Header */}
        <div className="p-8 pb-12">
          <div className="flex items-center gap-3 group">
            <div className="h-6 w-6 bg-black rounded-full" />
            <span className="text-sm font-bold uppercase tracking-[0.3em]">
              Studio{" "}
              <span className="text-muted-foreground font-light">HQ</span>
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1">
          <p className="px-4 mb-4 text-[9px] font-bold text-muted-foreground uppercase tracking-[0.3em]">
            Management
          </p>

          <AdminNavLink
            href="/admin"
            icon={<LayoutDashboard size={16} />}
            label="Overview"
          />
          <AdminNavLink
            href="/admin/orders"
            icon={<ShoppingCart size={16} />}
            label="Orders"
          />
          <AdminNavLink
            href="/admin/products"
            icon={<Tag size={16} />}
            label="Products"
          />
          <AdminNavLink
            href="/admin/users"
            icon={<Users size={16} />}
            label="Customers"
          />
        </nav>

        {/* Footer Actions */}
        <div className="p-4 mt-auto space-y-1 border-t border-gray-50">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-black transition-all group"
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-1"
            />
            Return to Store
          </Link>
        </div>
      </aside>

      {/* Main Content Area - Padding-left pour compenser la sidebar fixed */}
      <main className="flex-1">
        <div className="h-full p-8 lg:p-12 max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
