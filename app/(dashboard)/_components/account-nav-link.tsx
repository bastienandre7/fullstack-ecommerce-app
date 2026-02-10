"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AccountNavLinkProps {
  href: string;
  label: string;
  icon: React.ReactNode; // On accepte du JSX directement
}

export function AccountNavLink({ href, label, icon }: AccountNavLinkProps) {
  const pathname = usePathname();
  const isActive =
    pathname === href || (href !== "/account" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center px-3 py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-all relative",
        isActive
          ? "bg-gray-100 text-black"
          : "text-muted-foreground hover:text-black hover:bg-gray-50/50",
      )}
    >
      {isActive && <div className="absolute left-0 w-[2px] h-4 bg-black" />}

      <span
        className={cn(
          "mr-4 transition-opacity",
          isActive ? "opacity-100" : "opacity-50 group-hover:opacity-100",
        )}
      >
        {icon}
      </span>
      {label}
    </Link>
  );
}
