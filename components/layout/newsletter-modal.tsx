"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export function NewsletterModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenNewsletter = localStorage.getItem("prism-newsletter-seen");

    if (!hasSeenNewsletter) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, []);

  const closeNewsletter = () => {
    setIsOpen(false);
    localStorage.setItem("prism-newsletter-seen", "true");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeNewsletter}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[500px] bg-white z-[101] p-12 text-center"
          >
            <button
              onClick={closeNewsletter}
              className="absolute top-6 right-6 text-muted-foreground hover:text-black transition-colors"
            >
              <X className="h-4 w-4" strokeWidth={1} />
            </button>

            <div className="space-y-8">
              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-gray-400">
                  Prism Community
                </p>
                <h2 className="text-3xl font-medium uppercase tracking-tighter">
                  Join the Archive
                </h2>
              </div>

              <p className="text-sm text-gray-500 font-light leading-relaxed">
                Subscribe to receive early access to new drops, <br />
                exclusive archival pieces, and a **10% discount** on your first
                order.
              </p>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="EMAIL ADDRESS"
                  className="w-full border-b border-gray-200 py-3 text-[10px] font-bold tracking-widest uppercase focus:outline-none focus:border-black transition-colors bg-transparent"
                />
                <Button className="w-full h-14 bg-black text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-none hover:bg-gray-800">
                  Join Now
                </Button>
              </form>

              <p className="text-[8px] text-gray-300 uppercase tracking-widest">
                By subscribing, you agree to our Privacy Policy.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
