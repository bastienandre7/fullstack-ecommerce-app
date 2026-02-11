"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LayoutDashboard,
  LogOut,
  Settings,
  ShieldCheck,
  ShoppingBag,
  User,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export function AuthButtons() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  const isAdmin = session?.user?.role === "ADMIN";

  if (isLoading)
    return <div className="h-8 w-8 rounded-full bg-gray-100 animate-pulse" />;

  if (!session) {
    return (
      <Button
        asChild
        variant="ghost"
        className="h-auto p-0 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-transparent hover:opacity-50 transition-opacity"
      >
        <Link href="/login">Login</Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label="Open user menu"
          className="outline-none focus:ring-0 transition-opacity hover:opacity-80"
        >
          <Avatar className="h-8 w-8 border border-muted-foreground">
            <AvatarImage
              src={session.user?.image || ""}
              alt={session.user?.name || "User"}
              className="object-cover"
            />
            <AvatarFallback className="bg-white text-[10px] text-black font-bold">
              {session.user?.name?.[0]?.toUpperCase() || <User size={12} />}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-56 mt-4 p-0 rounded-none border border-gray-200 shadow-xl"
        align="end"
      >
        <div className="p-4 bg-[#F9F9F9]">
          <p className="text-[10px] font-bold uppercase tracking-widest text-black truncate">
            {session.user?.name}
          </p>
          <div className="flex items-center gap-2">
            <p className="text-[9px] text-muted-foreground uppercase tracking-tighter truncate">
              {session.user?.email}
            </p>
            {isAdmin && (
              <span className="text-[7px] bg-black text-white px-1 py-0.5 font-bold tracking-tighter">
                ADMIN
              </span>
            )}
          </div>
        </div>

        <div className="p-2">
          {isAdmin && (
            <>
              <DropdownMenuItem
                asChild
                className="p-3 cursor-pointer focus:bg-gray-50 rounded-none group border-b border-gray-50"
              >
                <Link href="/admin" className="flex items-center">
                  <ShieldCheck className="mr-3 h-3.5 w-3.5 text-black group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-black">
                    Admin Panel
                  </span>
                </Link>
              </DropdownMenuItem>
            </>
          )}

          <DropdownMenuItem
            asChild
            className="p-3 cursor-pointer focus:bg-gray-50 rounded-none group"
          >
            <Link href="/account" className="flex items-center">
              <LayoutDashboard className="mr-3 h-3.5 w-3.5 text-gray-400 group-hover:text-black transition-colors" />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                Account
              </span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            asChild
            className="p-3 cursor-pointer focus:bg-gray-50 rounded-none group"
          >
            <Link href="/account/orders" className="flex items-center">
              <ShoppingBag className="mr-3 h-3.5 w-3.5 text-gray-400 group-hover:text-black transition-colors" />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                Orders
              </span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            asChild
            className="p-3 cursor-pointer focus:bg-gray-50 rounded-none group"
          >
            <Link href="/account/profile" className="flex items-center">
              <Settings className="mr-3 h-3.5 w-3.5 text-gray-400 group-hover:text-black transition-colors" />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                Settings
              </span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="my-2 bg-gray-100" />

          <DropdownMenuItem
            className="p-3 text-red-500 focus:bg-red-50 focus:text-red-500 cursor-pointer rounded-none group"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <LogOut className="mr-3 h-3.5 w-3.5" />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Sign Out
            </span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
