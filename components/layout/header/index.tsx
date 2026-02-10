// components/layout/header/header.tsx
"use client";

import { AuthButtons } from "@/components/layout/header/auth-buttons";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnnouncementBar } from "./announcement-bar";
import { CartButton } from "./cart-button";
import { SearchOverlay } from "./search-overlay";

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLanding = pathname === "/";
  const isTransparent = isLanding && !isScrolled;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 z-50 w-full transition-all duration-500",
          isTransparent
            ? "bg-transparent border-transparent"
            : "bg-white/80 backdrop-blur-md border-b border-gray-100",
        )}
      >
        <div
          className={cn(
            "overflow-hidden transition-all duration-500 ease-in-out",
            isScrolled ? "max-h-0" : "max-h-10",
          )}
        >
          <AnnouncementBar />
        </div>
        <div
          className={cn(
            "container mx-auto flex h-20 items-center justify-between px-6 transition-colors duration-500",
            isTransparent ? "text-white" : "text-black",
          )}
        >
          <div className="flex items-center gap-12">
            <Logo variant={isTransparent ? "white" : "black"} />
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <button
              onClick={() => setIsSearchOpen(true)}
              className={cn(
                "p-2 rounded-full transition-all hover:bg-black/5",
                isTransparent ? "hover:bg-white/10" : "hover:bg-black/5",
              )}
            >
              <Search className="w-5 h-5" />
              <span className="sr-only">Search</span>
            </button>

            <CartButton />

            <AuthButtons />
          </div>
        </div>
      </header>

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
