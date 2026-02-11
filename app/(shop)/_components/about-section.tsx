import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function AboutSection() {
  return (
    <section className="bg-white py-32 overflow-hidden border-t border-gray-100">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
              <Image
                src="/images/about-image.webp"
                alt="Prism Lifestyle"
                fill
                className="object-cover"
                quality={100}
              />
            </div>
            <div className="absolute bottom-6 left-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white bg-black/20 backdrop-blur-md px-4 py-2">
                Est. 2026
              </span>
            </div>
          </div>

          <div className="flex flex-col items-start space-y-10">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-7xl font-medium uppercase leading-[0.95] tracking-tight text-black">
                More than <br />
                <span className="text-gray-400">Just Apparel.</span>
              </h2>
              <div className="h-1 w-24 bg-black" />
            </div>

            <div className="space-y-8 max-w-lg">
              <p className="text-xl md:text-2xl font-medium text-black leading-tight uppercase tracking-tight">
                PRISM was built for the creators, the visionaries, and those who
                define their own path.
              </p>
              <p className="text-base text-gray-500 leading-relaxed">
                We grew tired of fast fashion that feels disposable and
                uninspired. Our mission is to bridge the gap between high-end
                aesthetics and functional daily wear. Selected fabrics,
                conscious production, and a silhouette that speaks for itself.
              </p>
            </div>

            <div className="pt-4">
              <Link
                href="#"
                className="group flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-black"
              >
                Read Our Manifesto
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 group-hover:bg-black group-hover:text-white transition-all duration-300">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
