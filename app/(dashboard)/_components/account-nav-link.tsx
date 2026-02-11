"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AccountNavLinkProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  mobile?: boolean;
}

export function AccountNavLink({
  href,
  label,
  icon,
  mobile = false,
}: AccountNavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  if (mobile) {
    return (
      <Link
        href={href}
        className={cn(
          "flex-1 flex flex-col items-center justify-center gap-1 py-3 px-2 text-xs font-medium transition-colors relative min-w-[80px]",
          "border-b-2 -mb-[2px]",
          isActive
            ? "text-black border-black"
            : "text-gray-500 border-transparent hover:text-gray-900 active:bg-gray-50",
        )}
      >
        <span className={cn("transition-transform", isActive && "scale-110")}>
          {icon}
        </span>
        <span className="whitespace-nowrap">{label}</span>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
        isActive
          ? "bg-gray-100 text-black"
          : "text-gray-600 hover:bg-gray-50 hover:text-black",
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
