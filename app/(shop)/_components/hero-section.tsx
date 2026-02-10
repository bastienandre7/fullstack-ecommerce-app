import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react"; // Optionnel : pour montrer que c'est un lien externe
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative h-screen w-full flex items-end overflow-hidden bg-black">
      {/* --- IMAGE DE FOND --- */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-image.webp"
          alt="Background"
          fill
          priority
          quality={100}
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent md:from-black/70" />
      </div>

      {/* --- CONTENU --- */}
      <div className="container relative z-10 mx-auto px-6 pb-16 md:pb-32">
        <div className="max-w-4xl space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-medium tracking-tight text-white leading-[1.1]">
              The fastest way to <br className="hidden md:block" /> sell online
              with Next.js
            </h1>

            <p className="text-white/80 text-base md:text-xl max-w-xl font-light leading-relaxed">
              Designed for modern brands. Built with Next.js to help you launch
              a fast, scalable ecommerce store — without friction.
            </p>
          </div>

          {/* --- BOUTONS --- */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            {/* CTA Principal */}
            <Button
              asChild
              className="w-full sm:w-auto h-14 px-10 text-[11px] font-bold rounded-none bg-white text-black hover:bg-gray-200 uppercase tracking-[0.2em] transition-all"
            >
              <Link href="#collection">Shop All</Link>
            </Button>

            {/* CTA Secondaire (Lien Boutique) */}
            <Button
              asChild
              variant="outline"
              className="w-full sm:w-auto h-14 px-10 text-[11px] font-bold rounded-none border-white/30 bg-white/5 backdrop-blur-md text-white hover:bg-white hover:text-black hover:border-white uppercase tracking-[0.2em] transition-all"
            >
              <a
                href="https://bloomtpl.com/nextjs-templates"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                Buy Template
                <ExternalLink className="h-3 w-3 opacity-50" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
