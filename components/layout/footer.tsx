// components/layout/footer.tsx
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/ui/logo";
import { ArrowRight, Instagram, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="bg-black text-white pt-24 pb-12"
      style={{
        minHeight: "600px",
        contain: "layout style paint",
      }}
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          {/* Colonne 1: Newsletter */}
          <div className="md:col-span-5 space-y-8">
            {/* Fixed dimensions for logo */}
            <div className="w-32 h-8" style={{ minHeight: "32px" }}>
              <Logo className="text-white" />
            </div>
            <div className="space-y-4">
              {/* Reserve exact space for heading */}
              <h3
                className="text-3xl md:text-4xl font-medium uppercase tracking-tighter leading-none"
                style={{ minHeight: "80px" }}
              >
                Subscribe to our <br />
                <span className="text-gray-500 italic">Mailing List</span>
              </h3>
              {/* Reserve space for paragraph */}
              <p
                className="text-sm text-gray-400 uppercase tracking-widest leading-relaxed max-w-sm"
                style={{ minHeight: "72px" }}
              >
                Receive early access to seasonal drops and exclusive editorial
                content.
              </p>
            </div>

            {/* Fixed height input container */}
            <div
              className="flex max-w-md items-center border-b border-white/20 pb-2 group focus-within:border-white transition-colors"
              style={{ height: "56px" }}
            >
              <Input
                type="email"
                placeholder="YOUR EMAIL"
                className="bg-transparent border-none rounded-none h-12 font-medium placeholder:text-gray-600 focus-visible:ring-0 px-0"
              />
              <button
                aria-label="subscribe to newsletter"
                className="p-2 hover:translate-x-1 transition-transform flex-shrink-0"
                style={{ width: "36px", height: "36px" }}
              >
                <ArrowRight size={20} className="text-white" />
              </button>
            </div>
          </div>

          {/* Colonne 2: Boutique */}
          <div
            className="md:col-span-2 space-y-6"
            style={{ minHeight: "240px" }}
          >
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-500">
              Shop
            </h4>
            <nav className="flex flex-col gap-4 text-sm uppercase tracking-widest font-medium">
              <Link
                href="/shop"
                className="hover:text-gray-400 transition-colors"
                style={{ minHeight: "20px" }}
              >
                New Arrivals
              </Link>
              <Link
                href="/collections"
                className="hover:text-gray-400 transition-colors"
                style={{ minHeight: "20px" }}
              >
                Collections
              </Link>
              <Link
                href="/essentials"
                className="hover:text-gray-400 transition-colors"
                style={{ minHeight: "20px" }}
              >
                Essentials
              </Link>
              <Link
                href="/archive"
                className="hover:text-gray-400 transition-colors"
                style={{ minHeight: "20px" }}
              >
                Archive
              </Link>
            </nav>
          </div>

          {/* Colonne 3: Support */}
          <div
            className="md:col-span-2 space-y-6"
            style={{ minHeight: "240px" }}
          >
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-500">
              Client Service
            </h4>
            <nav className="flex flex-col gap-4 text-sm uppercase tracking-widest font-medium">
              <Link
                href="/faq"
                className="hover:text-gray-400 transition-colors"
                style={{ minHeight: "20px" }}
              >
                Shipping
              </Link>
              <Link
                href="/returns"
                className="hover:text-gray-400 transition-colors"
                style={{ minHeight: "20px" }}
              >
                Returns
              </Link>
              <Link
                href="/contact"
                className="hover:text-gray-400 transition-colors"
                style={{ minHeight: "20px" }}
              >
                Contact
              </Link>
              <Link
                href="/care"
                className="hover:text-gray-400 transition-colors"
                style={{ minHeight: "20px" }}
              >
                Care Guide
              </Link>
            </nav>
          </div>

          {/* Colonne 4: Socials */}
          <div
            className="md:col-span-3 space-y-6"
            style={{ minHeight: "100px" }}
          >
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-500">
              Connect
            </h4>
            <div className="flex gap-6">
              <Link
                href="#"
                aria-label="Instagram Link"
                className="hover:text-gray-400 transition-colors"
                style={{ width: "18px", height: "18px" }}
              >
                <Instagram size={18} />
              </Link>
              <Link
                href="#"
                aria-label="Twitter Link"
                className="hover:text-gray-400 transition-colors"
                style={{ width: "18px", height: "18px" }}
              >
                <Twitter size={18} />
              </Link>
              <Link
                href="#"
                aria-label="YouTube Link"
                className="hover:text-gray-400 transition-colors"
                style={{ width: "18px", height: "18px" }}
              >
                <Youtube size={18} />
              </Link>
            </div>
          </div>
        </div>

        {/* Barre Basse */}
        <div
          className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6"
          style={{ minHeight: "80px" }}
        >
          <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-gray-500">
            © 2026 PRISM STUDIO. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8 text-[9px] font-medium uppercase tracking-[0.3em] text-gray-500">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
