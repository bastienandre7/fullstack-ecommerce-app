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
import { AdminNavLink } from "./_components/admin-nav-link";

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

  const navLinks = [
    {
      href: "/admin",
      icon: <LayoutDashboard size={18} />,
      label: "Overview",
    },
    {
      href: "/admin/orders",
      icon: <ShoppingCart size={18} />,
      label: "Orders",
    },
    {
      href: "/admin/products",
      icon: <Tag size={18} />,
      label: "Products",
    },
    {
      href: "/admin/users",
      icon: <Users size={18} />,
      label: "Customers",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-116px)] bg-white pt-[116px]">
      <div className="md:hidden border-b border-gray-200 bg-white">
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-5 w-5 bg-black rounded-full" />
            <span className="text-xs font-bold uppercase tracking-[0.2em]">
              Studio <span className="text-gray-400 font-light">HQ</span>
            </span>
          </div>

          <Link
            href="/"
            className="inline-flex items-center text-xs font-semibold text-gray-600 hover:text-black transition-colors active:scale-95"
          >
            <ArrowLeft className="mr-1 h-3.5 w-3.5" />
            Store
          </Link>
        </div>

        <nav className="flex overflow-x-auto scrollbar-hide">
          <div className="flex min-w-full">
            {navLinks.map((link) => (
              <AdminNavLink
                key={link.href}
                href={link.href}
                icon={link.icon}
                label={link.label}
                mobile
              />
            ))}
          </div>
        </nav>
      </div>

      <aside className="w-72 border-r border-gray-100 hidden md:flex flex-col sticky top-[116px] h-[calc(100vh-116px)] z-20">
        <div className="p-8 pb-12">
          <div className="flex items-center gap-3 group">
            <div className="h-6 w-6 bg-black rounded-full" />
            <span className="text-sm font-bold uppercase tracking-[0.3em]">
              Studio{" "}
              <span className="text-muted-foreground font-light">HQ</span>
            </span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <p className="px-4 mb-4 text-[9px] font-bold text-muted-foreground uppercase tracking-[0.3em]">
            Management
          </p>

          {navLinks.map((link) => (
            <AdminNavLink
              key={link.href}
              href={link.href}
              icon={link.icon}
              label={link.label}
            />
          ))}
        </nav>

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

      <main className="flex-1">
        <div className="h-full p-4 sm:p-6 md:p-8 lg:p-12 max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
