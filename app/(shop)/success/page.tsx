"use client";

import { useCart } from "@/hooks/use-cart";
import { Check } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function SuccessPage() {
  const clearCart = useCart((state) => state.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-[100vh] flex flex-col items-center justify-center px-6 animate-in fade-in duration-1000">
      <div className="max-w-md w-full text-center space-y-12">
        <div className="flex justify-center">
          <div className="w-16 h-16 border border-black flex items-center justify-center rounded-full">
            <Check size={30} strokeWidth={1.5} className="text-black" />
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-500">
            Transaction Verified
          </p>
          <h1 className="text-5xl font-light tracking-tighter uppercase text-black italic">
            Thank you.
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed font-light max-w-[280px] mx-auto">
            Your acquisition has been recorded and is currently being processed
            by our studio.
          </p>
        </div>

        <div className="pt-8 space-y-6">
          <div className="flex flex-col gap-3">
            <Link
              href="/account/orders"
              className="text-[10px] font-bold uppercase tracking-[0.3em] border-b border-black pb-1 mx-auto hover:text-gray-500 hover:border-gray-500 transition-all text-black"
            >
              View My Acquisitions
            </Link>
            <Link
              href="/"
              className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 hover:text-black transition-all"
            >
              Return to Home
            </Link>
          </div>

          <div className="pt-12">
            <p className="text-[9px] font-mono text-gray-500 uppercase tracking-widest leading-loose">
              A confirmation email has been dispatched <br />
              to your registered address.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
