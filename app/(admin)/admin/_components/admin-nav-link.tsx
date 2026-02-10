"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AdminNavLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

export function AdminNavLink({ href, icon, label }: AdminNavLinkProps) {
  const pathname = usePathname();

  // Gère l'état actif (exact pour l'overview, startsWith pour le reste)
  const isActive =
    pathname === href || (href !== "/admin" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.2em] transition-all rounded-sm relative group",
        isActive
          ? "bg-gray-100 text-black"
          : "text-muted-foreground hover:text-black hover:bg-gray-50",
      )}
    >
      {/* Petit indicateur vertical premium sur l'actif */}
      {isActive && <div className="absolute left-0 w-[2px] h-4 bg-black" />}

      <span
        className={cn(
          "transition-opacity",
          isActive ? "opacity-100" : "opacity-70 group-hover:opacity-100",
        )}
      >
        {icon}
      </span>
      {label}
    </Link>
  );
}
