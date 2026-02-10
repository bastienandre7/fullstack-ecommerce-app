import { auth } from "@/auth";
import { ArrowLeft, LayoutDashboard, Package, User } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AccountNavLink } from "./_components/account-nav-link";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-[calc(100vh-116px)] bg-white pt-[116px]">
      <aside className="w-72 border-r border-gray-100 hidden md:flex flex-col sticky top-[116px] h-[calc(100vh-116px)] z-20">
        <div className="p-8 mb-4">
          <Link
            href="/#collection"
            className="group flex items-center text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground hover:text-black transition-colors"
          >
            <ArrowLeft className="mr-2 h-3 w-3 transition-transform group-hover:-translate-x-1" />
            Back to store
          </Link>
        </div>

        <nav className="flex-1 px-6 space-y-1">
          <p className="px-3 mb-6 text-[9px] font-bold uppercase tracking-[0.4em] text-muted-foreground">
            Account Management
          </p>

          <AccountNavLink
            href="/account"
            label="Overview"
            icon={<LayoutDashboard size={14} />}
          />
          <AccountNavLink
            href="/account/orders"
            label="Orders"
            icon={<Package size={14} />}
          />
          <AccountNavLink
            href="/account/profile"
            label="Profile"
            icon={<User size={14} />}
          />
        </nav>
      </aside>

      <main className="flex-1">
        <div className="max-w-5xl mx-auto p-8 md:p-16">{children}</div>
      </main>
    </div>
  );
}
