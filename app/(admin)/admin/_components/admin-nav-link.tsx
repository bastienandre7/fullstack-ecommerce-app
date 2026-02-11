"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AdminNavLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  mobile?: boolean;
}

export function AdminNavLink({
  href,
  icon,
  label,
  mobile = false,
}: AdminNavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  if (mobile) {
    return (
      <Link
        href={href}
        className={cn(
          "flex-1 flex flex-col items-center justify-center gap-1.5 py-3 px-3 text-xs font-medium transition-all relative min-w-[90px]",
          "border-b-2 -mb-[2px]",
          isActive
            ? "text-black border-black bg-gray-50/50"
            : "text-gray-500 border-transparent hover:text-gray-900 active:bg-gray-50",
        )}
      >
        <span className={cn("transition-all", isActive && "scale-110")}>
          {icon}
        </span>
        <span className="whitespace-nowrap text-[11px] font-semibold tracking-wide">
          {label}
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all group",
        isActive
          ? "bg-black text-white shadow-sm"
          : "text-gray-600 hover:bg-gray-50 hover:text-black",
      )}
    >
      <span
        className={cn(
          "transition-transform",
          !isActive && "group-hover:scale-110",
        )}
      >
        {icon}
      </span>
      <span>{label}</span>
    </Link>
  );
}
