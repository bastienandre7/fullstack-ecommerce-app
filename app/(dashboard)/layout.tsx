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

  const navLinks = [
    {
      href: "/account",
      label: "Overview",
      icon: <LayoutDashboard size={16} />,
    },
    { href: "/account/orders", label: "Orders", icon: <Package size={16} /> },
    { href: "/account/profile", label: "Profile", icon: <User size={16} /> },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-116px)] bg-white pt-[116px]">
      <div className="md:hidden border-b border-gray-200 bg-white">
        <div className="px-4 pt-3 pb-2 border-b border-gray-100">
          <Link
            href="/#collection"
            className="inline-flex items-center text-xs font-semibold text-gray-600 hover:text-black transition-colors active:scale-95"
          >
            <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
            Back to store
          </Link>
        </div>

        <nav className="flex">
          <div className="flex min-w-full">
            {navLinks.map((link) => (
              <AccountNavLink
                key={link.href}
                href={link.href}
                label={link.label}
                icon={link.icon}
                mobile
              />
            ))}
          </div>
        </nav>
      </div>

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

          {navLinks.map((link) => (
            <AccountNavLink
              key={link.href}
              href={link.href}
              label={link.label}
              icon={link.icon}
            />
          ))}
        </nav>
      </aside>

      <main className="flex-1">
        <div className="max-w-5xl mx-auto p-4 sm:p-6 md:p-16">{children}</div>
      </main>
    </div>
  );
}
